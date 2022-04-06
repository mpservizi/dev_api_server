/**
 * Entry point per inizzializzare tutte le app
 * Qui vengono caricati tutti i moduli specificati nel file moduli.js
 */

const MyDb = require('@models/MyDb');
const MyModulo = require('@models/MyModulo');
const LISTA_MODULI = require('./moduli');

//Prefisso da mettere prima di caricare i vari routes dei moduli
const ROUTE_PREFIX = '/api';
/**
 * Inizializza tutti i moduli del app
 * @param app : Express app
 * @param {MyDb} db : MyDb instanza
 */
async function initModules(app, db) {
  let result = {
    data: '',
    err: null,
  };
  try {
    LISTA_MODULI.forEach((mod) => {
      //salvo il riferimento al database nel oggetto del modulo per passare ai singoli moduli
      mod.db = db;
      mod.app = app; //istanza express
      initModulo(app, mod);
    });

    result.data = 'Moduli inizializzati correttamente';
  } catch (error) {
    result.err = error;
  }
  return result;
}

/**
 * Carica il modulo in base ai parametri indicati
 * @param {MyModulo} mod : parametri del modulo da caricare
 */
async function initModulo(app, mod) {
  //Importo entry file dalla cartella del modulo
  const modulo = require(`./${mod.nome}/index`);
  //Chiamo il metodo per inizzializzare il modulo
  //Il modulo imposta il router sul oggetto passato
  modulo.init(mod);
  //Abbino il router del modulo al path sel server
  //Il path del modulo inizia con /
  //api/nome_modulo/
  app.use(`${ROUTE_PREFIX}${mod.path}/`, mod.router);
}

module.exports = {
  initModules,
};
