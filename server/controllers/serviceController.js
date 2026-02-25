const db = require('../models/index.js');


async function getServices (req, res) {
  try {
    const services = await db.Service.findAll();

    res.status(200).json(services);
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

async function addService (req, res) {
  const { serviceType, date, mileage, cost, notes, vehicleId } = req.body;

  try {
    await db.Service.create({
      serviceType: serviceType,
      date: date,
      mileage: mileage,
      cost: cost,
      notes: notes,
      vehicleId: vehicleId
    });
    res.status(201).json({msg: 'Service Created!'});
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

module.exports = {getServices, addService};