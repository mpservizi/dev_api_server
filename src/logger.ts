const debug = require('debug')('my_app');

/**
 * Funzione usata per il log in tutta app
 */
debug.enabled = true;
export const mDebug = debug;
