import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  // show password
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleTogglePassword = (field: "password" | "confirmPassword") => {
    setShow((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    // validation email
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      valid = false;
    } else {
      setEmailError("");
    }

    // validation password
    // add validation password with criteria : Length: A strong password should be at least 8 characters long, but 12 or more is better. Character mix: A strong password should contain a mix of uppercase and lowercase letters, numbers, and special characters.
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      valid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      valid = false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      valid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number");
      valid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must contain at least one special character");
      valid = false;
    } else {
      setPasswordError("");
    }

    // validation password confirm
    // add validation password with criteria : Length: A strong password should be at least 8 characters long, but 12 or more is better. Character mix: A strong password should contain a mix of uppercase and lowercase letters, numbers, and special characters.
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Password do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    // passing data
    if (valid) {
      try {
        await registerService(email, password, confirmPassword); // Call API service to login
        navigate("/dashboard"); // Redirect to dashboard if successful
      } catch {
        setError("Register failed");
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
              <p className="text-2xl font-semibold py-2">Register</p>
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
                    Email
                  </label>
                  <input
                    id="email"
                    // type="email"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={show.password ? "text" : "password"}
                      className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                      <p className="text-red-500 text-sm">{passwordError}</p>
                    )}
                    {/* icon show */}
                    <button
                      type="button"
                      className="absolute right-2 top-1/4 text-gray-500"
                      onClick={() => handleTogglePassword("password")}
                    >
                      {show.password ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      
                      type={show.confirmPassword ? "text" : "password"}
                      className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordError && (
                      <p className="text-red-500 text-sm">
                        {confirmPasswordError}
                      </p>
                    )}
                    {/* icon show */}
                    <button
                      type="button"
                      className="absolute right-2 top-1/4 text-gray-500"
                      onClick={() => handleTogglePassword("confirmPassword")}
                    >
                      {show.confirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-4 p-2 bg-[#FEAF00] text-white font-bold rounded-md hover:bg-[#F29900]  focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Register
                </button>
                {/* handle error */}
                {error && (
                  <p className="text-white text-center bg-red-500 text-base font-semibold mt-1.5">
                    {error}
                  </p>
                )}
                <p className="border p-2 text-center py-3">
                  <span className="text-[#6C6C6C] font-medium pr-2">
                    Already have an account?
                  </span>
                  <span
                    onClick={() => navigate("/login")}
                    className="text-[#ff640a] cursor-pointer hover:text-[#e55c09] active:underline duration-200 font-black uppercase   "
                  >
                    Log In
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
export default Register;
