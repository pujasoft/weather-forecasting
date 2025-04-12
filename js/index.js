const locationInput = document.getElementById("location");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const weatherIcon = document.getElementById("weather-icon");

// handle user input in location field
let currentselection = "";

locationInput.addEventListener('input', (event) => {
    currentselection = event.target.value;
});

// handle search button click
searchBtn.addEventListener('click', () => {
    if (currentselection) {
        // Show loading animation
        loading.style.display = 'block';
        output.innerHTML = ''; // Clear previous output
        weatherIcon.style.display = 'none'; // Hide icon during loading

        // Call function
        getWeather(currentselection);
    } else {
        output.textContent = "Please enter city";
        loading.style.display = 'none'; // Ensure loader is hidden
    }
});

// function to fetch weather data from OpenWeatherMap API
function getWeather(location) {
    const apiKey = 'c804ba5f6a69958e92e29fe8b6337e5b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            // Hide loading animation
            loading.style.display = 'none';

            console.log(data);
            const city = data.name;
            const temperature = Math.floor(data.main.temp - 273.15); // converting kelvin to celsius
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;

            // Update output and icon
            output.innerHTML = `Weather in ${city}: ${temperature}°C, ${description}`;
            // weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
            weatherIcon.style.display = 'block';
        })
        .catch(error => {
            console.error(error);
            // Hide loading animation
            loading.style.display = 'none';
            output.textContent = error.message || "Error fetching weather data";
            weatherIcon.style.display = 'none';
        });
}