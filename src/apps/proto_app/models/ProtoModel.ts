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
    return this.selectAll(TABELLA_DB.tabella);
  }
  /**
   * Aggiunge nuovo requisito in db
   * restitusice nuovo oggetto con id generato dal db
   * @param {*} payload
   * @returns
   */
  async addRequisito(payload: any) {
    return this.insertInDb(TABELLA_DB.tabella, payload);
  }

  /**
   * Elimina il record in base al id
   * @param id
   * @returns
   */
  async deleteRequisito(id: string | number) {
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
