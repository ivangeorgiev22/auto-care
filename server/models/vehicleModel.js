const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define('Vehicle', {
    make: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  })
