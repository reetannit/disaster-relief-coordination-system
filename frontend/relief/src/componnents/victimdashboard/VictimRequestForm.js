import React, { useState, useEffect } from "react";

const VictimRequestForm = () => {
  const [victimPhone, setVictimPhone] = useState("");
  const [requestType, setRequestType] = useState("Food");
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [affectedPeople, setAffectedPeople] = useState(1); // New state for affected people
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user coordinates
  useEffect(() => {
    const fetchCoordinates = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Coordinates fetched successfully:", latitude, longitude); // Log coordinates for debugging
            setCoordinates([longitude, latitude]); // Correct the order of latitude and longitude
          },
          (error) => {
            console.error("Error fetching location:", error); // Log error details
            alert("Could not fetch your location. Please enable location services.");
          },
          {
            enableHighAccuracy: true, // Enable high accuracy for better results
            timeout: 10000, // Set a timeout of 10 seconds to fetch location
            maximumAge: 0, // Do not use cached location
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    };

    fetchCoordinates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate location
    if (coordinates.length === 0 || coordinates[0] === undefined || coordinates[1] === undefined) {
      alert("Location is required. Please enable location services.");
      setIsSubmitting(false);
      return;
    }

    const requestData = {
      victimEmail: localStorage.getItem("email"), // Assuming email is saved in localStorage
      victimPhone,
      requestType,
      description,
      location: {
        type: "Point", // GeoJSON type for point
        coordinates,   // [longitude, latitude] from geolocation
      },
      affectedPeople, // Include affected people in the payload
    };

    try {
      const response = await fetch("http://localhost:5001/api/request/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Request submitted successfully!");
        // Reset form fields after submission
        setVictimPhone("");
        setRequestType("Food");
        setDescription("");
        setCoordinates([]);
        setAffectedPeople(1); // Reset affected people to default
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
          <div className="mb-4">
            <label htmlFor="affectedPeople" className="block text-sm font-medium text-gray-700">
              Number of Affected People
            </label>
            <input
              type="number"
              id="affectedPeople"
              value={affectedPeople}
              onChange={(e) => setAffectedPeople(Number(e.target.value))}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Enter number of affected people"
              min={1}
              required
            />
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
        </form>
      </div>
    </div>
  );
};

export default VictimRequestForm;
