# Outlook × Pipedrive Connect — MVP Mockup

A React proof-of-concept simulating an **Outlook Add-in** that lets sales teams log emails, create deals, and update pipeline stages in Pipedrive — without leaving their inbox.

Built as a frontend-only mockup with hardcoded dummy data to validate the UX flow before any real API integration is built.

---

## What It Does

The app renders a split-panel layout mimicking the Outlook desktop client with an add-in side panel open:

- **Left** — a realistic Outlook inbox and email body (dummy data, fully interactive)
- **Right** — a Pipedrive Connect panel with three core actions

### The Three Actions

| Tab | What it does |
|-----|-------------|
| **Log to Deal** | Attaches the selected email as an activity/note against an existing Pipedrive deal |
| **New Deal** | Creates a new deal pre-populated from the email sender's contact details |
| **Update Stage** | Moves an existing deal forward through the pipeline via an interactive stage stepper |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install & Run

```bash
git clone <repo-url>
cd outlook-pipedrive-mvp
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

---

## Project Structure

```
src/
├── App.jsx                     # Root layout — splits left/right panes
├── data/
│   └── dummyData.js            # All hardcoded emails, deals, contacts, stages
├── components/
│   ├── OutlookPane/
│   │   ├── InboxList.jsx       # Scrollable email list with sender avatars
│   │   └── EmailBody.jsx       # Full email thread view
│   └── PipedrivePanel/
│       ├── PanelHeader.jsx     # Sender info + Pipedrive contact match badge
│       ├── TabBar.jsx          # Log to Deal / New Deal / Update Stage tabs
│       ├── LogToDeal.jsx       # Deal select + activity type + note
│       ├── NewDeal.jsx         # New deal creation form
│       └── UpdateStage.jsx     # Interactive pipeline stage stepper
└── index.css                   # Tailwind base styles
```

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| State | useState (local only) |
| Data | Hardcoded dummy data — no API calls |

---

## Dummy Data

All data lives in `src/data/dummyData.js`. It includes:

- **6 inbox emails** from contacts across Avocor, Comm-Tec, Vestel, Samsung B2B, and Midwich internal
- **3 Pipedrive deals** linked to Avocor at different pipeline stages
- **Pipeline stages** for the UK Distribution pipeline
- **Owners** (George Davies, Sarah Mitchell, David Okonkwo)

The selected email defaults to the James Hargreaves / Avocor thread — a realistic Q2 AV distribution proposal exchange that gives the right panel meaningful context to display.

---

## Key Interactions

| Action | Result |
|--------|--------|
| Click an email in the inbox | Updates the email body and right panel sender details |
| Switch tabs | Shows the correct form, resets submission state |
| Click activity type pills | Toggles between Email / Call / Note |
| Click a pipeline stage in the stepper | Highlights the target stage |
| Click any primary action button | Shows a success confirmation for 3 seconds, then resets |

---

## Design Notes

The UI intentionally mirrors two distinct product design languages side by side:

- **Outlook pane** — Microsoft Fluent-adjacent: whites, light greys, `#0078D4` blue accent
- **Pipedrive panel** — Pipedrive brand: white cards with `#FF5A28` orange as the primary action colour

Density is kept compact throughout — this is an add-in panel, not a dashboard. Everything needs to fit in a ~400px wide sidebar.

---

## Out of Scope (This MVP)

This build is purely for UX validation. The following are explicitly not included:

- Real Pipedrive API integration
- Microsoft Graph API / Outlook add-in manifest
- OAuth / authentication of any kind
- Form validation beyond basic UI states
- Error handling
- Mobile layout
- Search or filtering beyond pre-populated dropdowns

---

## Next Steps (Post-Validation)

If the UX is approved, the real integration would involve:

1. **Microsoft Outlook Add-in** — register an add-in manifest, use Office.js to read the selected email and sender details
2. **Pipedrive API** — authenticate via OAuth 2.0, wire up the three actions to real endpoints:
   - `POST /activities` — log email as activity
   - `POST /deals` — create deal
   - `PUT /deals/{id}` — update stage
3. **Contact matching** — use Pipedrive's person/org search to auto-match the sender on email open
4. **Deployment** — host the add-in web app (Cloudflare Pages or Azure Static Web Apps), submit manifest to Microsoft 365 admin centre

---

## Purpose

This repo exists to answer one question before any real engineering time is spent:

> *Does this workflow make sense? Is the layout right? Are the three actions the right three actions?*

Demo it. Get feedback. Then build the real thing.
