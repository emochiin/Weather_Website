export function displayWeather(city, temp, weather, iconURL) {
  document.getElementById('city').innerText = city;
  document.getElementById('temp').innerText = temp + '°C';
  document.getElementById('weather').innerText = weather;
  document.getElementById('icon').src = iconURL;
}

export function displayHistory(searchHistory) {
  let html = '';

  for (const element of searchHistory) {
    html += `
    <li>
      <div class="card">
        <div class="row g-0 align-items-center">
          <div class="col-4">
            <img
              src="${element.iconURL}"
              class="img-fluid rounded-start"
              alt="Wetter Icon"
            />
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title fs-5">${element.cityName}</h5>
              <p class="card-text fs-6">${Math.trunc(element.temp)}°C</p>
            </div>
          </div>
        </div>
      </div>
    </li>`;
  }

  document.getElementById('history').innerHTML = html;
}
