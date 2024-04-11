// Function to fetch and display weather data
async function fetchAndDisplayWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = 'de2eaa21984b743050c2bf8566b0c11d'; // Replace 'YOUR_API_KEY' with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        // Display loading animation
        document.getElementById('loader').style.display = 'block';

        // Fetch weather data
        const response = await fetch(url);
        const data = await response.json();

        // Hide loading animation
        document.getElementById('loader').style.display = 'none';

        // Group forecast data by day
        const groupedForecast = groupForecastByDay(data.list);

        // Display weather forecast for the next 7 days
        const weatherForecastContainer = document.getElementById('weather-card-container');
        weatherForecastContainer.innerHTML = ''; // Clear previous forecast

        groupedForecast.forEach(dayData => {
            const date = new Date(dayData[0].dt * 1000); // Convert timestamp to date
            const day = date.toLocaleString('en-US', { weekday: 'long' });
            const temperature = dayData.reduce((acc, curr) => acc + curr.main.temp, 0) / dayData.length;
            const weather = dayData[0].weather[0].main;
            const icon = dayData[0].weather[0].icon;

            // Create card for each day
            const card = document.createElement('div');
            card.classList.add('weather-card');
            card.innerHTML = `
                <h2>${day}</h2>
                <p>${temperature.toFixed(1)}°C</p>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${weather}">
                <p>${weather}</p>
            `;
            weatherForecastContainer.appendChild(card);
        });

        // Display current climate information
        displayClimateInfo(data);

        // Show the weather card container
        weatherForecastContainer.style.display = 'block';
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle error - Display error message to the user
    }
}

// Function to group forecast data by day
function groupForecastByDay(forecast) {
    const groupedForecast = {};
    forecast.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString();
        if (!groupedForecast[day]) {
            groupedForecast[day] = [];
        }
        groupedForecast[day].push(item);
    });
    return Object.values(groupedForecast);
}

// Function to display current climate information
function displayClimateInfo(data) {
    const windSpeed = data.list[0].wind.speed;
    const humidity = data.list[0].main.humidity;
    const pressure = data.list[0].main.pressure;
    const temperature = data.list[0].main.temp;
    const weatherCondition = data.list[0].weather[0].main;

    // Display wind condition
    const windCondition = document.getElementById('wind-condition');
    windCondition.style.display = 'block';
    document.getElementById('wind-info').textContent = `${windSpeed} m/s`;

    // Display humidity condition
    const humidityCondition = document.getElementById('humidity-condition');
    humidityCondition.style.display = 'block';
    document.getElementById('humidity-info').textContent = `${humidity}%`;

    // Display atmospheric pressure condition
    const pressureCondition = document.getElementById('pressure-condition');
    pressureCondition.style.display = 'block';
    document.getElementById('pressure-info').textContent = `${pressure} hPa`;

    // Display temperature condition
    const temperatureCondition = document.getElementById('temperature-condition');
    temperatureCondition.style.display = 'block';
    document.getElementById('temperature-info').textContent = `${temperature}°C`;

    // Display weather condition
    const weatherConditionDiv = document.getElementById('weather-condition');
    weatherConditionDiv.style.display = 'block';
    document.getElementById('weather-condition-info').textContent = weatherCondition;
}

// Event listener for the search button
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    fetchAndDisplayWeather();
});
