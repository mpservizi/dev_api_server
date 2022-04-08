/**
 * Wrapper interno al router di express
 */
import { Router } from 'express';
import { MyController } from './MyController';

export class MyRouter {
  router: Router;
  protected listaRoutes: string[] = [];
  constructor() {
    this.router = Router();
    this.get('/ping', MyController.ping);
  }
  get(path: string, cb: any) {
    this.addToList('GET', path);
    this.router.get(path, cb);
  }
  post(path: string, cb: any) {
    this.addToList('POST', path);
    this.router.post(path, cb);
  }
  put(path: string, cb: any) {
    this.addToList('PUT', path);
    this.router.put(path, cb);
  }
  delete(path: string, cb: any) {
    this.addToList('DELETE', path);
    this.router.delete(path, cb);
  }
  patch(path: string, cb: any) {
    this.addToList('PATCH', path);
    this.router.patch(path, cb);
  }

  getRoutes() {
    return this.listaRoutes;
  }

  private addToList(metodo: string, path: string) {
    this.listaRoutes.push(`${metodo} : ${path}`);
  }
}
