/**
 * Entry poit di node app.
 */

//Attiva alis dei path indicati in package.json
// require('module-alias/register');

import Server from './server.js';
import { log as mLog } from './logger';
import Config from './config';
import Repo from './storage';
import AppModule from './apps';

/**
 * Entry point per node app, eseguire qui tutta la configurazione globale
 * @returns
 */
async function startApp() {
  let result: any = {
    data: undefined,
    config: undefined,
    err: undefined,
  };

  try {
    //Se caricare file dev.env oppure .env
    const DEV_MODE = true;

    //Carico enviorment vars
    const config = Config.load(DEV_MODE);
    if (config.err) {
      result.err = config.err;
      result.data = 'Errore loading enviorment variabiles. Check env file';
      return result;
    }

    if (DEV_MODE) {
      mLog('Dev env file loaded');
    } else {
      mLog('Production Env file loaded');
    }

    //Inizzializzo il repository
    const repoResult = await Repo.initRepo(config.database);
    if (repoResult.err) {
      result.err = repoResult.err;
      result.data = 'Errore inizializzazione repository';
      return result;
    }

    mLog(repoResult.data);

    //Creo express app senza farla partire
    const app = Server.initServer();

    //Carico tutti i moduli e abbino i routes al express app
    //Ogni modulo espone il proprio router
    const modResult = await AppModule.initModules(app, Repo.getDb());
    if (modResult.err) {
      result.err = modResult.err;
      result.data = 'Errore inizializzazione moduli';
      return result;
    }

    mLog(modResult.data);

    //Faccio partire il server express
    const response = await Server.startServer(app, config.port);
    if (response.err) {
      result.err = response.err;
      result.data = 'Errore avvio server';
      return result;
    }

    // set risposta mandata dal avvio server
    result.data = response.data;
    //espongo oggetto config
    // result.config = config;
  } catch (error) {
    //Errore non gestito
    result.err = error;
  }

  return result;
}

/**
 * Bootstap node app
 */
async function avvio() {
  let result = await startApp();
  if (!result.err) {
    mLog(result.data);
  } else {
    mLog('Errore inizializzazione applicazione. Err:');
    mLog(result.err);
  }
}

avvio();
