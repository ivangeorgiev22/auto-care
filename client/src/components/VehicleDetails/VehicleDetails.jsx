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
          <span className=" p-2 py-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="48px" fill="#e3e3e3"><path d="M200-204v54q0 12.75-8.62 21.37Q182.75-120 170-120h-20q-12.75 0-21.37-8.63Q120-137.25 120-150v-324l85-256q5-14 16.5-22t26.5-8h464q15 0 26.5 8t16.5 22l85 256v324q0 12.75-8.62 21.37Q822.75-120 810-120h-21q-13 0-21-8.63-8-8.62-8-21.37v-54H200Zm3-330h554l-55-166H258l-55 166Zm-23 60v210-210Zm105.76 160q23.24 0 38.74-15.75Q340-345.5 340-368q0-23.33-15.75-39.67Q308.5-424 286-424q-23.33 0-39.67 16.26Q230-391.47 230-368.24q0 23.24 16.26 38.74 16.27 15.5 39.5 15.5ZM675-314q23.33 0 39.67-15.75Q731-345.5 731-368q0-23.33-16.26-39.67Q698.47-424 675.24-424q-23.24 0-38.74 16.26-15.5 16.27-15.5 39.5 0 23.24 15.75 38.74Q652.5-314 675-314Zm-495 50h600v-210H180v210Z"/></svg>
          </span>
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
        <div className="border border-neutral-700 rounded-xl p-6 text-slate-400 text-sm text-center">
          No services logged yet.
        </div>
      ) : (
        <div className="space-y-3">
          {vehicle.Services.map((s) => (
            <div
              key={s.id}
              className="bg-neutral-800 border border-neutral-800 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {s.serviceType}
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(s.date).toLocaleDateString()} • {s.mileage} mi
                </p>
                {s.notes && (
                  <p className="text-sm text-slate-500 mt-1">
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