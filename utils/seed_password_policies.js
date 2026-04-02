const PasswordPolicy = require('../models/PasswordPolicy');

const seedPasswordPolicy = async () => {
  try {
    const policyData = {
      id: 1,
      min_length: 8,
      require_uppercase: true,
      require_lowercase: true,
      require_number: true,
      require_symbol: true,
      expiration_days: 90,
      password_history_count: 20
    };

    const [policy, created] = await PasswordPolicy.findOrCreate({
      where: { id: policyData.id },
      defaults: policyData
    });

    if (created) {
      console.log('✅ Política de contraseñas insertada');
    } else {
      await policy.update(policyData);
      console.log('ℹ️ Política de contraseñas actualizada');
    }
  } catch (error) {
    console.error('❌ Error insertando política de contraseñas:', error);
  } finally {
    process.exit();
  }
};

seedPasswordPolicy();