module.exports = (sequelize, DataTypes) => {
  const Goods = sequelize.define('Goods', {
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
    productName: {
      type: DataTypes.STRING,
      trim: true
    },
    productPrice: DataTypes.DECIMAL(10, 2),
    checked: DataTypes.BOOLEAN,
    productNum: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    productImage: DataTypes.STRING
  }, {
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_general_ci'
    }
  })
  return Goods
}
