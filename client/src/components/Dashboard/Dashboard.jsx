export default function Dashboard ({vehicles, services}) {
  const recentActivity = [...services].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,5);

  return (
  <div>
    <div>
      <h1 className="text-3xl mb-6 font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl">
          <p className="text-slate-400"> 🚘&nbsp; Vehicles</p>
          <p className="text-2xl font-bold mt-1">{vehicles.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl">
          <p className="text-slate-400">🔧&nbsp; Services Logged</p>
          <p className="text-2xl font-bold mt-1">{services.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl">
          <p className="text-slate-400"> ⚠️&nbsp; Upcoming Services</p>
          <p className="text-2xl font-bold mt-1">0</p>
        </div>
      </div>
    </div>
    <h2 className="text-3xl mb-5 font-bold">Recent Activity</h2>
    {recentActivity.length === 0 ? (
      <div className="border border-slate-700 rounded-xl p-6 text-slate-400 text-sm text-center">
        No services logged yet.
      </div>
    ) : (
      recentActivity.map((s) => (
        <div key={s.id} className="bg-slate-900 border border-slate-700 rounded-xl mb-3 flex justify-between">
          <div className="p-3">
            <p className="font-semibold mb-1">{s.serviceType}</p>
            <p className="text-sm text-slate-400 mb-1"> {new Date(s.date).toLocaleDateString()} </p>
            <p className="text-sm">{s.notes}</p>
          </div>
          <div className="text-right p-3 content-center">
            <p>£{s.cost}</p>
            <p className="text-sm text-slate-400 mt-2">{s.mileage} mi</p>
          </div>
        </div>
      ))
    )}
  </div>
  );
}