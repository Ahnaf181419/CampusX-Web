import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import FeatureCard from "../components/FeatureCard";
import HeroRobot from "../components/HeroRobot";

const features = [
  {
    path: "/bus",
    name: "Bus Tracking",
    description: "Live bus status, stop-by-stop notifications and estimated arrival times.",
    icon: "bus",
  },
  {
    path: "/notices",
    name: "Notices",
    description: "Important announcements with acknowledgements and emergency alerts.",
    icon: "bell",
  },
  {
    path: "/events",
    name: "Events",
    description: "Ongoing and past campus events with participation links.",
    icon: "calendar",
  },
  {
    path: "/rooms",
    name: "Room Finder",
    description: "Empty classrooms and labs, filterable by building and time.",
    icon: "door",
  },
  {
    path: "/faq",
    name: "FAQ",
    description: "Frequently asked questions with instant search.",
    icon: "question",
  },
  {
    path: "/lost-found",
    name: "Lost & Found",
    description: "Report, browse and recover lost items across campus.",
    icon: "package",
  },
  {
    path: "/chatbot",
    name: "Chatbot",
    description: "Ask about buses, notices, events, rooms and lost & found.",
    icon: "chat",
  },
  {
    path: "/tools",
    name: "Academic Tools",
    description: "Academic tools like CGPA calculator.",
    icon: "calculator",
  },
]

export default function Home() {
  const { user } = useContext(AuthContext);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
  const firstName =
    user?.fullName?.trim().split(/\s+/)[0] ||
    user?.email?.split("@")[0] ||
    "there";

  return (
    <main>
      <section className="relative overflow-hidden border-b border-muted/50">
        <div className="blueprint-grid absolute inset-0" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" aria-hidden="true"></div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <p className="rise-in text-xs font-bold uppercase tracking-[0.28em] text-secondary">
              Good {greeting}
            </p>

            <h1 className="rise-in mt-5 max-w-2xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              Welcome, {firstName}.
            </h1>

            {user.department && (
              <p className="rise-in mt-4 text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                {user.department}
                {user.role === "Admin" ? " · Admin" : ""}
              </p>
            )}

            <p className="rise-in mt-6 max-w-xl text-lg text-secondary">
              Bus tracking, notices, events, room availability and student
              services — your centralized digital campus assistant, synced
              to your account.
            </p>

            <p className="rise-in mt-3 max-w-xl text-sm text-secondary/80">
              Jump in from the services below — your session stays active
              across every page.
            </p>
          </div>

          <div className="rise-in flex justify-center">
            <HeroRobot />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">
            Services
          </h2>
          <span className="text-xs font-medium tracking-widest text-muted">
            08 FEATURES
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.path} feature={feature} index={index} />
          ))}
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
