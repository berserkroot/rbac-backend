const { Permission } = require('../models');

const permisos = [
  { id: 1, name: 'users:create', resource: 'users', action: 'create', description: 'Crear usuarios' },
  { id: 2, name: 'users:read', resource: 'users', action: 'read', description: 'Ver usuarios' },
  { id: 3, name: 'users:update', resource: 'users', action: 'update', description: 'Actualizar usuarios' },
  { id: 4, name: 'users:delete', resource: 'users', action: 'delete', description: 'Eliminar usuarios' },
  { id: 5, name: 'roles:create', resource: 'roles', action: 'create', description: 'Crear roles' },
  { id: 6, name: 'roles:read', resource: 'roles', action: 'read', description: 'Ver roles' },
  { id: 7, name: 'roles:update', resource: 'roles', action: 'update', description: 'Actualizar roles' },
  { id: 8, name: 'roles:delete', resource: 'roles', action: 'delete', description: 'Eliminar roles' },
  { id: 9, name: 'permissions:create', resource: 'permissions', action: 'create', description: 'Crear permisos' },
  { id: 10, name: 'permissions:read', resource: 'permissions', action: 'read', description: 'Ver permisos' },
  { id: 11, name: 'permissions:update', resource: 'permissions', action: 'update', description: 'Actualizar permisos' },
  { id: 12, name: 'permissions:delete', resource: 'permissions', action: 'delete', description: 'Eliminar permisos' },
  { id: 13, name: 'users:manage', resource: 'users', action: 'manage', description: 'Gestión completa de usuarios' },
  { id: 14, name: 'roles:manage', resource: 'roles', action: 'manage', description: 'Gestión completa de roles' },
  { id: 15, name: 'permissions:manage', resource: 'permissions', action: 'manage', description: 'Gestión completa de permisos' },
  { id: 16, name: 'dashboard:create', resource: 'dashboard', action: 'create', description: 'Crear dashboards' },
  { id: 17, name: 'dashboard:read', resource: 'dashboard', action: 'read', description: 'Ver dashboards' },
  { id: 18, name: 'dashboard:update', resource: 'dashboard', action: 'update', description: 'Actualizar dashboards' },
  { id: 19, name: 'dashboard:delete', resource: 'dashboard', action: 'delete', description: 'Eliminar dashboards' },
  { id: 20, name: 'dashboard:manage', resource: 'dashboard', action: 'manage', description: 'Gestión completa de dashboards' },
  { id: 21, name: 'settings:read', resource: 'settings', action: 'read', description: 'Leer configuración de la aplicación' },
  { id: 22, name: 'settings:update', resource: 'settings', action: 'update', description: 'Actualizar configuración de la aplicación' }
];

const seedPermisos = async () => {
  try {
    for (const perm of permisos) {
      await Permission.findOrCreate({ where: { id: perm.id }, defaults: perm });
    }
    console.log('✅ Permisos insertados');
  } catch (error) {
    console.error('❌ Error insertando permisos:', error);
  } finally {
    process.exit();
  }
};

seedPermisos();