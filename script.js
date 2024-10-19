const apiKey='7baedf95c394f45accb45ff5053d8092';
const locationInput = document.getElementById('location-input');
const searchButton = document.getElementById('search-button');
const weatherOutput = document.getElementById('weather-output');
const autocompleteList = document.getElementById('autocomplete-list');


const locations = ["New york","California","Texas","Florida","Alaska","India","Australia","Canada"];

locationInput.addEventListener('input',function() {
  let val = this.Value;
  closeAllLists();
  if (!val) return false;
  let autocompleteItems = document.createElement('div');
  autocompleteItems = setAttribute('id',this.id + 'autocomplete-list');
  autocompleteItems = setAttribute('class', 'autocomplete-items');
  this.parentNode.appendChild(autocompleteItems);

  locations.forEach(location => {
    if (location.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
      let item = document.createElement('div');
      item.innerHTML = "<strong>" + location.substr(0, val.length) + "</strong>";
      item.innerHTML += location.substr(val.length);
      item.innerHTML += "<input type='hidden' value='" + location + "'>";
      item.addEventListener('click', function() {
          locationInput.value = this.getElementsByTagName('input')[0].value;
          closeAllLists();
      });
      autocompleteItems.appendChild(item);
        
    }
    
  });

});

function closeAllLists(elmnt){
  var items = document.getElementsByClassName('autocomplete-items');
  for(let i = 0; i < items.length; i++){
    if(elmnt != items[i] && elmnt != locationInput){
      items[i].parentNode.removeChild(items[i]);
    }
  }
}

document.addEventListener('click', function (e) {
  closeAllLists(e.targets);
});

searchButton.addEventListener('click',function (){
  let location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }

});

async function fetchWeather(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7baedf95c394f45accb45ff5053d8092&units=metric`)
    if(!response.ok) throw new Error('Location not found');
    const weatherData = await response.json();
    displayWeather(weatherData);

  }catch (error) {
    weatherOutput.innerHTML = `<p>${error.message}</p>`;
  }
}

function displayWeather(data) {
  const {name, main, weather} = data;
  weatherOutput.innerHTML = `
    <p>Location: ${name}</p>
    <p>Temperature: ${main.temp} </p>
    <p>Weather: ${weather[0].description}</p>
    <p>Humidity: ${main.humidity}%</p>
    `;
}








