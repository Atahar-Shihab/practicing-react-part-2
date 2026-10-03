import './Country.css'

const format = new Intl.NumberFormat('en-US')

const Country = ({ country, visited, onToggleVisited }) => (
  <article className={`country-card ${visited ? 'is-visited' : ''}`}>
    <div className="country-card-top">
      <span className="country-region">{country.region}</span>
      <button className={`visit-button ${visited ? 'is-visited' : ''}`} onClick={onToggleVisited} aria-pressed={visited} aria-label={`${visited ? 'Remove' : 'Mark'} ${country.name} ${visited ? 'from' : 'as'} visited`}>
        <span aria-hidden="true">{visited ? '✓' : '+'}</span>{visited ? 'Visited' : 'Save place'}
      </button>
    </div>
    <div className="flag-wrap">
      {country.flag ? <img src={country.flag} alt={country.flagAlt} loading="lazy" /> : <span className="flag-fallback" aria-label="Flag unavailable">✳</span>}
    </div>
    <div className="country-name-row">
      <div><h3>{country.name}</h3><p className="country-capital">{country.capital}</p></div>
      <span className="country-arrow" aria-hidden="true">↗</span>
    </div>
    <div className="country-facts">
      <div><span>POPULATION</span><strong>{format.format(country.population)}</strong></div>
      <div><span>AREA</span><strong>{format.format(country.area)} <small>km²</small></strong></div>
    </div>
  </article>
)

export default Country
