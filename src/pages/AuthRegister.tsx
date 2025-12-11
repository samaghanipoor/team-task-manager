// export default function AuthRegister() {
//     return <div>Register Page</div>;
//   }

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { register } from "../store/authSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

const AuthRegister: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
        </div>

        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
        </div>

        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
        </div>

        <div className="mb-4">
          <Input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
        </div>

        <Button type="submit">Register</Button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthRegister;
