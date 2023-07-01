const temperatureField = document.getElementsByClassName("temperature")[0];
const city = document.getElementsByClassName("city")[0];
const humidity = document.getElementsByClassName("humidity")[0];
const wind = document.getElementsByClassName("wind")[0];
let inputValue = document.getElementById("input-search");
let subBtn = document.getElementById("submit-input");
let weatherImage = document.getElementsByClassName("weather-image")[0];
let date = document.getElementById("date");
let status = document.getElementById("status");
let tempDetail = document.getElementById("temp-detail");

if(!inputValue.value){
    getWeatherDetail("New Delhi");
}
 
async function getWeatherDetail(inputValue){
    const searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=8ef2c3e8f75996c532a3af6cd1ea6664&units=metric`;
    const response = await fetch(searchUrl);
    if(response.status === 404){
        document.getElementsByClassName("not-match")[0].style.display = "block";
    }
    else{
    let data = await response.json();
    temperatureField.innerHTML = Math.round(data.main.temp) + "°c";
    city.innerHTML = data.name;
    status.innerHTML = data.weather[0].main;
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.toLocaleString("default", {month:"short"});
    const daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
    let days = currentDate.getDay();
    date.innerHTML = `${day} ${month} ${daylist[days].slice(0,3)} `;
    tempDetail.innerHTML = `${Math.round(data.main.temp_max)+"°c"} / ${Math.round(data.main.temp_min)+"°c"}`;
    if(data.weather[0].main === "Clouds"){
        weatherImage.src = "images/clouds.png";
    }
  else if(data.weather[0].main === "Rain"){
       weatherImage.src = "images/rain.png";
   }
    else if(data.weather[0].main === "Mist"){
        weatherImage.src = "images/mist.png";
    }
    else if(data.weather[0].main === "Clear"){
        weatherImage.src = "images/clear.png";
    }
    else if(data.weather[0].main === "Drizzle"){
        weatherImage.src = "images/drizzle.png";
    }

    document.getElementsByClassName("not-match")[0].style.display = "none";

}
}

subBtn.addEventListener("click", ()=> {
    getWeatherDetail(inputValue.value);
})



