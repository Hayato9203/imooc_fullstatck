module.exports = (sequelize, DataTypes) => {
  const CartList = sequelize.define('CartList', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
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
