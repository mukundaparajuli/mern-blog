import React from "react";
import { useNavigate } from "react-router-dom";

const PromptToLogin = ({ onClose, feature }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="w-1/3 bg-white border-2 border-gray-300 rounded-2xl px-6 p-4 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Login Required</h2>
          <p className="mb-6">
            You are not a logged in user! Log in to {feature}.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptToLogin;
