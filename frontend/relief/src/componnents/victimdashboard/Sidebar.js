// import React from "react";
// import { Link } from "react-router-dom";

// const VictimSidebar = () => {
//   return (
//     <div className="h-screen w-64 bg-gray-800 text-white p-4">
//       <h1 className="text-2xl font-bold mb-6">Victim Dashboard</h1>
//       <ul className="space-y-4">
//         <li>
//           <Link to="/victim/sos" className="block p-2 hover:bg-gray-700 rounded">
//             Request Help (SOS)
//           </Link>
//         </li>
//         <li>
//           <Link to="/victim/history" className="block p-2 hover:bg-gray-700 rounded">
//             Request History
//           </Link>
//         </li>
//         <li>
//           <Link to="/victim/updates" className="block p-2 hover:bg-gray-700 rounded">
//             Real-Time Updates
//           </Link>
//         </li>
//         <li>
//           <Link to="/victim/resources" className="block p-2 hover:bg-gray-700 rounded">
//             Location-Based Resources
//           </Link>
//         </li>
//         <li>
//           <Link to="/victim/alerts" className="block p-2 hover:bg-gray-700 rounded">
//             Emergency Alerts
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default VictimSidebar;




import React from "react";
import { Link, useNavigate } from "react-router-dom";

const VictimSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Navigate to the login page
    navigate("/victim-login");
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Victim Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link to="/victim/sos" className="block p-2 hover:bg-gray-700 rounded">
            Request Help (SOS)
          </Link>
        </li>
        <li>
          <Link to="/victim/history" className="block p-2 hover:bg-gray-700 rounded">
            Request History
          </Link>
        </li>
        <li>
          <Link to="/victim/updates" className="block p-2 hover:bg-gray-700 rounded">
            Real-Time Updates
          </Link>
        </li>
        
        <li>
          <Link to="/victim/alerts" className="block p-2 hover:bg-gray-700 rounded">
            Emergency Alerts
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="block w-full text-left p-2 hover:bg-gray-700 rounded"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default VictimSidebar;

