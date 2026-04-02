const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');

const seedUsers = async () => {
  try {
    // Buscar rol root
    const rootRole = await Role.findOne({ where: { name: 'root' } });
    if (!rootRole) {
      console.error('❌ Rol root no encontrado. Ejecuta primero seed_roles.js');
      process.exit(1);
    }

    // Datos del usuario
    const userData = {
      username: 'Rafael',
      email: 'worksbinary27@gmail.com',
      password: 'Worksbinary27', // será hasheado automáticamente por el hook
      isActive: true,
      nombres: 'Rafael Jesús',
      apellidos: 'Quetglas Pérez',
      document_type: 'CI',
      document_number: '96082803066',
      calle: '230',
      numero: '8907',
      entre: '89 y 91',
      avenida: '91',
      localidad: 'Bello 26',
      municipio: 'La Lisa',
      provincia: 'La Habana',
      id_pais: 49 // Cuba
    };

    // Buscar o crear
    const [user, created] = await User.findOrCreate({
      where: { email: userData.email },
      defaults: userData
    });

    if (created) {
      // Asignar rol root
      await user.addRole(rootRole);
      console.log(`✅ Usuario ${user.username} (root) creado correctamente.`);
    } else {
      // Si ya existe, actualizar datos (excepto contraseña si no se quiere cambiar)
      await user.update({
        username: userData.username,
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        document_type: userData.document_type,
        document_number: userData.document_number,
        calle: userData.calle,
        numero: userData.numero,
        entre: userData.entre,
        avenida: userData.avenida,
        localidad: userData.localidad,
        municipio: userData.municipio,
        provincia: userData.provincia,
        id_pais: userData.id_pais
      });
      // Asegurar que tenga el rol root
      const hasRoot = await user.hasRole(rootRole);
      if (!hasRoot) await user.addRole(rootRole);
      console.log(`ℹ️ Usuario ${user.username} ya existe, se actualizaron sus datos.`);
    }
  } catch (error) {
    console.error('❌ Error insertando usuario:', error);
  } finally {
    process.exit();
  }
};

seedUsers();