
const API_KEY = '7d00338e198aa371acbbeafbeca319de';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

let lon, lat;


const cityInput = document.getElementById('city');
const temp = document.getElementById('temp');
const cityName = document.getElementById('name');
const wind = document.getElementById('wind');
const pressure = document.getElementById('perc');
const humidity = document.getElementById('hum');
const weatherIcon = document.getElementById('icon');
function getCurrent() {
  navigator.geolocation.getCurrentPosition(async (result) => {
    const coords = result.coords;
    lon = coords.longitude;
    lat = coords.latitude;

    try {
      
      const response = await fetch(`${BASE_URL}weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
      if (!response.ok) throw new Error('Failed to fetch weather data for current location.');

      const info = await response.json();

     
      cityName.innerHTML = info.name;
      temp.innerHTML = `Temperature: ${info.main.temp}°C`;
      wind.innerHTML = `Wind Speed: ${info.wind.speed} m/s`;
      pressure.innerHTML = `Pressure: ${info.main.pressure} hPa`;
      humidity.innerHTML = `Humidity: ${info.main.humidity}%`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`;
    } catch (error) {
      console.error(error.message);
    }
  });
}


async function search() {
  const city = cityInput.value;
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  try {
   
    const response = await fetch(`${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`);
    if (!response.ok) throw new Error('City not found.');

    const info = await response.json();

    
    cityName.innerHTML = info.name;
    temp.innerHTML = `Temperature: ${info.main.temp}°C`;
    wind.innerHTML = `Wind Speed: ${info.wind.speed} m/s`;
    pressure.innerHTML = `Pressure: ${info.main.pressure} hPa`;
    humidity.innerHTML = `Humidity: ${info.main.humidity}%`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`;
  } catch (error) {
    alert(error.message);
  }
}
getCurrent();
