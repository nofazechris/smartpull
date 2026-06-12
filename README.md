# SmartPull

A lightweight BD tool built for Byte3's outbound pipeline. Pull leads from Apify, score them with Claude, and send cold emails — all in one place.

---

## What it does

Most outbound tools are either too bloated or too basic. SmartPull sits in the middle — it's three pages, does one job well, and gets out of your way.

- **Pull** — upload a CSV from Apify and see your leads laid out cleanly as cards
- **Score** — upload a Claude-scored version of that CSV and the app ranks them top to bottom automatically, colour coded by score
- **Email** — click send on any card, the cold email template pre-fills with the founder's details, hit send via Resend

No backend. No database. No login. Runs entirely in the browser.

---

## Setup

**Requirements**
- Node.js 18+
- A Resend account (free tier works fine) for sending emails
- An Apify account for pulling lead data

**Install and run**

```bash
unzip smartpull.zip
cd smartpull
npm install
npm run dev
```

Open `http://localhost:5173` and you're in.

---

## How to use it

### 1. Get your leads (Apify)

Run one of these actors on Apify depending on your target:

| Target | Actor |
|---|---|
| Recently funded startups (US) | `parseforge/y-combinator-scraper` |
| Global funding news | `complex_intricate_networks/fundraising-and-startup-funding-scraper` |
| Local businesses (clinics, ecom, hospitality) | `apify/google-maps-scraper` with `scrapeContacts: true` |

Export the results as CSV.

### 2. Upload to Pull page

Drop your CSV on the Pull page. The app reads whatever column headers are in the file — Company Name, Founder Name, Funding Amount, Stage, Industry, Website, LinkedIn. Mock data loads by default so you can see how it looks before uploading anything.

Hit **Download All** to save the full list.

### 3. Score with Claude

Take your CSV, open Claude, and paste this prompt:

> *Score each startup 1–10 for how likely they are to need an external software development agency. Score higher for: recently funded (last 60 days), Seed to Series A, small team under 20 people, technical product, US/UK/Dubai based. Return the same CSV with a Score column added. No explanation, just the CSV.*

Paste your CSV data after the prompt. Claude returns a scored version — save that as a new CSV.

### 4. Upload to Score page

Upload the scored CSV. Cards auto-sort highest to lowest. Green badges are 8–10, amber is 5–7, red is 1–4.

### 5. Send emails

Click **Send Email** on any card. The Email page opens with the founder's details and this template pre-loaded:

> Hi [Founder Name],
>
> Saw [Company Name] just raised — congrats on the round.
>
> Most founders at your stage are under pressure to ship fast without blowing the budget on a full in-house team.
>
> That's exactly what we help with at Byte3 — we build and scale software products for funded startups, end to end.
>
> Worth a 20 minute call to see if it makes sense?

Edit it however you want, paste your Resend API key at the top, and send.

After sending, mark each lead as **Sent**, **Replied**, or **No Response** — the status shows on the Score card.

---

## Features

- Apple dark mode UI — black background, blue accents, SF Pro font stack
- CSV upload on both Pull and Score pages
- Auto-ranking by score on upload
- Colour coded score badges (green / amber / red)
- Pre-filled cold email template with dynamic founder and company name
- Resend API integration — sends directly from the app
- Lead status tracking per card (Sent / Replied / No Response)
- Download all leads as CSV from the Pull page
- Mock data preloaded on both pages so the app works before any CSV is uploaded
- No backend, no database, no auth — everything lives in browser state

---

## Tech stack

- React 18
- React Router v6
- Vite
- Resend API (email sending)
- Apify (lead sourcing, external)

---

## Notes

Resend requires a verified sending domain in production. During development, `onboarding@resend.dev` works as the from address for testing. When you go live, swap it for your Byte3 domain in `Email.jsx`.

Status (Sent / Replied / No Response) persists in app state for the session only — it resets on page refresh. If you need it to persist long term, the next step would be adding Supabase as a lightweight backend.
