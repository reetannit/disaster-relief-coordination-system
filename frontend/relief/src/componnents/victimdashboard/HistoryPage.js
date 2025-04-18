// import React from "react";

// const HistoryPage = () => {
//   const sosRequests = [
//     {
//       message: "Need food supplies urgently.",
//       timestamp: new Date("2024-12-01T14:00:00"),
//       status: "Completed",
//       resourcesDelivered: [
//         { resource: "Food", timestamp: new Date("2024-12-01T14:30:00"), location: "Lat: 34.0522, Lon: -118.2437" },
//         { resource: "Water", timestamp: new Date("2024-12-01T14:45:00"), location: "Lat: 34.0522, Lon: -118.2437" },
//       ],
//     },
//     {
//       message: "Medical assistance required.",
//       timestamp: new Date("2024-12-02T08:00:00"),
//       status: "In Progress",
//       resourcesDelivered: [],
//     },
//   ];

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Request History</h2>
//       {sosRequests.length > 0 ? (
//         <ul className="space-y-4">
//           {sosRequests.map((req, index) => (
//             <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
//               <p><strong>Message:</strong> {req.message}</p>
//               <p><strong>Status:</strong> {req.status}</p>
//               <small className="text-gray-500">
//                 <strong>Requested at:</strong> {req.timestamp.toLocaleString()}
//               </small>
//               <div className="mt-4">
//                 <strong>Resources Delivered:</strong>
//                 {req.resourcesDelivered.length > 0 ? (
//                   <ul className="space-y-2">
//                     {req.resourcesDelivered.map((resource, index) => (
//                       <li key={index} className="bg-gray-200 p-2 rounded-lg">
//                         <p>{resource.resource} - Delivered at {resource.timestamp.toLocaleString()}</p>
//                         <p className="text-sm text-gray-500">Location: {resource.location}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-500">No resources delivered yet.</p>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No SOS requests made yet.</p>
//       )}
//     </div>
//   );
// };

// export default HistoryPage;







import React, { useState, useEffect } from "react";

const HistoryPage = () => {
  const [sosRequests, setSosRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchRequestsByEmail = async () => {
      setLoading(true);
      setError(null);

      const userEmail = localStorage.getItem("email"); // Replace with the correct key
      if (!userEmail) {
        setError("User email not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://disaster-relief-coordination-system-backend.vercel.app/api/request/getrequest", {
          method: "POST", // Using POST to send data in the body
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }), // Sending email in the body
        });

        if (!response.ok) {
          throw new Error("Failed to fetch requests.");
        }
        const data = await response.json();
        console.log(data.data);
        setSosRequests(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestsByEmail();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Request History</h2>
      {sosRequests.length > 0 ? (
        <ul className="space-y-4">
          {sosRequests.map((req) => (
            <li key={req._id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p><strong>Message:</strong> {req.description || "No description provided."}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Assigned Ngo:</strong> {req.ngoEmail||"Not Assigned"}</p>
              <small className="text-gray-500">
                <strong>Requested at:</strong> {new Date(req.createdAt).toLocaleString()}
              </small>
      
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No SOS requests made yet.</p>
      )}
    </div>
  );
};

export default HistoryPage;
