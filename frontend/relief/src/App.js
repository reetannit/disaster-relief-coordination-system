import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Admin Dashboard Components
// import AdminSidebar from "./componnents/admindashbord/Sidebar";
import AdminDashboard from "./componnents/admindashbord/Dashboard";
import VictimRequests from "./componnents/admindashbord/VictimRequest";
import Resources from "./componnents/admindashbord/Resources";
import NgoVerification from "./componnents/admindashbord/NgoVerification";
import AdminSidebar from "./componnents/admindashbord/AdminSidebar";
import AdminLogin from "./componnents/admindashbord/AdminLogin";
import AdminSignup from "./componnents/admindashbord/AdminSign";

// NGO Dashboard Components
import NgoSidebar from "./componnents/ngodashbord/Sidebar";
import DisasterStatus from "./componnents/ngodashbord/DisasterStatus";
import AlertSystem from "./componnents/ngodashbord/AlertSystem";
import NGOLoginPage from "./componnents/ngodashbord/NGOlogin";
import NGOSignupPage from "./componnents/ngodashbord/NGOsignup";

// Victim Dashboard Components
import VictimSidebar from "./componnents/victimdashboard/Sidebar";
import HistoryPage from "./componnents/victimdashboard/HistoryPage";
import UpdatesPage from "./componnents/victimdashboard/UpdatesPage";
import VictimAlert from "./componnents/victimdashboard/AlertsPage";
import { Victimsignup } from "./componnents/victimdashboard/Victimsignup";
import Victimlogin from "./componnents/victimdashboard/Victimlogin";
import VictimRequestForm from "./componnents/victimdashboard/VictimRequestForm";
import ResourceManagement from "./componnents/ngodashbord/ResourceManagement";
import LandingPage from "./componnents/LandingPage";
import History from "./componnents/ngodashbord/History";




const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Dashboard */}
        <Route
          path="/admin/*"
          element={
            <div className="flex h-screen">
             <AdminSidebar/>
              <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                <Routes>
                  <Route path="" element={<AdminDashboard />} />
                  <Route path="victim-requests" element={<VictimRequests />} />
                  <Route path="resources" element={<Resources />} />
                  <Route path="ngo-verification" element={<NgoVerification />} />
        
    
                </Routes>
              </div>
            </div>
          }
        />

        {/* NGO Dashboard */}
        <Route
          path="/ngo/*"
          
          element={
            <div className="flex h-screen">
              <NgoSidebar />
              <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                <Routes>
                  <Route path="resource-management" element={<ResourceManagement />} />
                  <Route path="disaster-status" element={<DisasterStatus />} />
                  <Route path="alert-system" element={<AlertSystem />} />
                  <Route path="history" element={<History/>} />
      
                  
                </Routes>
              </div>
            </div>
          }
        />

        {/* Victim Dashboard */}
        <Route
          path="/victim/*"
          element={
            <div className="flex h-screen">
              <VictimSidebar />
              <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                <Routes>
                  <Route path="sos" element={<VictimRequestForm/>} />
                  <Route path="history" element={<HistoryPage />} />
                  <Route path="updates" element={<UpdatesPage />} />
                    <Route path="alerts" element={<VictimAlert />} />
                  {/* <Route path="login" element={<VictimLoginPage/>} /> */}
                 

                </Routes>
              </div>
            </div>
          }
        />
        <Route path="/ngo-login" element={<NGOLoginPage/>} />
        <Route path="/ngo-sign-up" element={<NGOSignupPage/>} />
        <Route path="/admin-login" element={<AdminLogin/>} />
        <Route path="/admin-sign-up" element={<AdminSignup/>} />
        <Route path="/victim-signup" element={<Victimsignup />} />
        <Route path="/victim-login" element={< Victimlogin/>} />
        <Route path="/" element={<LandingPage/>} />

      </Routes>
    </Router>
  );
};

export default App;


