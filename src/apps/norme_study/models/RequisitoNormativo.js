const MyModel = require('@models/MyModel');
const RequirementNorma = require('./RequirementNorma');

class RequisitoNormativo extends MyModel {
  constructor() {
    super();
  }
  toAppModel(payload) {
    let result = {
      id: payload.ID,
      nome: payload.Nome,
      anni: payload.Anni,
    };
    return result;
  }
  async requisitiNorma(idNorma) {
    // let result = {
    //   data: fakeLista(3),
    // };
    let sql = `SELECT * FROM nomi`;
    let result = await this.load(sql);
    return Promise.resolve(result);
  }
}

function fakeLista(cont) {
  let result = [];
  for (let i = 0; i < cont; i++) {
    let r = RequirementNorma();
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
