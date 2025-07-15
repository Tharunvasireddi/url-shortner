import React from "react";
import { UrlForm } from "../components/UrlForm.jsx";

function DashBoard() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
        <UrlForm />
      </div>
    </div>
  );
}

export default DashBoard;
