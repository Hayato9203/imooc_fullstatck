module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      trim: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_general_ci'
    }
  })

  return User
}
