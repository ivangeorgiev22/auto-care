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
  <div className="">
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-semibold flex items-center gap-3">
          <span className="bg-slate-600/20 p-4 py-3 rounded-lg">🚘</span>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h1>
        <p className="text-slate-400 text-sm ml-19">
          {vehicle.licensePlate}
        </p>
      </div>
      <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 mt-4 px-3 py-2 rounded-lg transition font-semibold cursor-pointer">
        Delete
      </button>
    </div>
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          🔧&nbsp; Service History
        </h2>
        <button
          onClick={() => navigate(`/logService?vehicleId=${vehicle.id}`)}
          className="bg-orange-500 hover:bg-orange-400 px-4 py-2 rounded-lg text-sm transition cursor-pointer font-semibold">
          + Log Service
        </button>
      </div>
      {vehicle.Services.length === 0 ? (
        <div className="border border-slate-700 rounded-xl p-6 text-slate-400 text-sm text-center">
          No services logged yet.
        </div>
      ) : (
        <div className="space-y-3">
          {vehicle.Services.map((s) => (
            <div
              key={s.id}
              className="border border-slate-700 bg-slate-900 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {s.serviceType}
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(s.date).toLocaleDateString()} • {s.mileage} mi
                </p>
                {s.notes && (
                  <p className="text-xs text-slate-500 mt-1">
                    {s.notes}
                  </p>
                )}
              </div>
              <p className="font-semibold">
                £{s.cost}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}