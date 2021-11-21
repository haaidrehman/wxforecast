import { fahrenheitToCelcius } from './fahrenheitToCelcius';
import { getWeatherIcon } from './getWeatherIcon';

let MainCard = ({ weatherData, aqi }) => {
    let temp = '';
    let humidity = '';
    let windSpeed = '';
    let weatherImageURL = '';
    console.log('MainCard', weatherData, aqi);
    if (typeof (weatherData.nodata) == 'undefined') {
        temp = <span>{fahrenheitToCelcius(weatherData.main.temp)}&deg;C</span>;
        humidity = <span>{weatherData.main.humidity}%</span>;
        windSpeed = <span>{(parseInt(weatherData.wind.speed) * 18) / 5} km/h</span>;
        weatherImageURL = weatherData.weather[0].icon;
    }


    return (
        <>
            <div className="card main-card" style={{ width: '18rem' }}>
                {getWeatherIcon(weatherImageURL) !== 'no-icon' ? <img src={getWeatherIcon(weatherImageURL)} className="card-img-top" alt="..." /> : ''}

                <div className="card-body weather-short-info-bg">
                    <div className="weather-short-info">
                        <div className="info">
                            <p>Temp</p>
                            <h6>{temp}</h6>
                        </div>
                        <div className="info">
                            <p>Wind</p>
                            <h6>{windSpeed}</h6>
                        </div>
                        <div className="info">
                            <p>Humidity</p>
                            <h6>{humidity}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainCard;