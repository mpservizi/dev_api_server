/**
 * Model base per interfacciarsi con in database
 * Server per passare i dati tra il driver database e service
 */
const Repo = require('@storage/index');
const sql = require('sql-query');
const builder = sql.Query();
class MyModel {
  constructor() {
    //istanza della classe MyDb
    this.db = Repo.getDb();
    //query builder
    this.qrBuilder = {
      select: builder.select(),
      insert: builder.insert(),
      update: builder.update(),
      update: builder.remove(),
      create: builder.create(),
    };
    //Oggetto usato nel app
    this.appModel = {};
    //Campi uguali ai titoli del database
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
   * @param {String} sql : sql querry
   * @param {String} scalar : sql querry da eseguire dopo query sql
   * @returns {*} : id new nuovo elemento aggiunto
   */
  async save(sql, scalar) {
    let myScalar = scalar || 'SELECT @@Identity AS id';
    let payload = {
      sql: sql,
      scalar: myScalar,
    };
    let dati = await this.db.execute(payload);
    //Se il risultato è un array restituisco id dal primo valore
    if (dati.length) {
      return dati[0].id;
    }
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
   * @param {String} sql : sql querry
   * @param {String} scalar : sql querry da eseguire dopo query sql
   */
  async update(sql, scalar) {
    let dati = await this.db.execute(sql, scalar);
    return dati;
  }
  /**
   * Elimina i dati dal database
   * @param {String} sql : sql querry
   * @param {String} scalar : sql querry da eseguire dopo query sql
   */
  async delete(sql, scalar) {
    let dati = await this.db.execute(sql, scalar);
    return dati;
  }
}

module.exports = MyModel;
