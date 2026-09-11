import { useState, useEffect } from "react"
import { Icon } from "../components/Icons"

const typeStyle = {
  Lost: "bg-[#E03C4B] text-white",
  Found: "bg-[#2E7D32] text-white",
}

const emptyForm = {
  title: "",
  type: "Lost",
  location: "",
  date: "",
  description: "",
  contact: "",
}

const dummyItems = [
  {
    _id: "dummy-1",
    title: "Blue Backpack",
    type: "Lost",
    location: "Library 2nd Floor",
    date: "Sep 8, 2026",
    description: "Lost a blue Jansport backpack near the study tables. Contains a laptop and some textbooks. Please contact me if found.",
    contact: "student1@campus.edu",
  },
  {
    _id: "dummy-2",
    title: "Black Water Bottle",
    type: "Found",
    location: "CS Building Room 101",
    date: "Sep 9, 2026",
    description: "Found a black Hydro Flask water bottle under the desk in the CS lab. It has a few stickers on it.",
    contact: "student2@campus.edu",
  },
  {
    _id: "dummy-3",
    title: "Gold Watch",
    type: "Lost",
    location: "Student Center Cafeteria",
    date: "Sep 10, 2026",
    description: "Lost a gold-colored Casio watch around lunchtime. It has significant sentimental value. Reward offered.",
    contact: "student3@campus.edu",
  },
  {
    _id: "dummy-4",
    title: "USB-C Charging Cable",
    type: "Found",
    location: "Engineering Hall Lobby",
    date: "Sep 10, 2026",
    description: "Found a white USB-C to USB-C cable plugged into a wall outlet near the vending machines. Looks like it belongs to someone.",
    contact: "student4@campus.edu",
  },
  {
    _id: "dummy-5",
    title: "Red Hoodie",
    type: "Lost",
    location: "Gym Locker Room B",
    date: "Sep 7, 2026",
    description: "Left behind a red Nike hoodie with 'PHYS ED' printed on the back. Size Medium.",
    contact: "student5@campus.edu",
  },
  {
    _id: "dummy-6",
    title: "Prescription Glasses",
    type: "Found",
    location: "Biology Building Room 204",
    date: "Sep 11, 2026",
    description: "Found a pair of black-framed prescription glasses on a desk after the 10am lecture. Please claim at the front office.",
    contact: "frontoffice@campus.edu",
  },
]

export default function LostFound() {
  const [items, setItems] = useState([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedItem, setSelectedItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/lost-found")
        const data = await res.json()
        setItems(data.length > 0 ? data : dummyItems)
      } catch (error) {
        console.error("Failed to fetch items:", error)
        setItems(dummyItems)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  const handleCreateItem = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("/api/lost-found", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || "Failed to create item")
        return
      }
      const newItem = await res.json()
      setItems((prev) => [...prev, newItem])
      setForm(emptyForm)
      setShowForm(false)
    } catch (error) {
      console.error("Failed to create item:", error)
      alert("Failed to create item")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteItem = async (itemId) => {
    if (!confirm("Are you sure you want to delete this item?")) return
    try {
      const res = await fetch(`/api/lost-found/${itemId}`, { method: "DELETE" })
      if (!res.ok) {
        alert("Failed to delete item")
        return
      }
      setItems((prev) => prev.filter((item) => item._id !== itemId))
      if (selectedItem?._id === itemId) setSelectedItem(null)
    } catch (error) {
      console.error("Failed to delete item:", error)
      alert("Failed to delete item")
    }
  }

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const filteredItems = items.filter((item) => {
    if (activeFilter === "All") return true
    return item.type === activeFilter
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
          Campus Services
        </p>

        <h1 className="rise-in mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Lost & Found.
        </h1>

        <p className="rise-in mt-4 max-w-xl text-lg text-secondary">
          Report lost items, post found items and help fellow students recover
          their belongings across campus.
        </p>

        <div className="rise-in mt-8 flex items-center gap-3">
          <div className="flex gap-3">
            {["All", "Lost", "Found"].map((filter) => (
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
            Report Item
          </button>
        </div>

        {loading ? (
          <div className="mt-10 text-center text-secondary">Loading items...</div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={item._id}
                  className={`rise-in overflow-hidden rounded-2xl border border-muted/50 bg-white shadow-[0_4px_16px_rgb(22_32_50/0.09)]`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4 px-5 py-4">
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-surface">
                      <Icon name="package" className="h-6 w-6 text-secondary" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-base font-bold">{item.title}</h2>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${typeStyle[item.type]}`}
                        >
                          {item.type}
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-secondary">
                        <span className="flex items-center gap-1">
                          <Icon name="mapPin" className="h-3.5 w-3.5" />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="calendar" className="h-3.5 w-3.5" />
                          {item.date}
                        </span>
                      </div>

                      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-secondary">
                        {item.description}
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedItem(item)}
                          className="rounded-lg bg-surface px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-surface-alt"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(item._id)}
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
                No items in this category.
              </div>
            )}
          </div>
        )}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-[19px] font-semibold text-primary">
                {selectedItem.title}
              </h2>
              <span
                className={`rounded-full px-4 py-1 text-xs font-semibold ${typeStyle[selectedItem.type]}`}
              >
                {selectedItem.type}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-3 text-sm text-secondary">
              <span className="flex items-center gap-1">
                <Icon name="mapPin" className="h-4 w-4" />
                {selectedItem.location}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="calendar" className="h-4 w-4" />
                {selectedItem.date}
              </span>
            </div>

            <hr className="my-4 border-muted/50" />

            <p className="mb-4 text-[15px] leading-relaxed text-secondary">
              {selectedItem.description}
            </p>

            {selectedItem.contact && (
              <div className="mb-6 rounded-xl bg-surface p-3">
                <p className="text-xs font-semibold text-secondary">Contact</p>
                <p className="mt-1 text-sm text-primary">{selectedItem.contact}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
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
              <h2 className="text-lg font-bold text-primary">Report an Item</h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-1 text-secondary transition-colors hover:bg-surface"
              >
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-secondary">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                  placeholder="e.g., Blue Backpack"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary">Type *</label>
                <div className="mt-1 flex gap-3">
                  {["Lost", "Found"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleFormChange("type", type)}
                      className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                        form.type === type
                          ? type === "Lost"
                            ? "border-[#E03C4B] bg-[#E03C4B] text-white"
                            : "border-[#2E7D32] bg-[#2E7D32] text-white"
                          : "border-muted bg-surface text-secondary hover:bg-surface-alt"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary">Location *</label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => handleFormChange("location", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                  placeholder="e.g., Library 2nd Floor"
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
                <label className="block text-xs font-semibold text-secondary">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  className="mt-1 w-full resize-none rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                  placeholder="Describe the item in detail..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary">Contact Info</label>
                <input
                  type="text"
                  value={form.contact}
                  onChange={(e) => handleFormChange("contact", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                  placeholder="Phone, email or social handle"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Report"}
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
