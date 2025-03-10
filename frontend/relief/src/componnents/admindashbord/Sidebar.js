import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin/" },
    { name: "Resources", path: "/admin/resources" },
    { name: "NGO Verification", path: "/admin/ngo-verification" }, // NGO Verification
    { name: "User Verification", path: "/admin/user-verification" }, // User Verification
    { name: "Victim Requests", path: "/admin/victim-requests" }, // Victim Requests
    { name: "Reliefoperationsoverview", path: "/admin/reliefoperationsoverview" },
  ];

  return (
    <div className="bg-gray-800 h-full text-white w-64 flex flex-col">
      <h1 className="text-2xl font-bold p-6">Admin Dashboard</h1>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="px-4 py-2 hover:bg-gray-700">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400 font-semibold"
                    : "text-white"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

