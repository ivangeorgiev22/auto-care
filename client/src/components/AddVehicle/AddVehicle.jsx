import { useState } from "react";
import { addVehicle } from "../../apiService/vehicleApi";


export default function AddVehicle({onClose, fetchVehicles}) {
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    licensePlate: ''
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await addVehicle(form);
    await fetchVehicles();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-xl w-96">
        <h2 className="text-xl mb-4">Add Vehicle</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label>Make</label>
          <input 
            required 
            placeholder="Make" 
            onChange={(e) => setForm({...form, make: e.target.value})} 
            className="bg-neutral-800 border border-neutral-700 p-2 rounded w-full mt-1"
          />
          <label>Model</label>
          <input 
            required 
            placeholder="Model" 
            onChange={(e) => setForm({...form, model: e.target.value})} 
            className="bg-neutral-800 border border-neutral-700 p-2 rounded w-full mt-1" 
          />
          <label>Year</label>
          <input 
            required 
            placeholder="Year" 
            onChange={(e) => setForm({...form, year: e.target.value})} 
            className="bg-neutral-800 border border-neutral-700 p-2 rounded w-full mt-1"
          />
          <label>License Plate</label>
          <input 
            required 
            placeholder="License Plate" 
            onChange={(e) => setForm({...form, licensePlate: e.target.value})} 
            className="bg-neutral-800 border border-neutral-700 p-2 rounded w-full mt-1" 
          />
          <div className="flex justify-center mt-2">
            <button className="bg-orange-600 px-3 py-2 rounded w-full">Add Vehicle</button>
          </div>
        </form>
      </div>
    </div>
  );
}