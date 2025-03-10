// import React, { useState, useEffect } from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const NGOSignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

  // Fetch user coordinates
  useEffect(() => {
    const fetchCoordinates = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates([longitude, latitude]); // Longitude comes first in GeoJSON format
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

  const handleNGOSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !confirmPassword || coordinates.length === 0) {
      alert("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/ngo/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, coordinates, password }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response from server.");
      }

      const data = await response.json();

      if (response.ok) {
       
       navigate("/ngo-login")
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during NGO signup:", error);
      alert("An error occurred. Please check the server or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">NGO Sign Up</h2>
        <form onSubmit={handleNGOSignup}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Enter your NGO name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-4">
            <p className="text-xs text-gray-500 mt-1">
              Your coordinates: {coordinates.length > 0 ? `${coordinates[1]}, ${coordinates[0]}` : "Fetching..."}
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account? <a href="ngo-login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default NGOSignupPage;
