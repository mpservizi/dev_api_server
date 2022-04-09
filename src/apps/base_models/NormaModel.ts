import { MyModel } from '../../models/MyModel';
//Campi uguali ai titoli del database
export const TABELLA_DB = {
  tabella: 'norme',
  id: 'ID',
  std_code: 'Std Code',
  parent_code: 'Parent',
  titolo: 'Titolo',
};

//Campi del oggetto da passare al service
export const MODEL_OBJ = {
  id: 'id',
  std_code: 'std_code',
  parent_code: 'parent_code',
  titolo: 'titolo',
};

export class NormaModel extends MyModel {
  constructor() {
    super();
    this.setObjService(MODEL_OBJ);
    this.setObjTabella(TABELLA_DB);
  }
  /**
   * Lista di tutte le norme
   * @returns
   */
  async getAllNorme() {
    return this.selectAll(TABELLA_DB.tabella);
  }
  /**
   * Lista di tutte le norme
   * @returns
   */
  async getNormaById(id: number) {
    let sql = this.builder
      .select()
      .from(TABELLA_DB.tabella)
      .select()
      .where({ [TABELLA_DB.id]: id })
      .build();

    let dati = await this.dbm.load(sql);
    let lista = this.convertiRispostaInAppModelList(dati);
    return lista.data[0];
  }
  /**
   * Aggiunge nuova norma in db
   * @param {*} payload
   * @returns
   */
  async addNorma(payload: any) {
    return this.insertInDb(TABELLA_DB.tabella, payload);
  }

  /**
   * Elimina il record in base al id
   * @param id
   * @returns
   */
  async deleteNorma(id: string | number) {
    return this.deleteDb(TABELLA_DB.tabella, id, MODEL_OBJ.id);
  }

  /**
   * Aggiorna il record
   * @param payload
   * @returns
   */
  async updateRequisito(payload: any) {
    return this.updateDb(TABELLA_DB.tabella, payload, MODEL_OBJ.id);
  }
}
