import { Link } from "react-router-dom"
import { Icon } from "./Icons"

function FeatureCard({ feature, index }) {
  return (
    <Link
      to={feature.path}
      className="group flex flex-col gap-5 rounded-2xl border border-muted/70 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-background hover:shadow-lg"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-muted/70 bg-background text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-background">
          <Icon name={feature.icon} className="h-6 w-6" />
        </span>

        <span className="pt-1 text-xs font-medium tracking-widest text-muted/80">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div>
        <h2 className="text-lg font-bold tracking-tight">{feature.name}</h2>
        <p className="mt-1.5 text-sm text-secondary">{feature.description}</p>
      </div>

      <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors duration-300 group-hover:text-primary">
        Open
        <Icon
          name="arrowRight"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}

export default FeatureCard
