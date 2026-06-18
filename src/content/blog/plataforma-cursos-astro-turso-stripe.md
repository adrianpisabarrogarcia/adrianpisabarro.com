---
title: "Cómo montar una plataforma de cursos con Astro, Turso y Stripe"
date: 2026-06-18
category: "Arquitectura"
slug: "plataforma-cursos-astro-turso-stripe"
description: "Cómo construí la Academia de la Red Pastoral Juvenil: arquitectura, base de datos en el edge con Turso e integración de pagos con Stripe sobre Astro."
image:
  src: "/assets/images/blog/plataforma-cursos-astro-turso-stripe.webp"
  alt: "Plataforma de cursos con Astro, Turso y Stripe"
duration: "8 min"
author: "Adrián Pisabarro García"
---

Cuando me encargaron construir la [Academia de la Red Pastoral Juvenil](https://academy.redpastoraljuvenil.org/), el reto era claro: una plataforma de formación online que permitiera publicar cursos, gestionar inscripciones y cobrar matrículas, con un equipo pequeño detrás y sin presupuesto para infraestructura compleja.

Este artículo explica el stack que elegí, por qué lo elegí y cómo encajan las piezas.

## El stack en una línea

**Astro + Turso + Stripe**, desplegado en **Vercel**.

Nada de servidor propio, nada de base de datos administrada cara, nada de backend monolítico. Todo serverless, todo en el edge donde tiene sentido.

## Por qué Astro

Astro es mi framework de referencia para proyectos de contenido con interactividad puntual. Genera HTML estático por defecto y solo hidrata lo que necesita JavaScript, lo que se traduce en tiempos de carga muy bajos sin sacrificar dinamismo.

Para una plataforma de cursos, el 90% del contenido es estático: portada, listado de cursos, descripción de cada curso. Solo los flujos de inscripción y pago necesitan lógica en servidor. Astro resuelve esto perfectamente con sus **API routes** y sus **Server Actions**, sin necesidad de montar un backend separado.

Además, Astro se integra de forma nativa con Vercel, lo que simplifica mucho el despliegue.

## Turso: SQLite en el edge

La elección de base de datos fue la decisión más interesante del proyecto. Las opciones habituales (PostgreSQL en Railway, PlanetScale, Supabase) tienen una latencia de red que se nota cuando las funciones serverless de Vercel están en el edge.

**Turso** es una base de datos distribuida basada en SQLite que replica los datos cerca de cada región de Vercel. Las lecturas son prácticamente locales: latencias de 1-5ms frente a los 50-100ms de una base de datos remota típica.

El esquema de la plataforma es sencillo:

```sql
CREATE TABLE courses (
  id        INTEGER PRIMARY KEY,
  title     TEXT NOT NULL,
  slug      TEXT UNIQUE NOT NULL,
  price     INTEGER NOT NULL, -- en céntimos
  published INTEGER DEFAULT 0
);

CREATE TABLE enrollments (
  id                TEXT PRIMARY KEY, -- Stripe session ID
  course_id         INTEGER REFERENCES courses(id),
  email             TEXT NOT NULL,
  stripe_payment_id TEXT,
  created_at        TEXT DEFAULT (datetime('now'))
);
```

La conexión desde Astro es directa con el cliente oficial de Turso:

```typescript
import { createClient } from "@libsql/client";

const db = createClient({
  url: import.meta.env.TURSO_URL,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
});
```

## Stripe: el flujo de inscripción

El flujo de pago sigue el patrón estándar de Stripe Checkout:

1. El usuario pulsa "Inscribirse" en un curso.
2. Una API route de Astro crea una **Checkout Session** con el precio del curso.
3. Stripe redirige al usuario a su página de pago segura.
4. Al completar el pago, Stripe llama a nuestro **webhook** con el evento `checkout.session.completed`.
5. El webhook registra la inscripción en Turso y envía el email de confirmación.

```typescript
// src/pages/api/checkout.ts
import type { APIRoute } from "astro";
import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export const POST: APIRoute = async ({ request }) => {
  const { courseId, courseSlug, price, title } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name: title },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${import.meta.env.SITE_URL}/cursos/${courseSlug}/gracias`,
    cancel_url: `${import.meta.env.SITE_URL}/cursos/${courseSlug}`,
    metadata: { courseId },
  });

  return new Response(JSON.stringify({ url: session.url }), { status: 200 });
};
```

Y el webhook que escucha la confirmación del pago:

```typescript
// src/pages/api/webhook.ts
export const POST: APIRoute = async ({ request }) => {
  const sig = request.headers.get("stripe-signature")!;
  const body = await request.text();

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    import.meta.env.STRIPE_WEBHOOK_SECRET
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await db.execute({
      sql: "INSERT INTO enrollments (id, course_id, email) VALUES (?, ?, ?)",
      args: [session.id, session.metadata.courseId, session.customer_email],
    });
  }

  return new Response(null, { status: 200 });
};
```

El punto clave del webhook es verificar siempre la firma de Stripe con `constructEvent`. Sin esta verificación cualquiera podría mandar peticiones falsas a tu endpoint y registrar inscripciones sin pagar.

## Despliegue en Vercel

El proyecto corre en Vercel con el adaptador oficial de Astro. La configuración es mínima:

```bash
npm install @astrojs/vercel
```

```typescript
// astro.config.mjs
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  adapter: vercel(),
});
```

Las variables de entorno (`TURSO_URL`, `TURSO_AUTH_TOKEN`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`) se gestionan desde el panel de Vercel, separadas por entorno (preview / production).

## Conclusiones

Este stack tiene tres ventajas principales para proyectos de este tamaño:

- **Coste casi cero en reposo**: Vercel y Turso tienen tiers gratuitos generosos. Solo se paga cuando hay actividad real.
- **Latencia mínima**: Turso en el edge elimina el cuello de botella de la base de datos remota.
- **Mantenimiento reducido**: Sin servidor propio que administrar, sin actualizaciones de sistema operativo, sin gestión de certificados.

El único compromiso es que SQLite no escala horizontalmente para escrituras concurrentes masivas. Para una plataforma de formación con cientos o pocos miles de usuarios, no es un problema. Si el proyecto creciera hasta decenas de miles de inscripciones simultáneas, tocaría migrar a una base de datos distribuida más robusta como PlanetScale o Neon.

Por ahora, funciona. Y funciona bien.
