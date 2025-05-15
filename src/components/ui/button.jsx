// src/components/ui/button.jsx
import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
