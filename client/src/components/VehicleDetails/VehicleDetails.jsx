
import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router'
import { getVehicleById, getVehicles, removeVehicle } from '../../apiService/vehicleApi';

export default function VehicleDetails ({fetchVehicles, fetchServices}) {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const getVehicle = async () => {
      const res = await getVehicleById(id);
      setVehicle(res);
    };
    getVehicle();
  }, [id]);

  async function handleDelete () {
    const confirm = window.confirm('Are you sure you want to delete this vehicle?');

    if (!confirm) return;

    await removeVehicle(id);
    await fetchVehicles();
    await fetchServices();
    navigate('/vehicles');
  }

  if(!vehicle) {
    return <p>Loading... Please wait!</p>
  }

  return (
    <div>
      <h1 className='vehicle-details'>
       🚘 {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.licensePlate}
      </h1>
      <button onClick={handleDelete}>🗑️</button>
      <button onClick={() => navigate(`/logService?vehicleId=${vehicle.id}`)}>Log Service</button>
      <h2> 🔧 Service History </h2>
      {vehicle.Services.length === 0 ? (
        <div>No Services logged yet.</div>
      ) : (
        vehicle.Services.map((s) => (
          <div 
            key={s.id}> 
            {s.serviceType}
            {' '}
            {new Date(s.date).toLocaleDateString()}
            {' '}
            {s.mileage} mi
            {' '}
            £{s.cost}
            {' '}
            {s.notes}
          </div>
        ))
      )}
    </div>
  )
}