const controller = require('@models/MyController');
const router = controller.router;
const Service = require('./service');

router.get('/1', async function (req, res, next) {
  let dati = await Service.listaRequirementsNorma(1);
  res.send(dati);
});
router.get('/2', function (req, res, next) {
  res.send('Route 2');
});

module.exports = router;
