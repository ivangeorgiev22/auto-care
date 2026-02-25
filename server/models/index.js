const { Sequelize } = require('sequelize');
const db = {};

const sequelize = new Sequelize('auto_care', 'ivangeorgiev', '', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Vehicle = require('./vehicleModel.js')(sequelize,Sequelize);
db.Service = require('./serviceModel.js')(sequelize,Sequelize);

db.Vehicle.hasMany(db.Service, {
  foreignKey: 'vehicleId',
  onDelete: 'CASCADE'
});

db.Service.belongsTo(db.Vehicle, {
  foreignKey: 'vehicleId'
});

module.exports = db;