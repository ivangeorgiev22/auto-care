import { useState } from "react";
import { useNavigate, useSearchParams } from 'react-router';
import { addService } from "../../apiService/serviceApi";
import { Link } from "react-router";



export default function LogService ({vehicles, fetchServices, fetchVehicles}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedVehicle = searchParams.get('vehicleId');

  const [form, setForm] = useState({
    vehicleId: selectedVehicle || '',
    serviceType: '',
    date: '',
    mileage: '',
    cost: '',
    notes: ''
  })

  async function handleSubmit(e) {
    e.preventDefault();
    await addService(form);
    await fetchServices();
    await fetchVehicles();
    navigate('/');
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-neutral-400 bg-neutral-900 p-10 border border-neutral-700 rounded-xl text-center max-w-md mx-auto">
       You need to <Link to='/vehicles' className="text-orange-600">add a vehicle</Link> first!
      </div>
    );
  }
  return (
    <div className="flex justify-center mt-4">
      <div className="bg-neutral-800 border border-neutral-800 rounded-xl p-8 w-[550px] shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-white">Log Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-slate-400">Vehicle</label>
            <select 
              required
              value={form.vehicleId} 
              onChange={(e) => setForm({...form, vehicleId: Number(e.target.value)})}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 cursor-pointer"
            >
              <option value="">Select Vehicle</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.year} {v.make} {v.model}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-400">Service Type</label>
            <select
              required 
              value={form.serviceType} 
              onChange={(e) => setForm({...form, serviceType: e.target.value})}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 cursor-pointer"
            >
              <option value="">Select Service Type</option>
              <option>Oil Change</option>
              <option>Inspection</option>
              <option>Tyre Rotation</option>
              <option>Brakes</option>
              <option>Gearbox Service</option>
              <option>Timing Belt Service</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-slate-400">Date</label>
              <input 
                required
                type="date" 
                value={form.date} 
                onChange={(e) => setForm({...form, date: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-400">Mileage</label>
              <input 
                required
                placeholder="Enter mileage..."
                type="number" 
                value={form.mileage} 
                onChange={(e) => setForm({...form, mileage: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-400">Cost (£)</label>
            <input 
              required
              placeholder="Enter cost..."
              type="number" 
              value={form.cost} 
              onChange={(e) => setForm({...form, cost: e.target.value})}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2" 
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-400">Notes (optional)</label>
            <textarea 
              rows='4' 
              placeholder="Additional details..." 
              value={form.notes} 
              onChange={(e) => setForm({...form, notes: e.target.value})}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-orange-600 transition rounded-lg py-2 font-medium mt-2 cursor-pointer"> 
            Log Service
          </button>
        </form>
      </div>
    </div>
  );
}