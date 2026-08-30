import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Required for session cookie persistence
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-screen items-center justify-center">
      <div className="lg:border-2 lg:rounded-xl lg:border-black lg:p-20">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
          <h1 className="mb-6 text-2xl font-bold">Log in to CampusX</h1>

          {error && <p className="mb-4 text-sm font-semibold text-red-500">{error}</p>}

          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400"
            type="email"
            placeholder="Enter your email"
          />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="password"
            placeholder="Enter password"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-7 text-white border-none outline-none bg-black hover:opacity-85 font-semibold text-lg py-2 px-8 w-full rounded-full transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;