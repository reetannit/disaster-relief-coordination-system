import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NGOLoginPage = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNGOLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/ngo/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token",data.token)
        localStorage.setItem("email",data.email)
        localStorage.setItem("name",data.name)
        alert("Login successful!");
        navigate("/ngo/resource-management")
        
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during NGO login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">NGO Login</h2>
        <form onSubmit={handleNGOLogin}>
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
            />
          </div>
          <div className="mb-6">
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
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <a href="ngo-sign-up" className="text-green-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default NGOLoginPage;
