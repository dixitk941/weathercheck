async function fetchAndDisplayWeather() {
    // Show loading animation
    document.getElementById('loading').style.display = 'block';
    
    const city = document.getElementById('city-input').value;
    const apiKey = 'de2eaa21984b743050c2bf8566b0c11d'; // Replace 'YOUR_API_KEY' with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Update climate information
        document.getElementById('climate-info').innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>${data.weather[0].description}</p>
        `;

        // Update climate details
        document.getElementById('wind-info').textContent = `${data.wind.speed} m/s`;
        document.getElementById('humidity-info').textContent = `${data.main.humidity}%`;
        document.getElementById('pressure-info').textContent = `${data.main.pressure} hPa`;
        document.getElementById('temperature-info').textContent = `${data.main.temp} °C`;

        // Update weather condition card
        document.getElementById('weather-condition').style.display = 'block';
        document.getElementById('weather-condition-info').textContent = data.weather[0].main;

        // Show all climate cards
        document.querySelectorAll('.card').forEach(card => {
            card.style.display = 'block';
        });

        // Hide loading animation
        document.getElementById('loading').style.display = 'none';
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Display error message
        document.getElementById('climate-info').innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
        // Hide loading animation
        document.getElementById('loading').style.display = 'none';
    }
}
