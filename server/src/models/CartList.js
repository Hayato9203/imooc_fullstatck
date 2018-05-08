module.exports = (sequelize, Sequelize) => {
  const CartList = sequelize.define('CartList', {}, {
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_general_ci'
    }
  })

  CartList.associate = function (models) {
    CartList.belongsTo(models.User)
  }

  return CartList
}
