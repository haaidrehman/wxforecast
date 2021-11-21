let coordinatesInitialState = { lat: '', long: '' };

export let coordinates = (state = coordinatesInitialState, action) => {

    switch (action.type) {
        case 'coord':
            console.log(action.type);
            return {
                lat: action.lat,
                long: action.long
            };

        default:
            return state;
    }
}


let cityDataInitialState = {
    data: {
        nodata: true
    },
    fiveDayForecast: {

    },
    hourlyForecast: {

    },
    aqi: {
        index: '',
        showIndex: false
    },
    searchedLocation: [],
    activeBtnIndexs: [],
    timeInterval: 0

};

export let cityData = (state = cityDataInitialState, action) => {
    switch (action.type) {
        case 'default':
            return { ...state, data: action.data };
        case 'fiveDayForecast':
            return { ...state, fiveDayForecast: action.data };
        case 'hourlyForecast':
            return { ...state, hourlyForecast: action.data };
        case 'aqi':
            return { ...state, aqi: { ...state.aqi, index: action.data } };
        case 'aqiTrue':
            return { ...state, aqi: { ...state.aqi, showIndex: action.data } };
        case 'searchedLocation':
            // If user wants to remove the location data saved on localstorage
            if (action.removeElement != null) {
                let tempArray = state.searchedLocation.filter((element, index) => {
                    if (action.removeElement != index) {
                        return element;
                    }
                });

                return { ...state, searchedLocation: tempArray };
            }

            /*--------------------------------------------------------------------------------------*/
            let newData = [];
            let tempData = [];

            [...state.searchedLocation, { data: action.data }].forEach((e) => {
                if (!newData.includes(e.data.name.toLowerCase())) {
                    newData.push(e.data.name.toLowerCase());
                    tempData.push({ data: e.data });
                }
            });
            console.log(tempData);
            return {
                ...state, searchedLocation: [...tempData]
            };

        case 'activeButtons':
            return { ...state, activeBtnIndexs: action.data };

        case 'interval':
            return { ...state, timeInterval: action.data };

        default:
            return state;
    }
}


let autocompletePlacesInitialState = { places: [] };

export let autocompletePlaces = (state = autocompletePlacesInitialState, action) => {

    switch (action.type) {
        case 'places':
            return {
                places: action.places
            };

        default:
            return state;
    }
}