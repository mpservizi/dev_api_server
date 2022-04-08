/**
 * Server per passare i dati tra il database e service
 */
import { DbRisposta_I } from './interfacce/db_dto';

export class MyModel {
  //Oggetto con i nomi dei campi = ai titoli della tabella
  private obj_tabella: any = {
    //id:'CodiceNorma'
  };

  //Oggetto da passare al service come risposta
  private obj_service: any = {
    //id:'std_code',
  };
  constructor() {}
  /**
   * Impostare oggetto che contiene i campi presenti nella tabella
   * @param payload
   */
  protected setObjTabella(payload: any) {
    this.obj_tabella = payload;
  }
  /**
   * Impostare oggetto da passare al service, convertendo colonne del db
   * @param payload
   */
  protected setObjService(payload: any) {
    this.obj_service = payload;
  }
  /**
   * Converte oggetto estratto dal database in oggetto da passare al service
   * Viene eseguita la conversione basando sul nome delle chiavi del oggetto obj_tabella e obj_service
   * @param dbModel
   * @returns
   */
  protected toAppModel(dbModel: any) {
    let result: any = {};
    let tab_db = this.obj_tabella;
    let keys = Object.keys(tab_db);

    keys.forEach((key: string) => {
      // @ts-ignore
      let key_db: string = tab_db[key];
      if (dbModel[key_db]) {
        result[key] = dbModel[key_db];
      }
    });
    return result;
  }

  /**
   * Converte i campi dal service al db model
   * @param serviceModel : Oggetto con in campi uguale al obj_service
   */
  protected toDbModel(serviceModel: any) {
    let result: any = {};
    let tab_db = this.obj_tabella;
    let keys = Object.keys(tab_db);

    keys.forEach((key: string) => {
      // @ts-ignore
      let key_db: string = tab_db[key];
      if (serviceModel[key]) {
        result[key_db] = serviceModel[key];
      }
    });
    return result;
  }

  /**
   * Converte la lista ricevuta dal db in lista di obj da usare in service
   * @param dati
   * @returns
   */
  protected convertiRispostaInAppModelList(dati: DbRisposta_I): DbRisposta_I {
    if (dati.err || !dati.data) {
      return dati;
    }

    let result: any[] = [];
    dati.data.forEach((item: any) => {
      result.push(this.toAppModel(item));
    });

    return {
      data: result,
      err: undefined,
    };
  }
}
