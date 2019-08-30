const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6788eb81edb725aeac5114a9f9f185c0/'+ longitude + ',' + latitude +'?units=si'
    request(
        { 
            url, 
            rejectUnauthorized: false, 
            requestCert: false, 
            agent: false,
            json: true 
        }, 
        (error, {body}) => {
            if(error) {
                callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback('Unable to find location!',undefined)
            } else  {
                callback(undefined, 
                    body.daily.data[0].summary +
                    " It is currently " + 
                    body.currently.temperature + 
                    " degress out. There is a " + 
                    body.currently.precipProbability +
                    "% chance of rain."
                )
            }
        }
    )
}

module.exports = forecast
