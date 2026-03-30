# Codex build brief

# Agent Spec: Outlook + Pipedrive Integration — MVP Mockup

## Overview

Build a React single-page application that simulates an **Outlook Add-in** side-panel experience. The layout shows a realistic dummy Outlook inbox/email view on the **left**, and a Pipedrive integration panel on the **right**. The right panel lets the user connect the selected email to Pipedrive — logging it against a deal, creating a new deal, or updating a deal's pipeline stage.

This is a frontend-only MVP proof-of-concept with **all dummy data hardcoded**. No real API calls. The goal is to validate the UX flow and layout for stakeholder sign-off.

---

## Tech Stack

- **React** (functional components + hooks)
- **Tailwind CSS** for layout and utility styling
- **shadcn/ui** components where appropriate (Dialog, Select, Badge, Button, Input, Tabs)
- No backend, no auth, no API calls — all state is local

---

## Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Outlook Add-in Chrome — top bar with "Midwich Pipedrive Connect"] │
├──────────────────────────────┬──────────────────────────────────────┤
│                              │                                      │
│   LEFT PANE                  │   RIGHT PANE                         │
│   Outlook Email View         │   Pipedrive Panel                    │
│   (mock inbox + email body)  │   (action cards + forms)             │
│                              │                                      │
└──────────────────────────────┴──────────────────────────────────────┘
```

Split: **55% left / 45% right**. Fixed height viewport (simulates the constrained add-in container). Subtle vertical divider between panes.

---

## Left Pane — Outlook Email Mockup

### Inbox List (top ~30% of left pane)

A scrollable list of 6–8 dummy emails. Each row shows:
- Sender avatar (initials, coloured circle)
- Sender name + company
- Subject line (truncated)
- Timestamp
- Unread indicator dot for some

**Dummy email data to hardcode:**

| # | From | Subject | Time | Unread |
|---|------|---------|------|--------|
| 1 | James Hargreaves (Avocor) | Re: Q2 AV Distribution Proposal | 10:42 AM | ✓ |
| 2 | Sarah Mitchell (Midwich UK) | FW: Clevertouch Bundle Pricing | 9:15 AM | |
| 3 | Tom Briggs (Comm-Tec) | New opportunity — 50 unit order | Yesterday | ✓ |
| 4 | Lisa Patel (Vestel) | Contract renewal — EMEA region | Yesterday | |
| 5 | David Okonkwo (Midwich DE) | DACH pipeline review needed | Mon | ✓ |
| 6 | Harriet Flynn (Samsung B2B) | Interactive display quote request | Mon | |

**Selected email** (email #1 — James Hargreaves) is highlighted in the list and its body is shown below the list.

### Email Body (bottom ~70% of left pane)

Display a realistic email thread. Include:

**From:** James Hargreaves `<j.hargreaves@avocor.com>`  
**To:** George Davies `<g.davies@midwich.com>`  
**CC:** procurement@avocor.com  
**Subject:** Re: Q2 AV Distribution Proposal  
**Date:** Monday 30 March 2026, 10:42 AM  

---

> Hi George,
>
> Thanks for sending over the updated proposal — the pricing looks competitive and the team were impressed with the Clevertouch bundle you put together.
>
> A couple of points we'd like to discuss before we sign off:
>
> 1. Can we get an extended warranty option on the 75" units?
> 2. Lead times — we need delivery confirmed before end of April.
> 3. Is there flexibility on the payment terms? We'd prefer 60-day net.
>
> If we can agree those points, I'm confident we can move this forward. Would you be available for a call Thursday afternoon?
>
> Best,  
> James Hargreaves  
> Senior Procurement Manager  
> Avocor Ltd | Bristol, UK  
> +44 117 496 2200

---

Include a subtle "Reply / Forward / ..." action bar at the bottom of the email body (purely decorative, no functionality needed).

---

## Right Pane — Pipedrive Panel

This is the core UX being validated. It has three main states controlled by a **tab/step UI** at the top.

### Header

```
[Pipedrive logo — orange "P" mark]  Pipedrive Connect
─────────────────────────────────────────────────────
Sender: James Hargreaves · Avocor Ltd
📧 j.hargreaves@avocor.com  📞 +44 117 496 2200
```

Show a **"Contact found in Pipedrive"** green badge next to the name.

---

### Tab Bar (3 tabs)

```
[ Log to Deal ]  [ New Deal ]  [ Update Stage ]
```

Default active tab: **Log to Deal**

---

### Tab 1 — Log to Deal

**Purpose:** Attach this email as an activity/note against an existing deal.

UI elements:

1. **Search / Select Deal** — a dropdown/searchable select showing 3 dummy deals associated with Avocor:

   | Deal | Stage | Value |
   |------|-------|-------|
   | Avocor Q2 AV Bundle | Proposal Sent | £48,500 |
   | Avocor EMEA Framework 2026 | Qualified | £120,000 |
   | Avocor Clevertouch 50-unit | New | £22,750 |

   "Avocor Q2 AV Bundle" is pre-selected by default.

2. **Activity Type** — pill toggle:  
   `[📧 Email]  [📞 Call]  [📝 Note]`  
   Default: Email selected.

3. **Note / Summary** — textarea, pre-populated with:  
   *"Email from James Hargreaves re: Q2 AV Distribution Proposal. Key points: warranty on 75" units, April delivery deadline, 60-day payment terms. Call requested for Thursday."*

4. **[ Log Activity ]** primary button (orange).

5. On click: show a success toast / inline confirmation:  
   ✅ *"Activity logged to Avocor Q2 AV Bundle"*

---

### Tab 2 — New Deal

**Purpose:** Create a new Pipedrive deal from this email contact.

UI elements:

1. **Deal Title** — text input, pre-populated:  
   `"Avocor — [deal topic]"` — leave `[deal topic]` as editable placeholder

2. **Pipeline** — select dropdown:
   - `UK Distribution`
   - `EMEA Direct`
   - `Public Sector`

3. **Stage** — select dropdown (dependent on pipeline, show for UK Distribution):
   - `New Lead`
   - `Qualified`
   - `Proposal Sent`
   - `Negotiation`
   - `Closed Won`

4. **Deal Value (£)** — numeric input, placeholder `0.00`

5. **Expected Close Date** — date picker (or text input styled as date)

6. **Owner** — select dropdown:
   - `George Davies` (default)
   - `Sarah Mitchell`
   - `David Okonkwo`

7. **[ Create Deal ]** primary button (orange).

8. On click: show inline success:  
   ✅ *"Deal created — Avocor Q2 Extended Warranty"*

---

### Tab 3 — Update Stage

**Purpose:** Move an existing deal to a new pipeline stage.

UI elements:

1. **Select Deal** — same dropdown as Tab 1. Pre-select "Avocor Q2 AV Bundle".

2. **Current Stage** — read-only badge: `Proposal Sent`

3. **Move to Stage** — visual pipeline stepper (horizontal):

   ```
   [New] → [Qualified] → [Proposal Sent ✓] → [Negotiation] → [Closed Won]
   ```

   Clicking a stage selects it. Stages to the left of current are greyed/completed. Current is highlighted orange. Stages to the right are clickable targets.

4. **Add a note (optional)** — textarea, placeholder: *"Reason for stage change..."*

5. **[ Update Stage ]** primary button.

6. On click: animate the stepper moving forward, then success toast:  
   ✅ *"Avocor Q2 AV Bundle moved to Negotiation"*

---

## Visual Design Direction

- Tone: **Professional / SaaS utility** — clean, purposeful, no decoration for decoration's sake
- Colour palette:
  - Outlook left pane: Microsoft-adjacent — whites, light greys, subtle blue accent (`#0078D4`)
  - Pipedrive right pane: Pipedrive-adjacent — whites with **Pipedrive orange** (`#FF5A28`) as the primary action colour
  - Divider: `1px solid #E5E7EB`
- Typography: `Inter` or `DM Sans` — clean, legible, modern
- Elevation: use subtle `box-shadow` on the right panel cards; flat left pane
- Compact density — this is an add-in panel, not a full page app

---

## State & Interactions

All state managed with `useState`. No routing needed.

| Interaction | Behaviour |
|-------------|-----------|
| Click email in inbox list | Updates selected email, highlights row, updates right pane contact header |
| Switch tabs | Shows correct tab content, resets form state |
| Click pipeline stage in stepper | Highlights selected stage |
| Click primary action button | Sets `submitted = true`, shows success banner for 3 seconds then resets |
| Activity type pill toggle | Updates selected type, changes icon |

---

## File Structure (suggestion for Codex)

```
src/
├── App.jsx                  # Root layout — splits left/right panes
├── data/
│   └── dummyData.js         # All hardcoded emails, deals, contacts, stages
├── components/
│   ├── OutlookPane/
│   │   ├── InboxList.jsx
│   │   └── EmailBody.jsx
│   └── PipedrivePanel/
│       ├── PanelHeader.jsx
│       ├── TabBar.jsx
│       ├── LogToDeal.jsx
│       ├── NewDeal.jsx
│       └── UpdateStage.jsx
└── index.css                # Tailwind base
```

---

## Out of Scope (MVP)

- Real Pipedrive API calls
- Real Outlook Graph API integration
- Authentication / OAuth
- Multi-account support
- Search / filtering of deals beyond dropdown
- Mobile layout
- Error states / validation (basic only)

---

## Definition of Done

- [ ] Layout renders correctly split left/right at ~55/45
- [ ] Inbox list shows all 6 emails, clicking one updates email body
- [ ] Right panel header updates sender details on email selection
- [ ] All 3 tabs render correct forms with dummy data pre-populated
- [ ] Action buttons show success confirmation on click
- [ ] Pipeline stepper in Tab 3 is interactive and animated
- [ ] No console errors
- [ ] Looks credible enough to demo to a stakeholder in under 30 seconds
