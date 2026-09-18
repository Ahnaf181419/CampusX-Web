import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome, {user?.fullName}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="flex flex-col justify-between rounded-xl border p-5">
          <div>
            <h2 className="font-semibold">Notices</h2>
            <p className="mt-2 text-sm text-gray-600">
              Manage university notices.
            </p>
          </div>
          <Link 
            to="/admin/notices" 
            className="mt-4 font-medium text-blue-600 hover:underline"
          >
            Manage Notices
          </Link>
        </div>

        <div className="rounded-xl border p-5">
          <h2 className="font-semibold">Events</h2>
          <p className="mt-2 text-sm">
            Manage events.
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <h2 className="font-semibold">Bus</h2>
          <p className="mt-2 text-sm">
            Manage bus schedules.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;