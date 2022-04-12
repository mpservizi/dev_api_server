import { MyService } from '@models/MyService';
import { ProtoModel, MODEL_OBJ } from './models/ProtoModel';

export class ServiceModulo extends MyService {
  constructor(private model: ProtoModel) {
    super();
  }

  async getAll() {
    let result = await this.model.findAll();
    return result;
  }
  async listaRequirementsNorma(idNorma: string) {
    let id = parseInt(idNorma);
    if (isNaN(id)) {
      return {
        err: 'Id non valido : ' + id,
      };
    }
    let result = await this.model.requisitiNorma(id);
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
