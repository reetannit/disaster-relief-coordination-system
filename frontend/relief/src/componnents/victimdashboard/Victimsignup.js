import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export const Victimsignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate()

  const handleVictimSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }


    try {
      const response = await fetch("http://localhost:5001/api/victims/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // console.log("Victim signed up successfully:", data);
        navigate("/victim-login")
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during victim signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Victim Sign Up</h2>
        <form onSubmit={handleVictimSignup}>
          <div className="mb-3">
            <label htmlFor="name" className="block text-xs font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-sm"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-xs font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-sm"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="block text-xs font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-sm"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-sm"
              placeholder="Confirm your password"
            />
          </div>



          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-xs text-center">
          Already have an account? <a href="victim-login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};
