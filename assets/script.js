const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('currentWeatherItems');
const weatherForecastEl = document.getElementById('five-day-forecast');
const searchBtn = document.getElementById('searchBtn');
const ApiKey = 'e0bac09d544377cea613b7a883eae4f3';
const updatedCityName = document.getElementById('cityName');

setInterval(() => {
    const time = new Date();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hours12 = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const dayNight = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = hours12 + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + `<span id="am-pm">${dayNight}</span>`;
    dateEl.innerHTML = month + '/' + date;
}, 1000);

searchBtn.addEventListener('click', search);

function search() {
    let cityName2 = document.getElementById('citySearch').value;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName2}&units=imperial&appid=e0bac09d544377cea613b7a883eae4f3`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showWeatherData(data)
        })}


        function showWeatherData(data) {
            let { temp, wind_speed, humidity} = data.list[0].main;
            currentWeatherItemsEl.innerHTML = `
                <div class="weatherItem">
                    <div>Temp:</div>
                    <div>${temp}&#176</div>
                </div>
                <div class="weatherItem">
                <div>Wind:</div>
                <div>${wind_speed}<span id="mph">MPH</span></div>
            </div>
                <div class="weatherItem">
                    <div>Humidity:</div>
                    <div>${humidity}%</div>
                </div>`;

                let name = data.city.name;
                updatedCityName.innerHTML = `${name}`
        }

        

        function updateCity(data) {
            let {wind_speed } = data.list[0].wind;
            currentWeatherItemsEl.innerHTML = `
                <div class="weatherItem">
                    <div>Wind:</div>
                    <div>${wind_speed}<span id="mph">MPH</span></div>
                </div>`;
        }