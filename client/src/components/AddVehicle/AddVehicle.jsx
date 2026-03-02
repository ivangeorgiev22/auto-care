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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-xl w-96">
        <div className="flex justify-between items-start">
          <h2 className="text-xl mb-4">Add Vehicle</h2>
          <button className="hover:bg-red-500 rounded cursor-pointer" onClick={onClose}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="25px" 
              viewBox="0 -960 960 960" 
              width="25px" 
              fill="#e3e3e3"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label>Make</label>
          <input 
            required 
            placeholder="Make" 
            onChange={(e) => setForm({...form, make: e.target.value})} 
            className="bg-neutral-800 border border-neutral-700 p-2 rounded w-full mt-1 hover:border-orange-500 active:outline-orange-500 focus:outline-none"
          />
          <label>Model</label>
          <input 
            required 
            placeholder="Model" 
            onChange={(e) => setForm({...form, model: e.target.value})} 
            className="bg-neutral-800 border border-neutral-700 p-2 rounded w-full mt-1 hover:border-orange-500 active:outline-orange-500 focus:outline-none" 
          />
          <label>Year</label>
          <input 
            required
            min='1950'
            max='2026'
            type="number" 
            placeholder="Year" 
            onChange={(e) => setForm({...form, year: e.target.value})} 
            className="bg-neutral-800 border border-neutral-700 p-2 rounded w-full mt-1 hover:border-orange-500 active:outline-orange-500 focus:outline-none"
          />
          <label>License Plate</label>
          <input 
            required 
            placeholder="License Plate" 
            onChange={(e) => setForm({...form, licensePlate: e.target.value})} 
            className="bg-neutral-800 border border-neutral-700 p-2 rounded w-full mt-1 hover:border-orange-500 active:outline-orange-500 focus:outline-none" 
          />
          <div className="flex justify-center mt-2">
            <button className="bg-orange-600 px-3 py-2 rounded w-full cursor-pointer hover:bg-orange-700">Add Vehicle</button>
          </div>
        </form>
      </div>
    </div>
  );
}