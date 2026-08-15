import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Placeholder from "./components/Placeholder"
import Home from "./pages/Home"

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/bus" element={<Placeholder icon="bus" name="Bus Tracking" />} />
        <Route path="/notices" element={<Placeholder icon="bell" name="Notices" />} />
        <Route path="/events" element={<Placeholder icon="calendar" name="Events" />} />
        <Route path="/rooms" element={<Placeholder icon="door" name="Room Finder" />} />
        <Route path="/faq" element={<Placeholder icon="question" name="FAQ" />} />
        <Route path="/lost-found" element={<Placeholder icon="package" name="Lost & Found" />} />
        <Route path="/marketplace" element={<Placeholder icon="tag" name="Marketplace" />} />
        <Route path="/tools" element={<Placeholder icon="calculator" name="Academic Tools" />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
