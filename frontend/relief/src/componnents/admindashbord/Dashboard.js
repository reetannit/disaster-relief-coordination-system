import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [ngos, setNgos] = useState([]);
  const [victims, setVictims] = useState([]);
  const [victimRequests, setVictimRequests] = useState([]);
  const [emergencies, setEmergencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ngosRes = await axios.get("http://localhost:5001/api/admin/ngos");
        setNgos(ngosRes.data);

        const victimsRes = await axios.get("http://localhost:5001/api/admin/victims");
        setVictims(victimsRes.data);

        const victimReqRes = await axios.get("http://localhost:5001/api/admin/victim-requests");
        setVictimRequests(victimReqRes.data);

        const emergenciesRes = await axios.get("http://localhost:5001/api/admin/emergencies");
        setEmergencies(emergenciesRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data: ", error);
      }
    };

    fetchData();
  }, []);

  // Compute additional metrics (adjust these formulas as needed):
  // Total Helped: count of victim requests with status "Completed"
  const totalHelped = victimRequests.filter(req => req.status === "Completed").length;
  // Total Victims Helped: sum of affectedPeople field across victim requests
  const totalVictimsHelped = victimRequests.reduce(
    (sum, req) => sum + Number(req.affectedPeople || 0),
    0
  );
  // For demonstration, we simulate Total Contributed and Total Resources Helped:
  const totalContributed = victimRequests.length * 10; // Example: 100 units per request
  const totalResourcesHelped = victimRequests.length * 5; // Example: 50 units per request

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total NGOs</h2>
          <p className="text-3xl font-bold">{ngos.length}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Volunteers</h2>
          <p className="text-3xl font-bold">{victims.length}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Open Requests</h2>
          <p className="text-3xl font-bold">{victimRequests.length}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Emergency Alerts</h2>
          <p className="text-3xl font-bold">{emergencies.length}</p>
        </div>
      </div>
      {/* New metric cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Contributed</h2>
          <p className="text-3xl font-bold">{totalContributed}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Helped</h2>
          <p className="text-3xl font-bold">{totalHelped}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Resources Helped</h2>
          <p className="text-3xl font-bold">{totalResourcesHelped}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Victims Helped</h2>
          <p className="text-3xl font-bold">{totalVictimsHelped}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
