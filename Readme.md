## 🖥️ Backend README

# RBAC System – Backend

Backend robusto de un sistema de control de acceso basado en roles (RBAC) construido con **Node.js**, **Express**, **Sequelize** y **MySQL**.

Este sistema proporciona una solución segura y escalable para gestionar identidad y accesos, incluyendo autenticación JWT, doble factor de autenticación (2FA), gestión de roles/permisos y comunicación en tiempo real.

### ✨ Características Principales

*   🔐 **Autenticación y Autorización**: Login seguro con **JWT**, cifrado de contraseñas con **Bcrypt** y control de acceso basado en roles (RBAC).
*   🛡️ **Seguridad Adicional**: Implementación de **2FA (TOTP)** mediante `Speakeasy` y generación de códigos QR.
*   ⚡ **Tiempo Real**: Sistema de notificaciones instantáneas utilizando **WebSockets (Socket.io)**.
*   📚 **Documentación Integrada**: API documentada automáticamente con **Swagger UI**.
*   📂 **Gestión de Archivos**: Subida de archivos segura con **Multer**.
*   🔄 **Recuperación de Contraseña**: Sistema de recuperación mediante archivo cifrado.
*   🛡️ **Protección**: Limitación de tasa de solicitudes (*Rate Limiting*) para prevenir ataques de fuerza bruta.

---

## 🚀 Tecnologías

- **Node.js** + **Express** (Entorno y framework)
- **Sequelize** (ORM para MySQL)
- **MySQL** (Base de datos relacional)
- **JWT** (JSON Web Tokens para autenticación)
- **Socket.io** (Comunicación bidireccional en tiempo real)
- **Swagger UI Express** (Documentación de API)
- **Bcrypt** (Encriptación de contraseñas)
- **Multer** (Manejo de `multipart/form-data`)
- **Speakeasy** + **QRCode** (2FA)
- **Express-rate-limit** (Seguridad)
- **node-cron** (Programación de tareas - opcional)
- **Nodemailer** (Servicio de email - opcional)

---

## 📦 Instalación y Configuración

Sigue estos pasos para poner en marcha el servidor en tu máquina local:

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# IMPORTANTE: Edita el archivo .env con tus credenciales de base de datos y claves secretas.
```

## 🔧 Scripts Útiles y Base de Datos

El proyecto incluye un script para inicializar la base de datos y crear datos de prueba (seeders).

```bash
# Crear base de datos "sistema_rbac" y poblarla con datos iniciales
node utils/seed/seed_all.js
```

## ▶️ Ejecutar el servidor

```bash
npm run dev   # Modo desarrollo (con nodemon)
npm start     # Modo producción
```

Una vez iniciado, el servidor estará disponible en `http://localhost:<puerto_configurado>`.

---

## 📚 Documentación de la API

Accede a la documentación interactiva de todos los endpoints probando y visualizando los modelos de datos directamente desde tu navegador:

👉 **[http://localhost:<puerto>/api-docs](http://localhost:<puerto>/api-docs)**

*(Reemplaza `<puerto>` con el configurado en tu `.env`, usualmente 3000 o 5000).*

---

## 👤 Usuario por Defecto (Root)

Tras ejecutar el script de semilla (`seed`), puedes utilizar estas credenciales para acceder con privilegios máximos:

- **Email:** `worksbinary27@gmail.com`
- **Contraseña:** `Worksbinary27`
- **Rol:** `root`
- **2FA:** Deshabilitado por defecto en el seed (puedes activarlo en el perfil).

---

## ✍️ Autor

Desarrollado por **Besekeroot**

🌐 [https://binaryworks.send-pulse.com/](https://binaryworks.send-pulse.com/)

