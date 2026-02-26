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
    <div className="form-container">
      <div>
        <h2>Add Vehicle</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Make</label>
        <input placeholder="Make" onChange={(e) => setForm({...form, make: e.target.value})}/>
        <label>Model</label>
        <input placeholder="Model" onChange={(e) => setForm({...form, model: e.target.value})} />
        <label>Year</label>
        <input placeholder="Year" onChange={(e) => setForm({...form, year: e.target.value})}/>
        <label>License Plate</label>
        <input placeholder="License Plate" onChange={(e) => setForm({...form, licensePlate: e.target.value})} />
        <div className="btns">
          <button>Add Vehicle</button>
        </div>
      </form>
    </div>
  )
}