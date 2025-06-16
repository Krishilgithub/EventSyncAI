import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("eventsyncai_signup", JSON.stringify(form));
    setForm({ name: "", email: "", password: "" });
    setSuccess(true);
    setTimeout(() => navigate("/dashboard"), 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="card bg-card max-w-md w-full p-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to bg-clip-text text-transparent mb-6 text-center">
          Sign Up
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-secondary mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="input"
              value={form.name}
              onChange={handleChange}
            />
          </div>
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
            Sign Up
          </button>
          {success && (
            <p className="text-green-600 text-center mt-2">
              Sign up details saved locally!
            </p>
          )}
        </form>
        <p className="mt-6 text-center text-secondary">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-brand-gradient-from hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
