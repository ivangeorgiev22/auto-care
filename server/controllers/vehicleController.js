const db = require('../models/index.js');


async function getVehicles (req,res) {
  try {
    const vehicles = await db.Vehicle.findAll({
      include: {
        model: db.Service
      }
    });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

async function getVehicleById (req,res) {
  try {
    const vehicle = await db.Vehicle.findByPk(req.params.id, {
      include: {
        model: db.Service,
      },
      order: [[db.Service, 'date', 'DESC']]
    });
    if (!vehicle) {
      return res.status(404).json({msg: "Vehicle Not Found."});
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

async function addVehicle (req, res) {
  const {make, model, year, licensePlate} = req.body;
  try {
    await db.Vehicle.create({
      make: make,
      model: model,
      year: year,
      licensePlate: licensePlate
    })
    res.status(201).json({msg: 'Vehicle Added Successfully!'});
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

async function deleteVehicle (req, res) {
  try {
    const removed = await db.Vehicle.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!removed) {
      return res.status(404).json({msg: 'Vehicle Not Found.'})
    }
    res.status(200).json({msg: 'Vehicle Deleted Successfully!'});

  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

module.exports = {getVehicles, getVehicleById, addVehicle, deleteVehicle};