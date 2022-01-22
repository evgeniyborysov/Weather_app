const cityName = document.getElementById("city-name");
const cityTemp = document.getElementById("temp");
const weatherDescription = document.getElementById("weather");
const feelsLike = document.querySelector(".feels");
const minTempBlock = document.querySelector(".min-tmp");
const maxTempBlock = document.querySelector(".max-tmp");

function getWeather() {
    const cityID = document.getElementById("select").value;
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=3d97e9d4f60b0aedade8902356a4b14c`
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            drowWeather(data);
        });
}

function getDegreesCelsius(temp) {
    temp = temp - 273.15;
    return temp.toFixed();
}

function drowTemp(temp, block) {
    if (temp == 0) {
        block.innerHTML = `${temp}&#176c`;
    } else if (temp > 0) {
        block.innerHTML = `+${temp}&#176c`;
    } else {
        block.innerHTML = `${temp}&#176c`;
    }
}

function drowWeather(data) {
    let temp = getDegreesCelsius(data.main.temp);
    let fellsLikeTemp = getDegreesCelsius(data.main.feels_like);
    let minTemp = getDegreesCelsius(data.main.temp_min);
    let maxTemp = getDegreesCelsius(data.main.temp_max);
    drowTemp(temp, cityTemp);
    drowTemp(fellsLikeTemp, feelsLike);
    drowTemp(minTemp, minTempBlock);
    drowTemp(maxTemp, maxTempBlock);
    cityName.innerHTML = data.name;
    weatherDescription.innerHTML = data.weather[0].main;
}

getWeather();
document.querySelector(".city").onchange = getWeather;
