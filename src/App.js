import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/Header';
import MainCard from './components/MainCard';
import BottomContent from './components/BottomContent';
import ForecastReport from './components/ForecastReport';
import SearchLocation from './components/SearchLocation';
import Navbar from './components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { handleCoordiants, setCityData } from './actions';
import { getFourDayWeatherForecast, getAirQuality, getAirQualityDesc } from './components/getCityWeatherCondition';
import SearchAutocomplete from './components/SearchAutocomplete';
import icon from './assets/icons/icon-refresh.png';


function App() {

  let coordinateState = useSelector((state) => state.coordinates);
  let cityData = useSelector((state) => state.cityData);
  let dispatch = useDispatch();
  let { lat, long } = coordinateState;
  let reloadBtnImage = useRef();


  let locationAccessError = (error) => {
    if (error.PERMISSION_DENIED) {
      alert('Location access denied');
    }
  }

  useEffect(() => {

    if (window.navigator.geolocation) {
      console.log('can access');
      window.navigator.geolocation.getCurrentPosition((position) => {
        dispatch(handleCoordiants({ lat: position.coords.latitude, long: position.coords.longitude }));

      },
        locationAccessError
      );
    }
    else {
      console.log("can't access");
    }



  }, []);

  console.log(lat, long);
  useEffect(() => {
    console.log(lat, long);
    if (lat !== '' && long !== '') {
      console.log(lat, long);
      getFourDayWeatherForecast(lat, long).then((result) => {

        let tempData = [];
        let tempArray = [];
        result.data.list.forEach((el) => {

          if (!tempArray.includes(el.dt_txt.substr(8, 2))) {
            tempArray.push(el.dt_txt.substr(8, 2));
            tempData.push(el);
          }

        });

        let details = {
          ...result.data.list[0],
          name: result.data.city.name
        }
        dispatch(setCityData(details, 'default'));
        dispatch(setCityData(tempData, 'fiveDayForecast'));
        dispatch(setCityData(result.data.list, 'hourlyForecast'));

      }).catch((result) => {
        console.log('Daily forecast', result);
      });


      getAirQuality(lat, long).then((result) => {
        console.log('Air Quality', result);
        dispatch(setCityData(result.data.list[0].main.aqi, 'aqi'));
      }).catch((result) => {
        console.log('Air Quality Error', result);
      });
    }

  }, [lat, long]);


  let reloadPage = () => {
    console.log(reloadBtnImage);
    if (!reloadBtnImage.current.classList.contains('rotate-image')) {
      reloadBtnImage.current.classList.add('rotate-image');
      setTimeout(() => {
        reloadBtnImage.current.classList.remove('rotate-image');
        dispatch(setCityData(cityData.timeInterval + 1, 'interval'));
      }, 700);
    }

  }

  let displayAQI = (e) => {
    cityData.aqi.showIndex === true ? dispatch(setCityData(false, 'aqiTrue')) : dispatch(setCityData(true, 'aqiTrue'));

    if (e.target.classList.contains('tabs-button-active')) {
      e.target.classList.remove('tabs-button-active');
    }
    else {
      e.target.classList.add('tabs-button-active');
    }


  }


  let getSearchedPlaceWeather = (place, HPSearch = false) => {

    getFourDayWeatherForecast('', '', place).then((result) => {

      let data = {
        ...result.data.list[0],
        name: result.data.city.name
      }

      if (HPSearch) {

      }
      dispatch(setCityData(data, 'searchedLocation'));
    }).catch((err) => {


    });

  };


  return (
    <>
      <BrowserRouter>
        <div className="main-section">
          <div className="reload" onClick={reloadPage}>
            <img ref={reloadBtnImage} src={icon} />
          </div>
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/">
                <div className="row">

                  <div className="col-md-6">
                    <SearchAutocomplete />
                    {typeof (cityData.data.name) != undefined ? <Header cityName={cityData.data.name} displayAQI={displayAQI} /> : <Header displayAQI={displayAQI} />}
                    {/* AQI */}
                    {cityData.aqi.showIndex === true ?
                      <div className="weather-tab forecast-report-card AQI">
                        <div className="weather-info AQI">
                          <div>
                            <h5>Air Quality</h5>
                          </div>
                          <div>
                            <h3>{getAirQualityDesc(cityData.aqi.index)}</h3>
                          </div>
                        </div>
                      </div>
                      : ''}

                    {/* AQI */}
                  </div>
                  <div className="col-md-6">
                    <div className="align-card-center">
                      <MainCard weatherData={cityData.data} aqi={cityData.aqi.index} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <BottomContent />
                </div>
              </Route>
              <Route exact path="/forecast">
                <div className="row">
                  <ForecastReport />
                </div>
              </Route>
              <Route exact path="/quick-location">
                <div className="row">
                  <SearchLocation getSearchedPlaceWeather={getSearchedPlaceWeather} />
                </div>
              </Route>
            </Switch>

          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
