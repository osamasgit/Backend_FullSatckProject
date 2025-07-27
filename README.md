# Backend - ALMACEN ESCA FULLSTACK

Este es el backend de una aplicación fullstack desarrollada para organizar eventos — como bodas, comuniones o cumpleaños — calculando automáticamente la cantidad de material necesario en función de parámetros como número de invitados, tipo de evento y servicios requeridos.

## 📌 Propósito

El objetivo principal es facilitar la planificación logística de eventos, permitiendo a los usuarios estimar materiales como sillas, mesas, cubertería, bebidas, iluminación y más, de forma automatizada y precisa. La API expone endpoints que permiten gestionar usuarios, eventos y cálculos personalizados.
El funcionamiento es que la persona responsable accede mediante credenciales a la parte de administración y crea su propia base de datos de materiales y productos, con la finalidad de que los empleados con saber los invitados y las partes que constituyen el evento puedan generar la lista de materiales que requieren para el evento de forma automatizada.

## 🛠️ Tecnologías

- **Node.js**
- **Express.js**
- **MongoDB** + **Mongoose**
- **Express-session** para autenticación
- **dotenv** para configuración de entorno
- **Middleware personalizado** para validaciones y protección de rutas

## ⚙️ Instalación

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/osamasgit/Backend_FullSatckProject.git
   cd Backend_FullSatckProject
   ```
2. **Instala las dependencias:**
   ```bash
   npm install -E
   ```
3. **Crea un archivo .env en la raíz con las siguientes variables:**
  ```dotenv
  PORT=8080
  MONGO_URI=tu_uri_de_mongodb
  SESSION_SECRET=tu_clave_secreta
  ADMIN_USER=usuario
  ADMIN_PASSWORD=contraseña
  ```
4. **Iniciar servidor:**
  ```bash
  npm start
  ```
El servidor arrancará en el puerto especificado en tu .env

## 🚀 Uso

Este backend expone endpoints organizados en rutas que permiten:

🔐 Autenticación (registro e inicio de sesión con express-session)
📋 Gestión de eventos (crear, consultar, actualizar, eliminar eventos)
📦 Cálculo de materiales basado en reglas y condiciones (invitados, categoría del evento, etc.)

## 🧱 Arquitectura del proyecto
```text
├── config/            # Configuración de base de datos y entorno
├── controllers/       # Lógica de negocio por entidad
├── middlewares/       # Validaciones, autenticación, manejo de errores
├── models/            # Modelos de datos (Eventos, Usuarios, etc.)
├── routes/            # Rutas agrupadas por funcionalidad
├── index.js           # Punto de entrada del servidor
├── package.json       # Gestión de dependencias y scripts
```
Este diseño modular permite mantener el código organizado y escalable.

## 👨‍💻 Autor
Proyecto desarrollado por Oussama GitHub: @osamasgit
