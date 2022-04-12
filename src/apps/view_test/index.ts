import { initRouter } from './router';
import { initController } from './controller';
import { MyModulo } from '../../models/MyModulo';
export function init(mod: MyModulo) {
  const controller = initController(undefined);
  let myRouter = initRouter(controller);
  return {
    routes: myRouter.getRoutes(),
    router: myRouter.router,
  };
}
