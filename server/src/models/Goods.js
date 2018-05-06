module.exports = (sequelize, Sequelize) => {
  const Goods = sequelize.define('Goods', {
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    productName: {
      type: Sequelize.STRING,
      trim: true
    },
    productPrice: Sequelize.DECIMAL(10, 2),
    checked: Sequelize.BOOLEAN,
    productNum: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    productImage: Sequelize.STRING
  })
  return Goods
}
