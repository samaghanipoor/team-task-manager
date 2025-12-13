import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: "blue" | "red" | "gray";
  type?: "button" | "submit" | "reset";
  className?: string;
};

const Button2: React.FC<ButtonProps> = ({ children, onClick, color = "blue", type = "button", className = "" }) => {
  let bgColor = "bg-blue-600 hover:bg-blue-700";
  if (color === "red") bgColor = "bg-red-600 hover:bg-red-700";
  if (color === "gray") bgColor = "bg-gray-500 hover:bg-gray-600";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 text-white rounded transition ${bgColor} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button2;

