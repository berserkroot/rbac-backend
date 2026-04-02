const { AppSetting } = require('../models');

const settings = [
  { key: 'app_name', value: 'Sistema RBAC' },
  { key: 'logo_url', value: '/logo.png' },
  { key: 'favicon_url', value: '/favicon.ico' },
  { key: 'footer_text', value: '© 2026 Sistema RBAC. Todos los derechos reservados.' }
];

const seedSettings = async () => {
  try {
    for (const setting of settings) {
      await AppSetting.upsert({ key: setting.key, value: setting.value });
    }
    console.log('✅ Configuración de la aplicación insertada');
  } catch (error) {
    console.error('❌ Error insertando configuración:', error);
  } finally {
    process.exit();
  }
};

seedSettings();