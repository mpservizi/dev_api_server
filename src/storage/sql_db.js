const MyDb = require('@models/MyDb');
const fs = require('fs');

const ADODB = require('node-adodb');
ADODB.debug = true;

const rispostaDefault = {
  data: 'Risposta default dal SQL db',
  err: null,
};

class SqlDb extends MyDb {
  constructor(dbConfig) {
    super();
    this._cnn = null;
    this._config = dbConfig;
  }

  initDb() {
    let cnn = openConnection(this._config.path);
    if (cnn) {
      this._cnn = cnn;
      return true;
    }
    return false;
  }
  getPath() {
    return this._config.path;
  }

  async select(sql) {
    let result = await this._cnn.query(sql);
    return result;
  }
  async insert(sql, scalar) {
    let result = await this._cnn.execute(sql, scalar);
    return result;
  }
  async update(sql, scalar) {
    let result = await this._cnn.execute(sql, scalar);
    return result;
  }
  async delete(sql, scalar) {
    let result = await this._cnn.execute(sql, scalar);
    return result;
  }
}

module.exports = SqlDb;

/**
 * Inizializza la connessione con il database
 * @param {String} dbPath : percorso del dataabse
 * @returns {Object} connessione al database. Null in caso di errore
 */

function openConnection(dbPath) {
  // const provider = "Microsoft.Jet.OLEDB.4.0"; //.mdb
  const provider = 'Microsoft.ACE.OLEDB.12.0'; //.accdb office 2010

  let conStr =
    'Provider=' +
    provider +
    ';Data Source=' +
    dbPath +
    ';Persist Security Info=False;';
  // console.log(conStr);
  try {
    if (!fs.existsSync(dbPath)) {
      console.log('Percorso database non valido : ' + dbPath);
      return null;
    }
    //In caso di driver a 64 bit passare true come secondo parametro
    let connection = ADODB.open(conStr, false);
    return connection;
  } catch (error) {
    console.log(error);
    return null;
  }
}
