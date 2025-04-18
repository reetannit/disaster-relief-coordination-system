import React, { useState, useEffect } from "react";
import axios from "axios";

const Resources = () => {
  // Active tab state: "NGOs", "Victims", "VictimRequests", "EmergencyAlerts"
  const [activeTab, setActiveTab] = useState("NGOs");

  // State for each entity loaded from the API
  const [ngos, setNGOs] = useState([]);
  const [victims, setVictims] = useState([]);
  const [victimRequests, setVictimRequests] = useState([]);
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);

  // Editing state to track which record is being edited (for all entities)
  const [editingEntity, setEditingEntity] = useState({ entity: "", id: null });
  // Temp storage for values while editing
  const [tempData, setTempData] = useState({});

  // Fetch data on mount using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ngosRes = await axios.get("https://disaster-relief-coordination-system-backend.vercel.app/api/admin/ngos");
        setNGOs(ngosRes.data);

        const victimsRes = await axios.get("https://disaster-relief-coordination-system-backend.vercel.app/api/admin/victims");
        setVictims(victimsRes.data);

        const victimReqRes = await axios.get("https://disaster-relief-coordination-system-backend.vercel.app/api/admin/victim-requests");
        setVictimRequests(victimReqRes.data);

        const emergencyRes = await axios.get("https://disaster-relief-coordination-system-backend.vercel.app/api/admin/emergencies");
        setEmergencyAlerts(emergencyRes.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  /* ----- NGO Update and Delete Functions with Axios ----- */
  const updateNGO = async (updatedNGO) => {
    try {
      const response = await axios.put(
        `https://disaster-relief-coordination-system-backend.vercel.app/api/admin/ngos/${updatedNGO._id}`,
        updatedNGO
      );
      setNGOs(ngos.map((ngo) => (ngo._id === response.data._id ? response.data : ngo)));
      setEditingEntity({ entity: "", id: null });
    } catch (error) {
      console.error("Error updating NGO: ", error);
    }
  };

  const deleteNGO = async (id) => {
    try {
      await axios.delete(`https://disaster-relief-coordination-system-backend.vercel.app/api/admin/ngos/${id}`);
      setNGOs(ngos.filter((ngo) => ngo._id !== id));
    } catch (error) {
      console.error("Error deleting NGO: ", error);
    }
  };

  /* ----- Victim Update and Delete Functions with Axios ----- */
  const updateVictim = async (updatedVictim) => {
    try {
      const response = await axios.put(
        `https://disaster-relief-coordination-system-backend.vercel.app/api/admin/victims/${updatedVictim._id}`,
        updatedVictim
      );
      setVictims(victims.map((victim) => (victim._id === response.data._id ? response.data : victim)));
      setEditingEntity({ entity: "", id: null });
    } catch (error) {
      console.error("Error updating Victim: ", error);
    }
  };

  const deleteVictim = async (id) => {
    try {
      await axios.delete(`https://disaster-relief-coordination-system-backend.vercel.app/api/admin/victims/${id}`);
      setVictims(victims.filter((victim) => victim._id !== id));
    } catch (error) {
      console.error("Error deleting Victim: ", error);
    }
  };

  /* ----- Victim Request Update and Delete Functions with Axios ----- */
  const updateVictimRequest = async (updatedRequest) => {
    try {
      const response = await axios.put(
        `https://disaster-relief-coordination-system-backend.vercel.app/api/admin/victim-requests/${updatedRequest._id}`,
        updatedRequest
      );
      setVictimRequests(
        victimRequests.map((req) => (req._id === response.data._id ? response.data : req))
      );
      setEditingEntity({ entity: "", id: null });
    } catch (error) {
      console.error("Error updating Victim Request: ", error);
    }
  };

  const deleteVictimRequest = async (id) => {
    try {
      await axios.delete(`https://disaster-relief-coordination-system-backend.vercel.app/api/admin/victim-requests/${id}`);
      setVictimRequests(victimRequests.filter((req) => req._id !== id));
    } catch (error) {
      console.error("Error deleting Victim Request: ", error);
    }
  };

  /* ----- Emergency Alert Update and Delete Functions with Axios ----- */
  const updateEmergencyAlert = async (updatedAlert) => {
    try {
      const response = await axios.put(
        `https://disaster-relief-coordination-system-backend.vercel.app/api/admin/emergencies/${updatedAlert._id}`,
        updatedAlert
      );
      setEmergencyAlerts(
        emergencyAlerts.map((alert) =>
          alert._id === response.data._id ? response.data : alert
        )
      );
      setEditingEntity({ entity: "", id: null });
    } catch (error) {
      console.error("Error updating Emergency Alert: ", error);
    }
  };

  const deleteEmergencyAlert = async (id) => {
    try {
      await axios.delete(`https://disaster-relief-coordination-system-backend.vercel.app/api/admin/emergencies/${id}`);
      setEmergencyAlerts(emergencyAlerts.filter((alert) => alert._id !== id));
    } catch (error) {
      console.error("Error deleting Emergency Alert: ", error);
    }
  };

  // ----- Render Table Based on Active Tab -----
  const renderTable = () => {
    if (activeTab === "NGOs") {
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">NGOs</h2>
          <table className="table-auto w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Verified</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ngos.map((ngo) => (
                <tr key={ngo._id}>
                  <td className="border px-4 py-2">{ngo._id}</td>
                  <td className="border px-4 py-2">
                    {editingEntity.entity === "NGO" && editingEntity.id === ngo._id ? (
                      <input
                        type="text"
                        value={tempData.name || ngo.name}
                        onChange={(e) =>
                          setTempData({ ...tempData, name: e.target.value })
                        }
                        className="border p-1"
                      />
                    ) : (
                      ngo.name
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingEntity.entity === "NGO" && editingEntity.id === ngo._id ? (
                      <input
                        type="email"
                        value={tempData.email || ngo.email}
                        onChange={(e) =>
                          setTempData({ ...tempData, email: e.target.value })
                        }
                        className="border p-1"
                      />
                    ) : (
                      ngo.email
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingEntity.entity === "NGO" && editingEntity.id === ngo._id ? (
                      <input
                        type="tel"
                        value={tempData.phone || ngo.phone}
                        onChange={(e) =>
                          setTempData({ ...tempData, phone: e.target.value })
                        }
                        className="border p-1"
                      />
                    ) : (
                      ngo.phone
                    )}
                  </td>
                  <td className="border px-4 py-2">{ngo.verified ? "Yes" : "No"}</td>
                  <td className="border px-4 py-2">
                    {editingEntity.entity === "NGO" && editingEntity.id === ngo._id ? (
                      <>
                        <button
                          onClick={() => updateNGO({ ...ngo, ...tempData })}
                          className="bg-blue-500 text-white px-2 py-1 mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditingEntity({ entity: "", id: null })}
                          className="bg-gray-500 text-white px-2 py-1"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingEntity({ entity: "NGO", id: ngo._id });
                            setTempData(ngo);
                          }}
                          className="bg-yellow-500 text-white px-2 py-1 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteNGO(ngo._id)}
                          className="bg-red-500 text-white px-2 py-1"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === "Victims") {
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Victims</h2>
          <table className="table-auto w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {victims.map((victim) => (
                <tr key={victim._id}>
                  <td className="border px-4 py-2">{victim._id}</td>
                  <td className="border px-4 py-2">
                    {editingEntity.entity === "Victim" && editingEntity.id === victim._id ? (
                      <input
                        type="text"
                        value={tempData.name || victim.name}
                        onChange={(e) =>
                          setTempData({ ...tempData, name: e.target.value })
                        }
                        className="border p-1"
                      />
                    ) : (
                      victim.name
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingEntity.entity === "Victim" && editingEntity.id === victim._id ? (
                      <input
                        type="email"
                        value={tempData.email || victim.email}
                        onChange={(e) =>
                          setTempData({ ...tempData, email: e.target.value })
                        }
                        className="border p-1"
                      />
                    ) : (
                      victim.email
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingEntity.entity === "Victim" && editingEntity.id === victim._id ? (
                      <input
                        type="tel"
                        value={tempData.phone || victim.phone}
                        onChange={(e) =>
                          setTempData({ ...tempData, phone: e.target.value })
                        }
                        className="border p-1"
                      />
                    ) : (
                      victim.phone
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingEntity.entity === "Victim" && editingEntity.id === victim._id ? (
                      <>
                        <button
                          onClick={() => updateVictim({ ...victim, ...tempData })}
                          className="bg-blue-500 text-white px-2 py-1 mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditingEntity({ entity: "", id: null })}
                          className="bg-gray-500 text-white px-2 py-1"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingEntity({ entity: "Victim", id: victim._id });
                            setTempData(victim);
                          }}
                          className="bg-yellow-500 text-white px-2 py-1 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteVictim(victim._id)}
                          className="bg-red-500 text-white px-2 py-1"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === "VictimRequests") {
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Victim Requests</h2>
          <table className="table-auto w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
              
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {victimRequests.map((req) => (
                <tr key={req._id}>
                  <td className="border px-4 py-2">{req._id}</td>
              
                  <td className="border px-4 py-2">
                    {editingEntity.entity === "VictimRequest" && editingEntity.id === req._id ? (
                      <input
                        type="text"
                        value={tempData.description || req.description}
                        onChange={(e) =>
                          setTempData({ ...tempData, description: e.target.value })
                        }
                        className="border p-1"
                      />
                    ) : (
                      req.description
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingEntity.entity === "VictimRequest" && editingEntity.id === req._id ? (
                      <>
                        <button
                          onClick={() => updateVictimRequest({ ...req, ...tempData })}
                          className="bg-blue-500 text-white px-2 py-1 mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditingEntity({ entity: "", id: null })}
                          className="bg-gray-500 text-white px-2 py-1"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingEntity({ entity: "VictimRequest", id: req._id });
                            setTempData(req);
                          }}
                          className="bg-yellow-500 text-white px-2 py-1 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteVictimRequest(req._id)}
                          className="bg-red-500 text-white px-2 py-1"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === "EmergencyAlerts") {
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Emergency Alerts</h2>
          <table className="table-auto w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {emergencyAlerts.map((alert) => (
                <tr key={alert._id}>
                  <td className="border px-4 py-2">{alert._id}</td>
                  <td className="border px-4 py-2">
                    {editingEntity.entity === "EmergencyAlert" && editingEntity.id === alert._id ? (
                      <input
                        type="text"
                        value={tempData.message || alert.message}
                        onChange={(e) =>
                          setTempData({ ...tempData, message: e.target.value })
                        }
                        className="border p-1"
                      />
                    ) : (
                      alert.message
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingEntity.entity === "EmergencyAlert" && editingEntity.id === alert._id ? (
                      <>
                        <button
                          onClick={() => updateEmergencyAlert({ ...alert, ...tempData })}
                          className="bg-blue-500 text-white px-2 py-1 mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditingEntity({ entity: "", id: null })}
                          className="bg-gray-500 text-white px-2 py-1"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingEntity({ entity: "EmergencyAlert", id: alert._id });
                            setTempData(alert);
                          }}
                          className="bg-yellow-500 text-white px-2 py-1 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteEmergencyAlert(alert._id)}
                          className="bg-red-500 text-white px-2 py-1"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Resource Management</h1>
      {/* Tab Navigation */}
      <div className="mb-6">
        <button
          onClick={() => setActiveTab("NGOs")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "NGOs" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          NGOs
        </button>
        <button
          onClick={() => setActiveTab("Victims")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "Victims" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Victims
        </button>
        <button
          onClick={() => setActiveTab("VictimRequests")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "VictimRequests" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Victim Requests
        </button>
        <button
          onClick={() => setActiveTab("EmergencyAlerts")}
          className={`px-4 py-2 ${
            activeTab === "EmergencyAlerts" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Emergency Alerts
        </button>
      </div>
      {renderTable()}
    </div>
  );
};

export default Resources;
