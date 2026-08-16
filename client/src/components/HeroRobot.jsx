import { useRef } from "react"

function HeroRobot() {
  const audioRef = useRef(null)

  function handleBeep() {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/robot-beep.mp3")
    }
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})
  }

  return (
    <div className="relative h-72 w-72 md:h-96 md:w-96">
      <iframe
        src="https://my.spline.design/genkubgreetingrobot-4IKTbXtNv7beZCsMpSGebz1N/"
        title="CampusX greeting robot"
        className="h-full w-full border-0"
        loading="lazy"
        allow="autoplay"
      />
      <button
        type="button"
        aria-label="Make the robot beep"
        onClick={handleBeep}
        className="absolute inset-0 cursor-pointer bg-transparent"
      />
    </div>
  )
}

export default HeroRobot
