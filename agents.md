# Codex build brief

## Important note
The current OpenAI repo-level instruction file that Codex reads automatically is `AGENTS.md`, not `codex.md`. Save this file as `AGENTS.md` in the repo if you want Codex to reliably pick it up, or keep both files with the same content. Codex reads `AGENTS.md` files before starting work in a project. citeturn983870search1turn983870search18

## Project goal
Build a React frontend-only MVP mockup that demonstrates an Outlook-style workflow connected to Pipedrive actions.

This is **not** a working integration. It is a clickable prototype to prove the product idea.

The experience should show:
- Outlook-style dummy email data on the left
- A right-side Pipedrive panel or popup for CRM actions
- Ability to simulate:
  - adding an email to an existing deal
  - creating a new deal from an email
  - updating a deal stage
  - viewing lightweight deal context tied to the selected email

## Product summary
The mockup should answer this question clearly:

**“What would an Outlook add-in look like if a user could manage Pipedrive actions directly against an email?”**

The UI should feel like a realistic business MVP that could be shown internally to stakeholders.

## Build outcome
Create a **single polished React app** with hardcoded data and strong UX.

Preferred stack:
- React
- TypeScript
- Tailwind CSS
- Local component state only
- No backend
- No authentication
- No real API calls

Use clean, enterprise-style UI patterns. Desktop-first is fine.

## Core experience
### Layout
Build a two-part interface:

#### Left side: Outlook-style mail experience
Include:
- simple top bar/header
- inbox list with dummy emails
- selected email preview/content area
- sender, subject, received time, message body, tags or status markers
- optional folders/sidebar if it improves the mockup

The Outlook section should look familiar, but do not obsess over pixel-perfect cloning.

#### Right side: Pipedrive action panel
This should open as a right-side drawer, fixed side panel, or modal anchored on the right.

Include sections for:
1. **Link to existing deal**
2. **Create new deal**
3. **Update existing deal stage**
4. **Mini deal summary / CRM context**

This side should clearly feel like the CRM action area for the selected email.

## User flows to simulate
Implement the following dummy flows:

### 1. Attach selected email to an existing deal
User can:
- select an email on the left
- open the Pipedrive panel
- search or choose an existing deal
- click an action such as `Add to deal`
- see a visible success state or toast
- see the deal now shown as linked to that email

### 2. Create a new deal from the selected email
User can:
- create a deal using prefilled values from the email
- edit fields like contact, organisation, deal title, value, stage
- submit locally
- see the new deal appear in the mock deal list
- see the selected email linked to that newly created deal

### 3. Update a deal stage
User can:
- choose an already linked deal or any deal
- change the deal stage from a dropdown, pills, or stepper
- immediately see that change reflected in the UI

### 4. Surface CRM context for the selected email
When an email is selected, show useful CRM-style information such as:
- matching contact name
- organisation
- current open deals
- stage
- estimated value
- last activity

## Dummy data requirements
Use hardcoded mock data only.

Create realistic datasets for:
- emails
- contacts
- organisations
- deals
- pipeline stages
- activities or timeline events

Use plausible B2B sales examples.

Example themes that fit well:
- software demo request
- pricing follow-up
- contract review
- renewal conversation
- implementation check-in
- quote approval

## Suggested dummy structures
You do not need to match this exactly, but stay close.

```ts
export type EmailItem = {
  id: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: string;
  linkedDealId?: string;
  tags?: string[];
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  organisationId: string;
  role?: string;
};

export type Organisation = {
  id: string;
  name: string;
  industry?: string;
};

export type DealStage =
  | 'Lead In'
  | 'Contact Made'
  | 'Demo Scheduled'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export type Deal = {
  id: string;
  title: string;
  contactId: string;
  organisationId: string;
  value: number;
  stage: DealStage;
  lastActivity: string;
  emailIds: string[];
};
```

## UX expectations
The UI should be polished enough for internal demo use.

Requirements:
- modern SaaS styling
- clear hierarchy
- strong spacing
- professional typography
- obvious selected states
- subtle badges, chips, and status indicators
- success feedback for actions
- empty states where useful

Recommended interactions:
- searchable existing deal dropdown or searchable list
- stage selector with instant visual update
- prefilled create-deal form from selected email
- activity feed or linked-record list in the CRM panel
- toast notifications for successful mock actions

## Suggested screens/states
At minimum, support:
- default loaded inbox with one selected email
- email with no linked deal yet
- email already linked to a deal
- creating a new deal
- editing a stage
- successful action confirmation

## Component suggestions
Break the UI into sensible components such as:
- `AppShell`
- `OutlookSidebar`
- `InboxList`
- `EmailPreview`
- `PipedrivePanel`
- `DealSearch`
- `CreateDealForm`
- `DealStageEditor`
- `DealSummaryCard`
- `ActivityTimeline`
- `Toast`

## Behaviour rules
- All interactions must work from local state only
- No network requests
- No mocked backend server
- No real Outlook SDK
- No real Pipedrive SDK
- No environment variables needed
- No authentication flow

Everything should be self-contained and runnable locally.

## Visual direction
Aim for a believable Outlook add-in / CRM assistant feel.

Suggested visual approach:
- neutral business palette
- white and light gray surfaces
- restrained accent colour for active states
- rounded cards and panels
- minimal clutter

Avoid:
- overdesigned marketing-style visuals
- dark mode by default
- too many animations
- fake enterprise complexity

## Functional proof points
The MVP should prove these points clearly:
1. An email can be selected from an Outlook-like inbox.
2. A user can connect that email to a Pipedrive deal.
3. A user can create a new deal from email context.
4. A user can update stage without leaving the email workflow.
5. The UI looks convincing enough for stakeholder review.

## Non-goals
Do **not** build:
- real Outlook add-in manifest setup
- real Pipedrive integration
- backend services
- auth
- database
- production-ready architecture beyond sensible frontend structure

## Delivery expectations
Please generate:
- a working React frontend
- well-structured components
- a local mock data file
- clean TypeScript types
- a polished layout suitable for a demo

If useful, create:
- a small seeded data module
- reusable utility functions
- a lightweight design token or constants file

## Implementation preference
If a decision is needed, prefer:
- clarity over cleverness
- believable demo UX over technical completeness
- fewer screens with stronger polish
- local state patterns that are easy to understand

## Acceptance criteria
The build is successful if:
- it runs locally without external services
- it shows Outlook-style dummy email content on the left
- it shows a right-side Pipedrive interaction area
- a selected email can be attached to an existing deal
- a new deal can be created from the selected email
- a deal stage can be changed visibly
- the whole experience feels like a credible MVP

## Nice-to-have extras
Only include these if they improve the mockup without slowing the build too much:
- contact match confidence indicator
- suggested deal match based on sender domain
- recent activity feed
- pipeline stage chips with colour coding
- “Open in Pipedrive” fake link/button
- small stats row such as open deals, deal value, last touch

## Final instruction
Do not overcomplicate this.
Build the most convincing **frontend-only product mockup** possible for an internal MVP demo.

The story should be obvious within 10 seconds of viewing it:
**email on the left, Pipedrive actions on the right, all powered by dummy data, all clickable.**
