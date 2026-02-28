import { serviceInterval } from "../../serviceInterval.js";

export default function Dashboard ({vehicles, services}) {
  // only get the last five to show in recent activity
  const recentActivity = services.slice(0,5);
  //calculate overdue services
  const upcomingServices = vehicles.filter((v) => {
    //look at Oil Change service type only
    const oilChange = v.Services?.filter((s) => s.serviceType === 'Oil Change');
    // if vehicle has no oil change services logged yet skip
    if (!oilChange || oilChange.length === 0) return false;
    // find the most recent one and grab it
    const lastOilChange = oilChange.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    // get the set interval for oil changes
    const {months} = serviceInterval.oilChange;
    //based on the interval work out when it's due - 6 months after the last change
    const lastChanged = new Date(lastOilChange.date);
    const nextDue = new Date(lastChanged);
    nextDue.setMonth(nextDue.getMonth() + months);
    //compare with today's date
    return new Date() >= nextDue;
  }).length; //count how many vehicles are overdue on oil changes

  return (
  <div>
    <div>
      <h1 className="text-3xl mb-6 font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-neutral-800 border border-neutral-800 p-5 rounded-xl">
          <p className="text-neutral-400"> 🚘&nbsp; Vehicles</p>
          <p className="text-2xl font-bold mt-1">{vehicles.length}</p>
        </div>
        <div className="bg-neutral-800 border border-neutral-800 p-5 rounded-xl">
          <p className="text-neutral-400">🔧&nbsp; Service Records</p>
          <p className="text-2xl font-bold mt-1">{services.length}</p>
        </div>
        <div className="bg-neutral-800 border border-neutral-800 p-5 rounded-xl">
          <p className="text-neutral-400"> ⚠️&nbsp; Overdue Services</p>
          <p className="text-2xl font-bold mt-1">{upcomingServices}</p>
        </div>
      </div>
    </div>
    <h2 className="text-3xl mb-5 font-bold">Recent Activity</h2>
    {recentActivity.length === 0 ? (
      <div className="border border-neutral-700 rounded-xl p-6 text-neutral-400 text-sm text-center">
        No services logged yet.
      </div>
    ) : (
      recentActivity.map((s) => (
        <div key={s.id} className="bg-neutral-800 border border-neutral-800 rounded-xl mb-3 flex justify-between">
          <div className="p-3">
            <p className="font-medium">{s.serviceType}</p>
            <p className="text-sm text-slate-400 mb-1"> {new Date(s.date).toLocaleDateString()} • {s.mileage} mi </p>
            <p className="text-sm text-slate-500 mt-1">{s.notes}</p>
          </div>
          <div className="text-right p-3 content-center">
            <p className="font-semibold">£{s.cost}</p>
          </div>
        </div>
      ))
    )}
  </div>
  );
}