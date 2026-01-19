import React from "react";

export default function EditButton({ onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${className}`}
    >
      Edit
    </button>
  );
}
