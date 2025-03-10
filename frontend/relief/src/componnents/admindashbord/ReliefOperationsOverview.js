import React from "react";

const ReliefOperationsOverview = () => {
  // Dummy data for relief status summary
  const reliefSummary = {
    activeReliefOperations: 10,
    totalRequestsHandled: 250,
    resourcesAllocated: {
      food: 1500,
      water: 1000,
      clothes: 500,
      medicines: 300,
    },
    peopleHelped: 3500,
  };

  // Dummy data for disaster impact
  const disasterImpact = {
    affectedRegions: ["City A", "City B", "City C"],
    severity: "Critical",
    totalPeopleImpacted: 8000,
  };

  // Dummy data for alerts & notifications
  const alerts = [
    { id: 1, message: "New SOS request from City A. Urgent!" },
    { id: 2, message: "High-priority area in City B due to flooding." },
    { id: 3, message: "Emergency supplies dispatched to City C." },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Relief Status Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Relief Status Summary</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Active Relief Operations</h2>
            <p className="text-2xl font-bold">{reliefSummary.activeReliefOperations}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Total Requests Handled</h2>
            <p className="text-2xl font-bold">{reliefSummary.totalRequestsHandled}</p>
          </div>
          <div className="bg-orange-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">People Helped</h2>
            <p className="text-2xl font-bold">{reliefSummary.peopleHelped}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Resources Allocated</h2>
            <ul>
              <li>Food: {reliefSummary.resourcesAllocated.food}</li>
              <li>Water: {reliefSummary.resourcesAllocated.water}</li>
              <li>Clothes: {reliefSummary.resourcesAllocated.clothes}</li>
              <li>Medicines: {reliefSummary.resourcesAllocated.medicines}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disaster Impact Dashboard */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Disaster Impact Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Affected Regions</h2>
            <ul>
              {disasterImpact.affectedRegions.map((region, index) => (
                <li key={index} className="text-lg">{region}</li>
              ))}
            </ul>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Severity</h2>
            <p className="text-2xl font-bold">{disasterImpact.severity}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Total People Impacted</h2>
            <p className="text-2xl font-bold">{disasterImpact.totalPeopleImpacted}</p>
          </div>
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Alerts & Notifications</h1>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-yellow-100 p-4 rounded-lg shadow-md"
            >
              <p className="text-lg font-medium">{alert.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReliefOperationsOverview;
