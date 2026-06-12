import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const s = {
  page: {
    minHeight: '100vh',
    background: '#000',
    paddingTop: '80px',
    paddingBottom: '60px',
  },
  container: {
    maxWidth: '680px',
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
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '18px',
    padding: '28px',
    marginBottom: '16px',
  },
  label: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    fontSize: '11px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    marginBottom: '8px',
    display: 'block',
  },
  input: {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '11px 14px',
    fontSize: '14px',
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    outline: 'none',
    transition: 'border-color 0.15s ease',
    marginBottom: '18px',
    letterSpacing: '-0.1px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '14px',
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    outline: 'none',
    transition: 'border-color 0.15s ease',
    resize: 'vertical',
    minHeight: '220px',
    lineHeight: '1.6',
    letterSpacing: '-0.1px',
    boxSizing: 'border-box',
  },
  apiRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-end',
    marginBottom: '0',
  },
  apiInputWrap: { flex: 1 },
  sendBtn: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    background: '#2997ff',
    border: 'none',
    padding: '11px 28px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    transition: 'all 0.15s ease',
    letterSpacing: '-0.2px',
    whiteSpace: 'nowrap',
  },
  successBox: {
    background: 'rgba(52,199,89,0.08)',
    border: '1px solid rgba(52,199,89,0.2)',
    borderRadius: '12px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '16px',
  },
  successText: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    fontSize: '14px',
    color: '#34c759',
  },
  errorBox: {
    background: 'rgba(255,69,58,0.08)',
    border: '1px solid rgba(255,69,58,0.2)',
    borderRadius: '12px',
    padding: '16px 20px',
    marginTop: '16px',
  },
  errorText: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    fontSize: '13px',
    color: '#ff453a',
    lineHeight: '1.5',
  },
  divider: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    margin: '20px 0',
  },
  senderCard: {
    background: 'rgba(41,151,255,0.06)',
    border: '1px solid rgba(41,151,255,0.14)',
    borderRadius: '12px',
    padding: '14px 18px',
    marginBottom: '16px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  senderInfo: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  },
  senderLabel: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    fontWeight: '600',
  },
  senderName: {
    fontSize: '14px',
    color: '#fff',
    fontWeight: '500',
    marginTop: '2px',
  },
  backBtn: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.4)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    padding: '0',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    transition: 'color 0.15s',
  },
  statusSection: {
    marginTop: '16px',
  },
  statusTitle: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    fontSize: '12px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  statusBtns: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  statusBtn: (active, color) => ({
    fontSize: '12px',
    fontWeight: '500',
    padding: '6px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    transition: 'all 0.15s ease',
    border: `1px solid ${active ? color.border : 'rgba(255,255,255,0.1)'}`,
    background: active ? color.bg : 'rgba(255,255,255,0.04)',
    color: active ? color.text : 'rgba(255,255,255,0.4)',
  }),
}

const STATUS_COLORS = {
  'Sent':        { bg: 'rgba(41,151,255,0.15)',  text: '#2997ff', border: 'rgba(41,151,255,0.3)' },
  'Replied':     { bg: 'rgba(52,199,89,0.15)',   text: '#34c759', border: 'rgba(52,199,89,0.3)' },
  'No Response': { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.15)' },
}

function buildEmailBody(lead) {
  const company = lead?.companyName || '[Company Name]'
  const founder = lead?.founderName || '[Founder Name]'
  return `Hi ${founder},

Saw ${company} just raised — congrats on the round.

Most founders at your stage are under pressure to ship fast without blowing the budget on a full in-house team.

That's exactly what we help with at Byte3 — we build and scale software products for funded startups, end to end.

Worth a 20 minute call to see if it makes sense?

[Your Name]
Byte3`
}

export default function Email({ resendKey, setResendKey, onStatusUpdate }) {
  const location = useLocation()
  const navigate = useNavigate()
  const lead = location.state?.lead

  const [to, setTo] = useState(lead?.email || '')
  const [subject, setSubject] = useState(`Quick question — ${lead?.companyName || '[Company Name]'}`)
  const [body, setBody] = useState(buildEmailBody(lead))
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)
  const [localStatus, setLocalStatus] = useState(lead?.emailStatus || null)
  const [apiKeyVisible, setApiKeyVisible] = useState(false)

  useEffect(() => {
    if (lead) {
      setTo(lead.email || '')
      setSubject(`Quick question — ${lead.companyName || '[Company Name]'}`)
      setBody(buildEmailBody(lead))
    }
  }, [lead?.companyName])

  const handleSend = async () => {
    if (!resendKey) { setResult({ error: 'Enter your Resend API key above.' }); return }
    if (!to) { setResult({ error: 'Recipient email is required.' }); return }
    setSending(true)
    setResult(null)
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: [to],
          subject,
          text: body,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setResult({ success: true })
        setLocalStatus('Sent')
        if (onStatusUpdate && lead?.id !== undefined) {
          onStatusUpdate(lead.id, 'Sent')
        }
      } else {
        setResult({ error: data.message || 'Send failed. Check your API key and domain setup.' })
      }
    } catch (err) {
      setResult({ error: `Network error: ${err.message}` })
    }
    setSending(false)
  }

  const handleStatusChange = (status) => {
    setLocalStatus(status)
    if (onStatusUpdate && lead?.id !== undefined) {
      onStatusUpdate(lead.id, status)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.pageHeader}>
          <button style={s.backBtn} onClick={() => navigate('/score')}>
            ← Back to Score
          </button>
          <div style={s.pageTitle}>Email</div>
          <div style={s.pageSubtitle}>Compose and send directly to the founder</div>
        </div>

        {lead && (
          <div style={s.senderCard}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(41,151,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
              ✉
            </div>
            <div style={s.senderInfo}>
              <div style={s.senderLabel}>Sending to</div>
              <div style={s.senderName}>{lead.founderName} · {lead.companyName}</div>
            </div>
          </div>
        )}

        {/* API Key */}
        <div style={s.card}>
          <label style={s.label}>Resend API Key</label>
          <div style={s.apiRow}>
            <div style={s.apiInputWrap}>
              <input
                style={{ ...s.input, marginBottom: 0, letterSpacing: resendKey && !apiKeyVisible ? '3px' : '-0.1px' }}
                type={apiKeyVisible ? 'text' : 'password'}
                placeholder="re_xxxxxxxxxxxx"
                value={resendKey}
                onChange={e => setResendKey(e.target.value)}
              />
            </div>
            <button
              style={{ ...s.sendBtn, background: 'rgba(255,255,255,0.08)', fontSize: '12px', padding: '11px 16px' }}
              onClick={() => setApiKeyVisible(!apiKeyVisible)}
            >
              {apiKeyVisible ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Email Compose */}
        <div style={s.card}>
          <label style={s.label}>To</label>
          <input style={s.input} type="email" value={to} onChange={e => setTo(e.target.value)} placeholder="founder@company.com" />

          <label style={s.label}>Subject</label>
          <input style={s.input} type="text" value={subject} onChange={e => setSubject(e.target.value)} />

          <label style={s.label}>Message</label>
          <textarea style={s.textarea} value={body} onChange={e => setBody(e.target.value)} />

          <div style={s.divider} />

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              style={{ ...s.sendBtn, opacity: sending ? 0.6 : 1 }}
              onClick={handleSend}
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Email →'}
            </button>
          </div>

          {result?.success && (
            <div style={s.successBox}>
              <span style={{ fontSize: '20px' }}>✓</span>
              <span style={s.successText}>Email sent successfully via Resend.</span>
            </div>
          )}
          {result?.error && (
            <div style={s.errorBox}>
              <div style={s.errorText}>⚠ {result.error}</div>
            </div>
          )}
        </div>

        {/* Manual Status */}
        {lead && (
          <div style={{ ...s.card, ...s.statusSection }}>
            <div style={s.statusTitle}>Update Status</div>
            <div style={s.statusBtns}>
              {['Sent', 'Replied', 'No Response'].map(st => (
                <button
                  key={st}
                  style={s.statusBtn(localStatus === st, STATUS_COLORS[st])}
                  onClick={() => handleStatusChange(st)}
                >
                  {st === 'Sent' ? '✉ ' : st === 'Replied' ? '✓ ' : '○ '}{st}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
