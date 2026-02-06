import {Link} from "react-router-dom";

function Sidebar(){
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-6 text-xl font-bold text-purple-600 ">
        Staffify
      </div>

      <nav className="mt-6 space-y-2 px-4">
        <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-blue-50">
          Dashboard
        </Link>
        <Link to="/dashboard/profile" className="block px-4 py-2 rounded hover:bg-blue-50">
          Profile
        </Link>
        <Link to="/dashboard/settings" className="block px-4 py-2 rounded hover:bg-blue-50">
          Settings
        </Link>
        <Link to="/Employees" className="block px-4 py-2 rounded hover:bg-blue-50">
          Employees
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
  