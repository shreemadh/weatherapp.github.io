document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "bd5e378503939ddaee76f12ad7a97608";
    const fetchWeatherButton = document.getElementById("fetchWeather");
    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");

    fetchWeatherButton.addEventListener("click", function () {
        const city = cityInput.value;

        // Check if the city input is empty or contains only spaces
        if (city.trim() === "") {
            alert("Please enter a city name.");
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        // Fetch weather data from the OpenWeatherMap API
        fetch(apiUrl)
            .then((response) => {
                // Check if the response status is OK
                if (response.ok) {
                    return response.json();
                } else {
                    // Handle HTTP errors
                    throw new Error("Network response was not OK");
                }
            })
            .then((data) => {
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;

                const weatherOutput = `
                    <p>Temperature: ${temperature}&#8451;</p>
                    <p>Weather: ${weatherDescription}</p>
                `;

                weatherResult.innerHTML = weatherOutput;
            })
            .catch((error) => {
                console.error("There is an error", error);
                weatherResult.innerHTML = "Weather data not available";
            });
    });
});