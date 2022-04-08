import { MyModel } from '../../../models/MyModel';
import builder from '../../../models/MyQueryBuilder';

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

export class ProtoModel extends MyModel {
  constructor() {
    super();
    this.obj_tabella = TABELLA_DB;
    this.obj_service = MODEL_OBJ;
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

    let dati = await super.load(sql);
    return dati;
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
    let newId = await super.save(sql);
    let result = { ...payload };
    // @ts-ignore
    result[MODEL_OBJ.id] = parseInt(newId);
    return result;
  }

  async deleteRequisito(id: any) {
    let sql = builder
      .remove()
      .from(TABELLA_DB.tabella)
      .where({ ID: id })
      .build();
    let dati = await super.delete(sql);
    return dati;
  }
}
