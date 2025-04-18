import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Victimlogin = () =>  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
  
    const handleVictimLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("https://disaster-relief-coordination-system-backend.vercel.app/api/victims/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
    
        const contentType = response.headers.get("content-type");
    
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (response.ok) {
            // console.log("Victim logged in successfully:", data);
            localStorage.setItem("email",data.email)
            localStorage.setItem("token",data.token)
            alert("Login successful!");
            navigate("/victim/sos");
            

          } else {
            alert(data.message || "Login failed");
          }
        } else {
          console.error("Unexpected response format. Expected JSON.");
          const text = await response.text(); // For debugging purposes
          console.error("Response content:", text);
          alert("An unexpected error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Error during victim login:", error);
        alert("An error occurred. Please try again.");
      }
    };
    
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Victim Login</h2>
          <form onSubmit={handleVictimLogin}>
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
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don't have an account? <a href="victim-signup" className="text-blue-500">Sign up</a>
          </p>
        </div>
      </div>
    );
  };
  

export default Victimlogin