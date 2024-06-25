const APIKEY = "d7a746175dd939b735dd11e93272dbfc";

let inputEl = document.querySelector(".input-data");
let formEl = document.querySelector("form");
let WeatherDataEl = document.querySelector(".Weather-data");
let countryEl = document.querySelector(".country");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const locationData = inputEl.value;
  getWeatherData(locationData);
});
async function getWeatherData(locationData) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationData}&appid=${APIKEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response is not ok");
    }
    const data = await response.json();
    console.log(data);
    let country = data.sys.country;
    let name = inputEl.value;
    let temp = Math.round(data.main.temp);
    let icon = data.weather[0].icon;
    let description = data.weather[0].description;
    let details = [
      `Wind: ${data.wind.speed}km/h`,
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Pressure: ${data.main.pressure}p`,
      `Maximum Temperature: ${Math.round(data.main.temp_max)}°`,
    ];
    WeatherDataEl.querySelector(".name").innerHTML = name;
    countryEl.innerHTML = country;
    WeatherDataEl.querySelector(".temp").innerHTML = `${temp}°`;
    WeatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="" />`;
    WeatherDataEl.querySelector(".description").innerHTML = description;
    WeatherDataEl.querySelector(".bottom").innerHTML = details
      .map((e) => `<div>${e}</div>`)
      .join("");
  } catch (error) {
    WeatherDataEl.querySelector(".name").innerHTML = "";
    countryEl.innerHTML = "";
    WeatherDataEl.querySelector(".temp").innerHTML = "";
    WeatherDataEl.querySelector(".icon").innerHTML = "";
    WeatherDataEl.querySelector(".description").innerHTML =
      "Something went wrong, please try again";
    WeatherDataEl.querySelector(".bottom").innerHTML = "";
  }
}
