# Web Application Project Proposal (MERN Stack)

## 1. Project Title

CampusX (An Integrated Student Service & Management Platform)

## 2. Problem Statement

University students often need to use multiple platforms or offline services for transportation
updates, notices, event participation, finding empty classrooms, academic schedules, lost-and-
found items, and academic tools.

**Who is affected?**

- University students
- Faculty members
- Student organizations
- University administration

**Current Challenges**

- Students miss buses due to lack of real-time updates.
- Important notices (e.g., blood donation requests) may not reach everyone.
- Information about events is scattered across different social media pages.
- Students waste time searching for empty classrooms or available labs.
- There is no centralized place for FAQs, lost & found, marketplace, or academic utilities.

## 3. Proposed Solution

Develop a MERN Stack web application named CampusX that provides students with
a single platform for transportation updates, university notices, event management, classroom
availability, academic tools, and student community services.

### Core Idea

```
A centralized digital campus assistant that simplifies daily student activities.
```

### Target Users

- Students
- Faculty members
- Student clubs
- University administration

## 4. Features & Functional Requirements

### Authentication

- Student Login & Registration
- Role-based access (Student/Admin)

### Core Features

**1.** Bus Notification System
    - Live bus status
    - Notifications when the bus starts
    - Notifications when the bus reaches previous stops
    - Estimated arrival updates
**2.** Important Notice System
    - Notice board
    - Important notices with acknowledgement checkbox
    - Emergency announcements (e.g., Blood Donation Request)
**3.** Event Management
    - View previous events
    - Ongoing event listings
    - Registration links for participation
**4.** Empty Room & Lab Finder
    - Search available classrooms
    - Search available labs
    - Filter by building and time
**5.** FAQ Section
    - Frequently asked questions
    - Searchable answers
**6.** Lost & Found
    - Post lost/found items with image, category, location & description
    - Browse & search listings (filter by category and status)
    - Mark items as resolved/returned
    - Contact poster (email/phone)
**7.** Marketplace
    - Post items for sale with image, price, category & description
    - Browse, search & filter listings
    - Mark items as sold
    - Contact seller
**8.** Academic Tools
    - Class routine viewer (searchable by department/semester/section)
    - CGPA calculator

### Admin Features

- Manage notices
- Manage bus schedules
- Manage events
- Manage FAQ
- Manage lost & found posts
- Moderate marketplace listings

## 5. Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend | React 19 + Vite | SPA UI, fast dev server & builds |
| UI/Styling | CSS (custom design tokens) | Dark monochrome theme carried over from the CampusX mobile app |
| Backend | Node.js + Express 5 | REST API server |
| Database | MongoDB + Mongoose 9 | Data persistence (standalone, no Firebase dependency) |
| Real-time | Socket.IO | Live bus status updates (replaces Firestore streams from mobile app) |
| Authentication | JWT (JSON Web Tokens) | Student registration/login + role-based access (Student/Admin) |
| Image upload | Multer | Lost & found / marketplace item images |

## 6. Timeline & Milestones

| Phase | Milestone | Scope |
| --- | --- | --- |
| 1 | Project setup & authentication | Repo setup, MongoDB connection, user model, JWT auth, role-based access |
| 2 | Notices, events & FAQ | CRUD APIs + student views, notice acknowledgement, event registration links, searchable FAQ |
| 3 | Real-time bus notification system | Bus routes & stops (seeded from mobile app data), live status via Socket.IO, notifications per stop |
| 4 | Empty room & lab finder | Room/lab data (seeded from mobile app), search & filter by building, type and time |
| 5 | Lost & found + marketplace | Listings with images & categories, search/filter, resolve/sold status, admin moderation |
| 6 | Academic tools, admin panel & polish | Routine viewer, CGPA calculator, unified admin dashboard, UI polish, testing & documentation |

## 7. Expected Outcomes

- A single centralized web platform for daily campus activities (transport, notices, events, rooms, community services).
- Real-time bus updates so students no longer miss buses due to lack of information.
- Admin-controlled content management with proper server-side role authorization (improvement over the mobile app's client-side-only admin gating).
- Community services (lost & found, marketplace) and academic tools available on web for the first time — completing features left unfinished in the mobile version.
- A standalone MERN codebase, independent of the mobile app's Firebase backend.


