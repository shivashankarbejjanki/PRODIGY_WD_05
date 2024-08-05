const apiKey = 'YOUR_API_KEY';
const weatherDataDiv = document.getElementById('weather-data');
const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const currentLocationBtn = document.getElementById('current-location-btn');

locationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value;
    getWeatherData(location);
});

currentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            getWeatherDataByCoords(latitude, longitude);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function getWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function getWeatherDataByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    if (data.cod === 200) {
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherDataDiv.innerHTML = `
            <div class="weather-icon">
                <img src="${iconUrl}" alt="${data.weather[0].description}">
            </div>
            <div class="weather-info">
                <h2>${data.name}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            </div>
        `;
        weatherDataDiv.style.display = 'block';
    } else {
        weatherDataDiv.innerHTML = '<p>Location not found. Please try again.</p>';
        weatherDataDiv.style.display = 'block';
    }
}
