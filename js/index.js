
const locationInput = document.getElementById("location");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output");

// handle user input in location field
let currentselection = "";

locationInput.addEventListener('input',(event) =>{
    currentselection = event.target.value;
});

// handle search buttob click

searchBtn.addEventListener('click',()=>{
    if(currentselection){
        //calling function
        getWeather(currentselection);
    }
    else{
        output.textContent = "Please enter city";

    }

});

//funtion to fetch weather data from OpenWeatherMap API

function getWeather(location){
    
    const apiKey ='c804ba5f6a69958e92e29fe8b6337e5b';
   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    
    fetch(url).then(response => response.json()).then(data => {
        console.log(data);
        const city = data.name;
        const temperature = Math.floor(data.main.temp - 273.15); // converting kelvin to celcius
        const description = data.weather[0].description;
        output.innerHTML = `Weather in ${city}: ${temperature}°C , ${description}`;

    })
    .catch(error => {
        console.error(error);
        output.textContent = "Error fetching weather data";

    });

    
}

