import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Settings,
  Users,
} from "lucide-react";

const baseLinkClasses =
  "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200";

const getNavLinkClass = ({ isActive }) =>
  `${baseLinkClasses} ${
    isActive
      ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600 shadow-sm"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
  }`;

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:flex flex-col h-screen">
      {/* Logo / Brand */}
      <div className="px-6 py-5 text-2xl font-bold text-purple-600 border-b">
        Staffify
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1 px-3 space-y-1">
        <NavLink to="/dashboard" className={getNavLinkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/profile" className={getNavLinkClass}>
          <User size={18} />
          Profile
        </NavLink>

        <NavLink to="/dashboard/settings" className={getNavLinkClass}>
          <Settings size={18} />
          Settings
        </NavLink>

        <NavLink to="/employees" className={getNavLinkClass}>
          <Users size={18} />
          Employees
<<<<<<< HEAD
        </Link>
        <Link to="/Leaves" className="block px-4 py-2 rounded hover:bg-blue-50">
          Leaves
        </Link>
=======
        </NavLink>
>>>>>>> 51887bc97a364338299269ac3ff39dc5ea12f4d2
      </nav>

      {/* Footer / Optional */}
      <div className="p-4 text-xs text-gray-400 border-t">
        © 2026 Staffify
      </div>
    </aside>
  );
}

export default Sidebar;
