/**
 * Entry point per inizzializzare tutte le app
 * Qui vengono caricati tutti i moduli specificati nel file moduli.js
 */

import { MyDb } from '../models/MyDb';
import { MyModulo } from '../models/MyModulo';
import { LISTA_MODULI } from './moduli';
import { Express } from 'express';
//Prefisso da mettere prima di caricare i vari routes dei moduli
const ROUTE_PREFIX = '/api';
/**
 * Inizializza tutti i moduli del app
 * @param app : Express app
 * @param {MyDb} db : MyDb instanza
 */
async function initModules(app: Express, db: MyDb) {
  let result: any = {
    data: '',
    err: null,
  };
  //Elenco di tutti routes per ogni modulo
  let appRoutes: any = {};

  try {
    await Promise.all(
      LISTA_MODULI.map(async (mod) => {
        //salvo il riferimento al database nel oggetto del modulo per passare ai singoli moduli
        mod.db = db;
        mod.app = app; //istanza express
        let routes = await initModulo(app, mod);
        appRoutes[mod.nome] = routes;
      })
    );

    // console.log(appRoutes);

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
async function initModulo(app: Express, mod: MyModulo) {
  //Importo entry file dalla cartella del modulo
  const modulo = await import(`./${mod.nome}/index`);
  //Chiamo il metodo per inizzializzare il modulo
  let resultInit = modulo.init(mod);
  //Abbino il router del modulo al path sel server
  //Il path del modulo inizia con /
  //api/nome_modulo/
  // @ts-ignore
  app.use(`${ROUTE_PREFIX}${mod.path}/`, resultInit.router);

  //i routes creati dal modulo
  return resultInit.routes;
}

export default { initModules };
