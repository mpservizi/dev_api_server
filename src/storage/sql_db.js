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

  async initDb() {
    let cnn = await openConnection(this._config.path);
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

async function openConnection(dbPath) {
  // const provider = "Microsoft.Jet.OLEDB.4.0"; //.mdb
  const provider = 'Microsoft.ACE.OLEDB.121.0'; //.accdb office 2010

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

    let connection = await verificaDriver(conStr);
    if (!connection) {
      console.log('Errore collegamento al db.Connection string = ');
      console.log(conStr);
    }
    return connection;
  } catch (error) {
    console.log('Errore nel openConnection al database');
    console.log(error);
    return null;
  }
}

/**
 * Crea il driver per connetersi al database
 * @param {String} conStr
 * @returns {Object} driver oppure null
 */
async function verificaDriver(conStr) {
  //Con alcune verizioni di office funziona 32 bit con altre 64bit
  //Provo entrambe le versioni e verifico se una delle 2 funziona
  let is64Bit = false;
  let cnn = ADODB.open(conStr, is64Bit);

  //verifico la connessione
  let esito = await checkConnection(cnn);
  if (esito) {
    return cnn;
  }
  //Se non ha funzionato la precedente configurazione, cambio architerruta driver
  is64Bit = !is64Bit;
  cnn = ADODB.open(conStr, is64Bit);
  //verifico la connessione, restituisco null in caso d'errore
  esito = await checkConnection(cnn);
  if (esito) {
    return cnn;
  }
  return null;
}

/**
 * Indica se il diriver riesce a connettersi al database
 * @param {Object} cnn :  ADODB connection
 * @returns
 */
async function checkConnection(cnn) {
  //Provo eseguire una query di selezione su una tabella finta
  const FAKE_TABLE = 'NOMI_XXXXXX';
  let test_sql = `SELECT id from ${FAKE_TABLE}`;
  let result = false;
  try {
    let dati = await cnn.query(test_sql);
    //Se la tabella esiste e ho estratto i dati
    result = true;
  } catch (error) {
    //Se il testo d'errore contiene nome della tabella
    //Significa che il driver funziona, errore indica che la tabella non esiste
    if (error.process.message.includes(FAKE_TABLE)) {
      result = true;
    }
    //In altri casi d'errore il driver non riesce a connetersi al db
  }
  return result;
}
