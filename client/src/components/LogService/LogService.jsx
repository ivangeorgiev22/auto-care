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
      <div>
        Add a vehicle first!
      </div>
    );
  }
  return (
    <div className="form-container">
      <div>
        <h2>Log Service</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Vehicle</label>
            <select 
              value={form.vehicleId} 
              onChange={(e) => setForm({...form, vehicleId: Number(e.target.value)})}
            >
              <option value="Select Vehicle"></option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.year} {v.make} {v.model}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Service Type</label>
            <select 
              value={form.serviceType} 
              onChange={(e) => setForm({...form, serviceType: e.target.value})}
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

          <div className="date-mileage-container">
            <div className="date">
              <label>Date</label>
              <input 
                type="date" 
                value={form.date} 
                onChange={(e) => setForm({...form, date: e.target.value})}
              />
            </div>

            <div className="mileage">
              <label>Mileage</label>
              <input 
                type="number" 
                value={form.mileage} 
                onChange={(e) => setForm({...form, mileage: e.target.value})} 
              />
            </div>
          </div>

          <div className="cost">
            <label>Cost (£)</label>
            <input 
              type="number" 
              value={form.cost} 
              onChange={(e) => setForm({...form, cost: e.target.value})} 
            />
          </div>

          <div className="notes">
            <label>Notes (optional)</label>
            <textarea 
              rows='4' 
              placeholder="Additional details..." 
              value={form.notes} 
              onChange={(e) => setForm({...form, notes: e.target.value})} 
            />
          </div>

          <button type="submit">Log Service</button>
        </form>
      </div>
    </div>
  )
}