import { useState } from "react";
import VehicleCard from "../VehicleCard/VehicleCard";
import AddVehicle from "../AddVehicle/AddVehicle";

export default function MyVehicles ({vehicles, fetchVehicles}) {
  const [isSeen, setIsSeen] = useState(false);
  return (
    <div className="">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-3xl font-bold">My Vehicles</h1>
        <button 
          onClick={() => setIsSeen(true)} 
          className="bg-orange-500 hover:bg-orange-400 px-5 py-2 rounded-lg font-medium cursor-pointer">
          + Add Vehicle
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {vehicles.length === 0 ? (
          <div className="bg-slate-900 p-6 rounded-xl text-center w-max text-slate-400 ml-78">
            You don't have any vehicles yet. Add your first one!
          </div>
        ) : (
          vehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v}/>
          ))
        )}
      </div>
      {isSeen && (
        <AddVehicle onClose={() => setIsSeen(false)} fetchVehicles={fetchVehicles}/>
      )}
    </div>
  );
}