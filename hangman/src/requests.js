const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    if(response.status === 200){
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to get puzzle')
    }
}

const getCountry = async (countryCode) => {
    const response = await fetch('http://restcountries.eu/rest/v2/all')
        if(response.status === 200){
            let data = await response.json()
            return data.find((item) => item.alpha2Code === countryCode)
        }else{
            throw new Error('Unable to fetch country name')   
        }
}

const getLocation = async() => {
    const response = await fetch('http://ipinfo.io/json?token=8a4f232d85ac3d')
    if(response.status === 200) {
        return response.json()
    }else{
            throw new Error('Unable to find location')
    }
}

const getCurrentCountry = async () => {
    const currentLocation = await getLocation()
    return getCountry(currentLocation.country)
}

export {getPuzzle as default}
