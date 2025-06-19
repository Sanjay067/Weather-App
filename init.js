const mongoose = require('mongoose');
const axios = require('axios');

// Your API key and coordinates
const API_KEY = '6646e501d4e61834e3c8c5109e3a6636';
const lat = '12.772593';
const lon = '77.812062';

// Connect to MongoDB and call API
main()
  .then(() => {
    console.log(" Connected to Database");
    askApi();
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

async function main() {
  await mongoose.connect('mongodb://localhost:27017/WeatherApp');
}

// Schema definition


// Fetch and insert data
async function askApi() {
  try {
    const result = await axios.get(
     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data = result.data.list;
    await insertData(data);
    console.log("Weather data inserted into DB");
  } catch (err) {
    console.error("Error fetching weather data:", err.message);
  }
}

// Format and insert data
async function insertData(data) {
  const filterData = data.map((record) => {
    const dateObj = new Date(record.dt_txt);

    const date = dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    const time = dateObj.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return {
      date,
      time,
      por: record.pop.toString(),
      clouds: record.clouds.all.toString()
    };
  });

  await Record.insertMany(filterData);
  console.log(`Inserted ${filterData.length} records`);
}

