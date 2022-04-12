import { Request, Response, NextFunction } from 'express';
import { MyView } from '@models/MyView';

export interface ViewController_I {
  prova(req: Request, res: Response, next: NextFunction): void;
}

export function initController(provider: any): ViewController_I {
  let service = provider;
  return {
    //
    async prova(req: Request, res: Response, next: NextFunction) {
      let dati = {
        nome: 'Malkit',
      };

      MyView.renderView(res, 'apps/prova_view/home', dati);
    },
  };
}
