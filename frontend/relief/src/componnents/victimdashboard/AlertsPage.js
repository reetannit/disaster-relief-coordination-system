import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AlertsPage = () => {
  const [safetyStatus, setSafetyStatus] = useState("At Risk");
  const [customMessage, setCustomMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [email, setEmail] = useState("");
  const [userAlerts, setUserAlerts] = useState([]); // State to store fetched alerts

  // Fetch email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserAlerts(storedEmail); // Fetch alerts for the logged-in user
    }
  }, []);

  // Function to fetch alerts based on logged-in email
  const fetchUserAlerts = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/api/emergency/myemergencyrequest/`, {
        email: localStorage.getItem("email"),  // Sending email as part of the request body
      });
  
      // Use response.data instead of response.json()
      const data = response.data;
      console.log(data);
  
      if (response.status === 200) {
        setUserAlerts(data); // Set the fetched alerts to state
      } else {
        console.error("Failed to fetch alerts:", data);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };
  

  const alerts = [
    { type: "Evacuate", message: "Evacuate City A immediately due to rising floodwaters.", color: "bg-red-500" },
    { type: "Warning", message: "Severe weather warning issued for City B.", color: "bg-yellow-500" },
  ];

  const handleStatusChange = (event) => {
    setSafetyStatus(event.target.value);
  };

  const handleMessageChange = (event) => {
    setCustomMessage(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSendEmergency = async () => {
    getLocation();
    if (!email || !phoneNumber || !location) {
      setAlertMessage("Please ensure all details are available before sending emergency.");
      return;
    }

    const emergencyData = {
      email,
      safetyStatus,
      message: customMessage,
      phoneNumber,
      location,
    };

    try {
      const response = await fetch("http://localhost:5001/api/emergency/sendemergency", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emergencyData),
      });
      
      if (response.ok) {
        setAlertMessage("Emergency details sent successfully.");
        fetchUserAlerts(email); // Re-fetch alerts after sending a new one
      } else {
        setAlertMessage("Failed to send emergency details.");
      }
    } catch (error) {
      console.error("Error sending emergency details:", error);
      setAlertMessage("Error sending emergency request.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Emergency Alerts</h2>
      <ul className="space-y-2 mb-6">
        {alerts.map((alert, index) => (
          <li key={index} className={`${alert.color} text-white p-4 rounded-lg shadow-sm`}>
            <p>{alert.message}</p>
          </li>
        ))}
      </ul>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Update Your Safety Status</h3>
        <select
          value={safetyStatus}
          onChange={handleStatusChange}
          className="p-2 border rounded-lg w-full"
        >
          <option value="At Risk">At Risk</option>
          <option value="In Need of Help">In Need of Help</option>
        </select>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Enter Your Message</h3>
        <input
          type="text"
          value={customMessage}
          onChange={handleMessageChange}
          placeholder="Enter your message here"
          className="p-2 border rounded-lg w-full"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Enter Your Phone Number</h3>
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter your phone number"
          className="p-2 border rounded-lg w-full"
        />
      </div>

      <button
        onClick={getLocation}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4"
      >
        Get Location
      </button>

      {location && (
        <div className="mb-4 bg-blue-500 text-white p-4 rounded-lg shadow-sm">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}

      <button
        onClick={handleSendEmergency}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Send Emergency
      </button>

      {alertMessage && (
        <div className="mt-4 bg-green-500 text-white p-4 rounded-lg shadow-sm">
          <p>{alertMessage}</p>
        </div>
      )}

      {/* Section to display all alerts for the logged-in user */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Your Previous Alerts</h3>
        {userAlerts.length === 0 ? (
          <p>No alerts found for your email.</p>
        ) : (
          <ul className="space-y-2">
            {userAlerts.map((alert, index) => (
              <li key={index} className="border p-4 rounded-lg shadow-sm">
                <p><strong>Status:</strong> {alert.safetyStatus}</p>
                <p><strong>Message:</strong> {alert.message}</p>
                <p><strong>Phone Number:</strong> {alert.phoneNumber}</p>
                <p><strong>Location:</strong> Lat: {alert.location.latitude}, Lon: {alert.location.longitude}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;
