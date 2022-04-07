const router = require('@models/MyRouter');
const controller = require('./controller');

router.get('/1', controller.getListaRequisitiNorma);
router.get('/2', controller.prova);
router.get('/ping', controller.ping);

module.exports = router;
