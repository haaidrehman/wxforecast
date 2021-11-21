import { fahrenheitToCelcius } from './fahrenheitToCelcius';
import { getWeatherIcon } from './getWeatherIcon';

let ForecastCard = ({ data, showCity, children }) => {

    let date = new Date(data.dt_txt);

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayName = days[date.getDay()];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthAndDate = months[date.getMonth()] + ', ' + date.getDate();

    let temp = <span>{fahrenheitToCelcius(data.main.temp)}&deg;C</span>;


    return (
        <>
            <div className="weather-tab forecast-report-card">
                {showCity && <div className="city-name"><h6>{showCity}</h6></div>}
                <div className="weather-info">
                    <div className="some-width">
                        <div className="info">
                            <h5>{dayName}</h5>
                        </div>
                        <div className="info">
                            <h6>{monthAndDate}</h6>

                        </div>
                    </div>
                    <div className="info some-width">
                        <h2>{temp}</h2>
                    </div>
                </div>
                <div className="weather-icon">
                    <img src={getWeatherIcon(data.weather[0].icon)} alt='weather-icon' />
                </div>
                {showCity && children}
            </div>
        </>
    );
}


export default ForecastCard;