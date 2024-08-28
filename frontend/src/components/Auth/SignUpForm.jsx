import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import Button from "../UI/Button";
import Input from "../UI/Input";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await signup(formData);
      navigate("/login");
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <Input
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <Input
        label="Username"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="wraper flex justify-center items-center">
        <Button className="w-40" type="submit">Sign Up</Button>
      </div>
      <div className="flex">
        Already have an account?{" "}
        <Link to="/login" className="hover:text-gray-300">
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
