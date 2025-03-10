import React, { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [completedRequests, setCompletedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedRequests = async () => {
      try {
        setLoading(true);

        // Fetch requests assigned to NGO
        const response = await axios.post(
          `http://localhost:5001/api/ngo/ngohistory`, // Update the correct API endpoint here
          { ngoEmail: localStorage.getItem("email") }
        );

        console.log("Fetched Data:", response.data);

        // Filter only completed requests
        const completedData = response.data.filter(
          (item) => item.status === "Completed"
        ) || [];

        setCompletedRequests(completedData);
      } catch (err) {
        setError("Error fetching completed history");
        console.error("Error fetching completed history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedRequests();
  }, []);

  if (loading) {
    return <div className="text-center">Loading completed requests...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Completed Requests History</h1>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        {completedRequests.length === 0 ? (
          <div className="text-center text-gray-500">No completed disaster requests.</div>
        ) : (
          <table className="table-auto w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2">Request Type</th>
                <th className="px-3 py-2">Description</th>
                <th className="px-3 py-2">Victim Email</th>
                <th className="px-3 py-2">Victim Phone</th>
                <th className="px-3 py-2">Affected People</th>
              </tr>
            </thead>
            <tbody>
              {completedRequests.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-3 py-2 text-xs">{item.requestType}</td>
                  <td className="px-3 py-2 text-xs">{item.description}</td>
                  <td className="px-3 py-2 text-xs">{item.victimEmail}</td>
                  <td className="px-3 py-2 text-xs">{item.victimPhone}</td>
                  <td className="px-3 py-2 text-xs">{item.affectedPeople}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default History;
