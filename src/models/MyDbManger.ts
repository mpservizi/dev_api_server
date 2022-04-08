import Repo from '../storage';
import { DbRisposta_I } from './interfacce/db_dto';
import { MyDb } from './MyDb';

/**
 * Esegue operazioni CRUD sul database
 */

export class MyDbManager {
  private db: MyDb = Repo.getDb();
  constructor() {}
  /**
   * Carica i dati dal database
   * @param {String} sql
   */
  async load(sql: string): Promise<DbRisposta_I> {
    const payload = {
      sql: sql,
    };
    const dati = await this.db.query(payload);
    return dati;
  }

  /**
   * Salva i dati nel database
   * @param {String} sql : sql querry
   * @param {String} scalar : sql querry da eseguire dopo query sql
   * @returns {*} : id new nuovo elemento aggiunto
   */
  async save(sql: string, scalar?: string): Promise<DbRisposta_I> {
    const payload = {
      sql: sql,
      scalar: scalar || 'SELECT @@Identity AS id',
    };
    const dati = await this.db.execute(payload);
    if (dati.err) {
      return dati;
    }
    let newId = dati.data[0].id;
    dati.data = newId;
    return dati;
  }

  /**
   * Aggiorna i dati nel database
   * @param {String} sql : sql querry
   */
  async update(
    sql: string,
    tabella: string,
    colonnaId: string,
    id: string | number
  ): Promise<DbRisposta_I> {
    const payload = {
      sql: sql,
      scalar: `SELECT * FROM ${tabella} WHERE ${colonnaId} = ${id}`,
    };
    const dati = await this.db.execute(payload);
    return dati;
  }
  /**
   * Elimina i dati dal database
   * @param {String} sql : sql querry
   * @param {String} scalar : sql querry da eseguire dopo query sql
   */
  async delete(sql: string, scalar?: string): Promise<DbRisposta_I> {
    const payload = {
      sql: sql,
      scalar: scalar || '',
    };
    const dati = await this.db.execute(payload);
    return dati;
  }
}
