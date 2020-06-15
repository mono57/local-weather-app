var WEATHER_API = "https://fcc-weather-api.glitch.me/api";

$(document).ready(function () {
  function getCurrentPosition() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve(position.coords);
        },
        function (error) {
          reject(error);
        }
      );
    });
  }

  async function getWeatherInfo(callback) {
    var coords = await getCurrentPosition();
    console.log(coords);
    var endPoint = `${WEATHER_API}/current?lon=${coords.longitude}&lat=${coords.latitude}`;

    $.get(endPoint, function (data, status) {
      console.log(status);
      callback(data);
    });
  }
  (function () {
    getWeatherInfo(function (data) {
      const { weather, main, name, sys } = data;
      console.log(weather.icon);
      $("#w-temp").html(main.temp);
      $("#w-city").html(`${name}, ${sys.country}`);
      $("#w-icon").attr("src", weather.icon);
    });
  })();
});
