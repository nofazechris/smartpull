import React from 'react'

const s = {
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '20px 24px',
    transition: 'all 0.2s ease',
    cursor: 'default',
  },
  cardHover: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '14px',
  },
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
  stagePill: {
    fontSize: '11px',
    fontWeight: '600',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    padding: '4px 10px',
    borderRadius: '20px',
    background: 'rgba(41,151,255,0.15)',
    color: '#2997ff',
    border: '1px solid rgba(41,151,255,0.25)',
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  meta: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '14px',
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
  links: {
    display: 'flex',
    gap: '10px',
    paddingTop: '14px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  linkBtn: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#2997ff',
    textDecoration: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    padding: '5px 12px',
    borderRadius: '8px',
    background: 'rgba(41,151,255,0.1)',
    border: '1px solid rgba(41,151,255,0.2)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
  }
}

export default function FounderCard({ lead }) {
  const [hovered, setHovered] = React.useState(false)

  const companyName = lead['Company Name'] || lead['company_name'] || lead['company'] || lead['Name'] || '—'
  const founderName = lead['Founder Name'] || lead['founder_name'] || lead['founder'] || lead['Contact Name'] || '—'
  const funding = lead['Funding Amount'] || lead['funding_amount'] || lead['funding'] || lead['Total Funding'] || '—'
  const stage = lead['Stage'] || lead['stage'] || lead['Funding Stage'] || '—'
  const niche = lead['Niche'] || lead['niche'] || lead['Industry'] || lead['industry'] || '—'
  const website = lead['Website'] || lead['website'] || lead['URL'] || ''
  const linkedin = lead['LinkedIn'] || lead['linkedin'] || lead['LinkedIn URL'] || ''

  return (
    <div
      style={{ ...s.card, ...(hovered ? s.cardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={s.header}>
        <div>
          <div style={s.company}>{companyName}</div>
          <div style={s.founder}>{founderName}</div>
        </div>
        {stage !== '—' && <div style={s.stagePill}>{stage}</div>}
      </div>

      <div style={s.meta}>
        <div style={s.metaItem}>
          <span style={s.metaLabel}>Funding</span>
          <span style={s.metaValue}>{funding}</span>
        </div>
        <div style={s.metaItem}>
          <span style={s.metaLabel}>Industry</span>
          <span style={s.metaValue}>{niche}</span>
        </div>
      </div>

      {(website || linkedin) && (
        <div style={s.links}>
          {website && (
            <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" style={s.linkBtn}>
              ↗ Website
            </a>
          )}
          {linkedin && (
            <a href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`} target="_blank" rel="noopener noreferrer" style={s.linkBtn}>
              in LinkedIn
            </a>
          )}
        </div>
      )}
    </div>
  )
}
