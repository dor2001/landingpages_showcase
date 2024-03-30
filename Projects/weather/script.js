const apiKey = '6bd5b850178e2134497c4b965fbaf54e';
const unitType = 'metric';

document.getElementById('searchButton').addEventListener('click', function() {
  const searchTerm = document.getElementById('searchInput').value;
  fetchWeatherData(searchTerm);
});

function fetchWeatherData(searchTerm) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=${unitType}`)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
      fetchForecastData(data.coord.lat, data.coord.lon);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Could not find the area');
    });
}

function displayCurrentWeather(data) {
  let weatherInfo = document.getElementById('weatherInfo');
  const weatherIcons = {
  'Clear': `
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(237, 244, 251);"><path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19H12.998V22H10.998zM10.998 2H12.998V5H10.998zM1.998 11H4.998V13H1.998zM18.998 11H21.998V13H18.998z"></path><path transform="rotate(-45.017 5.986 18.01)" d="M4.487 17.01H7.487V19.01H4.487z"></path><path transform="rotate(-45.001 18.008 5.99)" d="M16.508 4.99H19.509V6.99H16.508z"></path><path transform="rotate(-134.983 5.988 5.99)" d="M4.487 4.99H7.487V6.99H4.487z"></path><path transform="rotate(134.999 18.008 18.01)" d="M17.008 16.51H19.008V19.511000000000003H17.008z"></path></svg>
  `,
  'Clouds': `
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(237, 244, 251);"><path fill-rule="evenodd" d="M4.887 7.2l-.964-.165A2.5 2.5 0 103.5 12h10a1.5 1.5 0 00.237-2.981L12.7 8.854l.216-1.028a4 4 0 10-7.843-1.587l-.185.96zm9.084.341a5 5 0 00-9.88-1.492A3.5 3.5 0 103.5 13h9.999a2.5 2.5 0 00.394-4.968c.033-.16.06-.324.077-.49z" clip-rule="evenodd"></path></svg>
  `,
  'Rain': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="none" d="M0 0h24v24H0z"/>
      <path d="M12 18v-2c-2.76 0-5-2.24-5-5s2.24-5 5-5c1.18 0 2.27.42 3.13 1.11A4.98 4.98 0 0 0 7 11c-3.31 0-6 2.69-6 6v2h2v-2c0-2.21 1.79-4 4-4 .34 0 .68.04 1 .09C6.1 14.54 5 16.2 5 18c0 2.21 1.79 4 4 4s4-1.79 4-4v-2h2zM7 13c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3c0-1.18-.69-2.19-1.68-2.65l-1.8-4.46A2.006 2.006 0 0 0 7 7c-1.1 0-2 .9-2 2s.9 2 2 2zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
    </svg>
  `,
  'Snow': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="none" d="M0 0h24v24H0z"/>
      <path d="M11 17v-2h2v2h-2zm0-8v-2h2v2h-2zm0 4v-2h2v2h-2zm10-4h-2v2h2v-2zm0 4h-2v2h2v-2zm-8 6v-2h2v2h-2zm0-4v-2h2v2h-2zm0-4v-2h2v2h-2zm-4 8v-2h2v2h-2zm0-4v-2h2v2h-2zm0-4v-2h2v2h-2z"/>
    </svg>
  `,
  'Thunderstorm': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="none" d="M0 0h24v24H0z"/>
      <path d="M16.5 10h2l-4 7v-5h-2l4-7v5zM11 10h2v7h-2v-7zm-5.42-.72l1.79-.68 4.01 10.53-1.79.69z"/>
    </svg>
  `,
  'Mist': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="none" d="M0 0h24v24H0z"/>
      <path d="M9 9c-3.87 0-7 3.13-7 7s3.13 7 7 7h6c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9h2c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7H9c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.52 0 2.92.49 4.08 1.32l1.4-1.4A10.02 10.02 0 0 0 9 2C4.03 2 0 6.03 0 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"/>
    </svg>
  `,
  'Fog': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="none" d="M0 0h24v24H0z"/>
      <path d="M13.5 13h-5v-2h5v2zm-2-6h-3v2h3V7zm5 2h-7v2h7V9zm2-6h-9v2h9V3zM10.5 19h3v-2h-3v2zm6 0h3v-2h-3v2zm1.06-7.8l-1.78 1.77 1.27 1.27 1.78-1.78-1.27-1.27zM4.22 6.34l-1.27 1.27 1.78 1.78 1.27-1.27-1.78-1.78zM12 11.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"/>
    </svg>
  `,
};

const capitalizedDescription = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);

const weatherIcon = weatherIcons[data.weather[0].main];
  weatherInfo.innerHTML = `
    <div class="flex">
    <h2 lang="he"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" font-size="16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z"></path></svg>${data.name}<br><p class="temp">${Math.round(data.main.temp)}°C</p></h2>
    <div class="section">
    <p>${capitalizedDescription}</p>
    ${weatherIcon}
    </div>
    </div>
    <div class="tags">
    <p class="tag"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-miterlimit="10" stroke-width="32" d="M400 320c0 88.37-55.63 144-144 144s-144-55.63-144-144c0-94.83 103.23-222.85 134.89-259.88a12 12 0 0118.23 0C296.77 97.15 400 225.17 400 320z"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M344 328a72 72 0 01-72 72"></path></svg> ${data.main.humidity}%</p>
    <p class="tag"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg> ${data.wind.speed} m/s</p>
    </div>
  `;
}

function fetchForecastData(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unitType}`)
    .then(response => response.json())
    .then(data => {
      const hourlyData = data.list.filter(item => item.dt_txt.includes('15:00') || item.dt_txt.includes('18:00') || item.dt_txt.includes('21:00') || item.dt_txt.includes('00:00') || item.dt_txt.includes('03:00') || item.dt_txt.includes('06:00') || item.dt_txt.includes('09:00'));
      const limitedData = hourlyData.slice(0, 7); // Limit to 7 items
      displayForecast(limitedData);
    })
    .catch(error => {
      console.error('Error fetching forecast data:', error);
    });
}

function displayForecast(data) {
  const swiperWrapper = document.getElementById('hourlyForecastWrapper');
  const slides = data.map(item => `
    <div class="swiper-slide">
      <div class="weather-info">
        <p class="time">${item.dt_txt.split(' ')[1]}</p>
        <p class="O">${Math.round(item.main.temp)}°C</p>
      </div>
    </div>
  `);
  console.log(swiperWrapper);
  swiperWrapper.innerHTML = slides.join('');

  const swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next1',
    prevEl: '.swiper-button-prev1',
  },
});
}