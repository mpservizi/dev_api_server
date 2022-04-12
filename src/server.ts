import express, { Express, Request, Response } from 'express';
const { join } = require('path');
import bodyParser from 'body-parser';
const morgan = require('morgan');
import helmet from 'helmet';
import { logger } from './logger';
import { engine } from 'express-handlebars';
// const favicon = require("serve-favicon");

// const router = require("../apps/router");

//Inizializza app express
function initServer() {
  const app = express();
  const PUBLIC_FOLDER = join(__dirname, '..', 'public');
  const VIEWS_FOLDER = join(__dirname, '..', 'views');
  const LAYOUTS_FOLDER = join(VIEWS_FOLDER, '_layouts');
  const PARTIALS_FOLDER = join(VIEWS_FOLDER, '_partials');
  const APPS_FOLDER = join(VIEWS_FOLDER, 'apps');

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  // app.use(morgan('tiny'));
  app.use(
    morgan(function (tokens: any, req: Request, res: Response) {
      let msg = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
      ].join(' ');

      logger.debug('My Log : ' + msg);
      // return msg;
    })
  );
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

  //Sets our app to use the handlebars engine
  app.engine(
    'hbs',
    engine({
      defaultLayout: 'default',
      extname: '.hbs',
      layoutsDir: LAYOUTS_FOLDER,
      partialsDir: PARTIALS_FOLDER,
    })
  );
  //Imposto la cartella per views e view engine
  app.set('views', VIEWS_FOLDER);
  app.set('view engine', 'hbs');

  //La cartella assets è raggiungibile con path res nei scripts
  app.use('/', express.static(PUBLIC_FOLDER));
  //La cartella views è raggiungibile con path apps nei scripts
  app.use('/apps', express.static(APPS_FOLDER));
  //abbino i routes dei vari moduli
  // app.use(router);

  return app;
}

// Avvia server express
async function startServer(app: Express, port: Number): Promise<any> {
  return new Promise(function (resolve, reject) {
    let result: any = {
      data: '',
      err: null,
    };
    try {
      app
        .listen(port, () => {
          result.data = `Server ready on port ${port}`;
          resolve(result);
        })
        .on('error', (err: any) => {
          result.err = err;
          resolve(result);
        });
    } catch (error) {
      reject(error);
    }
  });
}

export default {
  initServer,
  startServer,
};
