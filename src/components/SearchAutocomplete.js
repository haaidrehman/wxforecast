import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAutocompletePlaces, handleCoordiants } from '../actions';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

let SearchAutocomplete = () => {

    let dispatch = useDispatch();
    let places = useSelector((state) => {
        return state.autocompletePlaces.places
    });

    useEffect(() => {

        let cardAutocomplete = document.querySelector('.card.autocomplete');

        if (places.length) {
            if (!cardAutocomplete.classList.contains('card-active')) {
                cardAutocomplete.classList.add('card-active')
            }

            return;
        }

        if (cardAutocomplete.classList.contains('card-active')) {
            cardAutocomplete.classList.remove('card-active')
        }

    }, [places]);

    let handleChange = async (e) => {

        let regex = new RegExp(/[A-Za-z]+/);

        let text;
        regex.test(e.target.value) ? text = e.target.value : text = '';

        let provider = new OpenStreetMapProvider();

        try {
            let result = await provider.search({ query: text });
            dispatch(setAutocompletePlaces(result));
        }
        catch (error) {
            console.log('catch error', error);
        }

    }

    let locationSelected = (place, lat, long) => {
        let inputBox = document.querySelector('#ls-ib');

        inputBox.value = place;
        dispatch(setAutocompletePlaces([]));

        dispatch(handleCoordiants({ lat: lat, long: long }));
    }

    return (
        <>
            <input type="text" id="ls-ib" className="form-control text-dark" placeholder="Search a location" onChange={handleChange} />
            <div className="card autocomplete">
                <ul>
                    {
                        places.map((el, i) => {
                            return <li key={i} className="list-unstyled" onClick={() => locationSelected(el.raw.display_name, el.raw.lat, el.raw.lon)}>{el.raw.display_name}</li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default SearchAutocomplete;