import React, { useState } from 'react'
import FounderCard from '../components/FounderCard.jsx'
import { parseCSV, downloadCSV } from '../utils/csvParser.js'

const MOCK_DATA = [
  { id: 0, 'Company Name': 'Arcana Labs', 'Founder Name': 'Jordan Meyers', 'Funding Amount': '$2.4M', 'Stage': 'Pre-Seed', 'Niche': 'AI Infrastructure', 'Website': 'https://arcanalabs.io', 'LinkedIn': 'https://linkedin.com/in/jordanmeyers', 'Email': 'jordan@arcanalabs.io' },
  { id: 1, 'Company Name': 'Flowstate', 'Founder Name': 'Priya Nair', 'Funding Amount': '$800K', 'Stage': 'Pre-Seed', 'Niche': 'Productivity SaaS', 'Website': 'https://flowstate.app', 'LinkedIn': 'https://linkedin.com/in/priyanair', 'Email': 'priya@flowstate.app' },
  { id: 2, 'Company Name': 'Meridian Health', 'Founder Name': 'Sam Okonkwo', 'Funding Amount': '$5.1M', 'Stage': 'Seed', 'Niche': 'HealthTech', 'Website': 'https://meridianhealth.co', 'LinkedIn': 'https://linkedin.com/in/samokonkwo', 'Email': 'sam@meridianhealth.co' },
  { id: 3, 'Company Name': 'DeepRoute', 'Founder Name': 'Alex Chen', 'Funding Amount': '$12M', 'Stage': 'Series A', 'Niche': 'Autonomous Logistics', 'Website': 'https://deeproute.ai', 'LinkedIn': 'https://linkedin.com/in/alexchen', 'Email': 'alex@deeproute.ai' },
  { id: 4, 'Company Name': 'Vaultify', 'Founder Name': 'Lena Kovacs', 'Funding Amount': '$3.8M', 'Stage': 'Seed', 'Niche': 'FinTech / Web3', 'Website': 'https://vaultify.xyz', 'LinkedIn': 'https://linkedin.com/in/lenakovacs', 'Email': 'lena@vaultify.xyz' },
  { id: 5, 'Company Name': 'Bonsai AI', 'Founder Name': 'Marcus Webb', 'Funding Amount': '$1.2M', 'Stage': 'Pre-Seed', 'Niche': 'EdTech', 'Website': 'https://bonsai.ai', 'LinkedIn': 'https://linkedin.com/in/marcuswebb', 'Email': 'marcus@bonsai.ai' },
]

const s = {
  page: {
    minHeight: '100vh',
    background: '#000',
    paddingTop: '80px',
    paddingBottom: '60px',
  },
  container: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '0 24px',
  },
  pageHeader: {
    marginBottom: '32px',
  },
  pageTitle: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    fontSize: '28px',
    fontWeight: '700',
    color: '#fff',
    letterSpacing: '-0.6px',
    marginBottom: '6px',
  },
  pageSubtitle: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '-0.1px',
  },
  toolbar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '28px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  uploadBtn: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#fff',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.14)',
    padding: '9px 18px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    transition: 'all 0.15s ease',
    letterSpacing: '-0.1px',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
  },
  downloadBtn: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#2997ff',
    background: 'rgba(41,151,255,0.1)',
    border: '1px solid rgba(41,151,255,0.2)',
    padding: '9px 18px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    transition: 'all 0.15s ease',
    letterSpacing: '-0.1px',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
  },
  count: {
    marginLeft: 'auto',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.3)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '14px',
  },
  mockLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: 'rgba(255,255,255,0.3)',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '4px 10px',
    borderRadius: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    marginBottom: '20px',
    letterSpacing: '0.2px',
  },
}

export default function Pull({ leads, setLeads }) {
  const isMock = leads === null
  const displayLeads = leads ?? MOCK_DATA
  const fileInputRef = React.useRef()

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const parsed = parseCSV(ev.target.result)
      setLeads(parsed.map((r, i) => ({ ...r, id: i })))
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.pageHeader}>
          <div style={s.pageTitle}>Pull</div>
          <div style={s.pageSubtitle}>Import your Apify CSV export and review leads</div>
        </div>

        <div style={s.toolbar}>
          <button style={s.uploadBtn} onClick={() => fileInputRef.current.click()}>
            ↑ Upload CSV
          </button>
          <input ref={fileInputRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFileUpload} />

          <button style={s.downloadBtn} onClick={() => downloadCSV(displayLeads, 'smartpull-leads.csv')}>
            ↓ Download All
          </button>

          <span style={s.count}>{displayLeads.length} leads</span>
        </div>

        {isMock && (
          <div style={s.mockLabel}>
            ● Mock data — upload a CSV to load real leads
          </div>
        )}

        <div style={s.grid}>
          {displayLeads.map((lead) => (
            <FounderCard key={lead.id} lead={lead} />
          ))}
        </div>
      </div>
    </div>
  )
}
