import { MyService } from '../../models/MyService';
import { RequisitoNormativo } from './models/RequisitoNormativo';

class ServiceModulo extends MyService {
  constructor() {
    super();
    this.model = new RequisitoNormativo();
  }

  async listaRequirementsNorma(idNorma: any) {
    let result = await this.model.requisitiNorma(idNorma);
    return result;
  }
  async addRequisito(payload: any) {
    let result = await this.model.addRequisito(payload);
    return result;
  }
}

export default new ServiceModulo();
