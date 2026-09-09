import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Placeholder from "./components/Placeholder"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Faq from "./pages/Faq"
import Tools from "./pages/Tools"
import Bus from "./pages/Bus"
import Notices from "./pages/Notices"
import Events from "./pages/Events"
import Rooms from "./pages/Rooms"
import Profile from "./pages/Profile"

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/profile" element={<Profile />} />
        <Route path="/bus" element={<Bus />} />
        <Route path="/notices" element={<Notices icon="bell" name="Notices" />} />
        <Route path="/events" element={<Events />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/lost-found" element={<Placeholder icon="package" name="Lost & Found" />} />
        <Route path="/marketplace" element={<Placeholder icon="tag" name="Marketplace" />} />
        <Route path="/tools" element={<Tools />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
