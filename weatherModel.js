import { API_KEY } from './config.js';

export async function weatherData(searchedName) {
  const GEODATA_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchedName}&limit=1&appid=${API_KEY}`;
  //geodata holen mit Namen per Suche
  const geoResponse = await fetch(GEODATA_URL);
  if (!geoResponse.ok)
    throw new Error(
      `Fehler beim Laden - ${searchedName} konnte nicht gefunden werden.`,
    );
  const geoData = await geoResponse.json();

  //geodata koordinaten nehmen
  const lat = geoData[0].lat;
  const lon = geoData[0].lon;

  //wetterdaten mit den koordinaten ziehen
  const WEATHERDATA_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=de`;
  const weatherResponse = await fetch(WEATHERDATA_URL);
  if (!weatherResponse.ok) throw new Error('Fehler beim Laden');
  const weatherData = await weatherResponse.json();

  return weatherData;
}

const searchHistory = [];

export function addToHistory(cityName, temp, iconURL) {
  if (searchHistory.length === 0 || searchHistory[0].cityName !== cityName) {
    searchHistory.unshift({ cityName, temp, iconURL });

    if (searchHistory.length > 3) {
      searchHistory.pop();
    }
  }
}

export function getHistory() {
  return searchHistory;
}
