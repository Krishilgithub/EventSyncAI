import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("eventsyncai_signup") || "{}");
    if (user.email === form.email && user.password === form.password) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="card bg-card max-w-md w-full p-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to bg-clip-text text-transparent mb-6 text-center">
          Sign In
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-secondary mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="input"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-secondary mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="input"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn bg-gradient-to-r from-btn-gradient-from to-btn-gradient-to text-white w-full font-bold text-lg"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-secondary">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-brand-gradient-from hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
