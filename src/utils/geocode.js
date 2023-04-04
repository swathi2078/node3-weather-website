const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3dhdGhpMjA3OCIsImEiOiJjbGZwM2p6czIweXNhM3FvZmJyaWx3NGQ2In0.qhRhhwJkYqLTo22Tm1NK7A&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to fetch location,Try another one', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placename: body.features[0].place_name
            })
        }
    })


}

module.exports = geocode