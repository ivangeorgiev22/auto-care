import { useState } from "react";
import VehicleCard from "../VehicleCard/VehicleCard";
import AddVehicle from "../AddVehicle/AddVehicle";

export default function MyVehicles ({vehicles, fetchVehicles}) {
  const [isSeen, setIsSeen] = useState(false);
  return (
    <div>
      <h1>My vehicles</h1>
      <button onClick={() => setIsSeen(true)} className="add-btn">Add Vehicle</button>
      {vehicles.length === 0 ? (
        <div>
          You don't have any vehicles yet. Add your first one.
        </div>
      ) : (
        vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v}/>
        ))
      )}
      {isSeen && (
        <AddVehicle onClose={() => setIsSeen(false)} fetchVehicles={fetchVehicles}/>
      )}
    </div>
  );
}