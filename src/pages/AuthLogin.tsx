// export default function AuthLogin() {
//     return <div>Login Page</div>;
//   }
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { login } from "../store/authSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

const AuthLogin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email: formData.email, password: formData.password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <Input type="email" placeholder="Email" value={formData.email} onChange={handleChange} name="email" />
        </div>
        <div className="mb-4">
          <Input type="password" placeholder="Password" value={formData.password} onChange={handleChange} name="password" />
        </div>
        <Button type="submit">Login</Button>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default AuthLogin;
