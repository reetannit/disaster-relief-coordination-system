import React, { useState} from "react";

const VictimRequest = () => {
  // Mock data for victim requests
  const [victimRequest, setVictimRequest] = useState([]);

  // Mock data for NGOs
  const [ngos, setNgos] = useState([]);

  const [assignedNgo, setAssignedNgo] = useState(null);

  // Filter NGOs based on proximity to victim's location (mock logic)
  const filteredNgos = ngos.filter((ngo) => ngo.location === victimRequest.location);

  // Handle assignment of NGO
  const handleAssignNgo = (ngoId) => {
    const selectedNgo = ngos.find((ngo) => ngo.id === ngoId);
    setAssignedNgo(selectedNgo);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Victim Request</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Victim Request Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Victim Details</h2>
          <p className="mb-2">
            <strong>Location:</strong> {victimRequest.location}
          </p>
          <h3 className="font-semibold mb-2">Required Resources:</h3>
          <ul className="list-disc ml-5">
            {Object.entries(victimRequest.requiredResources).map(([key, value]) => (
              <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </li>
            ))}
          </ul>
        </div>

        {/* NGOs Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Nearest NGOs</h2>
          {filteredNgos.length > 0 ? (
            <ul>
              {filteredNgos.map((ngo) => (
                <li key={ngo.id} className="mb-4 border-b pb-4">
                  <h3 className="font-semibold">{ngo.name}</h3>
                  <p>Location: {ngo.location}</p>
                  <h4 className="font-semibold mt-2">Available Resources:</h4>
                  <ul className="list-disc ml-5">
                    {Object.entries(ngo.resourcesAvailable).map(([key, value]) => (
                      <li key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleAssignNgo(ngo.id)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Assign to Victim
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No nearby NGOs found.</p>
          )}
        </div>
      </div>

      {/* Assigned NGO Section */}
      {assignedNgo && (
        <div className="mt-6 bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Assigned NGO</h2>
          <p>
            <strong>Name:</strong> {assignedNgo.name}
          </p>
          <p>
            <strong>Location:</strong> {assignedNgo.location}
          </p>
        </div>
      )}
    </div>
  );
};

export default VictimRequest;
