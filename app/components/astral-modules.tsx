"use client";

import { useEffect, useMemo, useState } from "react";

type ElementName = "Fire" | "Water" | "Air" | "Earth" | "Lightning" | "Ice" | "Light" | "Shadow";
const elements: ElementName[] = ["Fire", "Water", "Air", "Earth", "Lightning", "Ice", "Light", "Shadow"];

const weatherPresets = [
  { name: "Solar Dawn", temperature: 28, humidity: 35, wind: 12, condition: "Clear", element: "Fire" as ElementName },
  { name: "Tidal Mist", temperature: 17, humidity: 92, wind: 8, condition: "Fog", element: "Water" as ElementName },
  { name: "Stormfront", temperature: 21, humidity: 78, wind: 64, condition: "Storm", element: "Lightning" as ElementName },
  { name: "Frostfall", temperature: -4, humidity: 68, wind: 24, condition: "Snow", element: "Ice" as ElementName }
];

export function WeatherDominion() {
  const [temperature, setTemperature] = useState(22);
  const [humidity, setHumidity] = useState(55);
  const [wind, setWind] = useState(16);
  const [condition, setCondition] = useState("Clear");
  const [element, setElement] = useState<ElementName>("Air");
  const [saved, setSaved] = useState<string[]>([]);
  const [name, setName] = useState("My Astral Climate");

  useEffect(() => {
    try {
      const value: unknown = JSON.parse(localStorage.getItem("astral-weather-saves") || "[]");
      setSaved(Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []);
    } catch { setSaved([]); }
  }, []);

  const intensity = Math.min(100, Math.round(humidity * .35 + wind * .45 + Math.abs(temperature - 18) * .8));
  const save = () => {
    const entry = `${name.trim() || "Untitled Climate"} · ${condition} · ${element} · ${temperature}°C`;
    const next = [entry, ...saved].slice(0, 20);
    setSaved(next);
    localStorage.setItem("astral-weather-saves", JSON.stringify(next));
  };

  return <section className="astral-workspace">
    <div className="astral-panel astral-controls">
      <p className="astral-kicker">ATMOSPHERIC CONFIGURATION</p>
      <h2>Shape the skies.</h2>
      <label className="astral-field">Climate name<input value={name} onChange={event => setName(event.target.value)} maxLength={48} /></label>
      <label className="astral-field">Temperature <strong>{temperature}°C</strong><input type="range" min="-20" max="45" value={temperature} onChange={event => setTemperature(Number(event.target.value))} /></label>
      <label className="astral-field">Humidity <strong>{humidity}%</strong><input type="range" min="0" max="100" value={humidity} onChange={event => setHumidity(Number(event.target.value))} /></label>
      <label className="astral-field">Wind speed <strong>{wind} km/h</strong><input type="range" min="0" max="120" value={wind} onChange={event => setWind(Number(event.target.value))} /></label>
      <label className="astral-field">Weather condition<select value={condition} onChange={event => setCondition(event.target.value)}>{["Clear", "Cloudy", "Rain", "Storm", "Fog", "Snow"].map(value => <option key={value}>{value}</option>)}</select></label>
      <label className="astral-field">Dominant element<select value={element} onChange={event => setElement(event.target.value as ElementName)}>{elements.map(value => <option key={value}>{value}</option>)}</select></label>
      <button className="astral-button" onClick={save}>Save climate locally</button>
    </div>
    <div className="astral-panel astral-preview">
      <p className="astral-kicker">LIVE ATMOSPHERIC READOUT</p>
      <div className={`weather-orb weather-${condition.toLowerCase()}`} aria-hidden="true"><span>{condition === "Storm" ? "ϟ" : condition === "Snow" ? "❄" : condition === "Rain" ? "☂" : condition === "Fog" ? "≋" : "☼"}</span></div>
      <h3>{condition} / {element}</h3>
      <p className="astral-muted">A simulated climate preview. Values are creative controls, not a real weather forecast.</p>
      <div className="astral-stat-grid">
        <div><strong>{temperature}°</strong><span>Temperature</span></div><div><strong>{humidity}%</strong><span>Humidity</span></div>
        <div><strong>{wind}</strong><span>Wind km/h</span></div><div><strong>{intensity}</strong><span>Elemental intensity</span></div>
      </div>
      <div className="astral-presets"><p className="astral-kicker">QUICK ATMOSPHERES</p>{weatherPresets.map(preset => <button key={preset.name} onClick={() => { setTemperature(preset.temperature); setHumidity(preset.humidity); setWind(preset.wind); setCondition(preset.condition); setElement(preset.element); setName(preset.name); }}>{preset.name}</button>)}</div>
      {saved.length > 0 && <div className="astral-saved"><p className="astral-kicker">SAVED CLIMATES</p>{saved.map((item, index) => <div key={`${item}-${index}`}>{item}</div>)}</div>}
    </div>
  </section>;
}

const fusionRecipes: Record<string, { title: string; description: string; rarity: string }> = {
  "Fire+Water": { title: "Steam Warden", description: "A vapor-born guardian balancing heat and flow.", rarity: "Rare" },
  "Air+Fire": { title: "Solar Tempest", description: "A fast-moving current carrying a blazing core.", rarity: "Epic" },
  "Earth+Water": { title: "Verdant Colossus", description: "A living form shaped by stone, soil, and renewal.", rarity: "Rare" },
  "Ice+Lightning": { title: "Cryo Volt", description: "A charged frost form that stores energy in crystalline arcs.", rarity: "Epic" },
  "Light+Shadow": { title: "Eclipse Echo", description: "A balanced fusion that shifts between reveal and concealment.", rarity: "Mythic" },
  "Air+Water": { title: "Cloud Seraph", description: "A drifting form woven from mist and moving air.", rarity: "Uncommon" },
  "Earth+Fire": { title: "Magma Bastion", description: "A molten guardian with a hardened volcanic shell.", rarity: "Epic" },
  "Fire+Lightning": { title: "Stormflare", description: "A volatile spark amplified by radiant heat.", rarity: "Epic" }
};

function fusionKey(first: ElementName, second: ElementName) { return [first, second].sort().join("+"); }
type Experiment = { key: string; title: string; rarity: string };

export function FusionLab() {
  const [first, setFirst] = useState<ElementName>("Fire");
  const [second, setSecond] = useState<ElementName>("Water");
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const result = useMemo(() => fusionRecipes[fusionKey(first, second)] || {
    title: `${first} ${second} Convergence`,
    description: `An experimental blend of ${first.toLowerCase()} and ${second.toLowerCase()} energy. Define its story and test new combinations.`,
    rarity: "Experimental"
  }, [first, second]);

  useEffect(() => {
    try {
      const value: unknown = JSON.parse(localStorage.getItem("astral-fusion-saves") || "[]");
      setExperiments(Array.isArray(value) ? value.filter((item): item is Experiment => item && typeof item.key === "string" && typeof item.title === "string" && typeof item.rarity === "string") : []);
    } catch { setExperiments([]); }
  }, []);

  const save = () => {
    const next = [{ key: fusionKey(first, second), title: result.title, rarity: result.rarity }, ...experiments].slice(0, 30);
    setExperiments(next);
    localStorage.setItem("astral-fusion-saves", JSON.stringify(next));
  };

  return <section className="astral-workspace">
    <div className="astral-panel astral-controls"><p className="astral-kicker">ELEMENTAL RESEARCH</p><h2>Combine forces.</h2>
      <label className="astral-field">Primary element<select value={first} onChange={event => setFirst(event.target.value as ElementName)}>{elements.map(value => <option key={value}>{value}</option>)}</select></label>
      <div className="fusion-plus" aria-hidden="true">+</div>
      <label className="astral-field">Secondary element<select value={second} onChange={event => setSecond(event.target.value as ElementName)}>{elements.map(value => <option key={value}>{value}</option>)}</select></label>
      <button className="astral-button" onClick={save}>Save experiment</button>
      <p className="astral-muted">Fusion outcomes are original concept recipes for this prototype. They do not alter external game data.</p>
    </div>
    <div className="astral-panel astral-preview"><p className="astral-kicker">FUSION RESULT</p><div className="fusion-glyph" aria-hidden="true"><span>{first.slice(0, 1)}</span><i>×</i><span>{second.slice(0, 1)}</span></div>
      <p className="astral-kicker">{result.rarity.toUpperCase()} DISCOVERY</p><h3>{result.title}</h3><p className="astral-muted">{result.description}</p>
      <div className="fusion-recipe"><span>{first}</span><b>+</b><span>{second}</span><b>→</b><strong>{result.title}</strong></div>
      {experiments.length > 0 && <div className="astral-saved"><p className="astral-kicker">YOUR LAB JOURNAL</p>{experiments.map((item, index) => <div key={`${item.key}-${index}`}><strong>{item.title}</strong><span>{item.rarity} · {item.key}</span></div>)}</div>}
    </div>
  </section>;
}

type Listing = { id: string; title: string; creator: string; category: string; description: string; price: string };
const demoListings: Listing[] = [
  { id: "demo-1", title: "Astral Sigil Collection", creator: "Mythic Studio", category: "Art & Design", description: "A concept collection of original elemental emblems.", price: "Free" },
  { id: "demo-2", title: "Spirit Lore Pack", creator: "Foundry Atelier", category: "Worldbuilding", description: "Prompts and frameworks for developing spirit origins.", price: "Free" },
  { id: "demo-3", title: "Elemental UI Kit", creator: "Nova Works", category: "Digital Tools", description: "A starter visual kit for fantasy interface concepts.", price: "Free" }
];

export function CreatorMarket() {
  const [listings, setListings] = useState<Listing[]>(demoListings);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const value: unknown = JSON.parse(localStorage.getItem("astral-market-listings") || "[]");
      if (Array.isArray(value)) setListings([...value, ...demoListings]);
    } catch { /* Start with demo listings if local data is invalid. */ }
  }, []);

  const visible = listings.filter(item => (category === "All" || item.category === category) && `${item.title} ${item.creator} ${item.description}`.toLowerCase().includes(query.toLowerCase()));
  const create = () => {
    if (!title.trim() || !creator.trim() || !description.trim()) { setNotice("Add a title, creator name, and description first."); return; }
    const item: Listing = { id: `local-${Date.now()}`, title: title.trim(), creator: creator.trim(), category: "Community Creation", description: description.trim(), price: "Showcase" };
    const next = [item, ...listings.filter(listing => listing.id.startsWith("local-"))];
    setListings([item, ...listings]);
    localStorage.setItem("astral-market-listings", JSON.stringify(next));
    setTitle(""); setCreator(""); setDescription(""); setNotice("Your showcase listing was saved in this browser.");
  };

  return <section className="market-layout">
    <div className="astral-panel market-create"><p className="astral-kicker">CREATOR STUDIO</p><h2>Share your creation.</h2>
      <label className="astral-field">Creation title<input value={title} onChange={event => setTitle(event.target.value)} maxLength={70} placeholder="Name your work" /></label>
      <label className="astral-field">Creator name<input value={creator} onChange={event => setCreator(event.target.value)} maxLength={50} placeholder="Your display name" /></label>
      <label className="astral-field">Description<textarea value={description} onChange={event => setDescription(event.target.value)} maxLength={300} rows={4} placeholder="Tell the community about it" /></label>
      <button className="astral-button" onClick={create}>Publish local showcase</button>
      {notice && <p className="astral-notice" role="status">{notice}</p>}
      <p className="astral-muted">Prototype only: listings are stored in this browser. No payments, public publishing, or account sync are enabled.</p>
    </div>
    <div className="astral-market-browse"><div className="market-heading"><div><p className="astral-kicker">COMMUNITY SHOWCASE</p><h2>Discover creations.</h2></div><span>{visible.length} results</span></div>
      <div className="market-filters"><input aria-label="Search listings" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search creations or creators" /><select aria-label="Filter category" value={category} onChange={event => setCategory(event.target.value)}><option>All</option><option>Art &amp; Design</option><option>Worldbuilding</option><option>Digital Tools</option><option>Community Creation</option></select></div>
      <div className="market-list">{visible.map(item => <article className="market-card" key={item.id}><div className="market-card-icon" aria-hidden="true">◇</div><div><p className="astral-kicker">{item.category}</p><h3>{item.title}</h3><p>{item.description}</p><span>by {item.creator}</span></div><strong>{item.price}</strong></article>)}{visible.length === 0 && <p className="astral-muted">No creations match this search yet.</p>}</div>
    </div>
  </section>;
}

type PlayerProfile = { displayName: string; realm: string; favoriteElement: ElementName; playerCode: string; createdAt: string };

export function GameBridge() {
  const [displayName, setDisplayName] = useState("Astral Traveler");
  const [realm, setRealm] = useState("Astral Elements");
  const [favoriteElement, setFavoriteElement] = useState<ElementName>("Light");
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const value: unknown = JSON.parse(localStorage.getItem("astral-player-profile") || "null");
      if (value && typeof value === "object" && "displayName" in value && "realm" in value && "favoriteElement" in value && "playerCode" in value && "createdAt" in value) setProfile(value as PlayerProfile);
    } catch { /* Ignore invalid local profile data. */ }
  }, []);

  const create = () => {
    const clean = displayName.trim();
    if (!clean) { setMessage("Enter a display name to create your profile."); return; }
    const next: PlayerProfile = { displayName: clean, realm, favoriteElement, playerCode: `AST-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`, createdAt: new Date().toISOString() };
    setProfile(next);
    localStorage.setItem("astral-player-profile", JSON.stringify(next));
    setMessage("Player profile saved in this browser.");
  };

  const exportProfile = () => {
    if (!profile) return;
    const blob = new Blob([JSON.stringify({ platform: "Mythic Studio — Astral Elements Engine", profile }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "mythic-studio-player-profile.json"; anchor.click(); URL.revokeObjectURL(url);
    setMessage("Profile export prepared.");
  };

  return <section className="astral-workspace">
    <div className="astral-panel astral-controls"><p className="astral-kicker">PLAYER IDENTITY</p><h2>Build your bridge.</h2>
      <label className="astral-field">Display name<input value={displayName} onChange={event => setDisplayName(event.target.value)} maxLength={32} /></label>
      <label className="astral-field">Home realm<input value={realm} onChange={event => setRealm(event.target.value)} maxLength={48} /></label>
      <label className="astral-field">Favorite element<select value={favoriteElement} onChange={event => setFavoriteElement(event.target.value as ElementName)}>{elements.map(value => <option key={value}>{value}</option>)}</select></label>
      <button className="astral-button" onClick={create}>Create / update profile</button>
      {message && <p className="astral-notice" role="status">{message}</p>}
      <p className="astral-muted">This creates a local identity profile only. External game linking and account-wide sync are not connected yet.</p>
    </div>
    <div className="astral-panel astral-preview"><p className="astral-kicker">BRIDGE STATUS</p><div className="bridge-emblem" aria-hidden="true">↗</div>
      {profile ? <><h3>{profile.displayName}</h3><p className="astral-muted">{profile.realm} · {profile.favoriteElement}</p><div className="player-code"><span>PLAYER CODE</span><strong>{profile.playerCode}</strong></div><button className="astral-button" onClick={exportProfile}>Export profile JSON</button><p className="astral-muted">Created {new Date(profile.createdAt).toLocaleString()}</p></> : <><h3>No player profile yet</h3><p className="astral-muted">Create a profile to establish a portable identity for future connected experiences.</p></>}
      <div className="bridge-status"><span className="status-dot" /> Local profile storage available <span className="status-prototype">External connections not configured</span></div>
    </div>
  </section>;
}
