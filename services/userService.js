const { User, Role, Pais } = require('../models');

exports.findByEmail = async (email) => {
  return await User.findOne({ 
    where: { email },
    include: [Role]
  });
};

exports.createUserWithRoles = async (userData, roleNames) => {
  // userData puede incluir los nuevos campos
  const user = await User.create(userData);
  
  if (roleNames && roleNames.length > 0) {
    const roles = await Role.findAll({ where: { name: roleNames } });
    await user.addRoles(roles);
  } else {
    const defaultRole = await Role.findOne({ where: { name: 'usuario' } });
    if (defaultRole) await user.addRole(defaultRole);
  }
  
  return await User.findByPk(user.id, {
    include: [
      { model: Role, attributes: ['name', 'level'] },
      { model: Pais, as: 'pais' }
    ],
    attributes: { exclude: ['password'] }
  });
};