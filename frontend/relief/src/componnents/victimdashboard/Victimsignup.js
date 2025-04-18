// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';

// export const Victimsignup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate=useNavigate()

//   const handleVictimSignup = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords don't match");
//       return;
//     }


//     try {
//       const response = await fetch("http://localhost:5001/api/victims/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           phone,
//           password,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         // console.log("Victim signed up successfully:", data);
//         navigate("/victim-login")
//       } else {
//         alert(data.message || "Signup failed");
//       }
//     } catch (error) {
//       console.error("Error during victim signup:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-4 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4 text-center">Victim Sign Up</h2>
//         <form onSubmit={handleVictimSignup}>
//           <div className="mb-3">
//             <label htmlFor="name" className="block text-xs font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-sm"
//               placeholder="Enter your name"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email" className="block text-xs font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-sm"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-700">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-sm"
//               placeholder="Enter your phone number"
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="block text-xs font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-sm"
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="mb-5">
//             <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-sm"
//               placeholder="Confirm your password"
//             />
//           </div>



//           <button
//             type="submit"
//             className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-4 text-xs text-center">
//           Already have an account? <a href="victim-login" className="text-blue-500">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export const Victimsignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVictimSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("https://disaster-relief-coordination-system-backend.vercel.app/api/victims/signup", {
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
        navigate("/victim-login");
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
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="block text-xs font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-sm"
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white text-sm ${
              Object.keys(errors).length === 0 && name && email && phone && password && confirmPassword
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={Object.keys(errors).length > 0 || !name || !email || !phone || !password || !confirmPassword}
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-xs text-center">
          Already have an account? <a href="/victim-login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};
