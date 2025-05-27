const apiKey = "ecfa919c0d2ee8937364982c62573d82"; 

// Función para consultar el clima actual
function getCurrentWeather() {
    const city = document.getElementById("city").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherResult = `
                <h3>Clima Actual en ${data.name}</h3>
                <p>Temperatura: ${data.main.temp}°C</p>
                <p>Descripción: ${data.weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="icono del clima">
            `;
            document.getElementById("weather-result").innerHTML = weatherResult;
        })
        .catch(error => {
            document.getElementById("weather-result").innerHTML = "No se pudo obtener el clima. Intenta nuevamente.";
            console.error(error);
        });
}

// Función para consultar el pronóstico de los siguientes 5 días
function getFiveDayForecast() {
    const city = document.getElementById("city").value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=es&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let forecastResult = "<h3>Pronóstico 5 Días</h3><div class='forecast-container'>";
            data.list.forEach((forecast, index) => {
                if (index % 8 === 0) { 
                    const tempMax = forecast.main.temp_max;
                    let dayClass = `forecast-day day-${Math.floor(index / 8) + 1}`;
                    let backgroundColor = getBackgroundColor(tempMax, forecast.weather[0].main);

                    forecastResult += `
                        <div class="${dayClass}" style="background-color: ${backgroundColor};">
                            <p><strong>Day ${Math.floor(index / 8) + 1}</strong></p>
                            <p>Noche: ${forecast.main.temp_min}°C</p>
                            <p>Dia: ${forecast.main.temp_max}°C</p>
                            <p>${forecast.weather[0].description}</p>
                            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="icono del clima">
                        </div>
                    `;
                }
            });
            forecastResult += "</div>";
            document.getElementById("weather-result").innerHTML = forecastResult;
        })
        .catch(error => {
            document.getElementById("weather-result").innerHTML = "No se pudo obtener el pronóstico. Intenta nuevamente.";
            console.error(error);
        });
}

function getBackgroundColor(tempMax, weather) {
    // Lógica para el color según la temperatura (tonos pastel con opacidad)
    if (tempMax > 30) {
        return "rgba(255, 99, 71, 0.3)";  
    } else if (tempMax > 20) {
        return "rgba(144, 238, 144, 0.4)";  
    } else if (tempMax > 10) {
        return "rgba(176, 224, 230, 0.4)";  
    } else {
        return "rgba(255, 182, 193, 0.4)";  
    }

    if (weather === "Clear") {
        return "rgba(255, 223, 186, 0.4)";  
    } else if (weather === "Rain") {
        return "rgba(173, 216, 230, 0.4)";  
    } else if (weather === "Clouds") {
        return "rgba(211, 211, 211, 0.4)";  
    } else {
        return "rgba(255, 240, 245, 0.4)";  
    }
}


