import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Icon } from "../components/Icons";
import HeroRobot from "../components/HeroRobot";

const services = [
  {
    name: "Bus Tracking",
    description: "Live bus status, stops and estimated arrival times.",
    icon: "bus",
  },
  {
    name: "Notices",
    description: "Announcements with acknowledgements and emergency alerts.",
    icon: "bell",
  },
  {
    name: "Events",
    description: "Ongoing and past campus events with participation links.",
    icon: "calendar",
  },
  {
    name: "Room Finder",
    description: "Empty classrooms and labs, filterable by building and time.",
    icon: "door",
  },
  {
    name: "FAQ",
    description: "35+ answers about CampusX, categorized and searchable.",
    icon: "question",
  },
  {
    name: "Lost & Found",
    description: "Report, browse and recover lost items across campus.",
    icon: "package",
  },
  {
    name: "Marketplace",
    description: "Buy and sell within the campus community, safely.",
    icon: "tag",
  },
  {
    name: "Academic Tools",
    description: "CGPA calculator and more academic utilities.",
    icon: "calculator",
  },
]

const steps = [
  {
    number: "01",
    title: "Register",
    description:
      "Create your account with your name, student ID and department — it takes under a minute.",
  },
  {
    number: "02",
    title: "Sign in",
    description:
      "Your session stays active for up to seven days, across every page and device.",
  },
  {
    number: "03",
    title: "Explore",
    description:
      "Jump into bus tracking, notices, events, room availability and student services.",
  },
]

export default function Landing() {
  const { user } = useContext(AuthContext);

  return (
    <main>
      <header className="sticky top-0 z-50 border-b border-muted/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="text-lg font-bold tracking-tight">
            Campus<span className="text-secondary">X</span>
          </Link>

          {user ? (
            <Link
              to="/home"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background hover:opacity-90"
            >
              Open dashboard
            </Link>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-surface"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="ml-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background hover:opacity-90"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-muted/50">
        <div className="blueprint-grid absolute inset-0" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" aria-hidden="true"></div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <p className="rise-in text-xs font-bold uppercase tracking-[0.28em] text-secondary">
              Integrated Student Service &amp; Management Platform
            </p>

            <h1 className="rise-in mt-5 max-w-2xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              Everything on campus,{" "}
              <span className="text-secondary">one place.</span>
            </h1>

            <p className="rise-in mt-6 max-w-xl text-lg text-secondary">
              Bus tracking, notices, events, room availability and student
              services — a centralized digital campus assistant, built by
              students, for students.
            </p>

            {user ? (
              <div className="rise-in mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/home"
                  className="rounded-full bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-background hover:opacity-90"
                >
                  Open dashboard
                </Link>
              </div>
            ) : (
              <div className="rise-in mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/register"
                  className="rounded-full bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-background hover:opacity-90"
                >
                  Get started
                </Link>
                <Link
                  to="/login"
                  className="rounded-full border border-muted/70 bg-background px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-primary hover:bg-surface"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>

          <div className="rise-in flex justify-center">
            <HeroRobot />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">
            Services
          </h2>
          <span className="text-xs font-medium tracking-widest text-muted">
            08 FEATURES
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="rounded-2xl border border-muted/70 bg-surface p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-muted/70 bg-background">
                <Icon name={service.icon} className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-bold">{service.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-secondary">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-muted/50 bg-surface-alt/50">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">
            How it works
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-muted/70 bg-background p-6"
              >
                <span className="text-4xl font-black tracking-tight text-muted">
                  {step.number}
                </span>
                <h3 className="mt-3 text-base font-bold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-16 text-center">
          <h2 className="max-w-2xl text-3xl font-black tracking-tight text-background sm:text-4xl">
            Ready to make campus life simpler?
          </h2>

          {user ? (
            <Link
              to="/home"
              className="rounded-full bg-background px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-primary hover:opacity-90"
            >
              Open dashboard
            </Link>
          ) : (
            <Link
              to="/register"
              className="rounded-full bg-background px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-primary hover:opacity-90"
            >
              Create free account
            </Link>
          )}
        </div>
      </section>

      <footer className="border-t border-muted/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-secondary sm:flex-row">
          <span className="font-semibold text-primary">CampusX</span>
          <span>University project · MERN stack · Web version</span>
        </div>
      </footer>
    </main>
  )
}
