export let handleCoordiants = (coord) => {
    return {
        type: 'coord',
        lat: coord.lat,
        long: coord.long
    }
}

export let setCityData = (data, typeOfdata, removeElementId = null) => {
    return {
        type: typeOfdata,
        data: data,
        removeElement: removeElementId
    }
}


export let setAutocompletePlaces = (data) => {

    return {
        type: 'places',
        places: data
    }
}