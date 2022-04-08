import { MyRouter } from '../../models/MyRouter';
const controller = require('./controller').default;

const myRouter = new MyRouter();
myRouter.get('/ping', controller.ping);
myRouter.get('/1', controller.getListaRequisitiNorma);
myRouter.post('/', controller.newRequisito);
myRouter.post('/d', controller.prova);

export const router = myRouter.router;
