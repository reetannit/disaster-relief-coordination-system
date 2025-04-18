import React, { useState, useEffect } from "react";
import axios from "axios";

const DisasterStatus = () => {
  const [disasterData, setDisasterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedInEmail = localStorage.getItem("email");  // Get the logged-in NGO's email

  useEffect(() => {
    const fetchDisasterData = async () => {
      try {
        setLoading(true);

        // Fetch disaster requests assigned to NGO
        const response = await axios.post(
          `https://disaster-relief-coordination-system-backend.vercel.app/api/ngo/ngoRequests`,
          { email: loggedInEmail }
        );

        console.log("Fetched Data:", response.data);

        // Filter data based on the status and matching ngoEmail
        const filteredData = response.data.nearbyRequests?.filter((item) => {
          if (item.status === "Pending") {
            return true;  // Show all Pending requests to all NGOs
          } else if (item.status !== "Completed") {
            return item.ngoEmail === loggedInEmail;  // Show In Progress requests only for the assigned NGO
          }
          return false;  // Don't show Completed requests
        }) || [];

        setDisasterData(filteredData);
      } catch (err) {
        setError("Error fetching disaster data");
        console.error("Error fetching disaster data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDisasterData();
  }, [loggedInEmail]);

  // Open Google Maps with directions
  const openMapWithDirections = (longitude, latitude) => {
    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    window.open(mapUrl, "_blank");
  };

  // Handle status update
  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const response = await axios.patch(
        "https://disaster-relief-coordination-system-backend.vercel.app/api/request/updateStatus",
        {
          id: requestId,
          status: newStatus,
          ngoEmail: loggedInEmail,
        }
      );

      if (response.status === 200) {
        console.log(`Request ${requestId} status updated to ${newStatus}`);

        // Update the status in the local state without reloading
        setDisasterData((prevData) =>
          prevData.map((item) =>
            item._id === requestId ? { ...item, status: newStatus } : item
          )
        );
      } else {
        console.error("Error updating status:", response.data);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update status");
    }
  };

  if (loading) {
    return <div className="text-center">Loading disaster data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Disaster Status</h1>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        {disasterData.length === 0 ? (
          <div className="text-center text-gray-500">No disaster requests available.</div>
        ) : (
          <table className="table-auto w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2">Location</th>
                <th className="px-3 py-2">Request Type</th>
                <th className="px-3 py-2">Description</th>
                <th className="px-3 py-2">Victim Email</th>
                <th className="px-3 py-2">Victim Phone</th>
                <th className="px-3 py-2">Affected People</th>
                <th className="px-3 py-2">Coordinates</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {disasterData.map((item, index) => {
                const coordinates = item.location?.coordinates || ["N/A", "N/A"];
                return (
                  <tr key={index} className="border-b">
                    <td className="px-3 py-2 text-xs">
                      <button
                        onClick={() =>
                          openMapWithDirections(coordinates[0], coordinates[1])
                        }
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        View on Map
                      </button>
                    </td>
                    <td className="px-3 py-2 text-xs">{item.requestType}</td>
                    <td className="px-3 py-2 text-xs">{item.description}</td>
                    <td className="px-3 py-2 text-xs">{item.victimEmail}</td>
                    <td className="px-3 py-2 text-xs">{item.victimPhone}</td>
                    <td className="px-3 py-2 text-xs">{item.affectedPeople}</td>
                    <td className="px-3 py-2 text-xs">
                      Lat: {coordinates[1]}, Lng: {coordinates[0]}
                    </td>
                    <td className="px-3 py-2 text-xs">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className="py-1 px-2 border rounded text-xs"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DisasterStatus;
