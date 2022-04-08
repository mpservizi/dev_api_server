/**
 * Server per passare i dati tra il database e service
 */
import { DbRisposta_I } from './interfacce/db_dto';
import qrBuilder from './MyQueryBuilder';
import { MyDbManager } from './MyDbManger';

export class MyModel {
  //Oggetto con i nomi dei campi = ai titoli della tabella
  private obj_tabella: any = {
    //id:'CodiceNorma'
  };

  //Oggetto da passare al service come risposta
  private obj_service: any = {
    //id:'std_code',
  };

  //esegue CRUD sul db
  protected dbm = new MyDbManager();
  //Query buildet
  protected builder = qrBuilder;

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

  /**
   * Crea il pojo per aggioranre il record del db. Tolgo il campo id
   * @param payload : payload passato dal service
   * @param campoId : nome del campo che contiene valore del id
   * @returns
   */
  protected pojoForUpdateDb(payload: any, campoId: string) {
    let copia = { ...payload };
    delete copia[campoId];
    let pojo = this.toDbModel(copia);
    return pojo;
  }

  /**
   * Wrapper per eseguire il update del record in db
   * @param tabella : nome della tabella
   * @param payload : oggetto ricevuto dal service
   * @param campoId : key del payload che corrisponde al campo id
   * @returns
   */
  protected async updateDb(tabella: string, payload: any, campoId: string) {
    //Converto i campi del oggetto service in campi tabella
    let id = payload[campoId];
    //Titolo della colonna id in db
    //Oggetto service e oggetto tabella hanno nomi delle chiavi uguali, solo il valore è diverso
    let colonnaId = this.obj_tabella[campoId];

    //Elimino campo id dal pojo da passare al db
    let pojo = this.pojoForUpdateDb(payload, campoId);
    let sql = this.builder
      .update()
      .into(tabella)
      .set(pojo)
      .where({ [colonnaId]: id })
      .build();

    let dati = await this.dbm.update(sql, tabella, colonnaId, id);
    return this.convertiRispostaInAppModelList(dati);
  }

  /**
   * Wrapper per eliminare un record dal db
   * @param tabella : nome della tabella
   * @param id : valore per cui eseguire il filtro
   * @param campoId : nome del campo che contiene valore del id
   * @returns
   */
  protected async deleteDb(
    tabella: string,
    id: string | number,
    campoId: string
  ) {
    //Titolo della colonna id in db
    //Oggetto service e oggetto tabella hanno nomi delle chiavi uguali, solo il valore è diverso
    let colonnaId = this.obj_tabella[campoId];

    let sql = this.builder
      .remove()
      .from(tabella)
      .where({ [colonnaId]: id })
      .build();

    let dati = await this.dbm.delete(sql);
    return dati;
  }

  /**
   * Wrapper per selezionare tutti i dati della tabella
   * @param tabella : nome della tabella
   * @returns
   */
  protected async selectAll(tabella: string) {
    let sql = this.builder.select().from(tabella).build();

    let dati = await this.dbm.load(sql);
    return this.convertiRispostaInAppModelList(dati);
  }

  /**
   * Wrapper per eliminare un record dal db
   * @param tabella : nome della tabella
   * @param id : valore per cui eseguire il filtro
   * @param campoId : nome del campo che contiene valore del id
   * @returns
   */
  protected async insertInDb(tabella: string, payload: any) {
    //Converto i campi del oggetto service in campi tabella
    let pojo = this.toDbModel(payload);
    let sql = this.builder.insert().into(tabella).set(pojo).build();

    // console.log(sql);
    let risposta = await this.dbm.save(sql);
    return risposta;
  }
}
