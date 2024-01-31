let IMap = new Map();
IMap.set("sunny", "/images/clear.png");
IMap.set("cloudy", "/images/clouds.png");
IMap.set("drizzle", "/images/drizzle.png");
IMap.set("cold", "/images/snow.png");
IMap.set("rainy", "/images/rainy.png");
IMap.set("misty", "/images/mist.png");
IMap.set("windy", "/images/windy.png");
const apiKey = "dc0efc35eb0a5b4a4b97a6b4d466cef5";
const mapApiKey = "82cf2980-bde9-11ee-a7b1-95857434b872";
let lat;
let lon;
let apiUrl_city;
let apiUrl_location;
const weather_search = document.querySelector(".search_btn");
const place_value = document.querySelector(".place");
const temp_value = document.querySelector(".temp");
const humidity = document.querySelector(".humidity_percentage");
const wind_speed = document.querySelector(".wind_speed");
var searchQuery = document.querySelector(".search_place");
const map_btn = document.querySelector(".map_btn");
const location_details = document.querySelector(".location_details");
const map_img = document.querySelector(".map_img");
const display_weather = async (api, query) => {
  let apiURL;
  if (query.lat && query.lon)
    apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${api}&units=metric`;
  else if (query.city)
    apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${query.city}&appid=${api}&units=metric`;
  else console.error;
  const response = await fetch(apiURL);
  var data = await response.json();
  console.log(data);
  display_on_app(data);
};
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    location_details.innerHTML = "Location is not supported by the browser";
  }
}
function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  location_details.innerHTML = `Latitude: ${position.coords.latitude},<br>Longitude: ${position.coords.longitude}`;
  /*var map2 = new google.maps.Map(map_img, {
    center: { lat: position.coords.latitude, lng: position.coords.longitude },
    zoom: 8,
  });*/
  display_weather(apiKey, {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  });
}
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      location_details.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      location_details.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      location_details.innerHTML =
        "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      location_details.innerHTML = "An unknown error occurred.";
      break;
  }
}
map_btn.addEventListener("click", function () {
  console.log("clicked:");
  document.querySelector(".map-box").classList.toggle("display_none");
  getLocation();
});
weather_search.addEventListener("click", function () {
  const city = searchQuery.value;
  display_weather(apiKey, { city: city });
});
function display_on_app(data) {
  let temp = data.main.temp;
  place_value.innerHTML = data.name;
  temp_value.innerHTML = `${temp.toFixed(1)}&deg;c`;
  wind_speed.innerHTML = data.wind.speed;
  humidity.innerHTML = data.main.humidity;
}

/*
async function display_location_weather(api, lat, lon) {
  apiUrl_location = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
  const response = await fetch(apiUrl_location);
  var data = await response.json();
  console.log(data);
}
async function display_city_weather(api, city) {
  apiUrl_city = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
  const response = await fetch(apiUrl_city);
  var data = await response.json();
  console.log(data);
}
*/
