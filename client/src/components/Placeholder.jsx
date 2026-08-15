import { Link } from "react-router-dom"
import { Icon } from "./Icons"

function Placeholder({ icon, name }) {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-5">
      <div className="blueprint-grid absolute inset-0" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" aria-hidden="true"></div>

      <div className="rise-in relative w-full max-w-md text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-muted bg-surface text-secondary">
          <Icon name={icon} className="h-8 w-8" />
        </span>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-secondary">
          {name}
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight">Coming soon</h1>

        <p className="mt-3 text-sm text-secondary">
          This feature is under construction and will be available in an
          upcoming milestone.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
          Back to dashboard
        </Link>
      </div>
    </main>
  )
}

export default Placeholder
