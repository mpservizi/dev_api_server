import { MyModel } from '../../../models/MyModel';
import builder from '../../../models/MyQueryBuilder';
import { MyDbManager } from '../../../models/MyDbManger';

//Campi uguali ai titoli del database
export const TABELLA_DB = {
  tabella: 'nomi',
  id: 'ID',
  nome: 'Nome',
  anni: 'Anni',
};

//Campi del oggetto da passare al service
export const MODEL_OBJ = {
  id: 'id',
  nome: 'nome',
  anni: 'anni',
};

let dbm = new MyDbManager();

export class ProtoModel extends MyModel {
  constructor() {
    super();
    this.setObjService(MODEL_OBJ);
    this.setObjTabella(TABELLA_DB);
  }
  /**
   * Lista dei requisiti presenti nel db per id della norma
   * @param {*} idNorma
   * @returns
   */
  async requisitiNorma(idNorma: any) {
    let sql = builder
      .select()
      .from(TABELLA_DB.tabella)
      .select(TABELLA_DB.id, TABELLA_DB.nome, TABELLA_DB.anni)
      .build();

    let dati = await dbm.load(sql);
    return this.convertiRispostaInAppModelList(dati);
  }

  /**
   * Aggiunge nuovo requisito in db
   * restitusice nuovo oggetto con id generato dal db
   * @param {*} payload
   * @returns
   */
  async addRequisito(payload: any) {
    //Converto i campi del oggetto service in campi tabella
    let pojo = this.toDbModel(payload);
    let sql = builder.insert().into(TABELLA_DB.tabella).set(pojo).build();

    // console.log(sql);
    let risposta = await dbm.save(sql);
    return risposta;
  }

  async deleteRequisito(id: any) {
    let sql = builder
      .remove()
      .from(TABELLA_DB.tabella)
      .where({ [TABELLA_DB.id]: id })
      .build();
    let dati = await dbm.delete(sql);
    return dati;
  }

  async updateRequisito(payload: any) {
    //Converto i campi del oggetto service in campi tabella
    let id = payload[MODEL_OBJ.id];
    delete payload[MODEL_OBJ.id];
    let pojo = this.toDbModel(payload);
    let sql = builder
      .update()
      .into(TABELLA_DB.tabella)
      .set(pojo)
      .where({ [TABELLA_DB.id]: id })
      .build();
    let scalar = `SELECT * FROM ${TABELLA_DB.tabella} WHERE ${TABELLA_DB.id} = ${id}`;
    let dati = await dbm.update(sql, scalar);
    return this.convertiRispostaInAppModelList(dati);
  }
}
