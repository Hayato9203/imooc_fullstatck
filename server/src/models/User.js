module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      trim: true,
      notEmpty: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
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
