import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center">
        <div className="flex items-center gap-10">
          <div className="font-bold text-orange-500 text-xl">
            AutoCare
          </div>
          <div className="flex gap-6 text-slate-400">
            <Link to="/" className="hover:text-white transition">
              Dashboard
            </Link>
            <Link to="/vehicles" className="hover:text-white transition">
              My Vehicles
            </Link>
            <Link to="/logService" className="hover:text-white transition">
              Log Service
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}