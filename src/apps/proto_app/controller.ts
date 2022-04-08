import { ServiceModulo } from './service';
import { Request, Response, NextFunction } from 'express';

export interface ProtoController_I {
  getListaRequisitiNorma(req: Request, res: Response, next: NextFunction): void;
  newRequisito(req: Request, res: Response, next: NextFunction): void;
  updadateRequisito(req: Request, res: Response, next: NextFunction): void;
  deleteRequisito(req: Request, res: Response, next: NextFunction): void;
}

export function initController(provider: ServiceModulo): ProtoController_I {
  let service = provider;
  return {
    //
    async getListaRequisitiNorma(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      let dati = await service.listaRequirementsNorma(1);
      res.send(dati);
    },
    //
    async newRequisito(req: Request, res: Response, next: NextFunction) {
      let payload = req.body;
      let dati = await service.addRequisito(payload);
      res.send(dati);
    },
    //
    async updadateRequisito(req: Request, res: Response, next: NextFunction) {
      let payload = req.body;
      let dati = await service.updateRequisito(payload);
      res.send(dati);
    },
    //
    async deleteRequisito(req: Request, res: Response, next: NextFunction) {
      let payload = req.body;
      let dati = await service.deleteRequisito(payload);
      res.send(dati);
    },
  };
}
