import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate(); // React Router's useNavigate hook to navigate programmatically

  const menuItems = [
    { name: "Resources", path: "/ngo/resource-management" },
    { name: "Disaster Status", path: "/ngo/disaster-status" },
    { name: "Alert System", path: "/ngo/alert-system" },
    {name:" History",path:"/ngo/history"}
  
  ];

  // Logout handler to clear localStorage and redirect
  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage data
    navigate("/"); // Redirect to home or login page after logout
  };

  return (
    <div className="bg-gray-800 h-full text-white w-64 flex flex-col">
      <h1 className="text-2xl font-bold p-6">NGO Dashboard</h1>
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
        <li className="px-4 py-2 hover:bg-gray-700 list-none">
          <button
            onClick={handleLogout} // Trigger logout on button click
            className="text-blue-400 font-semibold w-full text-left"
          >
            LogOut
          </button>
        </li>
      </nav>
    </div>
  );
};

export default Sidebar;
