---
title: "Scrum: la guía completa de gestión ágil de proyectos"
date: 2026-08-12
category: "Metodologías Ágiles"
slug: "gestion-scrum"
description: "Qué es Scrum, de dónde viene su nombre, sus tres pilares y cinco valores, y cómo se organiza en eventos, artefactos y roles. Una guía completa para entender y aplicar el framework."
image:
  src: "/assets/images/blog/gestion-scrum.webp"
  alt: "Tablero Scrum con columnas por hacer, en progreso y hecho, junto al ciclo de un sprint"
duration: "12 min"
author: "Adrián Pisabarro García"
---

Scrum es, junto con Kanban, el framework ágil más usado para gestionar equipos y proyectos de desarrollo. Es sencillo de describir pero exige disciplina para aplicarlo bien: pocas reglas, pero todas con un propósito concreto. En este artículo recojo, de forma ordenada, todo lo que hay que entender para trabajar con Scrum: de dónde viene, en qué se diferencia de Kanban, sus pilares y valores, y cómo se estructuran sus eventos, artefactos y roles.

## Agile, Scrum y Kanban

**Agile** no es una metodología, es una filosofía de trabajo: un conjunto de valores y principios (el [Manifiesto Ágil](https://agilemanifesto.org/)) orientados a entregar valor de forma incremental, adaptándose al cambio en lugar de seguir un plan cerrado. Dentro de esa filosofía existen varios **frameworks** que la ponen en práctica. Los dos más habituales son:

- **Scrum**: pensado para proyectos con cierta envergadura, donde el trabajo se organiza en ciclos cerrados de tiempo (sprints) con un objetivo claro en cada uno. Encaja bien cuando hay que construir algo grande de forma incremental.
- **Kanban**: pensado para trabajo continuo, sin ciclos cerrados. Cada día puede aparecer una tarea nueva y se gestiona mediante un flujo continuo de tareas en un tablero, limitando el trabajo en curso (WIP). Encaja bien en soporte, mantenimiento o equipos con demanda constante e impredecible.

En resumen: si el trabajo se puede planificar por adelantado y tiene un objetivo a medio plazo, Scrum. Si el trabajo llega día a día y hay que reaccionar continuamente, Kanban.

## El Sprint: la unidad de tiempo de Scrum

Todo el trabajo en Scrum se organiza en **sprints**: bloques de tiempo de duración fija (*time-box*) que van de **1 a 4 semanas**, siendo **2 semanas** la duración más habitual en la práctica.

Dentro de cada sprint ocurren, en este orden, los cuatro eventos principales del framework:

1. **Planificación** (Sprint Planning)
2. **Dailys** (Daily Scrum, uno por cada día del sprint)
3. **Revisión** (Sprint Review)
4. **Retrospectiva** (Sprint Retrospective)

Al finalizar cada sprint se hace una **entrega**: el equipo muestra un incremento de producto funcional, por pequeño que sea. Esta es una de las ideas centrales de Scrum: nunca se trabaja "a ciegas" durante meses, siempre hay un punto de control periódico en el que se entrega y se revisa valor real.

## Los tres pilares del empirismo

Scrum es un framework **empírico**: asume que no se puede planificar todo de antemano con precisión, así que en lugar de intentar predecirlo todo, se basa en la observación constante y el ajuste continuo. Esto se sostiene sobre tres pilares:

- **Transparencia**: toda la información relevante del proyecto (estado de las tareas, impedimentos, objetivos) debe ser visible para todo el equipo. Nadie debería tener que preguntar para enterarse de cómo va algo.
- **Inspección**: revisar frecuentemente el trabajo y el proceso para detectar desviaciones o problemas cuanto antes. Cuanto antes se detecta un fallo, más barato es corregirlo.
- **Adaptación**: si la inspección revela que algo no funciona, se ajusta. Todo lo aprendido en un sprint se aplica al siguiente: el plan, el proceso o incluso el objetivo pueden cambiar.

Estos tres pilares se apoyan entre sí: sin transparencia no se puede inspeccionar bien, y sin inspección no hay nada que adaptar.

## Los cinco valores de Scrum

Además de los pilares, Scrum define cinco valores que debe encarnar el equipo para que el framework funcione de verdad y no se quede en una lista de reuniones:

- **Coraje**: el equipo tiene que atreverse a afrontar los problemas y los retos del día a día, incluso cuando implican decir cosas incómodas o abordar tareas difíciles.
- **Foco**: cada persona sabe en cada momento hacia dónde va y qué tiene que hacer para mostrar resultados en el sprint actual, en lugar de dispersarse en tareas fuera del objetivo.
- **Compromiso**: el equipo se compromete personal y colectivamente a cumplir los objetivos que se ha marcado para el sprint.
- **Respeto**: debe existir espacio real para que cada persona hable, aporte su opinión y participe en las decisiones, sin jerarquías que lo impidan.
- **Franqueza**: hay que ser franco en todo momento, porque en Scrum constantemente se pregunta la opinión de cada miembro del equipo (en la daily, en la retrospectiva...) y esa opinión solo es útil si es honesta.

## De dónde viene el nombre "Scrum"

El término viene del **rugby**. Un "scrum" (melé) es la jugada en la que ambos equipos se agrupan y empujan juntos para recuperar el balón y poder avanzar hacia el objetivo. La analogía con el desarrollo de software es intencionada: un equipo compacto, coordinado, que avanza unido hacia un objetivo común en lugar de trabajar de forma individual y desconectada.

## La estructura de Scrum: Eventos, Artefactos y Roles

Todo el framework se puede resumir en tres bloques: los **Eventos** (cuándo se reúne el equipo y para qué), los **Artefactos** (qué documentos o elementos usa el equipo para gestionar el trabajo) y los **Roles** (quién hace qué). Es lo que a veces se recuerda con las siglas **E-A-R**.

### Eventos

#### El Sprint

Es el evento "contenedor": el ciclo de 1 a 4 semanas dentro del cual ocurren el resto de eventos. Cuando un sprint termina, inmediatamente empieza el siguiente, sin huecos entre medias.

#### Sprint Planning (Planificación del Sprint)

Se realiza al inicio de cada sprint y responde a dos preguntas: **qué** vamos a hacer y **con qué nos comprometemos**. Normalmente se divide en dos partes, a menudo con dos reuniones distintas:

1. Definir el **objetivo del sprint** (Sprint Goal) y qué elementos del Product Backlog se van a abordar. Aquí participa todo el equipo, guiado por el Product Owner.
2. Los **developers** deciden cómo se van a distribuir las tareas y cómo van a organizarse técnicamente para conseguirlo.

En esta fase, una historia de usuario suele **dividirse en varias tareas** más pequeñas y concretas, para que el trabajo sea manejable y medible día a día.

#### Daily Scrum (la "daily")

Reunión de solo **15 minutos**, todos los días del sprint. Participan los **developers**; no es imprescindible que esté el Product Owner. El foco es exclusivamente: cómo va avanzando cada uno con su tarea. No es el momento de resolver problemas en profundidad ni de extenderse en discusiones técnicas — esas conversaciones se sacan de la daily y se tienen aparte, con quien corresponda.

#### Sprint Review (Revisión del Sprint)

Se hace al final del sprint, con el trabajo ya terminado (o lo que se haya conseguido terminar). Algunas ideas clave:

- Una historia de usuario **no se considera cerrada** hasta que todas sus tareas están cerradas.
- Las historias de usuario tienen **puntos** asociados (una estimación de esfuerzo/complejidad). Si la historia no se completa, esos puntos **no se otorgan**: no hay puntos parciales por trabajo a medias.
- El objetivo principal de la review es **mostrar el avance real** a los stakeholders o clientes del proyecto, obteniendo su feedback directo sobre lo construido.

#### Sprint Retrospective (Retrospectiva)

Se realiza también al final del sprint, normalmente justo después de la review. Aquí el equipo evalúa el **proceso**, no el producto: qué ha funcionado y qué no en cuanto a procesos, herramientas y comunicación dentro del equipo. Cada persona da su opinión, y las conclusiones alimentan directamente el pilar de la adaptación: los ajustes se aplican en el siguiente sprint.

### Artefactos

#### Product Backlog

Es la lista completa de todo lo que el producto podría necesitar: funcionalidades, mejoras, correcciones. No es una lista cerrada desde el principio, sino que **se va construyendo y refinando a medida que el proyecto evoluciona**. El responsable de mantenerlo ordenado y priorizado es el **Product Owner**.

#### Historias de usuario (User Stories)

Son la unidad básica de trabajo del Product Backlog: una necesidad descrita desde el punto de vista del usuario, no como especificación técnica. Se construyen en dos partes:

**Descripción** (qué se quiere y por qué):

```
Yo, como usuario,
quiero poder publicar una foto,
para que mis amigos la vean.
```

**Criterio de aceptación** (cómo se sabe que está bien hecho), normalmente en formato Given-When-Then:

```
Dado que me encuentro en mi perfil,
cuando le doy clic en "Compartir foto",
entonces me da la opción de agregar una descripción
de la foto de hasta 200 caracteres.
```

Una historia de usuario bien construida se puede evaluar con el acrónimo **INVEST**:

- **I – Independiente**: no depende de otras historias para poder desarrollarse.
- **N – Negociable**: es una conversación abierta, no un contrato cerrado e inamovible.
- **V – Valiosa**: aporta valor real y visible al usuario o al negocio.
- **E – Estimable**: el equipo puede calcular, al menos aproximadamente, el esfuerzo que requiere.
- **S – Small (pequeña)**: es lo bastante pequeña como para completarse dentro de un sprint.
- **T – Testeable**: existe una forma clara de comprobar que se ha cumplido (el criterio de aceptación).

Y en el día a día se sostiene sobre tres elementos, a veces llamados las "3 C":

- **Tarjeta**: la narración corta e inicial ("yo como usuario quiero... para..."). Es un punto de partida, no la especificación completa.
- **Conversación**: el detalle real de la historia surge hablando ("no entiendo esto...", "¿y si...?"). La tarjeta por sí sola nunca es suficiente.
- **Confirmación**: los criterios de aceptación, que se priorizan y detallan para que el equipo sepa exactamente cuándo la historia está terminada. Cada historia debe ser única dentro del equipo y estar enfocada siempre a la entrega de valor.

#### Sprint Backlog

Es el subconjunto del Product Backlog que el equipo selecciona para un sprint concreto. Contiene tres cosas: el **objetivo** que se persigue al terminar el sprint, el **compromiso** que el equipo asume, y el **plan de acción** (cómo se va a llevar a cabo, ya desglosado en tareas).

#### Increment (Incremento)

Es la suma de todo lo que se ha completado durante el sprint, sumado a lo de sprints anteriores: lo que realmente se le va mostrando al cliente. La idea clave es que el incremento **tiene que ir creciendo, sprint a sprint**: cada entrega debe sumar sobre la anterior, no sustituirla ni quedarse igual.

#### Definition of Done (DoD)

Es el criterio objetivo que determina cuándo algo está realmente terminado. Es importante no confundirlo con "está en pruebas": estar en pruebas no es estar hecho. La Definition of Done es, en la práctica, la **definición de entregado al cliente**: el punto exacto en el que se puede decir que se ha hecho la entrega de valor.

### Roles (Scrum Team)

#### Developers (equipo de desarrollo)

Es el equipo que convierte el Product Backlog en incremento real. Dos características lo definen:

- **Autoorganizado**: deciden internamente cómo repartirse y abordar el trabajo, sin que nadie desde fuera les diga cómo hacerlo tarea por tarea.
- **Multidisciplinar**: entre todos, tienen las habilidades necesarias para completar el trabajo sin depender de personas externas al equipo.

#### Scrum Master

Su función no es gestionar el producto ni dar órdenes, sino conseguir que **el equipo sea ágil** de verdad: que Scrum se aplique correctamente y que el equipo esté bien organizado. Trabaja a tres niveles: con el **equipo** (facilitando el proceso, retirando impedimentos), con el **Product Owner** (ayudando a que el backlog esté bien gestionado) y velando en general por que todo el conjunto funcione de forma ordenada. Es un rol de **liderazgo de servicio**, no de autoridad jerárquica.

#### Product Owner

Es quien decide **qué se construye y en qué orden**. Se encarga de:

- Priorizar el Product Backlog.
- Decidir con quién hay que hablar para conseguir la información necesaria.
- Preparar y detallar las historias antes de que lleguen al equipo.
- Estar al tanto de qué está funcionando y qué no, desde el punto de vista de negocio.

Es la persona que habla directamente con los **clientes o stakeholders**, y traslada esas necesidades al equipo en forma de Product Backlog priorizado.

## Métricas en equipos grandes

Cuando el equipo o el proyecto crecen, ya no basta con la intuición para saber si el ritmo de entrega es sano. Es habitual apoyarse en **métricas y gráficas de evolución** (como el burndown o el burnup chart, o la velocidad media en puntos por sprint) para revisar objetivamente cómo evoluciona la entrega sprint a sprint, detectar desviaciones pronto y tomar decisiones basadas en datos en lugar de en percepciones.

## Resumen

Scrum se puede resumir en una frase: un equipo autoorganizado trabaja en ciclos cortos y fijos (sprints), planificando, revisando y adaptando su forma de trabajar constantemente, apoyado en tres pilares (transparencia, inspección, adaptación) y cinco valores (coraje, foco, compromiso, respeto, franqueza). Todo lo demás —eventos, artefactos y roles— existe para sostener esa idea central: entregar valor real de forma incremental, aprendiendo en cada ciclo.
