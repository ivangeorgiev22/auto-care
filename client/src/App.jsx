import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router';
import { getVehicles } from './apiService/vehicleApi.js';
import { getServices } from './apiService/serviceApi.js';

import Navbar from './components/Navbar/Navbar.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import MyVehicles from './components/MyVehicles/MyVehicles.jsx';
import VehicleDetails from './components/VehicleDetails/VehicleDetails.jsx';
import LogService from './components/LogService/LogService.jsx';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);

  async function fetchVehicles () {
    const res = await getVehicles();
    setVehicles(res);
  };

  async function fetchServices () {
    const res = await getServices();
    setServices(res);
  };

  useEffect(() => {
    fetchVehicles();
    fetchServices();
  },[]);

  return (
    <BrowserRouter>
      <div className='min-h-screen bg-slate-900 text-white '>
        <Navbar />
        <div className='p-8 max-w-6xl mx-auto'>
          <Routes>
            <Route path='/' element={<Dashboard vehicles={vehicles} services={services} />}/>
            <Route path='/vehicles' element={<MyVehicles vehicles={vehicles} fetchVehicles={fetchVehicles} />}/>
            <Route path='/vehicles/:id' element={<VehicleDetails fetchVehicles={fetchVehicles} fetchServices={fetchServices} />}/>
            <Route path='/logService' element={<LogService vehicles={vehicles} fetchServices={fetchServices} />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
