import { Link } from 'react-router';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="logo">
        AutoCare
      </div>

      <div className="navbar-links">
       <Link to='/'>  Dashboard</Link>
       <Link to='/vehicles'>My Vehicles</Link>
       <Link to='/logService'>Log Service</Link>
      </div>
    </div>
  )
}