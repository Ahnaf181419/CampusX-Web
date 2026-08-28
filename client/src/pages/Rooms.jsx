import { useState } from "react"
import { Icon } from "../components/Icons"

const mockRooms = [
  {
    id: 1,
    name: "Lecture Hall A",
    building: "Main Academic Block",
    floor: "Ground Floor",
    capacity: 120,
    type: "Lecture Hall",
    status: "Available",
    equipment: ["Projector", "Whiteboard", "Microphone"],
    nextAvailable: "Now",
  },
  {
    id: 2,
    name: "Seminar Hall B",
    building: "Seminar Block",
    floor: "1st Floor",
    capacity: 80,
    type: "Seminar Hall",
    status: "Occupied",
    equipment: ["Projector", "Screen", "Sound System"],
    nextAvailable: "2:00 PM",
  },
  {
    id: 3,
    name: "Computer Lab 3",
    building: "CS Building",
    floor: "2nd Floor",
    capacity: 40,
    type: "Computer Lab",
    status: "Available",
    equipment: ["60 PCs", "Projector", "Whiteboard"],
    nextAvailable: "Now",
  },
  {
    id: 4,
    name: "Tutorial Room 101",
    building: "Main Academic Block",
    floor: "1st Floor",
    capacity: 30,
    type: "Tutorial Room",
    status: "Available",
    equipment: ["Whiteboard", "Display Screen"],
    nextAvailable: "Now",
  },
  {
    id: 5,
    name: "Conference Room",
    building: "Administration Block",
    floor: "3rd Floor",
    capacity: 20,
    type: "Conference Room",
    status: "Occupied",
    equipment: ["Video Conferencing", "Whiteboard", "Projector"],
    nextAvailable: "4:30 PM",
  },
  {
    id: 6,
    name: "Physics Lab 2",
    building: "Science Block",
    floor: "1st Floor",
    capacity: 35,
    type: "Laboratory",
    status: "Maintenance",
    equipment: ["Lab Equipment", "Fume Hood", "Whiteboard"],
    nextAvailable: "Tomorrow",
  },
  {
    id: 7,
    name: "Auditorium",
    building: "Central Complex",
    floor: "Ground Floor",
    capacity: 500,
    type: "Auditorium",
    status: "Available",
    equipment: ["Stage Lighting", "Sound System", "Projector", "Microphones"],
    nextAvailable: "Now",
  },
  {
    id: 8,
    name: "Seminar Hall A",
    building: "Seminar Block",
    floor: "Ground Floor",
    capacity: 60,
    type: "Seminar Hall",
    status: "Available",
    equipment: ["Projector", "Whiteboard", "Sound System"],
    nextAvailable: "Now",
  },
]

const statusStyle = {
  Available: "bg-primary text-white",
  Occupied: "bg-priority-mid text-white",
  Maintenance: "bg-surface-alt text-secondary",
}

const typeFilters = [
  "All",
  "Lecture Hall",
  "Seminar Hall",
  "Computer Lab",
  "Tutorial Room",
  "Conference Room",
  "Laboratory",
  "Auditorium",
]

export default function Rooms() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRooms = mockRooms.filter((room) => {
    const matchesType = activeFilter === "All" || room.type === activeFilter
    const matchesSearch =
      searchQuery === "" ||
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.building.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="blueprint-grid absolute inset-0" aria-hidden="true"></div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      ></div>

      <div className="relative mx-auto max-w-6xl px-5 py-16">
        <p className="rise-in text-xs font-bold uppercase tracking-[0.28em] text-secondary">
          Campus Spaces
        </p>

        <h1 className="rise-in mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Find your room.
        </h1>

        <p className="rise-in mt-4 max-w-xl text-lg text-secondary">
          Search for available classrooms, labs, and meeting spaces across campus.
        </p>

        <div className="rise-in mt-8">
          <div className="relative">
            <Icon
              name="search"
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary"
            />
            <input
              type="text"
              placeholder="Search by room name or building..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-muted bg-white px-4 py-3 pl-12 text-sm shadow-[0_4px_16px_rgb(22_32_50/0.09)] focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="rise-in mt-6 flex gap-3 overflow-x-auto pb-2">
          {typeFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "border border-muted bg-white text-secondary hover:bg-surface"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => (
              <div
                key={room.id}
                className={`rise-in overflow-hidden rounded-2xl border border-muted/50 bg-white shadow-[0_4px_16px_rgb(22_32_50/0.09)]`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4 px-5 py-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-surface">
                    <Icon name="door" className="h-7 w-7 text-primary" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-bold">{room.name}</h2>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[room.status]}`}
                      >
                        {room.status}
                      </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-secondary">
                      <span className="flex items-center gap-1">
                        <Icon name="mapPin" className="h-3.5 w-3.5" />
                        {room.building}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="clock" className="h-3.5 w-3.5" />
                        {room.floor}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center gap-4 text-xs text-secondary">
                      <span className="flex items-center gap-1">
                        <Icon name="question" className="h-3.5 w-3.5" />
                        Capacity: {room.capacity}
                      </span>
                      <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium">
                        {room.type}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedRoom(room)}
                        className="rounded-lg bg-surface px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-surface-alt"
                      >
                        View Details
                      </button>
                      {room.status === "Available" && (
                        <span className="text-xs font-medium text-primary">
                          Available {room.nextAvailable}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-10 text-center text-secondary">
              No rooms found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {selectedRoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={() => setSelectedRoom(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-[19px] font-semibold text-primary">
                {selectedRoom.name}
              </h2>
              <span
                className={`rounded-full px-4 py-1 text-xs font-semibold ${statusStyle[selectedRoom.status]}`}
              >
                {selectedRoom.status}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-3 text-sm text-secondary">
              <span className="flex items-center gap-1">
                <Icon name="mapPin" className="h-4 w-4" />
                {selectedRoom.building}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="clock" className="h-4 w-4" />
                {selectedRoom.floor}
              </span>
            </div>

            <hr className="my-4 border-muted/50" />

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Room Type</span>
                <span className="font-medium">{selectedRoom.type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Capacity</span>
                <span className="font-medium">{selectedRoom.capacity} seats</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Next Available</span>
                <span className="font-medium">{selectedRoom.nextAvailable}</span>
              </div>
              <div>
                <p className="mb-2 text-sm text-secondary">Equipment</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRoom.equipment.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {selectedRoom.status === "Available" && (
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Book Room
                  <Icon name="arrowRight" className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedRoom(null)}
                className="flex-1 rounded-xl border border-muted py-3 text-sm font-medium text-secondary transition-colors hover:bg-surface"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
