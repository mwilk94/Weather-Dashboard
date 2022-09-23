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
