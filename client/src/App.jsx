import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Placeholder from "./components/Placeholder";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Faq from "./pages/Faq";
import Tools from "./pages/Tools";
import Bus from "./pages/Bus";
import Notices from "./pages/Notices";
import Events from "./pages/Events";
import Rooms from "./pages/Rooms";
import Profile from "./pages/Profile";
import LostFound from "./pages/LostFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNotices from './pages/AdminNotices';

export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      {pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bus"
          element={
            <ProtectedRoute>
              <Bus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notices"
          element={
            <ProtectedRoute>
              <Notices icon="bell" name="Notices" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <ProtectedRoute>
              <Faq />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lost-found"
          element={
            <ProtectedRoute>
              <LostFound />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <Placeholder icon="tag" name="Marketplace" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tools"
          element={
            <ProtectedRoute>
              <Tools />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/notices"
          element={
            <AdminRoute>
              <AdminNotices />
            </AdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
