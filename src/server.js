const express = require('express');
const { join } = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
// const favicon = require("serve-favicon");

// const router = require("../apps/router");

//Inizializza app express
function initServer() {
  const app = express();
  const PUBLIC_FOLDER = join(__dirname, '..', 'public');

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(morgan('tiny'));

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));

  //request body in json
  app.use(bodyParser.json());

  // set cors
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', '*');
    // console.log(req.path);
    next();
  });

  //Imposta il router per azioni su database
  //bindLocalStorage(app, router);

  //La cartella assets è raggiungibile con path res nei scripts
  app.use('/', express.static(PUBLIC_FOLDER));
  //abbino i routes dei vari moduli
  // app.use(router);

  return app;
}

// Avvia server express
async function startServer(app, port) {
  return new Promise(function (resolve, reject) {
    let result = {
      data: '',
      err: null,
    };
    try {
      app
        .listen(port, () => {
          result.data = `Server ready on port ${port}`;
          resolve(result);
        })
        .on('error', (err) => {
          result.err = err;
          resolve(result);
        });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  initServer,
  startServer,
};
