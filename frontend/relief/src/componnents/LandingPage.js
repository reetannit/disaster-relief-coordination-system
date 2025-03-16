import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen font-sans relative">
      {/* Animated Full-Page Background */}
      <div className="animated-bg fixed inset-0 -z-10"></div>
      
      {/* Global CSS */}
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animated-bg {
            background: linear-gradient(270deg, #4f46e5, #06b6d4, #10b981, #3b82f6);
            background-size: 800% 800%;
            animation: gradientBG 15s ease infinite;
          }
          .card-hover:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          }
          .fade-in {
            animation: fadeIn 1s ease-out forwards;
            opacity: 0;
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="text-center py-32 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 fade-in">
          Disaster Relief Coordination System
        </h1>
        <p 
          className="text-xl md:text-2xl text-white max-w-3xl mx-auto fade-in" 
          style={{ animationDelay: "0.3s" }}
        >
          Fast, coordinated relief during disasters. Whether you're a victim, an NGO, or an admin, your role is crucial.
        </p>
      </section>

      {/* Role-Based Call to Action */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12 fade-in">
            Your Role in the Relief Effort
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Victim Section */}
            <div 
              className="bg-gradient-to-br from-white to-orange-100 p-8 rounded-xl shadow-md card-hover transition duration-300 fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Are You a Victim?</h3>
              <p className="text-gray-600 mb-6">
                If you or someone you know is affected by a disaster, we are here to help. Request assistance from local NGOs or volunteers.
              </p>
              <Link 
                to="/victim-login" 
                className="block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full"
              >
                Request Help Now
              </Link>
            </div>

            {/* NGO Section */}
            <div 
              className="bg-gradient-to-br from-white to-blue-100 p-8 rounded-xl shadow-md card-hover transition duration-300 fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Are You an NGO?</h3>
              <p className="text-gray-600 mb-6">
                Offer your expertise and resources to help those in need. Join us to coordinate aid efficiently.
              </p>
              <Link 
                to="/ngo-login" 
                className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full"
              >
                NGO Dashboard
              </Link>
            </div>

            {/* Admin Section */}
            <div 
              className="bg-gradient-to-br from-white to-purple-100 p-8 rounded-xl shadow-md card-hover transition duration-300 fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Are You an Admin?</h3>
              <p className="text-gray-600 mb-6">
                Oversee the system, monitor requests, and ensure that relief efforts are well-coordinated.
              </p>
              <Link 
                to="/admin-login" 
                className="block text-center bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12 fade-in">
            Key Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div 
              className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-xl shadow-md card-hover transition duration-300 fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Real-Time Requests</h3>
              <p className="text-gray-600">
                Submit help requests in real-time and get immediate responses from nearby organizations.
              </p>
            </div>
            <div 
              className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-xl shadow-md card-hover transition duration-300 fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Geolocation Matching</h3>
              <p className="text-gray-600">
                Our system uses geolocation to match victims with the closest available help.
              </p>
            </div>
            <div 
              className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-xl shadow-md card-hover transition duration-300 fade-in"
              style={{ animationDelay: "0.9s" }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Efficient Coordination</h3>
              <p className="text-gray-600">
                Streamlined management and coordination ensure that aid reaches those who need it most quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            &copy; 2025 Disaster Relief Coordination System. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
