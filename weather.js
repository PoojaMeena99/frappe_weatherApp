const button = document.getElementById("fetch-btn");
button.addEventListener("click", function () {
    const cityInput = document.getElementById("city-input").value;
    if (cityInput) {
        fetchWeatherData(cityInput);
    } else {
        alert("Please enter a city name");
    }
});

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=a004ceab0143afc59d180cf15c595df2`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error("Error fetching the weather data:", error);
            const weatherDataDiv = document.getElementById("weather-data");
            weatherDataDiv.innerHTML = `<p>Error fetching data for ${city}: ${error.message}</p>`;
        });
}

function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById("weather-data");
    weatherDataDiv.innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity} %</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
        <p><strong>Min Temperature:</strong> ${data.main.temp_min} °C</p>
        <p><strong>Max Temperature:</strong> ${data.main.temp_max} °C</p>
        <p><strong>Visibility:</strong> ${data.visibility} m</p>
        <p><strong>Cloudiness:</strong> ${data.clouds.all} %</p>
    `;
}
