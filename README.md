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

---

## 📡 API Endpoints
Método	Endpoint	Descripción	Permiso requerido
POST	/api/auth/register	Registrar nuevo usuario (público)	–
POST	/api/auth/login	Iniciar sesión (devuelve token o requiere 2FA)	–
GET	/api/auth/me	Obtener perfil del usuario autenticado	auth
POST	/api/auth/enable-2fa	Generar secreto y QR para 2FA	auth
POST	/api/auth/verify-2fa	Activar 2FA	auth
POST	/api/auth/disable-2fa	Desactivar 2FA	auth
POST	/api/auth/verify-2fa-login	Segundo paso de login con 2FA	–
POST	/api/auth/generate-recovery-key	Generar archivo de recuperación	auth
POST	/api/auth/reset-with-recovery-file	Restablecer contraseña con archivo	–
GET	/api/users	Listar usuarios (con filtros)	users:read
GET	/api/users/:id	Obtener usuario por ID	users:read o owner
POST	/api/users	Crear usuario	users:create
PUT	/api/users/:id	Actualizar usuario	users:update o owner
DELETE	/api/users/:id	Eliminar usuario	users:delete
GET	/api/roles	Listar roles	roles:read
POST	/api/roles	Crear rol	roles:create
PUT	/api/roles/:id	Actualizar rol	roles:update
DELETE	/api/roles/:id	Eliminar rol	roles:delete
GET	/api/permissions	Listar permisos	permissions:read
POST	/api/permissions	Crear permiso	permissions:create
PUT	/api/permissions/:id	Actualizar permiso	permissions:update
DELETE	/api/permissions/:id	Eliminar permiso	permissions:delete
GET	/api/notifications	Listar notificaciones (paginado)	auth
GET	/api/notifications/recent	Últimas 10 notificaciones	auth
GET	/api/notifications/unread-count	Contador de no leídas	auth
PATCH	/api/notifications/:id/read	Marcar como leída	auth
POST	/api/upload/profile-photo	Subir foto de perfil	auth
DELETE	/api/upload/profile-photo	Eliminar foto	auth
GET	/api/settings	Obtener configuración de la app	público
PUT	/api/settings	Actualizar configuración	settings:update
GET	/api/paises	Listar países	auth
GET	/api/backup/config	Obtener configuración de backups	auth (root)
PUT	/api/backup/config	Guardar configuración	auth (root)
POST	/api/backup/run	Ejecutar backup manual	auth (root)
GET	/api/backup/list	Listar backups generados	auth (root)

---

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
