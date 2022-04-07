const MyModel = require('@models/MyModel');

class RequisitoNormativo extends MyModel {
  constructor() {
    super();
    //Campi uguali ai titoli del database
    this.dbModel = {
      id: Number,
      chapter: String,
      sub_chapter: String,
      requirement: String,
      topic: String,
      type: String,
      note: String,
      images: String,
    };
    //Oggetto usato nel app
    this.appModel = {
      id: Number,
      chapter: String,
      sub_chapter: String,
      requirement: String,
      topic: String,
      type: String,
      note: String,
      images: String,
    };
  }

  toAppModel(payload) {
    let result = {
      id: payload.ID,
      nome: payload.Nome,
      anni: payload.Anni,
    };
    return result;
  }

  toDbModel(payload) {
    let result = {
      ID: payload.id,
      Nome: payload.nome,
      Anni: payload.anni,
    };

    return result;
  }
  async requisitiNorma(idNorma) {
    // let result = {
    //   data: fakeLista(3),
    // };
    let sql = this.qrBuilder.select.from('nomi').select('Nome').build();
    let result = await this.load(sql);
    return Promise.resolve(result);
  }
  async addRequisito(payload) {
    let sql = this.qrBuilder.insert
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

function fakeLista(cont) {
  let result = [];
  for (let i = 0; i < cont; i++) {
    let r = {};
    r.id = i + 1;
    r.chapter = i + 4;
    r.sub_chapter = `${r.chapter}.${i * 2}`;
    r.requirement = `Requisito ${3 * i}`;
    result.push(r);
  }
  return result;
}

module.exports = RequisitoNormativo;

//'SELECT @@Identity AS id'
