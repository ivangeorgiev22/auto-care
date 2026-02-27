import { useNavigate } from 'react-router';

export default function VehicleCard({vehicle}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
      className="border 
      border-slate-700 
      bg-slate-900 
      hover:border-orange-500 
      transition 
      rounded-xl 
      mb-3 
      p-6 
      cursor-pointer 
      flex 
      items-center 
      gap-4 
      w-80"
    >
      <div className="bg-slate-600/20 p-3 rounded-lg">
        🚗
      </div>
      <div>
        <h2 className="font-semibold text-lg">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h2>
        <p className="text-slate-400 text-sm">
          {vehicle.licensePlate}
        </p>
      </div>
    </div>
  );
}