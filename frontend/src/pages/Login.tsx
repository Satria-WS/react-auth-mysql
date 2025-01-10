import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authService"; // Example service
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  // state input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state error
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validation email
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError("");
    }

    // validation password
    // add validation password with criteria : Length: A strong password should be at least 8 characters long, but 12 or more is better. Character mix: A strong password should contain a mix of uppercase and lowercase letters, numbers, and special characters.
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number");
    } else {
      setPasswordError("");
    }

    try {
      // Send login request to the server
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });

      // If the login is successful, response.data should contain the msg
      if (response.status === 200) {
        console.log(response.data.msg); // Log the success message
        // You can navigate to the dashboard here
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
        setError(error.response.data.msg);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-custom-gradient">
        <div className="container mx-auto ">
          <div className="bg-white rounded-xl shadow-md  max-w-[475px] mx-auto ">
            {/* text */}
            <div className="text-center">
              <h1 className="text-4xl font-bold py-10">Crud Operations</h1>
              <p className="text-2xl font-semibold py-2">Sign in</p>
              <p className="text-xs text-[#6C6C6C]">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Form */}
            <div className=" mt-8 p-6 border rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">
                    Password*
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-4 p-2 bg-[#FEAF00] text-white font-bold rounded-md hover:bg-[#F29900]  focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
                {/* handle error */}
                {error && (
                  <p className="text-white text-center bg-red-500 text-base font-semibold mt-1.5">
                    {error}
                  </p>
                )}

                <p className="border p-2 text-center py-3">
                  <span className="text-[#6C6C6C] font-medium pr-2">
                    New to account?
                  </span>
                  <span
                    onClick={() => navigate("/register")}
                    className="text-[#FEAF00] cursor-pointer hover:font-semibold active:underline "
                  >
                    Sign up now.
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
