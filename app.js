const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

const API_KEY = '6646e501d4e61834e3c8c5109e3a6636';
const lat = '12.772593';
const lon = '77.812062';

app.get('/weather', async (req, res) => {
  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = result.data.list;
    res.render('index.ejs', { data });
  } catch (err) {
    console.error('Error fetching weather:', err.message);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

app.get('/', (req, res) => {
  res.redirect('/weather');
});

app.listen(port, () => {
  console.log('App is Listening');
});










