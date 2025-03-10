import React, { useState } from "react";

const NgoVerification = () => {
  const [ngos, setNgos] = useState([
    {
      id: 1,
      name: "Helping Hands Foundation",
      email: "contact@helpinghands.org",
      registrationNumber: "HHF12345",
      status: "Pending",
    },
    {
      id: 2,
      name: "Care & Share NGO",
      email: "info@careshare.org",
      registrationNumber: "CSN67890",
      status: "Pending",
    },
  ]);

  const handleApprove = (id) => {
    setNgos(
      ngos.map((ngo) =>
        ngo.id === id ? { ...ngo, status: "Approved" } : ngo
      )
    );
  };

  const handleReject = (id) => {
    setNgos(
      ngos.map((ngo) =>
        ngo.id === id ? { ...ngo, status: "Rejected" } : ngo
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">NGO Verification</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Registration Number</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ngos.map((ngo) => (
              <tr key={ngo.id}>
                <td className="border px-4 py-2">{ngo.name}</td>
                <td className="border px-4 py-2">{ngo.email}</td>
                <td className="border px-4 py-2">{ngo.registrationNumber}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      ngo.status === "Approved"
                        ? "bg-green-200 text-green-800"
                        : ngo.status === "Rejected"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {ngo.status}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleApprove(ngo.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    disabled={ngo.status !== "Pending"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(ngo.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    disabled={ngo.status !== "Pending"}
                  >
                    Reject
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

export default NgoVerification;
