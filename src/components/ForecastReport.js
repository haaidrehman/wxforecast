import { useEffect, useRef } from 'react';
import WeatherTab from './WeatherTab';
import ForecastCard from './ForecastCard';
import { useSelector } from 'react-redux';


let ForecastReport = () => {
    let cityData = useSelector((state) => state.cityData.fiveDayForecast);
    let hourlyForecast = useSelector((state) => state.cityData.hourlyForecast);
    let forecastTabsLoc = useRef();
    let date = new Date().toDateString(4);
    date = date.substr(4).split(' ');
    date = `${date[0]} ${date[1]}, ${date[2]}`;

    useEffect(() => {
        let htmlItem = forecastTabsLoc.current.children;
        Array.from(cityData).forEach((ele, i) => {
            if (htmlItem.item(i) != null) {
                if (parseInt(new Date().toLocaleDateString().substr(0, 4).replace('/', '')) == parseInt(ele.dt_txt.substr(6, 5).replace('-', ''))) {
                    if (!htmlItem.item(i).classList.contains('tab-active')) {
                        htmlItem.item(i).classList.add('tab-active');
                    }
                }
            }

        });
    }, [forecastTabsLoc.current, cityData]);
    return (
        <>
            <div className="bottom-container">
                <div className="bottom-heading">
                    <h5>Today</h5>
                </div>
                <div className="report-link">
                    <p>{date}</p>
                </div>
            </div>
            <div className="col-md-12">

                {
                    <div className="hourly-forecast-tabs">
                        {
                            Array.from(hourlyForecast).map((element) => {
                                return <WeatherTab data={element} />;
                            })
                        }
                    </div>
                }
            </div>

            {
                <div className="forecast-tabs" ref={forecastTabsLoc}>
                    {
                        Array.from(cityData).map((element) => {
                            return <ForecastCard data={element} />;
                        })
                    }
                </div>
            }

        </>
    );
}

export default ForecastReport;