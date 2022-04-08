/**
 * Wrapper interno al router di express
 */
import { Router } from 'express';

export class MyRouter {
  router: Router;
  constructor() {
    this.router = Router();
  }
  get(path: string, cb: any) {
    this.router.get(path, cb);
  }
  post(path: string, cb: any) {
    this.router.post(path, cb);
  }
}
