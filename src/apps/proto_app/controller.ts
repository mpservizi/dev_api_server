import { MyController } from '../../models/MyController';
import Service from './service';
import { Request, Response, NextFunction } from 'express';

class Controller extends MyController {
  constructor() {
    super();
  }
  async getListaRequisitiNorma(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let dati = await Service.listaRequirementsNorma(1);
    res.send(dati);
  }
  async newRequisito(req: Request, res: Response, next: NextFunction) {
    let payload = req.body;
    let dati = await Service.addRequisito(payload);
    res.send(dati);
  }
  async prova(req: Request, res: Response, next: NextFunction) {
    let payload = req.body;
    let dati = await Service.deleteRequisito(payload);
    res.send(dati);
  }
}

export default new Controller();
