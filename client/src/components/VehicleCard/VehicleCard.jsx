import { useNavigate } from 'react-router';



export default function VehicleCard({vehicle}) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/vehicles/${vehicle.id}`)}>
      {vehicle.year} {vehicle.make} {vehicle.model}
    </div>
  )
}