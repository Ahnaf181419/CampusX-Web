import { useState, useEffect } from "react"
import { Icon } from "../components/Icons"

const categoryStyle = {
  Normal: "bg-surface-alt text-secondary",
  Important: "bg-priority-mid text-white",
  Emergency: "bg-priority-high text-white",
}

const emptyForm = {
  title: "",
  description: "",
  category: "Normal",
}

export default function AdminNotices() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("/api/notices")
        const data = await res.json()
        setNotices(data)
      } catch (error) {
        console.error("Failed to fetch notices:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchNotices()
  }, [])

  const handleCreateNotice = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || "Failed to create notice")
        return
      }
      const newNotice = await res.json()
      setNotices((prev) => [newNotice, ...prev])
      setForm(emptyForm)
      setShowForm(false)
    } catch (error) {
      console.error("Failed to create notice:", error)
      alert("Failed to create notice")
    } finally {
      setSubmitting(false)
    }
  }

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <div className="flex items-center justify-between gap-30">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">
            Manage Notices
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Icon name="plus" className="h-4 w-4" />
          New Notice
        </button>
      </div>

      {loading ? (
        <div className="mt-10 text-center text-secondary">Loading notices...</div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div
                key={notice._id}
                className="rounded-2xl border border-muted/50 bg-white px-5 py-4 shadow-[0_4px_16px_rgb(22_32_50/0.09)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-bold">{notice.title}</h2>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${categoryStyle[notice.category]}`}
                  >
                    {notice.category}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {notice.description}
                </p>

                <p className="mt-2 text-xs text-secondary">
                  Posted:{" "}
                  {new Date(notice.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))
          ) : (
            <div className="mt-10 text-center text-secondary">
              No notices yet. Create the first one.
            </div>
          )}
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
              <h2 className="text-lg font-bold text-primary">Create Notice</h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-1 text-secondary transition-colors hover:bg-surface"
              >
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-secondary">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                  placeholder="Blood Donation Request"
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
                  placeholder="Notice details..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleFormChange("category", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
                >
                  <option value="Normal">Normal</option>
                  <option value="Important">Important</option>
                  <option value="Emergency">Emergency</option>
                </select>
                <p className="mt-1 text-[11px] text-secondary">
                  Important and Emergency notices will require student acknowledgement (added in a later step).
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Create Notice"}
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