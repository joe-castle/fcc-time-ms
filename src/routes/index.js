'use strict';

const express = require('express');
const path = require('path');

const app = express();

const tsc = require('../utils/timestampCreator');

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/:timestamp', (req, res) => {
  res.json(tsc(req.params.timestamp));
});

module.exports = app;
