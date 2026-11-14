const modules = [
  {
    number: "01",
    name: "Spirit Forge",
    description: "Imagine, customize, and evolve original elemental spirits.",
    symbol: "✳"
  },
  {
    number: "02",
    name: "Power Academy",
    description: "Learn new abilities, take on challenges, and grow your power.",
    symbol: "✦"
  },
  {
    number: "03",
    name: "Weather Dominion",
    description: "Shape atmospheric worlds and explore elemental weather.",
    symbol: "☼"
  },
  {
    number: "04",
    name: "Fusion Lab",
    description: "Experiment with combinations, transformations, and new forms.",
    symbol: "⟡"
  },
  {
    number: "05",
    name: "Creator Market",
    description: "A home for original digital creations and creator offerings.",
    symbol: "◇"
  },
  {
    number: "06",
    name: "Game Bridge",
    description: "Connect player profiles and compatible interactive worlds.",
    symbol: "↗"
  }
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Mythic Studio home">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>MYTHIC <span className="wordmark-light">STUDIO</span></span>
        </a>
        <nav className="navigation" aria-label="Main navigation">
          <a href="#vision">The vision</a>
          <a href="#modules">Explore modules</a>
          <a className="nav-cta" href="#modules">Enter the realm <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow"><span className="eyebrow-line" /> AN ORIGINAL MODULAR EXPERIENCE</p>
          <h1>Where the elements<br />become <span>your story.</span></h1>
          <p className="hero-copy">
            A universe of spirit creation, elemental discovery, and limitless imagination is taking shape.
          </p>
          <a className="primary-cta" href="#modules">Discover the engine <span aria-hidden="true">↓</span></a>
        </div>
        <div className="orbit orbit-outer" aria-hidden="true"><span>✦</span></div>
        <div className="orbit orbit-inner" aria-hidden="true"><span>✳</span></div>
        <div className="hero-caption"><span>ELEMENTS IN MOTION</span><span>✧ &nbsp; 01 — 06</span></div>
      </section>

      <section className="intro" id="vision">
        <p className="section-label">A NEW KIND OF UNIVERSE</p>
        <div className="intro-copy">
          <h2>One world.<br /><span>Many ways to create.</span></h2>
          <p>
            Mythic Studio is an evolving platform for creators, players, and communities. At its heart, the Astral Elements Engine brings connected experiences together—each one built to spark discovery and make room for your imagination.
          </p>
        </div>
      </section>

      <section className="modules-section" id="modules">
        <div className="modules-heading">
          <div>
            <p className="section-label">THE ASTRAL ELEMENTS ENGINE</p>
            <h2>Six paths. <span>One adventure.</span></h2>
          </div>
          <p className="modules-note">Explore the foundations of a connected creative universe.</p>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <article className="module-card" key={module.number}>
              <div className="card-topline"><span>{module.number} / 06</span><span className="module-symbol" aria-hidden="true">{module.symbol}</span></div>
              <h3>{module.name}</h3>
              <p>{module.description}</p>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="closing" aria-label="Closing statement">
        <p className="section-label">THE FIRST SPARK IS YOURS</p>
        <h2>Create. Evolve.<br /><span>Master the elements.</span></h2>
        <a className="primary-cta" href="#home">Back to the beginning <span aria-hidden="true">↑</span></a>
      </section>

      <footer className="site-footer">
        <a className="wordmark" href="#home"><span className="brand-mark" aria-hidden="true">✳</span><span>MYTHIC <span className="wordmark-light">STUDIO</span></span></a>
        <p>An original universe in the making.</p>
        <span>© {new Date().getFullYear()} Mythic Studio</span>
      </footer>
    </main>
  );
}
