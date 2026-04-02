const { Role } = require('../models');

const roles = [
  { id: 1, name: 'root', description: 'Super administrador', level: 4 },
  { id: 2, name: 'administrador', description: 'Administrador del sistema', level: 3 },
  { id: 3, name: 'gestor', description: 'Gestor de usuarios', level: 2 },
  { id: 4, name: 'usuario', description: 'Usuario estándar', level: 1 }
];

const seedRoles = async () => {
  try {
    for (const rol of roles) {
      await Role.findOrCreate({ where: { id: rol.id }, defaults: rol });
    }
    console.log('✅ Roles insertados');
  } catch (error) {
    console.error('❌ Error insertando roles:', error);
  } finally {
    process.exit();
  }
};

seedRoles();