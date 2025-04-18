import React, { useState, useEffect } from "react";
import axios from "axios";

const VictimRequests = () => {
  const [victimRequests, setVictimRequests] = useState([]);

  // Fetch all victim requests on component mount
  useEffect(() => {
    fetchVictimRequests();
  }, []);

  const fetchVictimRequests = async () => {
    try {
      const response = await axios.get("https://disaster-relief-coordination-system-backend.vercel.app/api/admin/victim-requests");
      setVictimRequests(response.data);
    } catch (error) {
      console.error("Error fetching victim requests:", error);
    }
  };

  // Delete a victim request
  const handleDeleteRequest = async (id) => {
    try {
      await axios.delete(`https://disaster-relief-coordination-system-backend.vercel.app/api/admin/victim-requests/${id}`);
      setVictimRequests(victimRequests.filter((req) => req._id !== id));
    } catch (error) {
      console.error("Error deleting victim request:", error);
    }
  };

  // Helper function to display the location
  const renderLocation = (location) => {
    if (typeof location === "object" && location.coordinates) {
      return location.coordinates.join(", ");
    }
    return location;
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Victim Requests</h1>
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        {victimRequests.length > 0 ? (
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1">Request Type</th>
                <th className="px-2 py-1">Description</th>
                <th className="px-2 py-1">Location</th>
                <th className="px-2 py-1">Status</th>
                <th className="px-2 py-1">Victim Email</th>
                <th className="px-2 py-1">Victim Phone</th>
                <th className="px-2 py-1">Affected People</th>
                <th className="px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {victimRequests.map((request) => (
                <tr key={request._id} className="border-b">
                  <td className="px-2 py-1 border">{request.requestType}</td>
                  <td className="px-2 py-1 border">{request.description}</td>
                  <td className="px-2 py-1 border">{renderLocation(request.location)}</td>
                  <td className="px-2 py-1 border">{request.status}</td>
                  <td className="px-2 py-1 border">{request.victimEmail}</td>
                  <td className="px-2 py-1 border">{request.victimPhone}</td>
                  <td className="px-2 py-1 border">{request.affectedPeople}</td>
                  <td className="px-2 py-1 border">
                    <button
                      onClick={() => handleDeleteRequest(request._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No victim requests found.</p>
        )}
      </div>
    </div>
  );
};

export default VictimRequests;
