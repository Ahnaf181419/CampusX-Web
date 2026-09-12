import { useState } from "react"
import { Icon } from "../components/Icons"
import { faqs, categories } from "../data/faqs"

function renderAnswer(answer) {
  return answer.split("**").map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
  )
}

export default function Faq() {
  const [category, setCategory] = useState("all")
  const [openSet, setOpenSet] = useState(new Set())

  const visible = faqs.filter(
    (faq) => category === "all" || faq.category === category
  )

  function toggle(question) {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(question)) next.delete(question)
      else next.add(question)
      return next
    })
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="blueprint-grid absolute inset-0" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" aria-hidden="true"></div>

      <div className="relative mx-auto max-w-3xl px-5 py-16">
        <p className="rise-in text-xs font-bold uppercase tracking-[0.28em] text-secondary">
          FAQ
        </p>

        <h1 className="rise-in mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Questions, answered.
        </h1>

        <p className="rise-in mt-4 max-w-xl text-lg text-secondary">
          Everything students usually ask about CampusX and its services.
        </p>

        <div className="rise-in mt-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
              category === "all"
                ? "border-primary bg-primary text-background"
                : "border-muted/60 bg-background text-secondary hover:bg-surface"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
                category === cat.id
                  ? "border-primary bg-primary text-background"
                  : "border-muted/60 bg-background text-secondary hover:bg-surface"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-6 divide-y divide-muted/50 border-y border-muted/50">
          {visible.map((faq) => (
            <div key={faq.question} className="rise-in">
              <button
                type="button"
                aria-expanded={openSet.has(faq.question)}
                onClick={() => toggle(faq.question)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left hover:opacity-80"
              >
                <span className="text-base font-semibold">{faq.question}</span>
                <Icon
                  name="chevronDown"
                  className={`h-5 w-5 shrink-0 text-secondary transition-transform duration-300 ${
                    openSet.has(faq.question) ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openSet.has(faq.question) && (
                <p className="pb-5 text-sm leading-relaxed text-secondary">
                  {renderAnswer(faq.answer)}
                </p>
              )}
            </div>
          ))}

          {visible.length === 0 && (
            <p className="py-8 text-center text-sm italic text-secondary">
              No questions in this category yet.
            </p>
          )}
        </div>

        <section className="rise-in mt-12 rounded-2xl border border-muted/70 bg-surface px-6 py-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">
            Still need help?
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-relaxed text-secondary">
            Could not find your answer? Reach the CampusX team directly and we
            will get back to you.
          </p>

          <div className="mt-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=support@campusx.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-muted/60 bg-background px-4 py-2 text-xs font-semibold text-primary hover:bg-surface"
            >
              support@campusx.dev
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
