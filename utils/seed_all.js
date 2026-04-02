const { execSync } = require('child_process');
const path = require('path');

const scripts = [
  'seed_estructura.js',
  'seed_paises.js',
  'seed_permisos.js',
  'seed_roles.js',
  'seed_rolepermissions.js',
  'seed_app_settings.js',
  'seed_users.js'
];

const run = () => {
  for (const script of scripts) {
    console.log(`\n🚀 Ejecutando ${script}...`);
    try {
      execSync(`node ${path.join(__dirname, script)}`, { stdio: 'inherit' });
    } catch (error) {
      console.error(`❌ Error ejecutando ${script}`);
      process.exit(1);
    }
  }
  console.log('\n🎉 Todos los seeds ejecutados correctamente.');
};

run();