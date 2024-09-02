import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import Button from "../UI/Button";
import { useAuth } from "../../context/AuthContext";

const LoginForm = ({ setIsAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { saveUser } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let user= await login(email, password);
      saveUser(user);
      navigate("/todo");
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white min-w-96">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="wraper flex justify-center items-center">
        <Button className="w-40" type="submit">
          Log In
        </Button>
      </div>
      <div className="flex">
        Do not have account?{" "}
        <Link to="/signup" className="hover:text-gray-300">
          Signup
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
