/**
 * Classe base per rappresentare il driver del database
 * Per cambiare il tipo di database, estendere questa classe e implementare i metodi
 */
const rispostaDefault = {
  data: 'Risposta default dal db',
  err: null,
};

class MyDb {
  /**
   * Query selezione
   * @param {Object} payload
   * @returns
   */
  query(payload) {
    return Promise.resolve(rispostaDefault);
  }
  /**
   * Query azione, insert,update,delete
   * @param {Object} payload
   * @returns
   */
  execute(payload) {
    return Promise.resolve(rispostaDefault);
  }
}

module.exports = MyDb;
