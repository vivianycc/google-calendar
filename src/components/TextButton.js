import React from "react";

export default function TextButton({ label, onClick, className }) {
  return (
    <button
      className={`h-9 border border-gray-300 rounded hover:bg-gray-100 flex items-center ${className}`}
      onClick={onClick}
    >
      <span className="px-3 py-2 text-sm text-gray-700">{label}</span>
    </button>
  );
}
