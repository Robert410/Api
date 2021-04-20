API_KEY = "34986fbca3cb36abf84856d2989e4ece";

const fivedays = ( (new Date(2019,10,10,0,0,0,0).getTime()) - (new Date(2019,10,5,0,0,0,0).getTime()) ) / 1000;
const oneday = ( (new Date(2019,10,10,0,0,0,0).getTime()) - (new Date(2019,10,9,0,0,0,0).getTime()) ) / 1000;

let latt = 44.439663;
let longg = 26.096306;

console.log(latt,longg);
urlCurrent = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latt + "&lon=" + longg + "&units=metric&appid=" + API_KEY;
urlFormer = "http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" + latt + "&lon=" + longg + "&units=metric&appid=" + API_KEY;


function getData(){
    let lat= document.getElementById("latInput").value;
    let long= document.getElementById("longInput").value;
    latt = lat;
    longg = long;
    urlCurrent = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latt + "&lon=" + longg + "&units=metric&appid=" + API_KEY;
    urlFormer = "http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" + latt + "&lon=" + longg + "&units=metric&appid=" + API_KEY;
    getFormerData(urlFormer);
    console.log(lat,long);
}


getFormerData(urlFormer);

async function getFormerData(url){
    var ts = Math.round((new Date()).getTime() / 1000);
    ts = ts - fivedays;
    url = url + "&dt=";
    for(var i=0; i<=4; i++){
        const response = await fetch(url + ts);
        var data = await response.json();

    }
    temperature = data.current.temp;
    description = data.current.weather[0].description;
    pressure = data.current.pressure;
    humidity = data.current.humidity;
    windspeed = data.current.wind_speed;
    temperatureText = document.getElementById("temperature");
    temperatureDescription = document.getElementById("temperatureDescription");
    pressureText = document.getElementById("pressure");
    humidityText = document.getElementById("humidity");
    windspeedText = document.getElementById("windspeed");
    temperatureText.textContent = temperature + '\u2103';
    temperatureDescription.textContent = description;
    humidityText.textContent = humidity + "%";
    windspeedText.textContent = ((Number(windspeed) * 3.6).toPrecision(6)).toString() + " Km/h";
    pressureText.textContent = pressure + " hPa";
    document.getElementById("location").innerHTML="Your location is: " + data.timezone;
    console.log(data)
    console.log(data.current.weather[0].description);
}
