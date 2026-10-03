import './App.css'
import Countries from './components/countries/Countries'

function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Atlas home">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>atlas<span className="brand-period">.</span></span>
        </a>
        <a className="topbar-link" href="#countries">Explore countries <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> YOUR WINDOW TO THE WORLD</p>
          <h1>Every country has<br />a <span>story.</span></h1>
          <p className="hero-description">A little corner of the internet to wander, learn, and keep track of the places you’ve discovered.</p>
          <a className="hero-cta" href="#countries">Start exploring <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="globe"><span className="globe-longitude" /><span className="globe-latitude" /><span className="globe-land land-one" /><span className="globe-land land-two" /><span className="globe-land land-three" /></div>
          <span className="orbit-label label-top">195 countries</span><span className="orbit-label label-bottom">one curious world</span>
        </div>
        <div className="hero-index">01 <span /> 04</div>
      </section>

      <Countries />

      <footer className="footer">
        <a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true">A</span><span>atlas<span className="brand-period">.</span></span></a>
        <p>Made for the curious. <span>Keep wandering.</span></p>
        <a href="#top" className="back-top">Back to top ↑</a>
      </footer>
    </main>
  )
}

export default App
