const { Role, Permission } = require('../models');

// Mapeo de permisos por rol según el dump
const rolePermissionsMap = {
  1: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22], // root tiene todos
  2: [1,2,3,4,5,6,7,8,13,14,20], // administrador
  3: [1,2,3,13,17,6], // gestor: users:create,read,update,manage, dashboard:read, roles:read
  4: [17] // usuario: solo dashboard:read
};

const seedRolePermissions = async () => {
  try {
    for (const [roleId, permIds] of Object.entries(rolePermissionsMap)) {
      const role = await Role.findByPk(roleId);
      if (!role) {
        console.log(`⚠️ Rol con ID ${roleId} no encontrado, saltando...`);
        continue;
      }
      const perms = await Permission.findAll({ where: { id: permIds } });
      await role.setPermissions(perms);
      console.log(`✅ Permisos asignados a rol ${role.name}`);
    }
    console.log('✅ Asignación de permisos completada');
  } catch (error) {
    console.error('❌ Error asignando permisos:', error);
  } finally {
    process.exit();
  }
};

seedRolePermissions();