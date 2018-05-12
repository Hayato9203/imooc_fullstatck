module.exports = (sequelize, DataTypes) => {
  const AddressList = sequelize.define('AddressList', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      trim: true
    },
    street: {
      type: DataTypes.STRING,
      trim: true
    },
    zipcode: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_general_ci'
    }
  })

  AddressList.associate = function (models) {
    AddressList.belongsTo(models.User)
  }

  return AddressList
}
