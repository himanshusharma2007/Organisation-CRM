import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
