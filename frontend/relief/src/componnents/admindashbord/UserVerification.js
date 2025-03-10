import React, { useState } from "react";

const UserVerification = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Pending" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Pending" },
  ]);

  const handleApprove = (id) => {
    setUsers(users.map(user => (user.id === id ? { ...user, status: "Approved" } : user)));
  };

  const handleReject = (id) => {
    setUsers(users.map(user => (user.id === id ? { ...user, status: "Rejected" } : user)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Verification</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      user.status === "Approved"
                        ? "bg-green-200 text-green-800"
                        : user.status === "Rejected"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleApprove(user.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    disabled={user.status !== "Pending"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    disabled={user.status !== "Pending"}
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

export default UserVerification;
