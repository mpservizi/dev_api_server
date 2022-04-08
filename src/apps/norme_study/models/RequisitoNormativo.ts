import { MyModel } from '../../../models/MyModel';

//Campi uguali ai titoli del database
const CAMPI_TABELLA = {
  id: 'ID',
  chapter: 'Chapter',
  sub_chapter: 'SubChapter',
  requirement: 'Requirement',
  topic: 'Topic',
  type: 'Type',
  note: 'Note',
  images: 'Images',
};

export class RequisitoNormativo extends MyModel {
  constructor() {
    super();
  }
  /**
   * Lista dei requisiti presenti nel db per id della norma
   * @param {*} idNorma
   * @returns
   */
  async requisitiNorma(idNorma: any) {
    let sql = MyModel.qrBuilder.select.from('nomi').select('Nome').build();
    let result = await super.load(sql);
    return result;
  }

  /**
   * Aggiunge nuovo requisito in db
   * @param {*} payload
   * @returns
   */
  async addRequisito(payload: any) {
    let sql = MyModel.qrBuilder.insert
      .into('nomi')
      .set({ Nome: payload.nome, Anni: payload.anni })
      .build();

    // console.log(sql);
    let newId = await super.save(sql);
    let result = { ...payload };
    result['id'] = newId;
    return result;
  }
}
