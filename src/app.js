const path = require('path')
const express = require('express')
const hbs = require('hbs')

//load js files
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Swathi S'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Swathi S'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Swathi S',
        message: 'This app is used to get the weather forecast of any place'
    })
})

// app.get('/help', (req, res) => {
//     res.send({
//         name:'Swathi',
//         age:22
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address to get the weather forecast'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, placename } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: foreCastData,
                location: placename,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('errorpage', {
        title: '404',
        errormessage: 'Help article not found',
        name: 'Swathi S'
    })
})


app.get('*', (req, res) => {
    res.render('errorpage', {
        title: '404',
        errormessage: 'Page not found',
        name: 'Swathi S'
    })
})


app.listen(3000, () => {
    console.log('Server started successfully on port 3000')
})