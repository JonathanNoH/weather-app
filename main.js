const getLocation = async function(location) {
  /* takes in a string and returns an array of objects */
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=2&appid=235dd83d0d175f0b967951e751756988`);
    const geoData = await response.json();
    return geoData[0];
  } catch (error) {
    console.log(error);
  }
}

const getWeatherData = async function(lat, lon) {
  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=235dd83d0d175f0b967951e751756988`);
  const weatherData = await weatherResponse.json();
  console.log(weatherData);
  return weatherData;
}

const updateWeather = async function(location) {
  /* takes in a string and returns an object */
  try {
    const locationData = await getLocation(location);
    if (typeof locationData === 'undefined') {
      console.log('oops location');
      return;
    }
    updateLocationDom(locationData);
    const weatherData = await getWeatherData(
      locationData.lat, locationData.lon
      );
    currentWeatherObj = weatherData;
    updateWeatherDom(weatherData);
  } catch (error) {
    console.log(error);
    return;
  }
}

const updateLocationDom = function(locationObj) {
  /* takes in an object */
  cityDom.innerText = locationObj.name + ', ';
  countryDom.innerText = locationObj.country;
}

const toCFromK = function(num) {
  return +(num - 273.15).toFixed(1);
}

const updateWeatherDom = function(weatherObj) {
  if (typeof currentWeatherObj === 'undefined') return;
  currentConditionsDom.innerText = weatherObj.weather[0].description;
  //Kelvin nums
  tempDom.innerText = `${toCFromK(weatherObj.main.temp)}°C`;
  feelsLikeDom.innerText = `${toCFromK(weatherObj.main['feels_like'])}°C`;
  tempMinDom.innerText = `${toCFromK(weatherObj.main['temp_min'])}°C`;
  tempMaxDom.innerText = `${toCFromK(weatherObj.main['temp_max'])}°C`;
  //End Kelvin nums
  humidityDom.innerText = `${weatherObj.main.humidity}%`;
  windDom.innerText = `${weatherObj.wind.speed} km/h`;
}
//form DOM
const form = document.querySelector('form');
const locationInput = document.querySelector('#fLocation');
//location DOM
const cityDom = document.querySelector('.city');
const countryDom = document.querySelector('.country'); 
//weather DOM
const currentConditionsDom = document.querySelector('span.conditions');
const tempDom = document.querySelector('span.temp');
const feelsLikeDom = document.querySelector('span.feels-like');
const tempMinDom = document.querySelector('span.temp-min');
const tempMaxDom = document.querySelector('span.temp-max');
const pressureDom = document.querySelector('span.pressure');
const humidityDom = document.querySelector('span.humidity');
const windDom = document.querySelector('span.wind');
//global obj
let currentWeatherObj;

const submitHandler = function(event) {
  if (locationInput.value == "") return;
  try {
    updateWeather(locationInput.value);
  } catch (error) {
    console.log(error);
  }
  event.preventDefault();
}

form.addEventListener('submit', submitHandler);