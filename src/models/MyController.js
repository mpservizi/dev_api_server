/**
 * Wrapper interno al router di express
 * Serve per passare i dati tra client e service
 */
const express = require('express');

function buildController() {
  let result = {
    router: express.Router(),
  };
  return result;
}

module.exports = buildController();
