const router = require('@models/MyRouter');
const controller = require('./controller');

router.get('/ping', controller.ping);
router.get('/1', controller.getListaRequisitiNorma);
router.post('/', controller.newRequisito);

module.exports = router;
