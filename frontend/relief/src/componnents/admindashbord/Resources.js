import React from "react";

const Resources = () => {
  // Dummy data
  const resources = [
    {
      id: 1,
      ngoName: "Helping Hands Foundation",
      food: 150, // Count of food packets
      clothes: 100, // Count of clothes sets
      water: 200, // Count of water bottles
      medicine: 50, // Count of medicine kits
      location: "New York, NY",
    },
    {
      id: 2,
      ngoName: "Care & Share NGO",
      food: 300,
      clothes: 50,
      water: 100,
      medicine: 80,
      location: "Los Angeles, CA",
    },
    {
      id: 3,
      ngoName: "Relief Trust",
      food: 500,
      clothes: 300,
      water: 1000,
      medicine: 120,
      location: "Houston, TX",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Available Resources</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">NGO Name</th>
              <th className="px-4 py-2">Food Packets</th>
              <th className="px-4 py-2">Clothes Sets</th>
              <th className="px-4 py-2">Water Bottles</th>
              <th className="px-4 py-2">Medicine Kits</th>
              <th className="px-4 py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td className="border px-4 py-2">{resource.ngoName}</td>
                <td className="border px-4 py-2">{resource.food}</td>
                <td className="border px-4 py-2">{resource.clothes}</td>
                <td className="border px-4 py-2">{resource.water}</td>
                <td className="border px-4 py-2">{resource.medicine}</td>
                <td className="border px-4 py-2">{resource.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {resources.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No resources available.</p>
        )}
      </div>
    </div>
  );
};

export default Resources;

