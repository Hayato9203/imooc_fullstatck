module.exports = (sequelize, Sequelize) => {
  const Good = sequelize.define('Good', {
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
    salePrice: Sequelize.DECIMAL(10, 2),
    checked: Sequelize.BOOLEAN,
    productNum: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    productImage: Sequelize.STRING
  })
  return Good
}
