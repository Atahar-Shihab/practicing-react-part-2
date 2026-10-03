import { useEffect, useMemo, useState } from 'react'
import Country from '../Country/Country'
import './Countries.css'

const API_URL = 'https://openapi.programming-hero.com/api/all'
const VISITED_KEY = 'atlas-visited-countries'

function unwrap(value, key) {
  let current = value
  while (current && typeof current === 'object' && !Array.isArray(current) && key in current) {
    current = current[key]
  }
  return current
}

function firstText(value) {
  if (Array.isArray(value)) return value[0] ?? ''
  return typeof value === 'string' || typeof value === 'number' ? value : ''
}

function normalizeCountry(item, index) {
  const name = firstText(unwrap(item.name, 'common')) || 'Unknown country'
  const flags = unwrap(item.flags, 'flags') ?? item.flags ?? {}
  const capital = firstText(unwrap(item.capital, 'capital')) || 'No capital listed'
  const code = firstText(unwrap(item.cca3, 'cca3')) || firstText(unwrap(item.ccn3, 'ccn3')) || name
  return {
    id: String(code || index),
    name,
    flag: flags?.png || flags?.svg || item.flag || '',
    flagAlt: flags?.alt || `Flag of ${name}`,
    population: Number(unwrap(item.population, 'population')) || 0,
    region: firstText(unwrap(item.region, 'region')) || 'Other',
    capital,
    area: Number(unwrap(item.area, 'area')) || 0,
  }
}

function readVisited() {
  try {
    const saved = JSON.parse(localStorage.getItem(VISITED_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const numberFormat = new Intl.NumberFormat('en-US')

const Countries = () => {
  const [countries, setCountries] = useState([])
  const [visited, setVisited] = useState(readVisited)
  const [query, setQuery] = useState('')
  const [activeRegion, setActiveRegion] = useState('All')
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    fetch(API_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('The country service is unavailable right now.')
        return response.json()
      })
      .then((payload) => {
        const source = Array.isArray(payload) ? payload : payload.countries ?? payload.data ?? []
        if (!Array.isArray(source)) throw new Error('The country service returned an unexpected response.')
        setCountries(source.map(normalizeCountry).filter((country) => country.name !== 'Unknown country'))
        setStatus('ready')
      })
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') return
        setError(fetchError.message || 'Something went wrong while loading countries.')
        setStatus('error')
      })
    return () => controller.abort()
  }, [attempt])

  useEffect(() => {
    localStorage.setItem(VISITED_KEY, JSON.stringify(visited))
  }, [visited])

  const regions = useMemo(() => ['All', ...new Set(countries.map((country) => country.region).filter(Boolean).sort())], [countries])
  const visibleCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return countries
      .filter((country) => activeRegion === 'All' || country.region === activeRegion)
      .filter((country) => !normalizedQuery || `${country.name} ${country.capital} ${country.region}`.toLowerCase().includes(normalizedQuery))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [countries, query, activeRegion])

  const toggleVisited = (countryId) => {
    setVisited((current) => current.includes(countryId) ? current.filter((id) => id !== countryId) : [...current, countryId])
  }

  return (
    <section className="explorer" id="countries">
      <div className="section-heading">
        <div>
          <p className="eyebrow section-eyebrow"><span className="eyebrow-dot" /> THE WORLD, AT A GLANCE</p>
          <h2>Choose your <span>next stop.</span></h2>
        </div>
        <div className="visited-counter"><span className="counter-icon">✳</span><div><strong>{visited.length}</strong><span>places visited</span></div></div>
      </div>

      <div className="explorer-tools">
        <label className="search-box">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a country or capital..." aria-label="Search countries" />
          <span className="search-shortcut">⌕</span>
        </label>
        <div className="region-filters" role="group" aria-label="Filter by region">
          {regions.map((region) => <button key={region} className={`filter-chip ${activeRegion === region ? 'is-active' : ''}`} onClick={() => setActiveRegion(region)}>{region}</button>)}
        </div>
      </div>

      <div className="results-line">
        <span>{status === 'ready' ? <><strong>{numberFormat.format(visibleCountries.length)}</strong> {visibleCountries.length === 1 ? 'country' : 'countries'} to discover</> : 'WORLD DIRECTORY'}</span>
        <span className="results-note">{activeRegion === 'All' ? 'A world of possibility' : `Exploring ${activeRegion}`}</span>
      </div>

      {status === 'loading' && <div className="state-panel"><span className="loader" /><p>Gathering the world for you…</p></div>}
      {status === 'error' && <div className="state-panel error-panel"><span className="state-symbol">!</span><h3>We lost our way for a moment.</h3><p>{error}</p><button className="retry-button" onClick={() => { setStatus('loading'); setError(''); setAttempt((current) => current + 1) }}>Try again</button></div>}
      {status === 'ready' && visibleCountries.length === 0 && <div className="state-panel empty-panel"><span className="state-symbol">⌕</span><h3>No places found.</h3><p>Try another name or choose a different region.</p></div>}
      {status === 'ready' && visibleCountries.length > 0 && <div className="country-grid">{visibleCountries.map((country) => <Country key={country.id} country={country} visited={visited.includes(country.id)} onToggleVisited={() => toggleVisited(country.id)} />)}</div>}
    </section>
  )
}

export default Countries
