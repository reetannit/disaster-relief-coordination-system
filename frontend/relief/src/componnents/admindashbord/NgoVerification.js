import React, { useState, useEffect } from "react";
import axios from "axios";

const NgoVerification = () => {
  const [ngos, setNgos] = useState([]);

  // Fetch all NGOs from the API and filter out those with verified === "true"
  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.get("https://disaster-relief-coordination-system-backend.vercel.app/api/admin/ngos");
        // Keep only NGOs where verified is not "true"
        const unverifiedNgos = response.data.filter((ngo) => ngo.verified !== "true");
        setNgos(unverifiedNgos);
      } catch (error) {
        console.error("Error fetching NGOs:", error);
      }
    };

    fetchNgos();
  }, []);

  // Handle accepting an NGO: update verified to "true" via API call
  const handleAccept = async (id) => {
    try {
      const ngoToUpdate = ngos.find((ngo) => ngo._id === id);
      if (!ngoToUpdate) return;

      // Update the NGO object with verified set to "true"
      const updatedNgo = { ...ngoToUpdate, verified: "true" };

      // Make the PUT request to update the NGO on the backend
      await axios.put(`https://disaster-relief-coordination-system-backend.vercel.app/api/admin/ngos/${id}`, updatedNgo);

      // Remove the NGO from state since it is now verified
      setNgos(ngos.filter((ngo) => ngo._id !== id));
    } catch (error) {
      console.error("Error updating NGO:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">NGO Verification</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Verification</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ngos.map((ngo) => (
              <tr key={ngo._id}>
                <td className="border px-4 py-2">{ngo.name}</td>
                <td className="border px-4 py-2">{ngo.email}</td>
                <td className="border px-4 py-2">{ngo.verified}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleAccept(ngo._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))}
            {ngos.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">
                  All NGOs are verified.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NgoVerification;
