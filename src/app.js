const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')
const Loaders = require('./loaders')
const cors = require('cors')

Loaders.start()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(routes)

module.exports = app