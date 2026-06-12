import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Pull from './pages/Pull.jsx'
import Score from './pages/Score.jsx'
import Email from './pages/Email.jsx'

export default function App() {
  const [leads, setLeads] = useState(null)         // null = show mock
  const [scoredLeads, setScoredLeads] = useState(null) // null = show mock
  const [resendKey, setResendKey] = useState('')

  const handleStatusUpdate = (id, status) => {
    setScoredLeads(prev => {
      if (!prev) return prev
      return prev.map(l => l.id === id ? { ...l, emailStatus: status } : l)
    })
  }

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Pull leads={leads} setLeads={setLeads} />} />
        <Route path="/score" element={<Score scoredLeads={scoredLeads} setScoredLeads={setScoredLeads} />} />
        <Route
          path="/email"
          element={
            <Email
              resendKey={resendKey}
              setResendKey={setResendKey}
              onStatusUpdate={handleStatusUpdate}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
