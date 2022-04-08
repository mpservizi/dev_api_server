/**
 * Classe base per rappresentare il driver del database
 * Per cambiare il tipo di database, estendere questa classe e implementare i metodi
 */
const rispostaDefault: DbRisposta = {
  data: ['Risposta default dal db'],
  err: undefined,
};

interface DbRisposta {
  data: Array<any>;
  err?: object;
}
interface DbPayload {
  sql: string;
  scalar?: string;
}

export class MyDb {
  constructor() {}
  /**
   * Query selezione
   * @param {Object} payload
   * @returns
   */
  query(payload: DbPayload): Promise<DbRisposta> {
    return Promise.resolve(rispostaDefault);
  }
  /**
   * Query azione, insert,update,delete
   * @param {Object} payload
   * @returns
   */
  execute(payload: DbPayload): Promise<DbRisposta> {
    return Promise.resolve(rispostaDefault);
  }
}
