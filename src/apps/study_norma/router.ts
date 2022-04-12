import { MyRouter } from '../../models/MyRouter';
import { ProtoController_I } from './controller';

export function initRouter(controller: ProtoController_I) {
  const myRouter = new MyRouter();
  myRouter.get('/', controller.getListaRequisitiNorma);
  myRouter.post('/', controller.newRequisito);
  myRouter.put('/', controller.updadateRequisito);
  myRouter.delete('/', controller.deleteRequisito);
  myRouter.get('/:id', controller.getNormaById);
  return myRouter;
}
