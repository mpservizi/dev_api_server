const MyController = require('./../../models/MyController');
const Service = require('./service');

class Controller extends MyController {
  constructor() {
    super();
  }
  async getListaRequisitiNorma(req, res, next) {
    let dati = await Service.listaRequirementsNorma(1);
    res.send(dati);
  }
  async newRequisito(req, res, next) {
    let payload = req.body;
    let dati = await Service.addRequisito(payload);
    res.send(dati);
  }
  prova(req, res, next) {
    res.send('Route prova');
  }
}
module.exports = new Controller();
