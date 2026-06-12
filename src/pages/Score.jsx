import React, { useRef } from 'react'
import ScoreCard from '../components/ScoreCard.jsx'
import { parseCSV } from '../utils/csvParser.js'

const MOCK_SCORED = [
  { id: 0, 'Company Name': 'DeepRoute', 'Founder Name': 'Alex Chen', 'Funding Amount': '$12M', 'Stage': 'Series A', 'Niche': 'Autonomous Logistics', 'Email': 'alex@deeproute.ai', 'Score': '9' },
  { id: 1, 'Company Name': 'Meridian Health', 'Founder Name': 'Sam Okonkwo', 'Funding Amount': '$5.1M', 'Stage': 'Seed', 'Niche': 'HealthTech', 'Email': 'sam@meridianhealth.co', 'Score': '8' },
  { id: 2, 'Company Name': 'Vaultify', 'Founder Name': 'Lena Kovacs', 'Funding Amount': '$3.8M', 'Stage': 'Seed', 'Niche': 'FinTech / Web3', 'Email': 'lena@vaultify.xyz', 'Score': '7' },
  { id: 3, 'Company Name': 'Arcana Labs', 'Founder Name': 'Jordan Meyers', 'Funding Amount': '$2.4M', 'Stage': 'Pre-Seed', 'Niche': 'AI Infrastructure', 'Email': 'jordan@arcanalabs.io', 'Score': '6' },
  { id: 4, 'Company Name': 'Flowstate', 'Founder Name': 'Priya Nair', 'Funding Amount': '$800K', 'Stage': 'Pre-Seed', 'Niche': 'Productivity SaaS', 'Email': 'priya@flowstate.app', 'Score': '4' },
  { id: 5, 'Company Name': 'Bonsai AI', 'Founder Name': 'Marcus Webb', 'Funding Amount': '$1.2M', 'Stage': 'Pre-Seed', 'Niche': 'EdTech', 'Email': 'marcus@bonsai.ai', 'Score': '3' },
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
  count: {
    marginLeft: 'auto',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.3)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  },
  legend: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.4)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  },
  legendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
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
  infoBox: {
    background: 'rgba(41,151,255,0.08)',
    border: '1px solid rgba(41,151,255,0.15)',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
    lineHeight: '1.6',
  },
  infoTitle: {
    color: '#2997ff',
    fontWeight: '600',
    marginBottom: '6px',
    fontSize: '13px',
  },
  code: {
    background: 'rgba(255,255,255,0.08)',
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: 'SF Mono, Menlo, Monaco, monospace',
    fontSize: '12px',
    color: '#fff',
  },
}

export default function Score({ scoredLeads, setScoredLeads }) {
  const isMock = scoredLeads === null
  const displayLeads = scoredLeads ?? MOCK_SCORED
  const fileInputRef = useRef()

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const parsed = parseCSV(ev.target.result)
      const sorted = parsed
        .map((r, i) => ({ ...r, id: i }))
        .sort((a, b) => Number(b['Score'] || b['score'] || 0) - Number(a['Score'] || a['score'] || 0))
      setScoredLeads(sorted)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const updateStatus = (id, status) => {
    const update = (leads) => leads.map(l => l.id === id ? { ...l, emailStatus: status } : l)
    if (isMock) {
      // If mock, can't update — in practice Score page with real data handles this
    } else {
      setScoredLeads(prev => update(prev))
    }
  }

  return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.pageHeader}>
          <div style={s.pageTitle}>Score</div>
          <div style={s.pageSubtitle}>Upload your Claude-scored CSV — leads ranked top to bottom</div>
        </div>

        <div style={s.infoBox}>
          <div style={s.infoTitle}>How to score leads</div>
          Export your Pull CSV → run it through Claude with a scoring prompt → add a <span style={s.code}>Score</span> column (1–10) → re-upload here. Cards auto-rank by score.
        </div>

        <div style={s.toolbar}>
          <button style={s.uploadBtn} onClick={() => fileInputRef.current.click()}>
            ↑ Upload Scored CSV
          </button>
          <input ref={fileInputRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFileUpload} />
          <div style={s.legend}>
            <div style={s.legendItem}><div style={{ ...s.legendDot, background: '#34c759' }} /> 8–10 High</div>
            <div style={s.legendItem}><div style={{ ...s.legendDot, background: '#ff9f0a' }} /> 5–7 Mid</div>
            <div style={s.legendItem}><div style={{ ...s.legendDot, background: '#ff453a' }} /> 1–4 Low</div>
          </div>
          <span style={s.count}>{displayLeads.length} leads</span>
        </div>

        {isMock && (
          <div style={s.mockLabel}>
            ● Mock data — upload a scored CSV to load real results
          </div>
        )}

        <div style={s.grid}>
          {displayLeads.map((lead) => (
            <ScoreCard key={lead.id} lead={lead} onStatusChange={updateStatus} />
          ))}
        </div>
      </div>
    </div>
  )
}
