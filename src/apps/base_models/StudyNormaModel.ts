import { MyModel } from '../../models/MyModel';
//Campi uguali ai titoli del database
export const TABELLA_DB = {
  tabella: 'studio_norme',
  id: 'ID',
  std_id: 'Std ID',
  std_code: 'Std Code',
  chapter: 'Chapter',
  sub_chapter: 'Sub Chapter',
  type_requirement: 'Requirement type',
  topic: 'Topic',
  requirement: 'Requirement',
  note: 'Note',
  id_image: 'IdImage',
};

//Campi del oggetto da passare al service
export const MODEL_OBJ = {
  id: 'id',
  std_id: 'Std ID',
  std_code: 'Std Code',
  chapter: 'Chapter',
  sub_chapter: 'Sub Chapter',
  type_requirement: 'Requirement type',
  topic: 'Topic',
  requirement: 'Requirement',
  note: 'Note',
  id_image: 'IdImage',
};

export class StudyNormaModel extends MyModel {
  constructor() {
    super();
    this.setObjService(MODEL_OBJ);
    this.setObjTabella(TABELLA_DB);
  }

  async getAllRequisiti() {
    return this.selectAll(TABELLA_DB.tabella);
  }

  async getRequisitiPerNorma(idNorma: number) {
    let sql = this.builder
      .select()
      .from(TABELLA_DB.tabella)
      .select()
      .where({ [TABELLA_DB.std_id]: idNorma })
      .build();

    let dati = await this.dbm.load(sql);
    if (dati.err) {
      return dati;
    }
    return this.convertiRispostaInAppModelList(dati);
  }
}
