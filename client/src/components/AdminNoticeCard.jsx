// client/src/components/AdminNoticeCard.jsx

const categoryStyle = {
  Normal: "bg-surface-alt text-secondary",
  Important: "bg-priority-mid text-white",
  Emergency: "bg-priority-high text-white",
}

export default function AdminNoticeCard({ notice, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-muted/50 bg-white px-5 py-4 shadow-[0_4px_16px_rgb(22_32_50/0.09)]">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-bold">{notice.title}</h2>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            categoryStyle[notice.category]
          }`}
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

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(notice)}
          className="rounded-lg border border-muted px-4 py-2 text-xs font-medium text-primary hover:bg-surface"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(notice._id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white hover:opacity-90"
        >
          Delete
        </button>
      </div>
    </div>
  )
}