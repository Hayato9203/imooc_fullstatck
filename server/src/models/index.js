const Sequelize = require('sequelize')
const db = {}
const fs = require('fs')
const path = require('path')

const sequelize = new Sequelize('imooc_mall', 'root', 'Qshh92100#', {
  host: 'localhost',
  dialect: 'mysql'
  // define: {
  //   charset: 'utf8mb4',
  //   dialectOptions: {
  //     collate: 'utf8mb4_general_ci'
  //   }
  // }
})

sequelize.authenticate().then().catch(err => {
  console.error(`Unable to connect to the database: ${err}`)
})

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.DataTypes = Sequelize

module.exports = db
