/**
 * Impostare qui il database da usare nel app
 */

// const MyDb = require('@models/MyDb');
const SqlDb = require('./sql_db');

let database = null;
/**
 * Espone il database da usare nel app
 * @param config
 * @returns
 */
async function initRepo(config) {
  let result = {
    data: null,
    config: null,
    err: null,
  };
  //   if (config.database.fake == 1) {
  //     database = new MemoryDb();
  //     result.data = "Memory database pronto";
  //   } else {
  //     database = new SqlDb();
  //     result.data = "Sql database pronto";
  //   }
  database = new SqlDb(config);
  if (database.initDb()) {
    result.data = 'Sql database pronto : ' + database.getPath();
  } else {
    result.err = 'Errore connessione al database';
  }
  return Promise.resolve(result);
}

module.exports = {
  initRepo,
  getDb: () => {
    return database;
  },
};
