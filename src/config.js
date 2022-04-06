const dotenv = require('dotenv');
const path = require('path');
/**
 * Importare qui le variabili ambiente
 */

/**
 * Definire qui oggetto config da usare in app
 */
function getConfig(dev = false) {
  //Carico file in base al input
  const ROOT_PATH = path.join(__dirname, '../');
  const envFile = dev ? ROOT_PATH + '.env.dev' : ROOT_PATH + '.env';

  const result = dotenv.config({ path: envFile });
  if (result.error) {
    return {
      err: result.error,
    };
  }

  const ENV = result.parsed;
  return {
    port: parseInt(ENV.PORT, 10) || 3000,
    database: {
      host: 'localhost',
      nome: ENV.DB_NAME,
      path: ENV.DB_PATH,
      fake: parseInt(ENV.FAKE, 10) || 0,
    },
    settings: {
      appName: ENV.APP_NAME,
    },
  };
}

module.exports = { load: getConfig };
