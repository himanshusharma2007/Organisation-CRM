import React from "react";
import LoginForm from "../components/Auth/LoginForm";

const LoginPage = ({ setIsAdmin }) => {
  return (
    <div className="min-w-96 mx-auto bg-zinc-700 p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <LoginForm setIsAdmin={setIsAdmin} />
    </div>
  );
};

export default LoginPage;
