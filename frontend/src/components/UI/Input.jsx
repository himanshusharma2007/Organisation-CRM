import React from "react";

const Input = ({ label, textarea, className = "", ...props }) => {
  const inputClasses = `w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`;

  const inputElement = textarea ? (
    <textarea className={`${inputClasses} h-32`} {...props} />
  ) : (
    <input className={inputClasses} {...props} />
  );

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      {inputElement}
    </div>
  );
};

export default Input;
