let cityData
let x = 0
let history = Array()
var name = document.querySelector('#name');
var temp = document.querySelector('#temp');
var hum = document.querySelector('#hum');
var wind = document.querySelector('#wind');
var forecasted = document.querySelector('#forecasted');
var today = new Date()
var dd = today.getDate()
var mm = today.getMonth()
var yyyy = today.getFullYear()
var userHistory = JSON.parse(localStorage.getItem("history") || "[]")
today = mm + '/' + dd + '/' + yyyy
var cityForecastData


for (i = 0; i < userHistory.length; i++) {
    document.querySelector("#saved").innerHTML += `<button onClick="saved(event, '${userHistory[i]}')" class="btn btn-outline-primary">${userHistory[i]}</button>`
}

function input(event) {
    event.preventDefault()
    let cityName = document.querySelector("#searchInput").value
    if (cityName == "") {
        return
    }
    history[x] = document.querySelector("#searchInput").value; x++;
    document.querySelector("#searchInput").value = ""
    console.log(x)
    document.querySelector("#saved").innerHTML = ""
    for (i = 0; i < history.length; i++) {
        document.querySelector("#saved").innerHTML += `<button onClick="saved(event, '${history[i]}')" class="btn btn-outline-primary">${history[i]}</button>`
        localStorage.setItem("history", JSON.stringify(history))
    }
    weather(cityName)
}
function saved(event, cityName) {
    event.preventDefault()
    console.log(cityName)
    weather(cityName)
}

async function weather(cityName) {
    let fetchUrl = "https://api.openweathermap.org/data/2.5/weather?appid=327fecee9f6fad805256a047aec1915c&q=" + cityName

    console.log(`..fetching from ${fetchUrl}`)
    cityData = await fetch(fetchUrl).then(r => r.json())
    var nameValue = cityData['name']
    var img = cityData['weather'][0]['icon']
    var tempValue = cityData['main']['temp']
    var humValue = cityData['main']['humidity']
    var windValue = cityData['wind']['speed']

    userCity.innerHTML = `${nameValue} (${today}) <img src='http://openweathermap.org/img/wn/${img}@2x.png'>`;
    temp.innerHTML = `Temperature: ${tempValue} K`;
    hum.innerHTML = `Humidity: ${humValue}%`;
    wind.innerHTML = `Wind Speed: ${windValue} MPH`;
    futureWeather(cityName)
}

async function futureWeather(cityName) {
    let fetchForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?appid=327fecee9f6fad805256a047aec1915c&q=" + cityName
    forecasted.innerHTML = ""

    cityForecastData = await fetch(fetchForecastUrl).then(r => r.json())

    var forecast = cityForecastData['list']
    for (z = 0; z < forecast.length; z += 8) {
        var forecastDate = forecast[z]['dt_txt']
        var forecastImg = forecast[z]['weather'][0]['icon']
        var forecastTemp = forecast[z]['main']['temp']
        var forecastHum = forecast[z]['main']['humidity']

        forecasted.innerHTML +=
            `<div class="card-body col-1">
                        <h4 class="card-title">${forecastDate}</h4>
                        <img src='http://openweathermap.org/img/wn/${forecastImg}@2x.png'>
                        <p class="card-text">Temperature: ${forecastTemp}K</p>
                        <p class="card-text">Humidity: ${forecastHum}%</p>
                    </div>`
    }


}