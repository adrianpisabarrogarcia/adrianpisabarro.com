---
title: "Arquitectura Hexagonal en Spring Boot: estructura de paquetes y separación real"
date: 2026-09-15
category: "Arquitectura"
slug: "arquitectura-hexagonal-spring-boot"
description: "Aprende a estructurar un proyecto Spring Boot usando Arquitectura Hexagonal (Puertos y Adaptadores). Descubre cómo organizar los paquetes, aislar el dominio y evitar acoplarte al framework."
image:
  src: "/assets/images/blog/arquitectura-hexagonal-spring-boot.webp"
  alt: "Esquema de Arquitectura Hexagonal en Spring Boot con Puertos y Adaptadores"
duration: "10 min"
author: "Adrián Pisabarro García"
---

Muchos desarrolladores creen que utilizar Spring Boot implica meter anotaciones `@Entity`, `@RestController`, y `@Service` en todas partes sin ton ni son. Y luego se preguntan por qué actualizar la versión de Spring, cambiar de base de datos o probar la lógica de negocio sin levantar el contexto de Spring se convierte en un auténtico infierno.

La **Arquitectura Hexagonal** (o patrón de *Puertos y Adaptadores*, acuñado por Alistair Cockburn) no es una moda ni un capricho teórico. Es una necesidad cuando quieres que tu **DOMINIO** sea el verdadero centro de tu aplicación y no un rehén de tu infraestructura.

En este artículo vamos a ver paso a paso cómo organizar la estructura de paquetes en Java/Spring Boot, qué va en cada sitio y POR QUÉ debes separar las capas de forma estricta.

---

## 1. El gran error de la arquitectura en capas tradicional (Layered Architecture)

La arquitectura en 3 capas clásica (`Controller -> Service -> Repository`) suele degenerar rápidamente en esto:

- Las entidades JPA de la base de datos se usan como objetos de dominio.
- El servicio de Spring contiene lógica de negocio mezclada con transacciones (`@Transactional`), llamadas HTTP externas y anotaciones del framework.
- El dominio depende de la base de datos y de la infraestructura.

Si la base de datos cambia o Spring actualiza una anotación breaking, tu lógica de negocio sufre. En Arquitectura Hexagonal invertimos la dependencia: **la infraestructura depende del dominio, NUNCA al revés**.

---

## 2. Los tres pilares: Dominio, Aplicación e Infraestructura

En Arquitectura Hexagonal dividimos el código en tres grandes zonas:

1. **Domain (Núcleo Hexagonal):** Contiene la lógica pura de negocio, entidades de dominio y objetos de valor (Value Objects). **REGLA DE ORO:** Cero dependencias de Spring o de librerías externas. Java puro.
2. **Application (Casos de Uso):** Coordina las acciones que el sistema puede realizar. Define los **Puertos de Entrada** (Inbound Ports / Use Cases) y utiliza los **Puertos de Salida** (Outbound Ports) que la infraestructura deberá implementar.
3. **Infrastructure (Adaptadores):** Todo lo técnico que conecta el mundo exterior con nuestra aplicación: controladores REST, persistencia JPA/Hibernate, clientes HTTP, mensajería (Kafka/RabbitMQ) y la configuración de Spring Boot.

---

## 3. Clasificación y estructura de ficheros en Spring Boot

Para que la arquitectura se entienda a simple vista (*Screaming Architecture*), organizamos el proyecto **por módulo funcional** (Domain-Driven Design), y dentro de cada módulo aplicamos la separación hexagonal.

Supongamos que estamos construyendo un módulo de gestión de pedidos (`order`):

```text
com.adrianpisabarro.app.order
├── domain
│   ├── model
│   │   ├── Order.java               <-- Entidad de Dominio (Java puro)
│   │   ├── OrderId.java             <-- Value Object
│   │   └── OrderStatus.java         <-- Enum de negocio
│   ├── exception
│   │   └── OrderNotFoundException.java
│   └── port
│       └── output
│           └── OrderRepositoryPort.java <-- Puerto de Salida (Interfaz)
│
├── application
│   ├── port
│   │   └── input
│   │       ├── CreateOrderUseCase.java  <-- Puerto de Entrada (Interfaz)
│   │       └── GetOrderUseCase.java
│   └── service
│       └── CreateOrderService.java      <-- Implementación del caso de uso
│
└── infrastructure
    ├── adapter
    │   ├── input
    │   │   └── rest
    │   │       ├── OrderController.java <-- Controller REST (Adaptador de entrada)
    │   │       ├── dto
    │   │       │   ├── CreateOrderRequest.java
    │   │       │   └── OrderResponse.java
    │   │       └── mapper
    │   │           └── OrderRestMapper.java
    │   └── output
    │       └── persistence
    │           ├── jpa
    │           │   ├── OrderJpaEntity.java  <-- Entidad JPA / BD
    │           │   └── SpringDataOrderRepository.java
    │           ├── OrderPersistenceAdapter.java <-- Implementa OrderRepositoryPort
    │           └── mapper
    │               └── OrderPersistenceMapper.java
    └── config
        └── OrderBeanConfiguration.java   <-- Inyección de dependencias de Spring
```

---

## 4. Detalle capa por capa: ¿Qué va en cada fichero?

### A. Capa de Dominio (`domain`)
Aquí vive la lógica de tu negocio. No uses `@Entity`, ni `@Column`, ni `@Autowired`.

- **`Order.java`**: Modelo rico con comportamiento. Los métodos cambian el estado validando reglas de negocio.
- **`OrderRepositoryPort.java`**: Es una **interfaz** Java pura que declara lo que el dominio necesita guardar o consultar (ej. `Optional<Order> findById(OrderId id)`). El dominio no sabe si se guardará en PostgreSQL, MongoDB o en memoria.

### B. Capa de Aplicación (`application`)
Coordina la ejecución. No decide *cómo* se guardan los datos ni *cómo* se reciben HTTP requests, solo dirige el flujo de trabajo.

- **`CreateOrderUseCase.java`**: Interfaz que define el contrato del caso de uso.
- **`CreateOrderService.java`**: Implementa la interfaz. Recibe los Puertos de Salida (repositorios, notificadores) a través de su constructor. 

> **¡OJO A QUÉ HACES CON SPRING!** Para mantener el servicio limpio de Spring, puedes instanciarlo manualmente mediante una clase de configuración en la capa de infraestructura, o usar anotaciones personalizadas si quieres evitar `@Service` directamente en el código de aplicación.

### C. Capa de Infraestructura (`infrastructure`)
Aquí es donde Spring Boot se siente en su salsa.

- **`OrderController.java`**: Adaptador de entrada REST. Recibe un JSON, lo mapea a un DTO/comando, llama al `CreateOrderUseCase` y transforma el resultado en una respuesta HTTP (`ResponseEntity`).
- **`OrderJpaEntity.java`**: La tabla de la base de datos. NUNCA la expongas al dominio. Usa un `OrderPersistenceMapper` para convertir de `OrderJpaEntity` a `Order` (dominio) y viceversa.
- **`OrderPersistenceAdapter.java`**: La clase que implementa `OrderRepositoryPort`. Utiliza `SpringDataOrderRepository` internamente para consultar la BD.

---

## 5. Mapeos entre capas: ¿Es necesario tener tantas clases?

La respuesta corta es: **SÍ, ABSOLUTAMENTE**.

Muchos desarrolladores caen en la tentación de reusar la misma clase `Order` para el JSON de la API, el modelo de negocio y la tabla JPA. **¡GRAVE ERROR!**

1. **DTO de API (`CreateOrderRequest`)**: Valida restricciones HTTP (`@NotNull`, `@Size`).
2. **Entidad de Dominio (`Order`)**: Garantiza invariantes de negocio.
3. **Entidad JPA (`OrderJpaEntity`)**: Define claves primarias, índices y mapeos SQL (`@Table`, `@Column`).

Separar estos modelos evita que un cambio en la API rompa la base de datos o que una migración SQL invalide la lógica de negocio.

---

## 6. Conclusión y Trade-offs

La Arquitectura Hexagonal no es gratis. Requiere más código boilerplate (mapeadores, DTOs, interfaces) y mayor disciplina de equipo. Pero los beneficios son indiscutibles:

- **Tests ultra rápidos:** Puedes probar el 90% de tu lógica de negocio con JUnit 6 puro en milisegundos sin arrancar el contexto de Spring (`@SpringBootTest`).
- **Desacoplamiento total:** Si mañana cambias de JPA a DynamoDB, solo cambias la capa de infraestructura. El dominio permanece intacto.
- **Mantenibilidad:** El código refleja las reglas del negocio, no las idiosincrasias de un framework.

---

## 7. Ejemplo práctico: CRUD de documentos en Amazon S3 con Arquitectura Hexagonal

Para ver la potencia de la Arquitectura Hexagonal en un escenario real, vamos a implementar un almacenamiento de documentos usando **Amazon S3**.

### ¿Qué es Amazon S3?
**Amazon S3 (Simple Storage Service)** es un servicio de almacenamiento de objetos en la nube proporcionado por AWS. En lugar de guardar archivos en un disco duro local o en un sistema de archivos jerárquico tradicional, S3 almacena los datos como **objetos** dentro de contenedores llamados **buckets** (cubos). Cada objeto contiene el archivo (PDF, imagen, CSV), sus metadatos y una clave única (*key*). Destaca por su durabilidad (99.999999999%), escalabilidad ilimitada y alta disponibilidad.

---

### Paso 1: Capa de Dominio (Domain)

En el dominio definimos nuestra entidad `Document` y el **Puerto de Salida** `DocumentStoragePort`. **¡RECUERDA!** Aquí no existe AWS SDK, ni `@Service`, ni ningún conocimiento de S3.

```java
// domain/model/Document.java
public class Document {
    private final String id;
    private final String name;
    private final String contentType;
    private final byte[] content;

    public Document(String id, String name, String contentType, byte[] content) {
        if (content == null || content.length == 0) {
            throw new IllegalArgumentException("El contenido del documento no puede estar vacío");
        }
        this.id = id;
        this.name = name;
        this.contentType = contentType;
        this.content = content;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getContentType() { return contentType; }
    public byte[] getContent() { return content; }
}
```

```java
// domain/port/output/DocumentStoragePort.java
public interface DocumentStoragePort {
    void save(Document document);
    Optional<Document> findById(String id);
    void deleteById(String id);
    boolean existsById(String id);
}
```

---

### Paso 2: Capa de Aplicación (Application)

Definimos los casos de uso (puertos de entrada) y el servicio que coordina la lógica.

```java
// application/port/input/DocumentUseCase.java
public interface DocumentUseCase {
    void uploadDocument(Document document);
    Document getDocument(String id);
    void removeDocument(String id);
}
```

```java
// application/service/DocumentService.java
public class DocumentService implements DocumentUseCase {

    private final DocumentStoragePort storagePort;

    public DocumentService(DocumentStoragePort storagePort) {
        this.storagePort = storagePort;
    }

    @Override
    public void uploadDocument(Document document) {
        // Validación de negocio o reglas adicionales aquí
        storagePort.save(document);
    }

    @Override
    public Document getDocument(String id) {
        return storagePort.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado: " + id));
    }

    @Override
    public void removeDocument(String id) {
        if (!storagePort.existsById(id)) {
            throw new RuntimeException("El documento no existe para ser eliminado: " + id);
        }
        storagePort.deleteById(id);
    }
}
```

---

### Paso 3: Capa de Infraestructura (Infrastructure - Adaptador S3)

Aquí vive la implementación concreta con el SDK oficial de AWS (`software.amazon.awssdk.services.s3.S3Client`).

```java
// infrastructure/adapter/output/s3/S3DocumentStorageAdapter.java
@Component
public class S3DocumentStorageAdapter implements DocumentStoragePort {

    private final S3Client s3Client;
    private final String bucketName;

    public S3DocumentStorageAdapter(S3Client s3Client, 
                                   @Value("${aws.s3.bucket}") String bucketName) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
    }

    @Override
    public void save(Document document) {
        PutObjectRequest putRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(document.getId())
                .contentType(document.getContentType())
                .build();

        s3Client.putObject(putRequest, RequestBody.fromBytes(document.getContent()));
    }

    @Override
    public Optional<Document> findById(String id) {
        try {
            GetObjectRequest getRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(id)
                    .build();

            ResponseBytes<GetObjectResponse> objectBytes = s3Client.getObjectAsBytes(getRequest);
            String contentType = objectBytes.response().contentType();

            return Optional.of(new Document(id, id, contentType, objectBytes.asByteArray()));
        } catch (NoSuchKeyException e) {
            return Optional.empty();
        }
    }

    @Override
    public void deleteById(String id) {
        DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(id)
                .build();

        s3Client.deleteObject(deleteRequest);
    }

    @Override
    public boolean existsById(String id) {
        try {
            s3Client.headObject(HeadObjectRequest.builder()
                    .bucket(bucketName)
                    .key(id)
                    .build());
            return true;
        } catch (NoSuchKeyException e) {
            return false;
        }
    }
}
```

---

### ¿Por qué esta arquitectura es brillante para S3?

Si en los tests locales o en un entorno de desarrollo local no quieres depender de credenciales de AWS ni gastar en la nube:
1. Creas un `LocalStorageAdapter` que guarde en un directorio del disco o en memoria (`HashMap`).
2. O levantas **LocalStack** o **MinIO** en Docker.
3. **El código de tu dominio y de tu servicio de aplicación no cambia ni una sola línea.**

