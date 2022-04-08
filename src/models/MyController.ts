/**
 * Serve per passare i dati tra client e service
 */
import { Request, Response, NextFunction } from 'express';

export class MyController {
  ping(req: Request, res: Response, next: NextFunction) {
    res.send('pong');
  }
}
