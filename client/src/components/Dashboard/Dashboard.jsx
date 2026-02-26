export default function Dashboard ({vehicles, services}) {
  const recentActivity = [...services].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,5);

  return (
  <div>
    <div>
      <h1 className="title">Dashboard</h1>
      <div className="grid">
        <div className="vehicles-box">
          <p className="vehicles-title"> 🚘 Vehicles</p>
          <p className="vehicles-count">{vehicles.length}</p>
        </div>

        <div className="services-box">
          <p className="services-title"> 🔧 Services Logged</p>
          <p className="services-count">{services.length}</p>
        </div>

        <div className="next-service-box">
          <p className="next-title"> ⚠️ Upcoming Services</p>
          <p className="next-count">0</p>
        </div>
      </div>
    </div>
    
    <h2>Recent Activity</h2>
    {recentActivity.length === 0 ? (
      <div>
        No Services logged yet.
      </div>
    ) : (
      recentActivity.map((s) => (
        <div key={s.id}>
          <div>
            <p>{s.serviceType}</p>
            <p> {new Date(s.date).toLocaleDateString()} </p>
            <p>£{s.cost}</p>
            <p>{s.mileage} mi</p>
            <p>{s.notes}</p>
          </div>
        </div>
      ))
    )}
  </div>
  )
}