import { useEffect, useRef, useState } from "react"
import { Icon } from "../components/Icons"

const cardShadow = "shadow-[0_4px_16px_rgb(22_32_50/0.09)]"

function renderText(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  )
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! Ask me anything about campus buses, notices, events, rooms or lost & found items.",
    },
  ])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, sending])

  async function send(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return

    setMessages((prev) => [...prev, { from: "user", text }])
    setInput("")
    setSending(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Chatbot unavailable")
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }])
    } catch (err) {
      setMessages((prev) => [...prev, { from: "bot", text: err.message }])
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="blueprint-grid absolute inset-0" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" aria-hidden="true"></div>

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col px-5 py-10">
        <p className="rise-in text-xs font-bold uppercase tracking-[0.28em] text-secondary">
          Assistant
        </p>

        <h1 className="rise-in mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Ask CampusX.
        </h1>

        <p className="rise-in mt-3 max-w-xl text-lg text-secondary">
          Answers straight from the live campus database.
        </p>

        <div
          className={`rise-in mt-6 flex flex-1 flex-col overflow-hidden rounded-2xl bg-white ${cardShadow}`}
        >
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-md bg-primary font-semibold text-white"
                      : "rounded-bl-md bg-surface text-primary"
                  }`}
                >
                  {renderText(m.text)}
                </p>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <p className="rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-sm text-secondary">
                  Thinking…
                </p>
              </div>
            )}

            <div ref={endRef}></div>
          </div>

          <form onSubmit={send} className="flex gap-2 border-t border-muted/60 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about buses, notices, events…"
              className="flex-1 rounded-xl bg-surface px-4 py-3 text-sm outline-none placeholder:text-secondary focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition-colors duration-200 hover:opacity-90 disabled:opacity-40"
            >
              <Icon name="send" className="h-5 w-5" />
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
