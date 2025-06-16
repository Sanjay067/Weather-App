const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Your OpenWeatherMap API key
const API_KEY = '6646e501d4e61834e3c8c5109e3a6636';

// 🌍 Fixed location: Bengaluru example
const lat = '12.776753';
const lon = '77.5977.817310';

// 🔧 Serve HTML from /public folder
app.use(express.static('public'));

// 📡 Weather API route
app.get('/weather', async (req, res) => {
  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data = result.data;
    res.json({
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    });
  } catch (err) {
    console.error('Error fetching weather:', err.message);
    res.status(500).json({ error: 'Unable to fetch weather data'});
  }
});

// ▶ Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});