var weatherApiKey = "d91f911bcf2c0f925fb6535547a5ddc9";

$(".forecast").hide();
$(".current-weather").hide();
getSearchLists();

$("#city-list").on("click", "button", function (event) {
  event.preventDefault();

  var city = $(this).text();
  console.log(city);

  cityWeather(city);
});

function cityWeather(city) {
  $(".current-weather").show();
  $(".forecast").show();

  var weatherApiUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    weatherApiKey;

  $.ajax({
    url: weatherApiUrl,
    method: "GET",
  }).then(function (data) {
    currentForeCast(city);
    fiveDayForecast(data);
    $("#search-input").val("");
  });
}

function fiveDayForecast(data) {
  $("#five-day-forecast").empty();

  for (var day = 0; day < data.list.length; day++) {
    var date = data.list[day].dt_txt.split(" ")[0];
    var time = data.list[day].dt_txt.split(" ")[1];

    if (time === "15:00:00") {
      var icon = data.list[day].weather[0].icon;
      var temperature = data.list[day].main.temp;
      var fahrenheit = ((temperature - 273.15) * 1.8 + 32).toFixed(2);
      var wind = data.list[day].wind.speed;
      var humidity = data.list[day].main.humidity;

      var appendBlock = `<div class="card col-md-2 mx-3 my-3 bg-dark text-white">
                            <div class="card-body p-3 forecast-body">
                                <h4 class="card-title">${date}</h4>
                                <img src="https://openweathermap.org/img/w/${icon}.png"></img>
                                <p class="card-text forecast-temp">Temperature: ${fahrenheit}°F</p>
                                <p class="card-text forecast-wind">Wind Speed: ${wind}MPH</p>
                                <p class="card-text forecast-humidity">Humidity: ${humidity}%</p>
                            </div>
                          </div>`;

      $("#five-day-forecast").append(appendBlock);
    }
  }
}

function currentForeCast(city) {
  var city = $("#search-input").val().trim();

  var weatherApiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    weatherApiKey;
  $.ajax({
    url: weatherApiUrl,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    $("#current-city-forecast").empty();

    var cityName = data.name;
    var date = moment().format("MMM Do YYYY");
    var icon = data.weather[0].icon;
    var temperature = data.main.temp;
    var fahrenheit = ((temperature - 273.15) * 1.8 + 32).toFixed(2);
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    console.log(humidity);
    var appendBlock = `<div class="card>
                        <div class="card-body">
                            <h4 class="card-title">${cityName} Today</h4>
                            <h4 class="card-title">${date}
                                <img src="https://openweathermap.org/img/w/${icon}.png"></img>
                            </h4>
                            <p class="card-text current-temp">Temperature: ${fahrenheit}°F</p>
                            <p class="card-text current-wind">Wind Speed: ${wind}MPH</p>
                            <p class="card-text current-humidity">Humidity: ${humidity}%</p>
                            <p class="card-text current-uv"></p>
                        </div>
                       </div>`;

    $("#current-city-forecast").append(appendBlock);

    var latitude = data.coord.lat;
    var longitude = data.coord.lon;
    var uvURL =
      "http://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=" +
      weatherApiKey +
      "&q=&lat=" +
      latitude +
      "&lon=" +
      longitude;
    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (data) {
      console.log(data);
      var uvValue = data[0].value;
      var appendBlock = ``;

      if (uvValue > 8.5) {
        appendBlock = `<button class="btn btn-danger">UV Index: ${uvValue}</button>`;
      } else if (uvValue > 5) {
        appendBlock = `<button class="btn btn-warning">UV Index: ${uvValue}</button>`;
      } else {
        appendBlock = `<button class="btn btn-success">UV Index: ${uvValue}</button>`;
      }

      $(".current-uv").append(appendBlock);
    });
  });
}
