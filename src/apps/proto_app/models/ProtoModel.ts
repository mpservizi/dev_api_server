import { MyModel } from '../../../models/MyModel';

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

export class RequisitoNormativo extends MyModel {
  constructor() {
    super();
    this.obj_tabella = {
      tabella: 'nomi',
      id: 'ID',
      nome: 'Nome',
      anni: 'Anni',
    };
    this.obj_service = {
      id: 'id',
      nome: 'nome',
      anni: 'anni',
    };
  }
  /**
   * Lista dei requisiti presenti nel db per id della norma
   * @param {*} idNorma
   * @returns
   */
  async requisitiNorma(idNorma: any) {
    let sql = MyModel.qrBuilder.select
      .from(TABELLA_DB.tabella)
      .select(TABELLA_DB.nome, TABELLA_DB.anni)
      .build();

    let dati = await super.load(sql);
    return dati;
  }

  /**
   * Aggiunge nuovo requisito in db
   * @param {*} payload
   * @returns
   */
  async addRequisito(payload: any) {
    let sql = MyModel.qrBuilder.insert
      .into(TABELLA_DB.tabella)
      .set({
        [TABELLA_DB.nome]: payload[MODEL_OBJ.nome],
        [TABELLA_DB.anni]: payload[MODEL_OBJ.anni],
      })
      .build();

    // console.log(sql);
    let newId = await super.save(sql);
    let result = { ...payload };
    result['id'] = newId;
    return result;
  }
}
