const debug = require('debug')('foo:server');

/**
 * Funzione usata per il log in tutta app
 * @param {*} args
 */
function log(args) {
  console.log(args);
}

module.exports = log;
