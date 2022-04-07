const MyService = require('@models/MyService');
const RequisitoNormativo = require('./models/RequisitoNormativo');

class ServiceModulo extends MyService {
  constructor() {
    super();
    this.model = new RequisitoNormativo();
  }

  async listaRequirementsNorma(idNorma) {
    let result = await this.model.requisitiNorma(idNorma);
    return result;
  }
  async addRequisito(payload) {
    let result = await this.model.addRequisito(payload);
    return result;
  }
}

module.exports = new ServiceModulo();
