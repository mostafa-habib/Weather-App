// api key : 82005d27a116c2880c8f0fcb866998a0
const iconElement1 = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//App data
const weather={

};
weather.temperature = {
    unit:"celsius"
};

//App consts and vars
const kelvin=273;
//API Key
const key="82005d27a116c2880c8f0fcb866998a0";

//check if browser supports geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else {
    notificationElement.style.display="block";
    notificationElement.innerHTML="<p>browser dosn't supports geoloction</p>";
}

//set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}

//show error when there is an issue with gelocation service
function showError(error){
    notificationElement.style.display="block";
    notificationElement.innerHTML='<p>'+error.message+'</p>';
}

function getWeather(latitude,longitude){
    let api='http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+key+'';

    fetch(api)
        .then(function (response){
            let data = response.json();
            return data;
        })
        .then(function (data){
            weather.temperature.value=Math.floor(data.main.temp - kelvin);
            weather.description=data.weather[0].description;
            weather.iconId=data.weather[0].icon;
            weather.city=data.name;
            weather.country=data.sys.country;


        })
        .then(function (){
            displayWeather();
        })

}
//display weather
function displayWeather(){
    iconElement1.innerHTML = '<img src="icons/'+weather.iconId+'.png"/>';
    tempElement.innerHTML = ''+weather.temperature.value+'0<span>C</span>';
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = ''+weather.city+','+weather.country+'';
}

//C TO F
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//when the user click on the temperature Element
tempElement.addEventListener('click',function (){
   if(weather.temperature.value === undefined)return;

   if(weather.temperature.unit == "celsius"){
       let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
       fahrenheit = Math.floor(fahrenheit);
       tempElement.innerHTML = ''+fahrenheit+'0<span>F</span>';
       weather.temperature.unit = "fahrenheit";
   }
   else {
       tempElement.innerHTML = ''+weather.temperature.value+'0<span>C</span>';
       weather.temperature.unit = "celsius";
   }

});