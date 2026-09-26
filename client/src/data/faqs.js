export const categories = [
  { id: "getting-started", label: "Getting Started" },
  { id: "bus", label: "Bus Tracking" },
  { id: "notices-events", label: "Notices & Events" },
  { id: "rooms", label: "Room Finder" },
  { id: "lost-found", label: "Lost & Found" },
  { id: "chatbot", label: "Chatbot" },
  { id: "tools", label: "Academic Tools" },
  { id: "account", label: "Account & Privacy" },
]

export const faqs = [
  {
    category: "getting-started",
    question: "What is CampusX?",
    answer:
      "CampusX is a **centralized platform** that brings student services together: **bus tracking, notices, events, room availability, lost & found, chatbot and academic tools** — all in one place, built by students, for students.",
  },
  {
    category: "getting-started",
    question: "Do I need an account to use CampusX?",
    answer:
      "Browsing is open to everyone — you can read **notices, events, bus status and FAQs** without logging in. An account is needed for personal features like **posting in Lost & Found** or keeping a profile.",
  },
  {
    category: "getting-started",
    question: "How do I sign up?",
    answer:
      "Open **Register** from the top navigation and fill in your **full name, student ID, department, email and a password**. Registration logs you in immediately, so you land on a personalized dashboard right away.",
  },
  {
    category: "getting-started",
    question: "Where should I start after logging in?",
    answer:
      "The **home dashboard** greets you personally and lists all **eight services** as cards — Bus Tracking, Notices, Events, Room Finder, FAQ, Lost & Found, Chatbot and Academic Tools. Tap any card to jump straight in.",
  },
  {
    category: "getting-started",
    question: "Does CampusX work on my phone?",
    answer:
      "Yes. Every page uses a **responsive layout** that adapts from phone to desktop — the bus list scrolls horizontally on small screens, and all sections stack into a single column.",
  },
  {
    category: "bus",
    question: "How do I track my campus bus?",
    answer:
      "Open **Bus Tracking** from the dashboard. It shows every bus with its **live state, route stops and estimated arrival**, and the page refreshes automatically every **five seconds** so the status is always current.",
  },
  {
    category: "bus",
    question: "How live is the bus data?",
    answer:
      "The page **polls the server every five seconds** and updates each bus in place. Each bus carries a server-managed state — such as **moving or at a stop** — so every student sees the same picture at the same time.",
  },
  {
    category: "bus",
    question: "What do the bus states mean?",
    answer:
      "Each bus shows where it is in its route: **moving** between stops, **waiting at a stop**, or otherwise flagged by the transport desk. The state drives the **estimated arrival** you see for your own stop.",
  },
  {
    category: "bus",
    question: "Why did the bus list freeze for a moment?",
    answer:
      "A dropped connection can pause updates between polls. The page **catches up on the next five-second cycle** — if it stays frozen, refresh the page once and it will resync.",
  },
  {
    category: "bus",
    question: "Can I see all the buses at once?",
    answer:
      "Yes. The full fleet sits in a **horizontal strip** — swipe or scroll sideways on phone, or use the scrollbar on desktop. Each bus card shows its **route number, state and progress**.",
  },
  {
    category: "notices-events",
    question: "How will I know when a new notice is posted?",
    answer:
      "Every notice appears in the **Notices** section the moment it is published. **Emergency alerts are highlighted at the top** with a red banner so they can never be missed.",
  },
  {
    category: "notices-events",
    question: "What counts as an emergency notice?",
    answer:
      "Notices flagged with **high priority** — campus closures, safety warnings, schedule upheavals — are treated as emergencies. They render with a **distinct high-priority style** and stay pinned above everything else.",
  },
  {
    category: "notices-events",
    question: "Where do campus events live?",
    answer:
      "The **Events** page lists everything happening on campus — seminars, club fairs, workshops — with dates, descriptions and a **participation link** for each one.",
  },
  {
    category: "notices-events",
    question: "Can I see events I already missed?",
    answer:
      "Yes. Events are split into **ongoing and past**, so you can look back at what already happened or browse what is live right now.",
  },
  {
    category: "notices-events",
    question: "How do I join an event?",
    answer:
      "Each event card carries its own **participation link** — tap it to open the registration or joining page maintained by the organizers.",
  },
  {
    category: "rooms",
    question: "How do I find an empty classroom?",
    answer:
      "Open **Room Finder**, pick your **building** and a **free time slot**, and it lists every classroom that is empty during that period.",
  },
  {
    category: "rooms",
    question: "Can I filter by building?",
    answer:
      "Yes — a **building filter** narrows the list to one block at a time, so you find a room near your next class instead of across campus.",
  },
  {
    category: "rooms",
    question: "Does Room Finder cover labs?",
    answer:
      "It lists both **classrooms and labs**. Lab slots disappear faster around project season, so check a couple of slots ahead if your first choice is taken.",
  },
  {
    category: "rooms",
    question: "How accurate is the availability?",
    answer:
      "Availability follows the **class schedule** for each slot. Rare last-minute bookings can still steal a room — if a room is unexpectedly occupied, check the next free slot.",
  },
  {
    category: "lost-found",
    question: "I lost something — what do I do?",
    answer:
      "Check **Lost & Found** first: someone may have already reported your item. If not, **post a report** with a clear description of the item and where you lost it.",
  },
  {
    category: "lost-found",
    question: "I found an item — how do I report it?",
    answer:
      "Post a listing in **Lost & Found** with what the item is and **where you found it**. The owner can identify it from your description and reach out.",
  },
  {
    category: "lost-found",
    question: "How do I get my item back?",
    answer:
      "When someone posts a match for your report, connect through the listing to **arrange a handover on campus**. Always meet in a public campus spot.",
  },
  {
    category: "chatbot",
    question: "What is the Chatbot?",
    answer:
      "The **Chatbot** is an AI assistant that answers questions about campus — buses, notices, events, rooms and lost & found — using **live data from the CampusX database**.",
  },
  {
    category: "chatbot",
    question: "How does the Chatbot know the answers?",
    answer:
      "It reads the **same database** that powers Bus Tracking, Notices, Events, Room Finder and Lost & Found, so its answers always reflect the **current live data**.",
  },
  {
    category: "chatbot",
    question: "The Chatbot couldn't answer my question — why?",
    answer:
      "It only answers from **campus data it has access to**. For anything else, email **support@campusx.dev** and the team will help you out.",
  },
  {
    category: "tools",
    question: "What is inside Academic Tools?",
    answer:
      "Today it ships with a full **CGPA calculator** built on the standard grading scale. More utilities are planned for later releases.",
  },
  {
    category: "tools",
    question: "How does the CGPA calculator work?",
    answer:
      "Add a row per course with its **credits** and **grade**, and the tool computes your GPA instantly: credits × grade points, summed and divided by total credits. The scale runs from **A+ (4.00, 80% and above)** down to **F (0.00, below 40%)**.",
  },
  {
    category: "tools",
    question: "Can I calculate my CGPA across semesters?",
    answer:
      "Yes — enter **every course from every semester** as rows in one session. The final figure is your cumulative GPA, not just one semester's.",
  },
  {
    category: "account",
    question: "Is my password stored safely?",
    answer:
      "Yes. Passwords are **salted and hashed** — never stored in plain text and never visible to anyone, including admins. Login sessions are handled server-side with a **secure http-only cookie**.",
  },
  {
    category: "account",
    question: "How long does my login last?",
    answer:
      "Logging in creates a **session cookie** that keeps you signed in for up to **seven days**. It survives page refreshes and moving between pages; **Log out** from your profile ends it immediately.",
  },
  {
    category: "account",
    question: "What data does CampusX store about me?",
    answer:
      "Only what you registered with: **full name, student ID, department, email**, a **hashed password** and your role. Nothing else is collected.",
  },
  {
    category: "account",
    question: "Can I use CampusX from another device?",
    answer:
      "Yes — just **log in again** on the new device. Each device keeps its own session, so signing out on your phone does not sign out your laptop.",
  },
  {
    category: "account",
    question: "How do I log out?",
    answer:
      "Open your **profile** from the top navigation and press **Log out**. The session is destroyed server-side and the cookie is cleared.",
  },
  {
    category: "account",
    question: "Is my student ID visible to others?",
    answer:
      "No. Your **student ID and email appear only on your own profile**. Public pages such as the dashboard greeting show just your **first name and department**.",
  },
  {
    category: "account",
    question: "Who do I contact about my account?",
    answer:
      "Reach the team through the **support links at the bottom of this page** — or ask any campus admin directly. Account issues usually get resolved the same day.",
  },
]
