import axios from 'axios';

export let getAirQuality = async (lat, long) => {
    console.log('lat, long', lat, long);
    let key = '4b55fbd06f79af62963f428a9d295ebf';

    let url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${key}`;

    let response = await axios.get(url);

    return response;
}


export let getFourDayWeatherForecast = async (lat = '', long = '', searchedPlace = '') => {
    console.log('lat, long', lat, long);
    let key = '4b55fbd06f79af62963f428a9d295ebf';
    let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}`

    if (searchedPlace != '') {

        url = `http://api.openweathermap.org/data/2.5/forecast?q=${searchedPlace}&appid=${key}`;
        console.log(url);
    }

    let response = await axios.get(url);

    return response;

}


export let getAirQualityDesc = (aqi) => {

    switch (aqi) {
        case 1:
            return 'Good';
        case 2:
            return 'Fair';
        case 3:
            return 'Moderate';
        case 4:
            return 'Poor';
        case 5:
            return 'Very Poor';
        default:
            return '';
    }

}