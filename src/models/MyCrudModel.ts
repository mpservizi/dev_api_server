import { MyModel } from './MyModel';

class MyCrudModel extends MyModel {
  constructor(private tabella: string) {
    super();
  }
  async findOne(id: number | string) {
    let sql = this.builder
      .select()
      .from(this.tabella)
      .select()
      .where({ ID: id })
      .build();
    let dati = await this.dbm.load(sql);
    if (dati.err) {
      return dati;
    }
    let lista = this.convertiRispostaInAppModelList(dati);
    return lista.data[0];
  }
}
