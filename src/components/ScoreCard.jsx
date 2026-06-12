import React from 'react'
import { useNavigate } from 'react-router-dom'

const s = {
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '20px 24px',
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '3px',
    borderRadius: '16px 0 0 16px',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '14px',
  },
  left: { flex: 1 },
  company: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    letterSpacing: '-0.3px',
  },
  founder: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
    marginTop: '3px',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
  },
  scoreBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '700',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    letterSpacing: '-0.2px',
  },
  meta: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  metaItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  metaLabel: {
    fontSize: '10px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  },
  metaValue: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.75)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '14px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  statusBadge: {
    fontSize: '12px',
    fontWeight: '500',
    padding: '4px 10px',
    borderRadius: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  },
  emailBtn: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#fff',
    background: '#2997ff',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    transition: 'all 0.15s ease',
    letterSpacing: '-0.1px',
  },
}

const scoreColors = {
  high: { bg: 'rgba(52,199,89,0.12)', color: '#34c759', border: 'rgba(52,199,89,0.25)', bar: '#34c759' },
  mid:  { bg: 'rgba(255,159,10,0.12)', color: '#ff9f0a', border: 'rgba(255,159,10,0.25)', bar: '#ff9f0a' },
  low:  { bg: 'rgba(255,69,58,0.12)',  color: '#ff453a', border: 'rgba(255,69,58,0.25)',  bar: '#ff453a' },
}

const statusStyles = {
  'Sent':        { bg: 'rgba(41,151,255,0.12)',  color: '#2997ff',  border: 'rgba(41,151,255,0.25)' },
  'Replied':     { bg: 'rgba(52,199,89,0.12)',   color: '#34c759',  border: 'rgba(52,199,89,0.25)' },
  'No Response': { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: 'rgba(255,255,255,0.12)' },
}

function getScoreTier(score) {
  const n = Number(score)
  if (n >= 8) return 'high'
  if (n >= 5) return 'mid'
  return 'low'
}

export default function ScoreCard({ lead, onStatusChange }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = React.useState(false)

  const score = lead['Score'] || lead['score'] || '0'
  const tier = getScoreTier(score)
  const colors = scoreColors[tier]

  const companyName = lead['Company Name'] || lead['company_name'] || lead['company'] || lead['Name'] || '—'
  const founderName = lead['Founder Name'] || lead['founder_name'] || lead['founder'] || lead['Contact Name'] || '—'
  const funding = lead['Funding Amount'] || lead['funding_amount'] || lead['funding'] || lead['Total Funding'] || '—'
  const stage = lead['Stage'] || lead['stage'] || lead['Funding Stage'] || '—'
  const niche = lead['Niche'] || lead['niche'] || lead['Industry'] || lead['industry'] || '—'
  const email = lead['Email'] || lead['email'] || lead['Founder Email'] || ''
  const status = lead.emailStatus

  const handleSendEmail = () => {
    navigate('/email', {
      state: { lead: { ...lead, companyName, founderName, email, stage, niche, funding } }
    })
  }

  return (
    <div
      style={{ ...s.card, ...(hovered ? { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' } : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ ...s.accentBar, background: colors.bar }} />

      <div style={s.top}>
        <div style={s.left}>
          <div style={s.company}>{companyName}</div>
          <div style={s.founder}>{founderName}</div>
        </div>
        <div style={s.right}>
          <div style={{
            ...s.scoreBadge,
            background: colors.bg,
            color: colors.color,
            border: `1px solid ${colors.border}`,
          }}>
            <span style={{ fontSize: '9px', opacity: 0.7, fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Score</span>
            {score}/10
          </div>
        </div>
      </div>

      <div style={s.meta}>
        <div style={s.metaItem}>
          <span style={s.metaLabel}>Funding</span>
          <span style={s.metaValue}>{funding}</span>
        </div>
        <div style={s.metaItem}>
          <span style={s.metaLabel}>Stage</span>
          <span style={s.metaValue}>{stage}</span>
        </div>
        <div style={s.metaItem}>
          <span style={s.metaLabel}>Industry</span>
          <span style={s.metaValue}>{niche}</span>
        </div>
      </div>

      <div style={s.footer}>
        {status ? (
          <div style={{
            ...s.statusBadge,
            background: statusStyles[status]?.bg || 'rgba(255,255,255,0.06)',
            color: statusStyles[status]?.color || 'rgba(255,255,255,0.4)',
            border: `1px solid ${statusStyles[status]?.border || 'rgba(255,255,255,0.1)'}`,
          }}>
            {status === 'Sent' ? '✉ ' : status === 'Replied' ? '✓ ' : '○ '}{status}
          </div>
        ) : (
          <div />
        )}
        <button
          style={{ ...s.emailBtn, ...(hovered ? { background: '#0a84ff' } : {}) }}
          onClick={handleSendEmail}
        >
          Send Email →
        </button>
      </div>
    </div>
  )
}
