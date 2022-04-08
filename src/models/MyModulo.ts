import { MyDb } from './MyDb';
import { Express, Router } from 'express';
/**
 * Object usato per inizializzare un modulo
 * Viene usato per caricare i moduli delle varie apps
 * In file moduli viene creata la lista delle apps da caricae
 */
export class MyModulo {
  public db: MyDb | undefined;
  public router: Router | undefined;
  public app: Express | undefined;
  public label: string = '';
  public desc: string = '';

  /**
   *
   * @param nome : nome della cartella in folder apps
   * @param path : percorso del router
   */
  constructor(public nome: string, public path: string) {}
}
