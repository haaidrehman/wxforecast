import { combineReducers } from "redux";
import { coordinates, cityData, autocompletePlaces } from './reducers';

export let rootReducer = combineReducers({
    coordinates,
    cityData,
    autocompletePlaces
});
