import React, { useState, useEffect } from "react";
import axios from "axios";

const ResourceManagement = () => {
  const [resources, setResources] = useState({
    food: 0,
    water: 0,
    clothes: 0,
    medicines: 0,
    equipment: 0,
  });

  const [reliefData, setReliefData] = useState([]);

  // Function to fetch relief data from the backend
  const fetchReliefData = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/ngo/get-resources", {
        email: localStorage.getItem("email"),
      });
      setResources(response.data.resources); // Update the resources state with fetched data
      console.log(response.data); // Check the data being returned
    } catch (error) {
      console.error("Error fetching relief data:", error);
    }
  };

  // Fetch relief data when component mounts
  useEffect(() => {
    fetchReliefData();
  }, []);

  // Handle change for resource inputs
  const handleChange = (e) => {
    setResources({ ...resources, [e.target.name]: e.target.value });
  };

  // Handle submit for resource update
  const handleSubmit = async () => {
    try {
      console.log("Sending resources:", resources); // Debugging Log

      const response = await axios.post("http://localhost:5001/api/ngo/create-resources", {
        email: localStorage.getItem("email"),
        resources,
      });

      console.log("Resource Updated Successfully:", response.data);

      // After successful update, fetch the updated data
      fetchReliefData();

    } catch (error) {
      console.error("Error updating resources:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Resource Management</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Available Resources</h2>
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Resource Type</th>
              <th className="px-4 py-2">Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(resources).map(([key, value], index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{key}</td>
                <td className="border px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Update Resources</h2>
        {Object.keys(resources).map((key) => (
          <div className="mb-3" key={key}>
            <label className="block text-gray-700 font-medium mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="number"
              name={key}
              value={resources[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Update Resources
        </button>
      </div>
    </div>
  );
};

export default ResourceManagement;
