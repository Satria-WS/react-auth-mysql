import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from '../services/authService'; // Example service

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginService(email, password); // Call API service to login
      navigate('/dashboard');  // Redirect to dashboard if successful
    } catch (error) {
      alert('Login failed');
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
              <form>
                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-4 p-2 bg-[#FEAF00] text-white font-bold rounded-md hover:bg-[#F29900]  focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
                <p className="border p-2 text-center py-3">
                  <span className="text-[#6C6C6C] font-medium pr-2">New to account?</span>
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
