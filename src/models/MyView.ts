import { Request, Response, NextFunction } from 'express';
/**
 * Wrapper per mandare template view al client
 */
export class MyView {
  static renderView(
    res: Response,
    viewPath: string,
    payload: any,
    layout?: string
  ) {
    const json = JSON.stringify(payload);
    const viewLayout = layout || 'default';
    //Aggiungo versione json dei dati nella risposta del view, per usare nei tempate e script delal pagina
    let result = {
      layout: viewLayout,
      ...payload,
      json: json,
    };

    res.render(viewPath, result);
  }
}
