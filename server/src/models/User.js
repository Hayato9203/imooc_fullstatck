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
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      }
    }
  }, {
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_general_ci'
    }
  })

  return User
}
