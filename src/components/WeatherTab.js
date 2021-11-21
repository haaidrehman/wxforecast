import { fahrenheitToCelcius } from './fahrenheitToCelcius';
import { getWeatherIcon } from './getWeatherIcon';
import { useRef } from 'react';

let WeatherTab = ({ data }) => {
    let time = '';
    let temp = '';
    let weatherImage = '';
    let weatherTab = useRef();
    let date;
    if (typeof data != 'undefined') {

        time = new Date(data.dt_txt);
        time = time.toLocaleTimeString().replace(':00', '');

        temp = <span>{fahrenheitToCelcius(data.main.temp)}&deg;</span>;
        weatherImage = getWeatherIcon(data.weather[0].icon);
        date = new Date(data.dt_txt).toDateString();
    }


    return (
        <>
            <div ref={weatherTab} className="weather-tab">
                <div className="fixed-pos-date">
                    {date.substr(4, 6)}
                </div>
                <div className="weather-icon">
                    {(weatherImage !== 'no-icon' && weatherImage !== '') ? <img src={weatherImage} alt='weather-icon' /> : ''}

                </div>

                <div className="weather-info">
                    <div className="info">
                        <h6>{time}</h6>
                    </div>
                    <div className="info">
                        <h5>{temp}</h5>
                    </div>
                </div>
            </div>
        </>
    );
}


export default WeatherTab;