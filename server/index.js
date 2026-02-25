const express = require('express');
const cors = require('cors');
const vehicleRouter = require('./routers/vehicleRouter.js');
const serviceRouter = require('./routers/serviceRouter.js');
const db = require('./models/index.js')

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/vehicles', vehicleRouter);
app.use('/services', serviceRouter);

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Postgres Connected');
    await db.sequelize.sync();
    console.log('Models synced successfully');
    app.listen(PORT, () => {
      console.log(`Server listening on http://127.0.0.1:${PORT}`);
    })
    
  } catch (error) {
    console.error('Connection failed', error);
  }
})();

