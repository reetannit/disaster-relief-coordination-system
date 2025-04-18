import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdatesPage = () => {
  // State to store updates
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Function to fetch updates from the API
    const fetchUpdates = async () => {
      try {
        // Retrieve email from local storage
        const email = localStorage.getItem("email");

        if (!email) {
          console.error("Email not found in local storage!");
          return;
        }

        // Send a POST request to the API with the email
        const response = await axios.post(
          "https://disaster-relief-coordination-system-backend.vercel.app/api/request/myrequests",
          { email }
        );

        console.log(response.data);

        // Update the state with the fetched updates
        setUpdates(response.data.data|| []);
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    // Fetch updates on component mount
    fetchUpdates();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Real-Time Updates</h2>
      <ul className="space-y-4">
        {updates.length > 0 ? (
          updates.map((update, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="font-semibold">Request Type: {update.requestType}</p>
              <p className="text-gray-700">Description: {update.description}</p>
              <p className="text-gray-700">Status: {update.status}</p>
              <p className="text-gray-700">
                Ngo Email: {update.ngoEmail||"Not Assigned"}
              </p>
              <small className="text-gray-500">
                Created At: {new Date(update.createdAt).toLocaleString()}
              </small>
             
            </li>
          ))
        ) : (
          <p className="text-gray-500">No updates available at the moment.</p>
        )}
      </ul>
    </div>
  );
};

export default UpdatesPage;
