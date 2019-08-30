const request = require('request')

const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + 
        '.json?access_token=pk.eyJ1Ijoidmt1bWFyNSIsImEiOiJjanpzcGJicGYxam92M21uemY2cThtMGt5In0.Nw9wJdtBFay1Q_EdUPykdw' +
        '&limit=1'
    
    request({ 
            url, 
            rejectUnauthorized: false, 
            requestCert: false, 
            agent: false,
            json: true 
        },
        (error, {body}) => {
            if (error) {
                callback('Unable to connect to location service!',undefined)
            } else if (body.features.length === 0) {
                callback('Unable to find location. Try another search', undefined)
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                })
            }
    })
}



module.exports = geocode