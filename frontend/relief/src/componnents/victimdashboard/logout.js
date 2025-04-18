import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VictimRequestForm = () => {
  const [victimEmail, setVictimEmail] = useState("");
  const [victimPhone, setVictimPhone] = useState("");
  const [requestType, setRequestType] = useState("Food");
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch user coordinates
  useEffect(() => {
    const fetchCoordinates = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates([longitude, latitude]);
          },
          (error) => {
            console.error("Error fetching location:", error);
            alert("Could not fetch your location. Please enable location services.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    };

    fetchCoordinates();
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken"); // Clear auth data
    localStorage.removeItem("victimData");
    navigate("/"); // Redirect to login
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (coordinates.length === 0) {
      alert("Location is required. Please enable location services.");
      setIsSubmitting(false);
      return;
    }

    const requestData = {
      victimEmail,
      victimPhone,
      requestType,
      description,
      location: { coordinates },
    };

    try {
      const response = await fetch("https://disaster-relief-coordination-system-backend.vercel.app/api/request/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Request submitted successfully!");
        logout(); // Logout after successful submission
      } else {
        alert(data.message || "Request submission failed.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Victim Request Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="victimEmail" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="victimEmail"
              value={victimEmail}
              onChange={(e) => setVictimEmail(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="victimPhone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="victimPhone"
              value={victimPhone}
              onChange={(e) => setVictimPhone(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="requestType" className="block text-sm font-medium text-gray-700">
              Request Type
            </label>
            <select
              id="requestType"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
            >
              <option value="Food">Food</option>
              <option value="Water">Water</option>
              <option value="Shelter">Shelter</option>
              <option value="Medical">Medical</option>
              <option value="Clothing">Clothing</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Provide additional details (optional)"
              maxLength={500}
            ></textarea>
          </div>
          <p className="text-xs text-gray-500 mb-6">
            Your coordinates: {coordinates.length > 0 ? `${coordinates[1]}, ${coordinates[0]}` : "Fetching..."}
          </p>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
          <button
            type="button"
            onClick={logout}
            className="w-full mt-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default VictimRequestForm;
