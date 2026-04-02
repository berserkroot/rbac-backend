## 🖥️ Backend README

# RBAC System – Backend

Backend de un sistema de control de acceso basado en roles (RBAC) construido con **Node.js**, **Express**, **Sequelize** y **MySQL**. Incluye autenticación JWT, 2FA con TOTP, recuperación de contraseña mediante archivo cifrado, sistema de notificaciones en tiempo real (polling), gestión de usuarios, roles, permisos y configuración dinámica de la aplicación.

---

## 🚀 Tecnologías

- Node.js + Express
- Sequelize (ORM)
- MySQL  
- JWT (JSON Web Tokens)
- Bcrypt
- Multer (subida de archivos)
- Express-rate-limit (protección)
- Speakeasy + QRCode (2FA)
- Nodemailer (opcional, no usado)
- node-cron (programación de backups – opcional)

---

# 🔧 Scripts útiles - Ejecuta Seed

- Crear BD "sistema_rbac"  
- cd backend
- node utils/seed/seed_all.js

---

## Usuario por defecto:

- Email: worksbinary27@gmail.com
- Contraseña: Worksbinary27
- Rol: root

## ▶️ Ejecutar el servidor

- npm run dev   # modo desarrollo (nodemon)
- npm start     # modo producción

## 📄 Licencia
Este proyecto es de uso interno. Todos los derechos reservados.

## ✍️ Autor
Desarrollado por Besekeroot - https://binaryworks.send-pulse.com/ 


## 📦 Instalación

```bash
# Clonar el repositorio
git clone <url>
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno

cp .env.example .env
# Editar .env con tus credenciales
