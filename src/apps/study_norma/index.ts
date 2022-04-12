/**
 * Entry point del modulo
 * Inizzializzare qui il router e servizi
 */

import { MyModulo } from '@models/MyModulo';
import { initRouter } from './router';
import { ProtoModel } from './models/ProtoModel';
import { ServiceModulo } from './service';
import { initController } from './controller';

/**
 * Inizializza i routes del modulo
 * @param {MyModulo} mod : Istanza di MyModulo, usato per passare i dati tra codice dei vari file
 */
export function init(mod: MyModulo) {
  const model = new ProtoModel();
  const service = new ServiceModulo(model);
  const controller = initController(service);
  let myRouter = initRouter(controller);
  return {
    routes: myRouter.getRoutes(),
    router: myRouter.router,
  };
}
