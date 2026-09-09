import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-screen items-center justify-center">
      <div className="lg:border-2 lg:rounded-xl lg:border-black lg:p-20">
        <div className="flex flex-col items-center justify-center">
          
          <h1 className="mb-6 text-2xl font-bold">
            Profile
          </h1>

          <div className="w-full space-y-3">
            <div className="rounded-full border-2 border-black bg-transparent px-6 py-2">
              <p className="text-lg font-medium">
                <span className="font-bold">Name:</span>{" "}
                {user.fullName}
              </p>
            </div>

            <div className="rounded-full border-2 border-black bg-transparent px-6 py-2">
              <p className="text-lg font-medium">
                <span className="font-bold">Student ID:</span>{" "}
                {user.studentId}
              </p>
            </div>

            <div className="rounded-full border-2 border-black bg-transparent px-6 py-2">
              <p className="text-lg font-medium">
                <span className="font-bold">Department:</span>{" "}
                {user.department}
              </p>
            </div>

            <div className="rounded-full border-2 border-black bg-transparent px-6 py-2">
              <p className="text-lg font-medium">
                <span className="font-bold">Email:</span>{" "}
                {user.email}
              </p>
            </div>

            <div className="rounded-full border-2 border-black bg-transparent px-6 py-2">
              <p className="text-lg font-medium">
                <span className="font-bold">Role:</span>{" "}
                {user.role}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-7 w-full rounded-full border-none bg-black px-8 py-2 text-lg font-semibold text-white outline-none transition-all hover:opacity-85"
          >
            Log out
          </button>

        </div>
      </div>
    </div>
  );
}