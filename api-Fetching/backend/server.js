const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
// Serve static files (frontend)
app.use(express.static('public'));

// Define a route to fetch data from the News API
app.get('/api/news', async (req, res) => {
  try {
    const apiKey = 'a91adeedb13d43cd8d61383dd4cc8c70';
    const apiUrl = `https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=${apiKey}`;
    // const category = 

    const response = await axios.get(apiUrl);
    const data = response.data;

    res.send(data); // Send HTML data as a string
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
});
app.get('/api/business', async (req, res) => {
  try {
    const apiKey = 'a91adeedb13d43cd8d61383dd4cc8c70';
    const apiUrl = `https://newsapi.org/v2/everything?q=business&sortBy=publishedAt&apiKey=${apiKey}`;
   

    const response = await axios.get(apiUrl);
    const data = response.data;

    res.send(data); // Send HTML data as a string
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
});
app.get('/api/technology', async (req, res) => {
  try {
    const apiKey = 'a91adeedb13d43cd8d61383dd4cc8c70';
    const apiUrl = `https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&apiKey=${apiKey}`;
   

    const response = await axios.get(apiUrl);
    const data = response.data;

    res.send(data); // Send HTML data as a string
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



