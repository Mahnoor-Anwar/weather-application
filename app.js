const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) =>{
    const cityDets = data.cityDets;
    const weatherDets = data.weatherDets;

    details.innerHTML = `
    <h5 "my-3">${cityDets.EnglishName}</h5>
    <div class="my-3"${weatherDets.WeatherText}</div>
    <div class=" display-4 my-4">
    <span>${weatherDets.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
    </div>
`;

const icons = `img/icons/${weatherDets.WeatherIcon}.svg`;
icon.setAttribute('src' , icons);

let times = null;
if(weatherDets.IsDayTime){
    times ='img/day.svg';
}
else{
    times = 'img/night.svg';
}
time.setAttribute('src' , times);
};



const updateCity = async(city) =>{
    const cityDets = await getCity(city);
    const weatherDets = await getWeather(cityDets.Key);
    
    return {
        cityDets: cityDets,
        weatherDets: weatherDets
    };
}

cityForm.addEventListener('submit' , e =>{
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
    .then(data => updateUI(data))
    .catch(err =>   console.log(err));
    
})
