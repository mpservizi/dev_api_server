/**
 * Serve per passare i dati tra client e service
 */

class MyController {
  ping(req, res, next) {
    res.send('pong');
  }
}
module.exports = MyController;
