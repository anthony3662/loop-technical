require('dotenv').config();
require('express-async-errors');
const { fetchAndRespond } = require('./fetchAndRespond');
const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
const corsMiddleware = cors({
  origin: '*',
});
app.use(corsMiddleware);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/orders', (req, res) => {
  fetchAndRespond('/orders.json', req, res);
});

app.get('/products', (req, res) => {
  fetchAndRespond('/products.json', req, res);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
