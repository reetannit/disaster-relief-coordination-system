import React, { useEffect, useState } from "react";

const AlertSystem = () => {
  const [alerts, setAlerts] = useState([]);

  // Define fetchAlerts inside the component
  const fetchAlerts = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/emergency/emergencies");
      const data = await response.json();
      console.log("Fetched Emergencies:", data);
      setAlerts(data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  useEffect(() => {
    fetchAlerts(); // Fetch alerts when the component mounts
  }, []);

  const handleAccept = async (id) => {
    try {
      // Update the alert status to "Completed" immediately
      await fetch(`http://localhost:5001/api/emergency/updateStatus`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, safetyStatus: "Completed" }),
      });

      // Refresh the alerts after completion
      fetchAlerts(); // Call fetchAlerts to refresh data, removing accepted ones
    } catch (error) {
      console.error("Error accepting alert:", error);
    }
  };

  const handleViewMap = (latitude, longitude) => {
    // Open location in Google Maps
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank");
  };

  // Filter out "Completed" alerts
  const filteredAlerts = alerts.filter(alert => alert.safetyStatus !== "Completed");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Emergency Alert System</h1>

      {/* Emergency Alert Table */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Victim Alerts</h2>
        <table className="table-auto w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-1 text-sm">Latitude</th>
              <th className="px-2 py-1 text-sm">Longitude</th>
              <th className="px-2 py-1 text-sm">Safety Status</th>
              <th className="px-2 py-1 text-sm">Message</th>
              <th className="px-2 py-1 text-sm">Phone Number</th>
              <th className="px-2 py-1 text-sm">Action</th>
              <th className="px-2 py-1 text-sm">View Map</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((alert, index) => (
              <tr key={index} className="border">
                <td className="border px-2 py-1 text-sm">{alert.location?.latitude}</td>
                <td className="border px-2 py-1 text-sm">{alert.location?.longitude}</td>
                <td className="border px-2 py-1 text-sm">
                  {/* Display status */}
                  {alert.safetyStatus}
                </td>
                <td className="border px-2 py-1 text-sm">{alert.message}</td>
                <td className="border px-2 py-1 text-sm">{alert.phoneNumber}</td>
                <td className="border px-2 py-1 text-sm">
                  {alert.safetyStatus !== "Completed" && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 text-xs"
                      onClick={() => handleAccept(alert._id)}
                    >
                      Accept
                    </button>
                  )}
                </td>
                <td className="border px-2 py-1 text-sm">
                  {/* Button to view map */}
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
                    onClick={() => handleViewMap(alert.location?.latitude, alert.location?.longitude)}
                  >
                    View Map
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertSystem;
