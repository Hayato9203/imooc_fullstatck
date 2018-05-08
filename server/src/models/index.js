const Sequelize = require('sequelize')
const db = {}
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

const Goods = sequelize.import(path.join(__dirname, 'Goods.js'))
const CartList = sequelize.import(path.join(__dirname, 'CartList.js'))
const User = sequelize.import(path.join(__dirname, 'User.js'))
const AddressList = sequelize.import(path.join(__dirname, 'AddressList.js'))
// console.log(`model.name: ${model.name}`)
db[Goods.name] = Goods
db[User.name] = User
db[CartList.name] = CartList
db[AddressList.name] = AddressList

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
