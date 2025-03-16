import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Remove all local storage data
    navigate("/"); // Redirect to home page
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/" },
    { name: "Resources", path: "/admin/resources" },
    { name: "NGO Verification", path: "/admin/ngo-verification" },
    { name: "Victim Requests", path: "/admin/victim-requests" },
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
                  isActive ? "text-blue-400 font-semibold" : "text-white"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          {/* Logout Button */}
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <button onClick={handleLogout} className="w-full text-left text-white">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
