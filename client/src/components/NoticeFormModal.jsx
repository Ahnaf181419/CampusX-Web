// client/src/components/NoticeFormModal.jsx
import { Icon } from "./Icons"

export default function NoticeFormModal({ 
  form, 
  isEditing, 
  submitting, 
  onChange, 
  onSubmit, 
  onClose 
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary">
            {isEditing ? "Edit Notice" : "Create Notice"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-secondary transition-colors hover:bg-surface"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-secondary">
              Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
              className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
              placeholder="Blood Donation Request"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
              className="mt-1 w-full resize-none rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
              placeholder="Notice details..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => onChange("category", e.target.value)}
              className="mt-1 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-primary"
            >
              <option value="Normal">Normal</option>
              <option value="Important">Important</option>
              <option value="Emergency">Emergency</option>
            </select>
            <p className="mt-1 text-[11px] text-secondary">
              Important and Emergency notices will require student
              acknowledgement (added in a later step).
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {submitting
                ? isEditing ? "Updating..." : "Creating..."
                : isEditing ? "Update Notice" : "Create Notice"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-muted py-3 text-sm font-medium text-secondary transition-colors hover:bg-surface"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}