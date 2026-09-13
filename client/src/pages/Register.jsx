import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    department: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // NEW: Used to check whether the user is already logged in
  const [checkingAuth, setCheckingAuth] = useState(true);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // NEW: Check existing login session when Register page opens
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          // User is already logged in, so go to home page
          setUser(data.user);
          navigate("/", { replace: true });
        } else {
          // No active session
          setCheckingAuth(false);
        }
      })
      .catch(() => {
        setCheckingAuth(false);
      });
  }, [navigate, setUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setUser(data.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // NEW: Don't show registration form while checking the session
  if (checkingAuth) {
    return <p>Checking session...</p>;
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-screen items-center justify-center py-10">
      <div className="lg:border-2 lg:rounded-xl lg:border-black lg:p-20">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="mb-6 text-2xl font-bold">
            Register for CampusX
          </h1>

          {error && (
            <p className="mb-4 text-sm font-semibold text-red-500">
              {error}
            </p>
          )}

          <input
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400"
            type="text"
            placeholder="Full Name"
          />

          <input
            required
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="text"
            placeholder="Student ID (e.g. 21-XXXXX-X)"
          />

          <input
            required
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="text"
            placeholder="Department (e.g. CSE)"
          />

          <input
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="email"
            placeholder="Enter your email"
          />

          <input
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="password"
            placeholder="Create password"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-7 text-white border-none outline-none bg-black hover:opacity-85 font-semibold text-lg py-2 px-8 w-full rounded-full transition-all disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-bold underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;