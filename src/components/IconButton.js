import React from "react";

export default function IconButton({ name, size = "40", onClick, className }) {
  const sizes = {
    24: "w-6 h-6",
    32: "w-8 h-8",
    40: "w-10 h-10",
    48: "w-12 h-12",
  };
  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} rounded-full hover:bg-gray-100 flex items-center justify-center ${className}`}
    >
      <span className="material-icons-outlined cursor-pointer text-gray-600">
        {name}
      </span>
    </button>
  );
}
