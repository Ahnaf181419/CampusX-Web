import { useState } from "react"
import { Icon } from "../components/Icons"

const faqs = [
  {
    question: "What is CampusX?",
    answer:
      "CampusX is a centralized platform that brings student services together: bus tracking, notices, events, room availability, lost & found, marketplace and academic tools.",
  },
  {
    question: "How do I track my campus bus?",
    answer:
      "Open Bus Tracking from the dashboard. It shows the live location of each bus, the stops on its route and an estimated arrival time for your stop.",
  },
  {
    question: "How will I know when a new notice is posted?",
    answer:
      "Every notice appears in the Notices section the moment it is published. Emergency alerts are highlighted at the top so they can never be missed.",
  },
  {
    question: "Where can I find an empty classroom for group study?",
    answer:
      "Use Room Finder. Pick your building and a free time slot, and it lists every classroom and lab that is empty during that period.",
  },
  {
    question: "I lost my student ID card. What should I do?",
    answer:
      "Check Lost & Found first, someone may have already reported it. If not, post a report with a description, and you will be contacted when it is found.",
  },
  {
    question: "Can I sell my old books on CampusX?",
    answer:
      "Yes. Marketplace lets you list books, calculators and other items for other students of your campus to buy safely.",
  },
  {
    question: "How do I check my class routine?",
    answer:
      "Academic Tools includes a routine viewer that shows your weekly class schedule, plus a CGPA calculator for tracking your results.",
  },
  {
    question: "Do I need an account to use CampusX?",
    answer:
      "Browsing services such as notices and FAQ is open to everyone. An account is needed for personal features like posting in Lost & Found or Marketplace.",
  },
  {
    question: "Is CampusX available on mobile?",
    answer:
      "Yes. Every page is built with a responsive layout, so the full platform works on phones, tablets and desktops.",
  },
]

export default function Faq() {
  const [open, setOpen] = useState(null)

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

        <div className="mt-12 divide-y divide-muted/50 border-y border-muted/50">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="rise-in">
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left hover:opacity-80"
              >
                <span className="text-base font-semibold">{faq.question}</span>
                <Icon
                  name="chevronDown"
                  className={`h-5 w-5 shrink-0 text-secondary transition-transform duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <p className="pb-5 text-sm leading-relaxed text-secondary">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
