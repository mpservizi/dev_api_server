import { MyModel } from '@models/MyModel';
import { NormaModel } from '@apps/base_models/NormaModel';
import {
  StudyNormaModel,
  TABELLA_DB as TabRequisiti,
} from '@apps/base_models/StudyNormaModel';
import { TABELLA_DB as TabNorme } from '@apps/base_models/NormaModel';

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
  private normaModel: NormaModel;
  private studyNormaModel: StudyNormaModel;
  constructor() {
    super();
    this.normaModel = new NormaModel();
    this.studyNormaModel = new StudyNormaModel();
    this.setObjService(MODEL_OBJ);
    this.setObjTabella(TABELLA_DB);
  }

  async findAllNormeWithAnalisi() {
    let sql = `SELECT DISTINCT ${TabNorme.tabella}.* FROM ${TabNorme.tabella} INNER JOIN ${TabRequisiti.tabella} ON ${TabNorme.tabella}.[${TabNorme.id}] = ${TabRequisiti.tabella}.[${TabRequisiti.std_id}];`;
    let dati = await this.dbm.load(sql);
    if (dati.err) {
      return dati;
    }
    return this.normaModel.convertListaToAppModel(dati);
  }
  /**
   * Lista dei requisiti presenti nel db per id della norma
   * @param {*} idNorma
   * @returns
   */
  async requisitiNorma(idNorma: any) {
    let requisiti = await this.studyNormaModel.getRequisitiPerNorma(idNorma);
    return requisiti;
    // return this.selectAll(TABELLA_DB.tabella);
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

function fakeRequisiti(norma: any) {
  let result = [];
  for (let index = 1; index < 6; index++) {
    result.push({
      id: index,
      requirement: 'Requisito ' + index,
      idNorma: norma,
    });
  }
  return result;
}
