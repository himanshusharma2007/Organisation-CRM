import React from "react";
import LoginForm from "../components/Auth/LoginForm";

const LoginPage = ({ setIsAdmin }) => {
  return (
    <div className="min-w-96 mx-auto min-h-screen flex justify-center items-center flex-col p-6  text-white bg-zinc-700">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <LoginForm setIsAdmin={setIsAdmin} />
    </div>
  );
};

export default LoginPage;
