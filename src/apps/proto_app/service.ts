import { MyService } from '../../models/MyService';
import { RequisitoNormativo, MODEL_OBJ } from './models/ProtoModel';

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
    if (payload[MODEL_OBJ.nome] == '') {
      return {
        err: 'Nome non valido',
      };
    }
    let result = await this.model.addRequisito(payload);
    return result;
  }
}

export default new ServiceModulo();
