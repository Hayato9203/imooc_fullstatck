const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const favicon = require('serve-favicon')
const { sequelize } = require('./models')
const path = require('path')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(favicon(path.resolve(__dirname, '../public/favicon.ico')))

app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(`Hello World`)
  res.end()
})

require('./routes')(app)

sequelize.sync().then(() => {
  app.listen(8081, () => {
    console.log(`Listenning on 8081`)
  })
})
