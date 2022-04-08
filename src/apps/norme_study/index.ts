/**
 * Entry point del modulo
 * Inizzializzare qui il router e servizi
 */

import { MyModulo } from '../../models/MyModulo';
import { router } from './router';
/**
 * Inizializza i routes del modulo
 * @param {MyModulo} mod : Istanza di MyModulo, usato per passare i dati tra codice dei vari file
 */
export function init(mod: MyModulo) {
  //   Controller.init(app,mod);
  //Imposto il router nel oggetto passato
  mod.router = router;
}
