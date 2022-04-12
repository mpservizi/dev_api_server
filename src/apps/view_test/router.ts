import { MyRouter } from '@models/MyRouter';
import { ViewController_I } from './controller';

export function initRouter(controller: ViewController_I) {
  const myRouter = new MyRouter();

  myRouter.get('/', controller.prova);
  return myRouter;
}
