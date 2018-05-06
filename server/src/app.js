const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const favicons = require('favicons')

const { sequelize } = require('../models')

const app = express()

favicons('./public/favicon.ico')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(`Hello World`)
})

sequelize.sync().then(() => {
  app.listen(8081, () => {
    console.log(`Listenning on 8081`)
  })
})
