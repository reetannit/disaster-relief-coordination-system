import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Volunteers</h2>
          <p className="text-3xl font-bold">150</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Open Requests</h2>
          <p className="text-3xl font-bold">45</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Supplies Distributed</h2>
          <p className="text-3xl font-bold">320</p>
        </div>
      </div>
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Recent Requests</h2>
        <ul>
          <li className="p-4 border-b">Request #1: Water Bottles</li>
          <li className="p-4 border-b">Request #2: Medical Kits</li>
          <li className="p-4 border-b">Request #3: Food Supplies</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
