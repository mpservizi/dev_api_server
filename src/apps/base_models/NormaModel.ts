import { MyModel } from '../../models/MyModel';
//Campi uguali ai titoli del database
export const TABELLA_DB = {
  tabella: 'norme',
  id: 'ID',
  std_code: 'Std Code',
  parent_id: 'Parent Id',
  status: 'Status',
  entry_to_force: 'Entry to force',
  valid_until: 'Valid until',
  applied_in_abplast: 'Applied in AbPlast',
  country: 'Country',
  product_category: 'Product category',
  tech_committee: 'Tech committee',
  std_ref_code: 'Std ref code',
  pubblication: 'Pubblication',
  edition: 'Edition',
  title: 'Title',
  base_title: 'Base title',
  storage_container: 'Storage container',
  language: 'Language',
  format: 'Format',
  note: 'Note',
  last_standard_check_date: 'Last standard check date',
};

//Campi del oggetto da passare al service
export const MODEL_OBJ = {
  id: 'id',
  std_code: 'std_code',
  parent_id: 'parent_id',
  status: 'status',
  entry_to_force: 'entry_to_force',
  valid_until: 'valid_until',
  applied_in_abplast: 'applied_in_abplast',
  country: 'country',
  product_category: 'product_category',
  tech_committee: 'tech_committee',
  std_ref_code: 'std_ref_code',
  pubblication: 'pubblication',
  edition: 'edition',
  title: 'title',
  base_title: 'base_title',
  storage_container: 'storage_container',
  language: 'language',
  format: 'format',
  note: 'note',
  last_standard_check_date: 'last_standard_check_date',
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
    if (dati.err) {
      return dati;
    }
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
