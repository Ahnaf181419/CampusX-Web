# CampusX Web

Web version of CampusX — an integrated student service & management platform for
university students (bus notifications, notices, events, room finder, FAQ, lost & found,
marketplace, academic tools).

Built with the MERN stack as a university project. The mobile version (Flutter +
Firebase) lives in a separate repo.

Hero greeting robot: 3D scene by GENKUB, made with [Spline](https://spline.design),
embedded via its public share URL.

## Project Structure

```
campus-x_web/
├── client/   # React 19 + Vite frontend
├── server/   # Node.js + Express 5 + MongoDB (Mongoose) API
└── docs/     # Project proposal, design theme, and other documentation
```

## Getting Started

### Prerequisites

- Node.js (LTS)
- MongoDB running locally or a connection string

### 1. Server

```bash
cd server
npm install
cp .env.example .env   # then edit MONGO_URI if needed
npm run dev
```

API runs at `http://localhost:5000`.

### 2. Client

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` (default Vite port).

## Documentation

- [docs/idea.md](docs/idea.md) — project proposal: features, tech stack, timeline
- [docs/theme.md](docs/theme.md) — design tokens & UI conventions
