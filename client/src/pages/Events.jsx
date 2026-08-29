import { useState, useEffect } from "react"
import { Icon } from "../components/Icons"

const statusStyle = {
  Ongoing: "bg-primary text-white",
  Completed: "bg-surface-alt text-secondary",
  Upcoming: "bg-priority-mid text-white",
}

const emptyForm = {
  title: "",
  date: "",
  location: "",
  description: "",
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events")
        const data = await res.json()
        setEvents(data)
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || "Failed to create event")
        return
      }
      const newEvent = await res.json()
      setEvents((prev) => [...prev, newEvent])
      setForm(emptyForm)
      setShowForm(false)
    } catch (error) {
      console.error("Failed to create event:", error)
      alert("Failed to create event")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteEvent = async (eventId) => {
    if (!confirm("Are you sure you want to delete this event?")) return
    try {
      const res = await fetch(`/api/events/${eventId}`, { method: "DELETE" })
      if (!res.ok) {
        alert("Failed to delete event")
        return
      }
      setEvents((prev) => prev.filter((ev) => ev._id !== eventId))
      if (selectedEvent?._id === eventId) setSelectedEvent(null)
    } catch (error) {
      console.error("Failed to delete event:", error)
      alert("Failed to delete event")
    }
  }

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const filteredEvents = events.filter((event) => {
    if (activeFilter === "All") return true
    return event.status === activeFilter
  })

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="blueprint-grid absolute inset-0" aria-hidden="true"></div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      ></div>

      <div className="relative mx-auto max-w-6xl px-5 py-16">
        <p className="rise-in text-xs font-bold uppercase tracking-[0.28em] text-secondary">
          Campus Life
        </p>

        <h1 className="rise-in mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Stay in the loop.
        </h1>

        <p className="rise-in mt-4 max-w-xl text-lg text-secondary">
          Ongoing, upcoming and past campus events — register, attend and never
          miss out.
        </p>

        <div className="rise-in mt-8 flex items-center gap-3">
          <div className="flex gap-3">
            {["All", "Ongoing", "Upcoming", "Completed"].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-white"
                    : "border border-muted bg-white text-secondary hover:bg-surface"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <Icon name="plus" className="h-4 w-4" />
            Add Event
          </button>
        </div>

        {loading ? (
          <div className="mt-10 text-center text-secondary">Loading events...</div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <div
                  key={event._id}
                  className={`rise-in overflow-hidden rounded-2xl border border-muted/50 bg-white shadow-[0_4px_16px_rgb(22_32_50/0.09)]`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4 px-5 py-4">
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-surface">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                        {event.date.split(" ")[0]}
                      </span>
                      <span className="text-lg font-black leading-none text-primary">
                        {event.date.split(" ")[1].replace(",", "")}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-base font-bold">{event.title}</h2>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[event.status]}`}
                        >
                          {event.status}
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-secondary">
                        {event.time && (
                          <span className="flex items-center gap-1">
                            <Icon name="clock" className="h-3.5 w-3.5" />
                            {event.time}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Icon name="mapPin" className="h-3.5 w-3.5" />
                          {event.location}
                        </span>
                      </div>

                      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-secondary">
                        {event.description}
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedEvent(event)}
                          className="rounded-lg bg-surface px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-surface-alt"
                        >
                          View Details
                        </button>
                        {event.link && (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                          >
                            Register
                            <Icon name="arrowRight" className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(event._id)}
                          className="ml-auto rounded-lg px-2 py-1.5 text-xs font-semibold text-priority-high transition-colors hover:bg-priority-high/10"
                        >
                          <Icon name="trash" className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="mt-10 text-center text-secondary">
                No events in this category.
              </div>
            )}
          </div>
        )}
      </div>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-[19px] font-semibold text-primary">
                {selectedEvent.title}
              </h2>
              <span
                className={`rounded-full px-4 py-1 text-xs font-semibold ${statusStyle[selectedEvent.status]}`}
              >
                {selectedEvent.status}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-3 text-sm text-secondary">
              <span className="flex items-center gap-1">
                <Icon name="calendar" className="h-4 w-4" />
                {selectedEvent.date}
              </span>
              {selectedEvent.time && (
                <span className="flex items-center gap-1">
                  <Icon name="clock" className="h-4 w-4" />
                  {selectedEvent.time}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Icon name="mapPin" className="h-4 w-4" />
                {selectedEvent.location}
              </span>
            </div>

            <hr className="my-4 border-muted/50" />

            <p className="mb-6 text-[15px] leading-relaxed text-secondary">
              {selectedEvent.description}
            </p>

            <div className="flex gap-3">
              {selectedEvent.link && (
                <a
                  href={selectedEvent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Register
                  <Icon name="arrowRight" className="h-4 w-4" />
                </a>
              )}
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="flex-1 rounded-xl border border-muted py-3 text-sm font-medium text-secondary transition-colors hover:bg-surface"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={() => setShowForm(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">Add New Event</h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-1 text-secondary transition-colors hover:bg-surface"
              >
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-secondary">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                  placeholder="Event title"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary">Date *</label>
                <input
                  type="text"
                  required
                  value={form.date}
                  onChange={(e) => handleFormChange("date", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                  placeholder="May 10, 2026"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary">Location *</label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => handleFormChange("location", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                  placeholder="Main Auditorium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  className="mt-1 w-full resize-none rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                  placeholder="Event description..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Create Event"}
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
    </main>
  )
}
