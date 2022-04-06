/**
 * Model base per interfacciarsi con in database
 * Server per passare i dati tra il driver database e service
 */
const Repo = require('@storage/index');

class MyModel {
  constructor() {
    //istanza della classe MyDb
    this.db = Repo.getDb();
    this.appModel = {};
    this.dbModel = {};
  }
  /**
   * Converte i campi della risposta ricevuta da database in oggetto da passare al service
   */
  toAppModel(payload) {
    return payload;
  }

  /**
   * Converte l'oggetto ricevuto dal service in oggetto per salvare in database
   */
  toDbModel(payload) {
    return payload;
  }

  /**
   * Salva i dati nel database
   * @param {String} sql
   */
  async save(sql, scalar) {
    let dati = await this.db.execute(sql, scalar);
    return dati;
  }
  /**
   * Carica i dati dal database
   * @param {String} sql
   */
  async load(sql) {
    let dati = await this.db.select(sql);
    let result = [];
    if (dati.length) {
      dati.forEach((item) => {
        result.push(this.toAppModel(item));
      });
    }
    return result;
  }
  /**
   * Aggiorna i dati nel database
   * @param {String} sql
   */
  async update(sql, scalar) {
    let dati = await this.db.execute(sql, scalar);
    return dati;
  }
  /**
   * Elimina i dati dal database
   * @param {String} sql
   */
  async delete(sql, scalar) {
    let dati = await this.db.execute(sql, scalar);
    return dati;
  }
}

module.exports = MyModel;
