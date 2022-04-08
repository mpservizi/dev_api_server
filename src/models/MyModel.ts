/**
 * Model base per interfacciarsi con in database
 * Server per passare i dati tra il driver database e service
 */
import Repo from '../storage';
import { MyDb } from './MyDb';
import { MyQueryBuilder } from './MyQueryBuilder';
export class MyModel {
  db: MyDb;
  qrBuilder: MyQueryBuilder;
  constructor() {
    //istanza della classe MyDb
    this.db = Repo.getDb();
    //query builder
    this.qrBuilder = new MyQueryBuilder();
  }

  /**
   * Salva i dati nel database
   * @param {String} sql : sql querry
   * @param {String} scalar : sql querry da eseguire dopo query sql
   * @returns {*} : id new nuovo elemento aggiunto
   */
  async save(sql: string, scalar?: string): Promise<string> {
    let myScalar = scalar || 'SELECT @@Identity AS id';
    let payload = {
      sql: sql,
      scalar: myScalar,
    };
    let dati = await this.db.execute(payload);
    //Se il risultato è un array restituisco id dal primo valore
    if (dati.data.length) {
      return '' + dati.data[0].id;
    }
    return '';
  }
  /**
   * Carica i dati dal database
   * @param {String} sql
   */
  async load(sql: string): Promise<any[]> {
    let payload = {
      sql: sql,
    };
    let dati = await this.db.query(payload);
    return dati.data;
  }
  /**
   * Aggiorna i dati nel database
   * @param {String} sql : sql querry
   * @param {String} scalar : sql querry da eseguire dopo query sql
   */
  async update(sql: string, scalar?: string): Promise<boolean> {
    let payload = {
      sql: sql,
      scalar: scalar,
    };
    let dati = await this.db.execute(payload);
    return true;
  }
  /**
   * Elimina i dati dal database
   * @param {String} sql : sql querry
   * @param {String} scalar : sql querry da eseguire dopo query sql
   */
  async delete(sql: string, scalar?: string): Promise<boolean> {
    let payload = {
      sql: sql,
      scalar: scalar,
    };
    let dati = await this.db.execute(payload);
    return true;
  }
}
