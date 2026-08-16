import { useState } from "react"
import { Icon } from "../components/Icons"

const gradingScale = [
  { grade: "A+", points: 4, range: "80% and above" },
  { grade: "A", points: 3.75, range: "75% to less than 80%" },
  { grade: "A-", points: 3.5, range: "70% to less than 75%" },
  { grade: "B+", points: 3.25, range: "65% to less than 70%" },
  { grade: "B", points: 3, range: "60% to less than 65%" },
  { grade: "B-", points: 2.75, range: "55% to less than 60%" },
  { grade: "C+", points: 2.5, range: "50% to less than 55%" },
  { grade: "C", points: 2.25, range: "45% to less than 50%" },
  { grade: "D", points: 2, range: "40% to less than 45%" },
  { grade: "F", points: 0, range: "below 40%" },
]

export default function Tools() {
  const [rows, setRows] = useState([
    { credits: "3", grade: "A+" },
    { credits: "3", grade: "A+" },
  ])

  let totalCredits = 0
  let totalQualityPoints = 0

  for (const row of rows) {
    const credits = Number(row.credits) || 0
    const grade = gradingScale.find((g) => g.grade === row.grade)
    totalCredits += credits
    totalQualityPoints += credits * grade.points
  }

  const cgpa =
    totalCredits > 0
      ? (totalQualityPoints / totalCredits).toFixed(2)
      : "0.00"

  function updateRow(index, field, value) {
    const nextRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    )
    setRows(nextRows)
  }

  function addRow() {
    setRows([...rows, { credits: "3", grade: "A+" }])
  }

  function removeRow(index) {
    setRows(rows.filter((row, i) => i !== index))
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="blueprint-grid absolute inset-0" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" aria-hidden="true"></div>

      <div className="relative mx-auto max-w-3xl px-5 py-16">
        <p className="rise-in text-xs font-bold uppercase tracking-[0.28em] text-secondary">
          Academic Tools
        </p>

        <h1 className="rise-in mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Plan your semester.
        </h1>

        <p className="rise-in mt-4 max-w-xl text-lg text-secondary">
          Add your courses with their credits and grades to see your CGPA
          update instantly.
        </p>

        <div className="rise-in mt-12 overflow-hidden rounded-2xl border border-muted/50 bg-surface">
          <div className="flex items-center justify-between border-b border-muted/50 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold">CGPA Calculator</h2>
              <p className="mt-0.5 text-xs text-secondary">
                4.00 point scale · A+ to F
              </p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-dashed border-muted bg-background text-secondary">
              <Icon name="calculator" className="h-5 w-5" />
            </span>
          </div>

          <div className="space-y-3 px-6 py-6">
            {rows.map((row, index) => (
              <div key={index} className="flex flex-wrap items-center gap-3">
                <label className="sr-only" htmlFor={`credits-${index}`}>
                  Credits for course {index + 1}
                </label>
                <input
                  id={`credits-${index}`}
                  type="number"
                  min="0"
                  max="12"
                  step="0.5"
                  value={row.credits}
                  onChange={(event) =>
                    updateRow(index, "credits", event.target.value)
                  }
                  className="w-24 rounded-lg border border-muted bg-background px-3 py-2 text-sm"
                />

                <label className="sr-only" htmlFor={`grade-${index}`}>
                  Grade for course {index + 1}
                </label>
                <select
                  id={`grade-${index}`}
                  value={row.grade}
                  onChange={(event) =>
                    updateRow(index, "grade", event.target.value)
                  }
                  className="flex-1 rounded-lg border border-muted bg-background px-3 py-2 text-sm"
                >
                  {gradingScale.map((g) => (
                    <option key={g.grade} value={g.grade}>
                      {g.grade} ({g.points.toFixed(2)})
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  aria-label={`Remove course ${index + 1}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-muted text-secondary hover:border-primary hover:text-primary"
                >
                  <Icon name="x" className="h-4 w-4" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addRow}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-muted py-2.5 text-sm font-semibold text-secondary hover:border-primary hover:text-primary"
            >
              <Icon name="plus" className="h-4 w-4" />
              Add course
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-muted/50 bg-background px-6 py-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">
                Your CGPA
              </p>
              <p className="mt-1 text-xs text-muted">
                {totalCredits} credits · {rows.length} courses
              </p>
              <p className="mt-1 text-xs text-muted">
                CGPA = total quality points ÷ total credits
              </p>
            </div>
            <p className="text-4xl font-black tracking-tight text-primary">
              {cgpa}
            </p>
          </div>
        </div>

        <div className="rise-in mt-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">
            Grading scale
          </h2>
          <p className="mt-2 text-sm text-secondary">
            4.00 point system used by the university.
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-muted/50">
            {gradingScale.map((g) => (
              <div
                key={g.grade}
                className="flex items-center justify-between gap-4 border-b border-muted/50 bg-surface px-6 py-2.5 text-sm last:border-b-0"
              >
                <span className="w-10 font-bold">{g.grade}</span>
                <span className="flex-1 text-secondary">{g.range}</span>
                <span className="font-semibold text-primary">
                  {g.points.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
