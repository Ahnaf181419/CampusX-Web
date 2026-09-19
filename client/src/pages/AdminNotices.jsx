// client/src/pages/AdminNotices.jsx
import { useState, useEffect } from "react"
import { Icon } from "../components/Icons"
import AdminNoticeCard from "../components/AdminNoticeCard"
import NoticeFormModal from "../components/NoticeFormModal"

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
  const [editingNotice, setEditingNotice] = useState(null)

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
      closeModal()
    } catch (error) {
      console.error("Failed to create notice:", error)
      alert("Failed to create notice")
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditNotice = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`/api/notices/${editingNotice._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || "Failed to update notice")
        return
      }
      setNotices((prev) =>
        prev.map((notice) => (notice._id === data._id ? data : notice))
      )
      closeModal()
    } catch (error) {
      console.error("Failed to update notice:", error)
      alert("Failed to update notice")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteNotice = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this notice?")
    if (!confirmed) return
    try {
      const res = await fetch(`/api/notices/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || "Failed to delete notice")
        return
      }
      setNotices((prev) => prev.filter((notice) => notice._id !== id))
    } catch (error) {
      console.error("Failed to delete notice:", error)
      alert("Failed to delete notice")
    }
  }

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const openEditModal = (notice) => {
    setEditingNotice(notice)
    setForm({
      title: notice.title,
      description: notice.description,
      category: notice.category,
    })
    setShowForm(true)
  }

  const closeModal = () => {
    setShowForm(false)
    setEditingNotice(null)
    setForm(emptyForm)
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
              <AdminNoticeCard
                key={notice._id}
                notice={notice}
                onEdit={openEditModal}
                onDelete={handleDeleteNotice}
              />
            ))
          ) : (
            <div className="mt-10 text-center text-secondary">
              No notices yet. Create the first one.
            </div>
          )}
        </div>
      )}

      {showForm && (
        <NoticeFormModal
          form={form}
          isEditing={!!editingNotice}
          submitting={submitting}
          onChange={handleFormChange}
          onSubmit={editingNotice ? handleEditNotice : handleCreateNotice}
          onClose={closeModal}
        />
      )}
    </main>
  )
}