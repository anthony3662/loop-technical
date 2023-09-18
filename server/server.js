require('dotenv').config();
require('express-async-errors');
const { getNextPageInfo } = require('./utils/getNextPageInfo');
const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
const corsMiddleware = cors({
  origin: '*',
});
app.use(corsMiddleware);

const BASE_URL = 'https://universe-of-birds.myshopify.com/admin/api/2020-04';
const { API_KEY, PASSWORD } = process.env;
const credentials = btoa(`${API_KEY}:${PASSWORD}`);
const headers = {
  Authorization: `Basic ${credentials}`,
  'Content-Type': 'application/json',
};

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/orders', (req, res) => {
  // fetchAndRespond('/orders.json', req, res);
});

app.get('/products', (req, res) => {
  const { page_info } = req.query;
  const params = new URLSearchParams({
    limit: 10,
    ...(page_info ? { page_info } : {}),
  });

  fetch(`${BASE_URL}/products.json?${params}`, {
    method: 'GET',
    headers,
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const { headers } = response;
      const links = headers.get('Link');
      const pageInfoParams = getNextPageInfo(links);
      const json = await response.json();
      return { ...json, pageInfoParams };
    })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      res.sendStatus(500);
    });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
