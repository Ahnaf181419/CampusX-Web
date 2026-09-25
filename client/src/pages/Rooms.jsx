import { useState, useEffect, useContext } from "react"
import { Icon } from "../components/Icons"
import { AuthContext } from "../context/AuthContext"

const statusStyle = {
  Available: "bg-primary text-white",
  Occupied: "bg-priority-mid text-white",
  Maintenance: "bg-surface-alt text-secondary",
}

const emptyForm = {
  name: "",
  number: "",
  status: "Available",
  nextAvailableTime: "Now",
}

export default function Rooms() {
  const { user } = useContext(AuthContext)
  const isAdmin = user?.role === "Admin"

  const [rooms, setRooms] = useState([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/rooms")
        const data = await res.json()
        setRooms(data)
      } catch (error) {
        console.error("Failed to fetch rooms:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRooms()
  }, [])

  const handleCreateRoom = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || "Failed to create room")
        return
      }
      const newRoom = await res.json()
      setRooms((prev) => [...prev, newRoom])
      setForm(emptyForm)
      setShowForm(false)
    } catch (error) {
      console.error("Failed to create room:", error)
      alert("Failed to create room")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteRoom = async (roomId) => {
    if (!confirm("Are you sure you want to delete this room?")) return
    try {
      const res = await fetch(`/api/rooms/${roomId}`, { method: "DELETE" })
      if (!res.ok) {
        alert("Failed to delete room")
        return
      }
      setRooms((prev) => prev.filter((room) => room._id !== roomId))
      if (selectedRoom?._id === roomId) setSelectedRoom(null)
    } catch (error) {
      console.error("Failed to delete room:", error)
      alert("Failed to delete room")
    }
  }

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      searchQuery === "" ||
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.number.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const statusFilters = ["All", "Available", "Occupied", "Maintenance"]

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="blueprint-grid absolute inset-0" aria-hidden="true"></div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      ></div>

      <div className="relative mx-auto max-w-6xl px-5 py-16">
        <p className="rise-in text-xs font-bold uppercase tracking-[0.28em] text-secondary">
          Campus Spaces
        </p>

        <h1 className="rise-in mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Find your room.
        </h1>

        <p className="rise-in mt-4 max-w-xl text-lg text-secondary">
          Search for available classrooms, labs, and meeting spaces across campus.
        </p>

        <div className="rise-in mt-8">
          <div className="relative">
            <Icon
              name="search"
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary"
            />
            <input
              type="text"
              placeholder="Search by room name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-muted bg-white px-4 py-3 pl-12 text-sm shadow-[0_4px_16px_rgb(22_32_50/0.09)] focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="rise-in mt-6 flex items-center gap-3 flex-wrap">
          <div className="flex gap-3">
            {statusFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-white"
                    : "border border-muted bg-white text-secondary hover:bg-surface"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          {isAdmin && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <Icon name="plus" className="h-4 w-4" />
              Add Room
            </button>
          )}
        </div>

        {loading ? (
          <div className="mt-10 text-center text-secondary">Loading rooms...</div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room, index) => (
                <div
                  key={room._id}
                  className={`rise-in overflow-hidden rounded-2xl border border-muted/50 bg-white shadow-[0_4px_16px_rgb(22_32_50/0.09)]`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4 px-5 py-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-surface">
                      <Icon name="door" className="h-7 w-7 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-base font-bold">{room.name}</h2>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[room.status]}`}
                        >
                          {room.status}
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-secondary">
                        <span className="flex items-center gap-1">
                          <Icon name="mapPin" className="h-3.5 w-3.5" />
                          Room {room.number}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedRoom(room)}
                          className="rounded-lg bg-surface px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-surface-alt"
                        >
                          View Details
                        </button>
                        {room.status === "Available" && (
                          <span className="text-xs font-medium text-primary">
                            Available {room.nextAvailableTime}
                          </span>
                        )}
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => handleDeleteRoom(room._id)}
                            className="ml-auto rounded-lg px-2 py-1.5 text-xs font-semibold text-priority-high transition-colors hover:bg-priority-high/10"
                          >
                            <Icon name="trash" className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="mt-10 text-center text-secondary">
                No rooms found matching your criteria.
              </div>
            )}
          </div>
        )}

        {selectedRoom && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
            onClick={() => setSelectedRoom(null)}
          >
            <div
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <h2 className="text-[19px] font-semibold text-primary">
                  {selectedRoom.name}
                </h2>
                <span
                  className={`rounded-full px-4 py-1 text-xs font-semibold ${statusStyle[selectedRoom.status]}`}
                >
                  {selectedRoom.status}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-3 text-sm text-secondary">
                <span className="flex items-center gap-1">
                  <Icon name="mapPin" className="h-4 w-4" />
                  Room {selectedRoom.number}
                </span>
              </div>

              <hr className="my-4 border-muted/50" />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary">Status</span>
                  <span className="font-medium">{selectedRoom.status}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary">Next Available</span>
                  <span className="font-medium">{selectedRoom.nextAvailableTime}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {selectedRoom.status === "Available" && (
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Book Room
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedRoom(null)}
                  className="flex-1 rounded-xl border border-muted py-3 text-sm font-medium text-secondary transition-colors hover:bg-surface"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isAdmin && showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-primary">Add New Room</h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg p-1 text-secondary transition-colors hover:bg-surface"
                >
                  <Icon name="x" className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateRoom} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-secondary">Room Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                    placeholder="Lecture Hall A"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary">Room Number *</label>
                  <input
                    type="text"
                    required
                    value={form.number}
                    onChange={(e) => handleFormChange("number", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                    placeholder="LH-A-101"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary">Status *</label>
                  <select
                    required
                    value={form.status}
                    onChange={(e) => handleFormChange("status", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary">Next Available Time *</label>
                  <input
                    type="text"
                    required
                    value={form.nextAvailableTime}
                    onChange={(e) => handleFormChange("nextAvailableTime", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                    placeholder="Now / 2:00 PM / Tomorrow"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {submitting ? "Creating..." : "Create Room"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 rounded-xl border border-muted py-3 text-sm font-medium text-secondary transition-colors hover:bg-surface"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}