import { useState } from "react";
import { useNavigate, useSearchParams } from 'react-router';
import { addService } from "../../apiService/serviceApi";



export default function LogService ({vehicles, fetchServices}) {
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
    navigate('/');
  }

  if (vehicles.length === 0) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl text-center max-w-md mx-auto">
        Add a vehicle first!
      </div>
    );
  }
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 w-[420px]">
        <h2 className="text-xl font-semibold mb-6 text-white">Log Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-slate-400">Vehicle</label>
            <select 
              required
              value={form.vehicleId} 
              onChange={(e) => setForm({...form, vehicleId: Number(e.target.value)})}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 cursor-pointer"
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
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 cursor-pointer"
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
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-400">Mileage</label>
              <input 
                required
                type="number" 
                value={form.mileage} 
                onChange={(e) => setForm({...form, mileage: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-400">Cost (£)</label>
            <input 
              required
              type="number" 
              value={form.cost} 
              onChange={(e) => setForm({...form, cost: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2" 
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-400">Notes (optional)</label>
            <textarea 
              rows='4' 
              placeholder="Additional details..." 
              value={form.notes} 
              onChange={(e) => setForm({...form, notes: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2" 
            />
          </div>
          <button type="submit" className="w-full bg-orange-500 transition rounded-lg py-2 font-medium mt-2 cursor-pointer">Log Service</button>
        </form>
      </div>
    </div>
  );
}