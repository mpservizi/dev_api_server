const MyService = require('@models/MyService');
const RequisitoNormativo = require('./models/RequisitoNormativo');

class ServiceModulo extends MyService {
  constructor() {
    super();
    this.modelRequisito = new RequisitoNormativo();
  }

  async listaRequirementsNorma(idNorma) {
    let result = await this.modelRequisito.requisitiNorma(idNorma);
    return result;
  }
}

module.exports = new ServiceModulo();
