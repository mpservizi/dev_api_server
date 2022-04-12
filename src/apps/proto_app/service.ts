import { MyService } from '@models/MyService';
import { ProtoModel, MODEL_OBJ } from './models/ProtoModel';

export class ServiceModulo extends MyService {
  constructor(private model: ProtoModel) {
    super();
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
  async updateRequisito(payload: any) {
    let result = await this.model.updateRequisito(payload);
    return result;
  }
  async deleteRequisito(payload: any) {
    let result = await this.model.deleteRequisito(payload.id);
    return result;
  }
}
