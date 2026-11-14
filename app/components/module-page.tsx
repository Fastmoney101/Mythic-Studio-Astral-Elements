import Link from "next/link";
import { notFound } from "next/navigation";

export const modules = {
  "spirit-forge": {
    number: "01",
    name: "Spirit Forge",
    symbol: "✳",
    description: "Imagine, customize, and evolve original elemental spirits.",
    intro: "Create an original elemental companion. Develop its identity, appearance, elemental affinity, and story.",
    features: [
      "Design original elemental spirits",
      "Choose elemental affinities and traits",
      "Develop spirit profiles and origin stories",
      "Prepare spirits for future saving and evolution"
    ]
  },
  "power-academy": {
    number: "02",
    name: "Power Academy",
    symbol: "✦",
    description: "Learn new abilities, take on challenges, and grow your power.",
    intro: "A learning path for elemental mastery, guided challenges, skill development, and progression.",
    features: [
      "Explore elemental disciplines",
      "Complete learning challenges",
      "Track experience and progression",
      "Work toward unlocking new abilities"
    ]
  },
  "weather-dominion": {
    number: "03",
    name: "Weather Dominion",
    symbol: "☼",
    description: "Shape atmospheric worlds and explore elemental weather.",
    intro: "Explore weather patterns and experiment with atmospheric conditions and elemental effects.",
    features: [
      "Explore weather scenarios",
      "Combine atmospheric conditions",
      "Experiment with elemental effects",
      "Develop immersive environment concepts"
    ]
  },
  "fusion-lab": {
    number: "04",
    name: "Fusion Lab",
    symbol: "⟡",
    description: "Experiment with combinations, transformations, and new forms.",
    intro: "Discover what happens when elemental forces meet through combinations and transformations.",
    features: [
      "Explore elemental combinations",
      "Prototype fusion concepts",
      "Compare transformation outcomes",
      "Develop new forms and their lore"
    ]
  },
  "creator-market": {
    number: "05",
    name: "Creator Market",
    symbol: "◇",
    description: "A home for original digital creations and creator offerings.",
    intro: "A future marketplace for original community creations, creator profiles, and digital products.",
    features: [
      "Showcase original creations",
      "Discover community-made work",
      "Prepare creator profiles and listings",
      "Support future digital product experiences"
    ]
  },
  "game-bridge": {
    number: "06",
    name: "Game Bridge",
    symbol: "↗",
    description: "Connect player profiles and compatible interactive worlds.",
    intro: "A connection point between the Astral Elements Engine and future interactive experiences.",
    features: [
      "Explore connected game concepts",
      "Plan player profile integration",
      "Discover compatible interactive worlds",
      "Carry elemental identity into future experiences"
    ]
  }
} as const;

export default async function ModulePage({
  params
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const item = modules[module as keyof typeof modules];

  if (!item) notFound();

  return (
    <main className="module-page">
      <header className="site-header module-header">
        <Link className="wordmark" href="/">
          <span className="brand-mark">✳</span>
          <span>MYTHIC <span className="wordmark-light">STUDIO</span></span>
        </Link>

        <nav className="navigation">
          <Link href="/#modules">All modules</Link>
          <Link className="nav-cta" href="/">Return home ↗</Link>
        </nav>
      </header>

      <section className="module-hero">
        <div className="module-hero-content">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            ASTRAL ELEMENTS ENGINE / {item.number} — 06
          </p>

          <span className="module-hero-symbol">{item.symbol}</span>
          <h1>{item.name}</h1>
          <p className="module-lead">{item.description}</p>
          <p className="module-intro">{item.intro}</p>

          <Link className="primary-cta" href="/#modules">
            Explore the other paths ↗
          </Link>
        </div>

        <div className="module-hero-caption">
          CREATE. EVOLVE. MASTER THE ELEMENTS.
        </div>
      </section>

      <section className="module-details">
        <p className="section-label">INSIDE THIS REALM</p>
        <h2>Explore the <span>possibilities.</span></h2>

        <div className="module-feature-grid">
          {item.features.map((feature, index) => (
            <article className="module-feature" key={feature}>
              <span className="module-feature-number">0{index + 1}</span>
              <p>{feature}</p>
            </article>
          ))}
        </div>

        <p className="module-status">
          This is the initial module page. Interactive features,
          saved data, and user accounts will be developed in
          subsequent implementation stages.
        </p>
      </section>

      <footer className="site-footer">
        <Link className="wordmark" href="/">✳ MYTHIC STUDIO</Link>
        <p>An original universe in the making.</p>
        <Link href="/#modules">All six paths ↗</Link>
      </footer>
    </main>
  );
}
