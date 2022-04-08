import { MyService } from '../../models/MyService';
import { ProtoModel, MODEL_OBJ } from './models/ProtoModel';

const model = new ProtoModel();
class ServiceModulo extends MyService {
  constructor() {
    super();
    this.model = new ProtoModel();
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
  async deleteRequisito(payload: any) {
    let result = await model.deleteRequisito(payload.id);
    return result;
  }
}

export default new ServiceModulo();
