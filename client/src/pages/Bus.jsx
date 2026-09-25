import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { Icon } from "../components/Icons"

const cardShadow = "shadow-[0_4px_16px_rgb(22_32_50/0.09)]"

export default function Bus() {
  const { user } = useContext(AuthContext)
  const [buses, setBuses] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const [selectedBusId, setSelectedBusId] = useState("padma")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [notifiedStops, setNotifiedStops] = useState({})
  const [arrivalAlert, setArrivalAlert] = useState(null)

  async function fetchBuses() {
    try {
      const res = await fetch("/api/buses")
      if (!res.ok) throw new Error()
      setBuses(await res.json())
      setLoadError(null)
    } catch {
      setLoadError("Could not load bus data. Is the server running?")
    }
  }

  useEffect(() => {
    const initial = setTimeout(fetchBuses, 0)
    const id = setInterval(fetchBuses, 5000)
    return () => {
      clearTimeout(initial)
      clearInterval(id)
    }
  }, [])

  useEffect(() => {
    if (!arrivalAlert) return
    const id = setTimeout(() => setArrivalAlert(null), 3000)
    return () => clearTimeout(id)
  }, [arrivalAlert])

  const bus = buses?.find((b) => b.busId === selectedBusId)

  async function sendAction(action) {
    try {
      const res = await fetch(`/api/buses/${selectedBusId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      if (!res.ok) throw new Error()
      const updated = await res.json()
      setBuses((prev) =>
        prev.map((b) => (b.busId === updated.busId ? updated : b))
      )
      setLoadError(null)
      if (action === "next") {
        const stop = updated.stops[updated.currentStopIndex]
        if (notifiedStops[`${updated.busId}-${stop.name}`]) {
          setArrivalAlert({ busTitle: updated.busTitle, stopName: stop.name })
        }
      }
    } catch {
      setLoadError("Could not reach the server. Check that it is running.")
    }
  }

  function handleToggle() {
    sendAction(isRunning ? "stop" : "start")
  }

  function handleNextStop() {
    if (!isRunning || atLastStop) return
    sendAction("next")
  }

  function handleResetRoute() {
    sendAction("reset")
  }

  function toggleNotify(stopName) {
    const key = `${bus.busId}-${stopName}`
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

  if (loadError && !buses) {
    return (
      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <div className="blueprint-grid absolute inset-0" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" aria-hidden="true"></div>

        <div className="relative mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-5 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
            <Icon name="bus" className="h-7 w-7 text-primary" />
          </span>
          <p className="text-lg font-bold">Could not load bus data</p>
          <p className="max-w-sm text-sm text-secondary">{loadError}</p>
          <button
            type="button"
            onClick={fetchBuses}
            className="mt-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  if (!bus) {
    return (
      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <div className="blueprint-grid absolute inset-0" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" aria-hidden="true"></div>

        <div className="relative mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-5 py-16">
          <span className="flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-white">
            <Icon name="bus" className="h-7 w-7 text-primary" />
          </span>
          <p className="text-sm font-semibold text-secondary">Loading buses…</p>
        </div>
      </main>
    )
  }

  const stops = bus.stops
  const currentStopIndex = bus.currentStopIndex
  const isRunning = bus.isRunning
  const atLastStop = currentStopIndex === stops.length - 1

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

        {loadError && (
          <p className="rise-in mt-4 rounded-xl border border-muted bg-white px-4 py-3 text-sm font-semibold text-secondary">
            {loadError}
          </p>
        )}

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
                    key={b.busId}
                    type="button"
                    role="option"
                    aria-selected={b.busId === selectedBusId}
                    onClick={() => {
                      setSelectedBusId(b.busId)
                      setIsDropdownOpen(false)
                    }}
                    className={`flex w-full items-center justify-between gap-3 border-b border-muted/60 px-4 py-3 text-left last:border-b-0 ${
                      b.busId === selectedBusId
                        ? "bg-surface"
                        : "hover:bg-surface/60"
                    }`}
                  >
                    <span className="min-w-0">
                      <span
                        className={`block truncate text-sm font-bold ${
                          b.busId === selectedBusId ? "text-primary" : ""
                        }`}
                      >
                        {b.busTitle}
                      </span>
                    </span>
                    {b.busId === selectedBusId && (
                      <Icon name="check" className="h-4 w-4 shrink-0 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {user?.role === "Admin" && (
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
        )}

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
            const isNotified = notifiedStops[`${bus.busId}-${stop.name}`]

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
          Live data — bus positions sync from the database every 5 seconds
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
