module.exports = (sequelize, Sequelize) => {
  const AddressList = sequelize.define('AddressList', {}, {
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
