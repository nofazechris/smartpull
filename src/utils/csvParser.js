export function parseCSV(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))

  return lines.slice(1).map((line, idx) => {
    const values = parseCSVLine(line)
    const obj = { id: idx }
    headers.forEach((h, i) => {
      obj[h] = values[i] ? values[i].trim().replace(/^"|"$/g, '') : ''
    })
    return obj
  }).filter(row => Object.values(row).some(v => v !== '' && v !== undefined))
}

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

export function downloadCSV(data, filename = 'smartpull-export.csv') {
  if (!data.length) return
  const headers = Object.keys(data[0]).filter(k => k !== 'id' && k !== 'emailStatus')
  const rows = data.map(row =>
    headers.map(h => `"${(row[h] || '').replace(/"/g, '""')}"`).join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
