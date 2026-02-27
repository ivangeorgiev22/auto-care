import { Link } from 'react-router';
import logo from '../../assets/logo.png';

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-black shadow-2xl">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center">
        <div className="flex items-center gap-10">
          <div className="font-bold text-orange-500 text-xl">
            <img className='w-40' src={logo}/>
          </div>
          <div className="flex gap-6 text-neutral-400">
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