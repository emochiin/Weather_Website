import { displayWeather, displayHistory } from './weatherView.js';
import { addToHistory, getHistory, weatherData } from './weatherModel.js';

document
  .getElementById('searchForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();
    const input = document.getElementById('searchBar').value;
    if (!input.trim()) return;
    try {
      const data = await weatherData(input);

      const city = data.name;
      const temp = Math.trunc(data.main.temp);
      const weather = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`;

      displayWeather(city, temp, weather, iconURL);
      addToHistory(city, temp, iconURL);
      displayHistory(getHistory());
    } catch (error) {
      alert(`Stadt nicht gefunden: ${error.message}`);
    }
  });

async function displayDefault() {
  try {
    const data = await weatherData('London');
    const city = data.name;
    const temp = Math.trunc(data.main.temp);
    const weather = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    displayWeather(city, temp, weather, iconURL);
  } catch (error) {
    alert(`Stadt nicht gefunden: ${error.message}`);
  }
}

displayDefault();
