/**
 * Entry point del modulo
 * Inizzializzare qui il router e servizi
 */

const MyModulo = require('@models/MyModulo');
const router = require('./controller.js');

/**
 * Inizializza i routes del modulo
 * @param {MyModulo} mod : Istanza di MyModulo, usato per passare i dati tra codice dei vari file
 */
function init(mod) {
  //   Controller.init(app,mod);
  //Imposto il router nel oggetto passato
  mod.router = router;
}

module.exports = {
  init,
};
