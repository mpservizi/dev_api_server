import { ServiceModulo } from './service';
import { Request, Response, NextFunction } from 'express';
import { logger } from './../../logger';

export interface ProtoController_I {
  getListaRequisitiNorma(req: Request, res: Response, next: NextFunction): void;
  getNormaById(req: Request, res: Response, next: NextFunction): void;
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
      logger.debug(req.query.id);
      let dati = await service.getAll();
      res.send(dati);
    },
    //
    async getNormaById(req: Request, res: Response, next: NextFunction) {
      let dati = await service.listaRequirementsNorma(req.params.id);
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
