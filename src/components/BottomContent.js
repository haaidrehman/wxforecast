import WeatherTab from './WeatherTab';
import { useSelector } from 'react-redux';

let BottomContent = () => {

    let hourlyForecast = useSelector((state) => state.cityData.hourlyForecast);

    let srollTheElement = (e) => {
        console.log(e);
    }

    return (
        <>
            <div className="bottom-container">
                <div className="bottom-heading">
                    <h5>Today</h5>
                </div>
            </div>
            <div className="col-md-12">
                {
                    <div className="hourly-forecast-tabs" onScroll={srollTheElement}>
                        {
                            Array.from(hourlyForecast).map((element) => {
                                return <WeatherTab data={element} />;
                            })
                        }
                    </div>
                }

            </div>
        </>
    );
}

export default BottomContent;