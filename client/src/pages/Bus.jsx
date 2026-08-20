import { useEffect, useState } from "react"
import { Icon } from "../components/Icons"

const buses = [
  {
    id: "padma",
    busTitle: "Padma Bus",
    routeDirection: "To University",
    destination: "towards Bangla School",
    stops: [
      { name: "Mirpur 12", minutes: 0 },
      { name: "Mirpur 11.5", minutes: 3 },
      { name: "Purobi", minutes: 7 },
      { name: "Bangla School", minutes: 13 },
      { name: "Mirpur 11", minutes: 18 },
      { name: "Mirpur 10", minutes: 23 },
      { name: "Kazipara", minutes: 27 },
      { name: "Shewrapara", minutes: 30 },
      { name: "Taltola", minutes: 35 },
      { name: "Agargaon", minutes: 38 },
      { name: "University", minutes: 46 },
    ],
  },
  {
    id: "meghna",
    busTitle: "Meghna Bus",
    routeDirection: "To University",
    destination: "towards Uttara",
    stops: [
      { name: "Proshika Bhaban", minutes: 0 },
      { name: "Sheyalbari More", minutes: 5 },
      { name: "Rynkhola", minutes: 10 },
      { name: "Sony Cinema hall", minutes: 15 },
      { name: "Mirpur 1", minutes: 22 },
      { name: "Ansarcamp", minutes: 26 },
      { name: "Tolarbag", minutes: 28 },
      { name: "Technical More", minutes: 32 },
      { name: "Kallyanpur", minutes: 36 },
      { name: "Shyamoli", minutes: 40 },
      { name: "Asadgate", minutes: 46 },
      { name: "Manik Mia Avenue", minutes: 48 },
      { name: "Rangs Bhaban", minutes: 52 },
      { name: "University", minutes: 56 },
    ],
  },
  {
    id: "karnaphuli",
    busTitle: "Karnaphuli Bus",
    routeDirection: "To University",
    destination: "towards Dhanmondi",
    stops: [
      { name: "Chashara", minutes: 0 },
      { name: "Signboad", minutes: 4 },
      { name: "Jatrabari", minutes: 9 },
      { name: "Khilgaon", minutes: 14 },
      { name: "Malibagh", minutes: 19 },
      { name: "Mogbazar", minutes: 25 },
      { name: "University", minutes: 44 },
    ],
  },
  {
    id: "surma",
    busTitle: "Surma Bus",
    routeDirection: "To University",
    destination: "towards Gulshan",
    stops: [
      { name: "Gulshan 2", minutes: 0 },
      { name: "Gulshan 1", minutes: 6 },
      { name: "Mohakhali", minutes: 14 },
      { name: "Moghbazar", minutes: 20 },
      { name: "Malibagh", minutes: 26 },
      { name: "Kakrail", minutes: 31 },
      { name: "Shahbagh", minutes: 36 },
      { name: "University", minutes: 44 },
    ],
  },
  {
    id: "jamuna",
    busTitle: "Jamuna Bus",
    routeDirection: "To University",
    destination: "towards Mohammadpur",
    stops: [
      { name: "Mohammadpur Town", minutes: 0 },
      { name: "Shyamoli", minutes: 7 },
      { name: "Asad Gate", minutes: 13 },
      { name: "Russell Square", minutes: 20 },
      { name: "Farmgate", minutes: 26 },
      { name: "Karwan Bazar", minutes: 32 },
      { name: "University", minutes: 40 },
    ],
  },
  {
    id: "shitalakshya",
    busTitle: "Shitalakshya Bus",
    routeDirection: "To University",
    destination: "towards Uttara",
    stops: [
      { name: "Uttara Sector 7", minutes: 0 },
      { name: "Azampur", minutes: 8 },
      { name: "Uttara Center", minutes: 14 },
      { name: "Airport Road", minutes: 22 },
      { name: "Banani", minutes: 29 },
      { name: "Mohakhali", minutes: 36 },
      { name: "University", minutes: 45 },
    ],
  },
  {
    id: "buriganga",
    busTitle: "Buriganga Bus",
    routeDirection: "To University",
    destination: "towards Old Dhaka",
    stops: [
      { name: "Gulistan", minutes: 0 },
      { name: "Nayabazar", minutes: 6 },
      { name: "Zigatola", minutes: 12 },
      { name: "Dhanmondi 2", minutes: 18 },
      { name: "Kalabagan", minutes: 24 },
      { name: "Green Road", minutes: 30 },
      { name: "University", minutes: 40 },
    ],
  },
]

const cardShadow = "shadow-[0_4px_16px_rgb(22_32_50/0.09)]"

export default function Bus() {
  const [selectedBusId, setSelectedBusId] = useState("padma")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentStopIndex, setCurrentStopIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [notifiedStops, setNotifiedStops] = useState({})
  const [arrivalAlert, setArrivalAlert] = useState(null)

  const bus = buses.find((b) => b.id === selectedBusId)
  const stops = bus.stops
  const atLastStop = currentStopIndex === stops.length - 1

  useEffect(() => {
    if (!arrivalAlert) return
    const id = setTimeout(() => setArrivalAlert(null), 3000)
    return () => clearTimeout(id)
  }, [arrivalAlert])

  function handleToggle() {
    setIsRunning((running) => !running)
  }

  function handleNextStop() {
    if (!isRunning || atLastStop) return
    setCurrentStopIndex((index) => Math.min(index + 1, stops.length - 1))
    const stop = stops[currentStopIndex + 1]
    if (stop && notifiedStops[`${bus.id}-${stop.name}`]) {
      setArrivalAlert({ busTitle: bus.busTitle, stopName: stop.name })
    }
  }

  function handleResetRoute() {
    setCurrentStopIndex(0)
    setIsRunning(false)
  }

  function toggleNotify(stopName) {
    const key = `${bus.id}-${stopName}`
    setNotifiedStops((prev) => {
      const next = { ...prev }
      if (next[key]) {
        delete next[key]
      } else {
        next[key] = true
      }
      return next
    })
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="blueprint-grid absolute inset-0" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" aria-hidden="true"></div>

      <div className="relative mx-auto max-w-3xl px-5 py-16">
        <p className="rise-in text-xs font-bold uppercase tracking-[0.28em] text-secondary">
          Transport
        </p>

        <h1 className="rise-in mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Track your ride.
        </h1>

        <p className="rise-in mt-4 max-w-xl text-lg text-secondary">
          Live progress of every campus bus, with arrival times for your stop.
        </p>

        <div
          className="rise-in relative z-30 mt-10"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsDropdownOpen(false)
            }
          }}
        >
          <button
            type="button"
            onClick={() => setIsDropdownOpen((open) => !open)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            className={`flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3.5 text-left ${cardShadow}`}
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface">
                <Icon name="bus" className="h-5 w-5 text-primary" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-base font-bold">
                  {bus.busTitle}
                </span>
              </span>
            </span>
            <Icon
              name="chevronDown"
              className={`h-5 w-5 shrink-0 text-secondary transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
                aria-hidden="true"
              ></div>

              <div
                role="listbox"
                className={`absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-2xl bg-white ${cardShadow}`}
              >
                {buses.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    role="option"
                    aria-selected={b.id === selectedBusId}
                    onClick={() => {
                      setSelectedBusId(b.id)
                      setCurrentStopIndex(0)
                      setIsRunning(false)
                      setIsDropdownOpen(false)
                    }}
                    className={`flex w-full items-center justify-between gap-3 border-b border-muted/60 px-4 py-3 text-left last:border-b-0 ${
                      b.id === selectedBusId
                        ? "bg-surface"
                        : "hover:bg-surface/60"
                    }`}
                  >
                    <span className="min-w-0">
                      <span
                        className={`block truncate text-sm font-bold ${
                          b.id === selectedBusId ? "text-primary" : ""
                        }`}
                      >
                        {b.busTitle}
                      </span>
                    </span>
                    {b.id === selectedBusId && (
                      <Icon name="check" className="h-4 w-4 shrink-0 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className={`rise-in mt-4 rounded-2xl bg-white p-5 ${cardShadow}`}>
          <div className="flex items-center justify-center gap-3">
            <Icon
              name="shield"
              className={`h-6 w-6 ${isRunning ? "text-primary" : "text-secondary"}`}
            />
            <h2 className="text-lg font-bold">Admin Control</h2>
          </div>

          <div className="my-5 border-t border-muted/60"></div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleToggle}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold text-white transition-colors duration-200 ${
                isRunning ? "bg-secondary" : "bg-primary"
              }`}
            >
              <Icon
                name={isRunning ? "circleStop" : "play"}
                className="h-5 w-5"
              />
              {isRunning ? "Stop Bus" : "Start Bus"}
            </button>

            <button
              type="button"
              onClick={handleNextStop}
              disabled={!isRunning || atLastStop}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-colors duration-200 ${
                !isRunning || atLastStop
                  ? "cursor-not-allowed bg-surface-alt text-secondary"
                  : "bg-primary text-white"
              }`}
            >
              <Icon name="skipForward" className="h-5 w-5" />
              Next Stop
            </button>
          </div>

          <button
            type="button"
            onClick={handleResetRoute}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-secondary px-4 py-3.5 text-sm font-bold text-secondary transition-colors duration-200 hover:opacity-80"
          >
            <Icon name="rotateCcw" className="h-5 w-5" />
            Reset Route
          </button>
        </div>

        <div className={`rise-in mt-4 rounded-2xl bg-white p-4 ${cardShadow}`}>
          <div className="flex items-center gap-4">
            <Icon name="bus" className="h-7 w-7 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold">{bus.busTitle}</p>
              <p className="mt-0.5 truncate text-sm text-secondary">
                {bus.routeDirection}, {bus.destination}
              </p>
            </div>
            <div
              className={`flex shrink-0 items-center gap-1.5 text-sm ${
                isRunning ? "text-primary" : "text-secondary"
              }`}
            >
              <Icon name="clock" className="h-3.5 w-3.5" />
              {isRunning ? "Running" : "Stopped"}
            </div>
          </div>
        </div>

        <div className={`rise-in mt-4 rounded-2xl bg-white p-4 ${cardShadow}`}>
          <h2 className="text-base font-bold">Current Route</h2>

          <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-2">
            <div className="flex w-max items-center">
              {stops.map((stop, index) => {
                const isReached = index <= currentStopIndex

                return (
                  <div key={stop.name} className="flex items-center">
                    <div className="flex w-20 flex-col items-center gap-2">
                      {isReached ? (
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                          <Icon name="bus" className="h-5 w-5 text-white" />
                        </span>
                      ) : (
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                          <Icon name="hourglass" className="h-4 w-4 text-muted" />
                        </span>
                      )}
                      <p
                        className={`text-center text-xs leading-tight ${
                          isReached
                            ? "font-bold text-primary"
                            : "text-secondary"
                        }`}
                      >
                        {stop.name}
                      </p>
                    </div>
                    {index < stops.length - 1 && (
                      <span className="mb-6 h-[1.5px] w-10 shrink-0 bg-secondary"></span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <h2 className="rise-in mb-2 mt-6 pl-1 text-base font-bold">
          Bus Stoppage List
        </h2>

        <div className={`rise-in overflow-hidden rounded-lg bg-white ${cardShadow}`}>
          {stops.map((stop, index) => {
            const isPassed = index <= currentStopIndex
            const isNotified = notifiedStops[`${bus.id}-${stop.name}`]

            return (
              <div
                key={stop.name}
                className={`border-b border-muted/60 last:border-b-0 ${
                  isPassed ? "border-l-4 border-l-primary" : "border-l-4 border-l-transparent"
                }`}
              >
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm font-bold ${
                        isPassed ? "text-secondary" : "text-primary"
                      }`}
                    >
                      {stop.name}
                    </p>
                    <p className="mt-0.5 text-xs text-secondary">
                      Estimated: {stop.minutes} mins
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Icon
                      name={isNotified ? "bellRing" : "bell"}
                      className={`h-5 w-5 ${
                        isNotified ? "text-primary" : "text-secondary"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleNotify(stop.name)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                        isNotified
                          ? "bg-primary text-white"
                          : "bg-surface-alt text-primary hover:opacity-80"
                      }`}
                    >
                      {isNotified ? "Notifying" : "Notify Me"}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          Demo mode — the bus moves via Admin Control
        </p>
      </div>

      {arrivalAlert && (
        <div className="rise-in fixed bottom-6 left-1/2 z-50 w-[calc(100%-2.5rem)] max-w-sm -translate-x-1/2">
          <div className="flex items-center gap-2.5 rounded-xl bg-primary px-4 py-3 shadow-lg">
            <Icon name="bus" className="h-5 w-5 shrink-0 text-white" />
            <p className="flex-1 text-sm font-semibold text-white">
              {arrivalAlert.busTitle} reached {arrivalAlert.stopName}
            </p>
            <button
              type="button"
              onClick={() => setArrivalAlert(null)}
              aria-label="Dismiss notification"
              className="rounded-lg p-1 text-white hover:opacity-70"
            >
              <Icon name="x" className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
