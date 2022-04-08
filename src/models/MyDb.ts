/**
 * Classe base per rappresentare il driver del database
 * Per cambiare il tipo di database, estendere questa classe e implementare i metodi
 */
import { DbRisposta_I, DbPayload_I } from './interfacce/db_dto';

const rispostaDefault: DbRisposta_I = {
  data: ['Risposta default dal db'],
  err: undefined,
};

export class MyDb {
  constructor() {}
  /**
   * Query selezione
   * @param {Object} payload
   * @returns
   */
  query(payload: DbPayload_I): Promise<DbRisposta_I> {
    return Promise.resolve(rispostaDefault);
  }
  /**
   * Query azione, insert,update,delete
   * @param {Object} payload
   * @returns
   */
  execute(payload: DbPayload_I): Promise<DbRisposta_I> {
    return Promise.resolve(rispostaDefault);
  }
}
