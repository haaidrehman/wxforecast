import placeholder from '../assets/icons/placeholder.png';
import search from '../assets/icons/search.png';
import ForecastCard from './ForecastCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setCityData } from '../actions/index';


let SearchLocation = ({ getSearchedPlaceWeather }) => {

    let cityData = useSelector((state) => state.cityData.searchedLocation);
    let activeBtnIndexs = useSelector((state) => state.cityData.activeBtnIndexs);
    let dispatch = useDispatch();
    let searchInput = useRef();
    let forecastTabsLoc = useRef();
    let activeButtons = [];
    let temp = [];
    console.log(cityData, activeBtnIndexs);
    let validateLocalStorage = (city, index) => {
        let newData = [];
        let tempArray = [];
        if (localStorage.getItem('savedLocation')) {
            let localData = [...JSON.parse(localStorage.getItem('savedLocation')), { [index]: city }];


            for (let obj of localData) {
                for (let [key, val] of Object.entries(obj)) {
                    console.log(key, val);
                    if (!tempArray.includes(val)) {
                        tempArray.push(val);
                        newData.push({ [key]: val });
                    }
                }

            }


        }
        else {

            newData.push({ [index]: city });
        }


        return newData;
    }


    let saveForFutureReference = (city, index) => {

        localStorage.setItem('savedLocation', JSON.stringify(validateLocalStorage(city, index)));
        activeButtons = [];

        [...activeBtnIndexs, index].forEach((e, i) => {
            if (!activeButtons.includes(e)) {
                activeButtons.push(e);
            }

        });
        console.log(activeButtons, activeBtnIndexs);
        dispatch(setCityData(activeButtons, 'activeButtons'));

    }

    let validateCityName = () => {
        if (searchInput.current.value !== '') {
            let takeCityName = 1;
            cityData.forEach((e) => {

                if (searchInput.current.value.toLowerCase().includes(e.data.name.toLowerCase())) {
                    takeCityName = 0;

                }
            });
            if (takeCityName) {
                getSearchedPlaceWeather(searchInput.current.value);

            }
            else {
                alert(`${searchInput.current.value} already exists`);
            }

        }
        searchInput.current.value = '';
    }

    let filterAnArray = (array, index) => {

        let newData = array.filter((element, i) => {

            for (let [key, val] of Object.entries(element)) {
                console.log(key, val);
                if (key != index) {
                    return element;
                }
            }
        });

        return newData;
    }

    let removeTheLocation = (key) => {
        if (localStorage.getItem('savedLocation')) {
            let tempArray = JSON.parse(localStorage.getItem('savedLocation'));


            localStorage.setItem('savedLocation', JSON.stringify(filterAnArray(tempArray, key)));

            dispatch(setCityData('', 'searchedLocation', key));

        }

    }


    useEffect(() => {
        console.log('abcd');

        if (localStorage.getItem('savedLocation')) {
            JSON.parse(localStorage.getItem('savedLocation')).forEach((element, index) => {

                for (let [key, val] of Object.entries(element)) {

                    getSearchedPlaceWeather(val);

                }
            });
        }




    }, []);

    useEffect(() => {
        console.log(temp);
        let localstorage = JSON.parse(localStorage.getItem('savedLocation'));
        if (localStorage.getItem('savedLocation')) {
            if (localstorage.length == cityData.length) {

                localstorage.forEach((e, i) => {

                    for (let [key, val] of Object.entries(e)) {
                        console.log(key, val, i);
                        console.log(cityData[i].data.name);
                        temp.push({ [i]: cityData[i].data.name });
                    }
                    activeButtons.push(i);
                });

                localStorage.setItem('savedLocation', JSON.stringify(temp));
                dispatch(setCityData(activeButtons, 'activeButtons'));

            }
        }

    }, [cityData]);

    useEffect(() => {
        let htmlItem = forecastTabsLoc.current.children.item(0);
        console.log(forecastTabsLoc);
        if (htmlItem != null) {
            console.log(htmlItem);
            if (htmlItem.classList.contains('tab-active')) {
                htmlItem.classList.remove('tab-active');
                console.log('removed');
            }
        }

    }, [forecastTabsLoc.current]);


    return (
        <>
            <div className="col-md-10 col-sm-12">
                <div className="searchbar-container">
                    <div className="searchbar">
                        <span>
                            <img src={search} alt='search icon' />
                        </span>
                        <input type="text" ref={searchInput} className="form-control" placeholder="Search" />
                    </div>
                    <div className="button-holder">
                        <button type="button" onClick={validateCityName}><img src={placeholder} alt='placeholder' /></button>
                    </div>
                </div>
            </div>
            <div className="col-md-12">

                {
                    <div className="forecast-tabs forecastTabsLoc" ref={forecastTabsLoc}>
                        {

                            cityData.map((element, index) => {

                                let className = 'saveButtonInactive';
                                console.log(activeBtnIndexs);
                                for (let i of activeBtnIndexs) {
                                    if (i == index) {
                                        className = 'saveButtonActive';
                                    }

                                }


                                return <>
                                    <ForecastCard data={element.data} showCity={element.data.name} key={index}>
                                        <div className="save-button">
                                            <button className={className} onClick={() => saveForFutureReference(element.data.name, index)}>Save</button>
                                            <button className="delete-btn" onClick={() => removeTheLocation(index)}>Delete</button>
                                        </div>
                                    </ForecastCard>
                                </>
                            })
                        }
                    </div>
                }
            </div>
        </>
    );
}


export default SearchLocation;