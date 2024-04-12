import React, { useState } from 'react';

const RealTimeClimateConditions = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [city, setCity] = useState('');

    const fetchAndDisplayWeather = async () => {
        setIsLoading(true);
        const apiKey = 'de2eaa21984b743050c2bf8566b0c11d'; // Replace 'YOUR_API_KEY' with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setWeatherData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Handle error - Display error message to the user
            setIsLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchAndDisplayWeather();
    };

    return (
        <div>
            <div className="header bg-light">
                <div className="container">
                    <div className="row align-items-center py-3">
                        <div className="col">
                            <img src="Screenshot_from_2024-04-11_20-50-55-removebg-preview.png" alt="Logo" />
                        </div>
                        <div className="col-auto">
                            <a href="./userlogin.html" className="btn btn-primary">Login</a>
                        </div>
                        <div className="col">
                            <form id="search-form" className="d-flex" onSubmit={handleSubmit}>
                                <input type="text" id="city-input" className="form-control me-2" placeholder="Enter city name" onChange={(e) => setCity(e.target.value)} />
                                <button type="submit" className="btn btn-primary">Search</button>
                                {isLoading && <div className="loader" id="loader"></div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                {/* Display weather data here */}
            </div>
        </div>
    );
};

export default RealTimeClimateConditions;
