const db = require('../models/index.js');


async function getServices (req, res) {
  try {
    const services = await db.Service.findAll({
      order: [['date', 'DESC']],
      include: {
        model: db.Vehicle
      }
    });

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

async function deleteService(req, res) {
  try {
    const removed = await db.Service.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!removed) {
      return res.status(404).json({msg: 'Service not found!'});
    }

    res.status(200).json({msg: 'Service deleted successfully!'});
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

async function updateService(req,res) {
  try {
    const [updated] = await db.Service.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if(!updated) {
      return res.status(404).json({msg: 'Service Record Not Found!'});
    }

    res.status(200).json({msg: 'Service Record Updated Successfully!'});
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

module.exports = {getServices, addService, deleteService, updateService};