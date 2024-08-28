import React from "react";
import SignupForm from "../components/Auth/SignUpForm";

const SignupPage = () => {
  return (
    <div className="min-w-96 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
