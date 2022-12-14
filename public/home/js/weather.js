
const CITY = document.getElementById('city');
const TEMPERATURE = document.getElementById('temperature');
const URL_MAIN = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '8f57cb746c4c1d4b48b7f35eba6f6230';
const UNITS = 'metric';

navigator.geolocation.getCurrentPosition(loadUrl);

function loadUrl(pos) {
  let lat = pos.coords.latitude;
  let long = pos.coords.longitude;
  let url = `${URL_MAIN}?lat=${lat}&lon=${long}&units=${UNITS}&APPID=${API_KEY}`;
  fetchApi(url);
};

   
function fetchApi(url) {
        let json=  fetch(url).then((response) => response.json())
        .then((jsoner) => {
            return jsoner;
                
        });
        const putInsideDocument = async () => {
            const a = await json;
            let temperature = (a.main.temp).toFixed(1);
            CITY.innerText = `${a.name}:`;
            TEMPERATURE.innerText = `${temperature} ºC`;
    }
        
    putInsideDocument();        
};
    
    