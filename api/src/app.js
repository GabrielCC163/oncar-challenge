const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
require('dotenv').config();

app.use(express.json());
app.use('/veiculos', routes);

module.exports = app;
