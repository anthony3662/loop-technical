const BASE_URL = 'https://universe-of-birds.myshopify.com/admin/api/2020-04';
const { API_KEY, PASSWORD } = process.env;
const credentials = btoa(`${API_KEY}:${PASSWORD}`);
const headers = {
  Authorization: `Basic ${credentials}`,
  'Content-Type': 'application/json',
};

const fetchAndRespond = (path, req, res) => {
  fetch(BASE_URL + path, {
    method: 'GET',
    headers,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      res.sendStatus(500);
    });
};

module.exports = {
  fetchAndRespond,
};
