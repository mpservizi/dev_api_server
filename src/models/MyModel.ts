/**
 * Model base per interfacciarsi con in database
 * Server per passare i dati tra il driver database e service
 */
import Repo from '../storage';
import { DbRisposta_I } from './interfacce/db_dto';
import { MyDb } from './MyDb';
import { MyQueryBuilder } from './MyQueryBuilder';

export class MyModel {
  static db: MyDb = Repo.getDb();
  static qrBuilder: MyQueryBuilder = new MyQueryBuilder();
  //Oggetto con i nomi deicampi della tabella
  obj_tabella: any = {
    tabella: 'tab_xx',
    //id:'CodiceNorma'
  };

  //Oggetto da passare al service come risposta
  obj_service: any = {
    //id:'std_code',
  };

  constructor() {}

  /**
   * Converte oggetto estratto dal database in oggetto da passare al service
   * Viene eseguita la conversione basando sul nome delle chiavi del oggetto obj_tabella e obj_service
   * @param dbModel
   * @returns
   */
  toAppModel(dbModel: any) {
    let result: any = {};
    let tab_db = this.obj_tabella;
    let keys = Object.keys(tab_db);

    keys.forEach((key: string) => {
      // @ts-ignore
      let key_db: string = tab_db[key];
      if (dbModel[key_db]) {
        result[key] = dbModel[key_db];
      }
    });
    return result;
  }

  /**
   * Converte i campi dal service al db model
   * @param serviceModel : Oggetto con in campi uguale al obj_service
   */
  toDbModel(serviceModel: any) {
    let result: any = {};
    let tab_db = this.obj_tabella;
    let keys = Object.keys(tab_db);

    keys.forEach((key: string) => {
      // @ts-ignore
      let key_db: string = tab_db[key];
      if (serviceModel[key]) {
        result[key_db] = serviceModel[key];
      }
    });
    return result;
  }
  /**
   * Carica i dati dal database
   * @param {String} sql
   */
  async load(sql: string): Promise<DbRisposta_I> {
    const payload = {
      sql: sql,
    };
    const dati = await MyModel.db.query(payload);
    //Se ci sono sati converto in obj service
    if (dati.data) {
      let result: any[] = [];
      dati.data.forEach((item: any) => {
        result.push(this.toAppModel(item));
      });
      return {
        data: result,
      };
    }
    return dati;
  }

  /**
   * Salva i dati nel database
   * @param {String} sql : sql querry
   * @param {String} scalar : sql querry da eseguire dopo query sql
   * @returns {*} : id new nuovo elemento aggiunto
   */
  async save(sql: string, scalar?: string): Promise<string | number> {
    const payload = {
      sql: sql,
      scalar: scalar || 'SELECT @@Identity AS id',
    };
    const dati = await MyModel.db.execute(payload);
    //Se ci sono dati resituisco id generato
    if (dati.data) {
      return dati.data[0].id;
    }
    return -1;
  }

  /**
   * Aggiorna i dati nel database
   * @param {String} sql : sql querry
   * @param {String} scalar : sql querry da eseguire dopo query sql
   */
  async update(sql: string, scalar?: string): Promise<DbRisposta_I> {
    const payload = {
      sql: sql,
      scalar: scalar || 'SELECT @@Identity AS id',
    };
    const dati = await MyModel.db.execute(payload);
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
      scalar: scalar || 'SELECT @@Identity AS id',
    };
    const dati = await MyModel.db.execute(payload);
    return dati;
  }
}
