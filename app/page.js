"use client";
import { useState, useEffect, useRef } from "react";

/* ── palette & tokens ── */
const C = {
  bg: "#151a25",
  bgLight: "#1c2233",
  bgCard: "#1e2538",
  border: "#2a3145",
  borderLight: "#354060",
  text: "#ffffff",
  textMuted: "#8891a4",
  textDim: "#5a6378",
  accent: "#c5cad6",
  white: "#ffffff",
};

/* ── product data ── */
const PRODUCTS = [
  { id: 1, name: "Universal Pedal Power Supply & Cable Set", price: 899, category: "Pedal Accessories", tag: "Best Sellers", difficulty: 1, desc: "Clean, regulated 9V power for your entire board. Daisy-chain cables included." },
  { id: 2, name: "Modular Wah & Phaser Effect Pedal", price: 1799, category: "Effect Pedals", tag: "Free Shipping India", difficulty: 3, desc: "Dual-mode sweep filter with LFO phaser. Cry Baby meets Phase 90 in one enclosure." },
  { id: 3, name: "Analog Dual Delay Effect Pedal", price: 1999, category: "Effect Pedals", tag: "Best Sellers", difficulty: 3, desc: "Twin PT2399 delay lines for lush stereo repeats. Tap tempo and modulation." },
  { id: 4, name: "Classic Fuzz Pedal Kit", price: 1399, category: "Guitar Pedal Kits", tag: "Free Shipping India", difficulty: 1, desc: "BC108 silicon fuzz. Aggressive British tone. Perfect first build project." },
  { id: 5, name: "Screamer Overdrive Kit", price: 1499, category: "Guitar Pedal Kits", tag: "Best Sellers", difficulty: 2, desc: "The classic mid-hump overdrive. JRC4558D IC, symmetric silicon clipping." },
  { id: 6, name: "Golden Centaur Clone Kit", price: 2199, category: "Guitar Pedal Kits", tag: "Best Sellers", difficulty: 3, desc: "Transparent overdrive with clean/drive blend. Charge pump for 18V headroom." },
  { id: 7, name: "Trinity Drive — 3-in-1 Hybrid OD", price: 2499, category: "Guitar Pedal Kits", tag: "Best Sellers", difficulty: 4, desc: "Tube Screamer + Timmy + Klon in one. 4-position clipping selector. JFET buffer." },
  { id: 8, name: "PT2399 Delay Kit", price: 1299, category: "Guitar Pedal Kits", tag: "Free Shipping India", difficulty: 2, desc: "Warm analog-style delay. Up to 600ms of dark, modulated repeats." },
];

const CATEGORIES = ["Pedal Accessories", "Guitar Pedal Kits", "Effect Pedals"];

const STEPS = [
  { num: "01", title: "Select Circuit", desc: "Choose your tone from our curated PCB library", icon: "sliders" },
  { num: "02", title: "Receive Kit", desc: "Premium components delivered to your door", icon: "package" },
  { num: "03", title: "Solder & Assemble", desc: "Follow our detailed industrial build guides", icon: "cpu" },
  { num: "04", title: "Plug In", desc: "Experience pure analog sound in your signal chain", icon: "zap" },
];

const COMMUNITY_BUILDS = [
  { builder: "Arjun S.", kit: "Screamer Kit", location: "Bengaluru" },
  { builder: "Priya M.", kit: "Fuzz Factory", location: "Mumbai" },
  { builder: "Karthik R.", kit: "Delay Kit", location: "Chennai" },
];

/* ── SVG Icons ── */
function Icon({ name, size = 24 }) {
  const s = { width: size, height: size, stroke: C.accent, strokeWidth: 1.5, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    sliders: <svg {...s} viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
    package: <svg {...s} viewBox="0 0 24 24"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    cpu: <svg {...s} viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    zap: <svg {...s} viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    search: <svg {...s} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    cart: <svg {...s} viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    menu: <svg {...s} viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    x: <svg {...s} viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    arrowLeft: <svg {...s} viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
    arrowRight: <svg {...s} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    arrowDown: <svg {...s} viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
    minus: <svg {...s} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    plus: <svg {...s} viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    trash: <svg {...s} viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    link: <svg {...s} viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
    check: <svg {...s} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  };
  return icons[name] || null;
}

/* ── Pedal placeholder graphic ── */
function PedalGraphic({ seed = 0, size = "full" }) {
  const colors = ["#3a4560", "#2d3750", "#343e55", "#3f4a65", "#2a3448"];
  const c = colors[seed % colors.length];
  const h = size === "small" ? 160 : 220;
  return (
    <div style={{ width: "100%", height: h, background: `linear-gradient(145deg, ${c}, ${C.bgLight})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Knobs */}
      <div style={{ position: "absolute", top: "20%", display: "flex", gap: 24 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${C.borderLight}`, background: `radial-gradient(circle at 40% 40%, ${C.borderLight}, ${c})` }} />
        ))}
      </div>
      {/* LED */}
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 8px #ef444488", position: "absolute", top: "45%" }} />
      {/* Footswitch */}
      <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${C.borderLight}`, position: "absolute", bottom: "15%", background: `radial-gradient(circle at 40% 40%, #4a5570, ${c})` }} />
      {/* Jacks */}
      <div style={{ position: "absolute", left: 8, top: "50%", width: 8, height: 14, borderRadius: 2, background: C.borderLight }} />
      <div style={{ position: "absolute", right: 8, top: "50%", width: 8, height: 14, borderRadius: 2, background: C.borderLight }} />
      {/* Noise texture overlay */}
      <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)` }} />
    </div>
  );
}

/* ── Shared styles ── */
const mono = "'IBM Plex Mono', 'Fira Code', monospace";
const serif = "'Playfair Display', 'Georgia', serif";
const sans = "'Barlow Condensed', 'Oswald', sans-serif";

const label = { fontFamily: mono, fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.textMuted };
const heading = { fontFamily: sans, fontWeight: 600, color: C.white, textTransform: "uppercase", letterSpacing: "2px" };
const btnOutline = {
  fontFamily: mono, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase",
  padding: "14px 32px", background: "transparent", color: C.white,
  border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.3s",
};

/* ══════════ NAV ══════════ */
function Nav({ cartCount, page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLink = (key, label) => (
    <button key={key} onClick={() => { setPage(key); setMobileOpen(false); }}
      style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: mono, fontSize: 12, letterSpacing: "2.5px", textTransform: "uppercase",
        color: page === key ? C.white : C.textMuted, transition: "color 0.3s",
        padding: "4px 0",
      }}>
      {label}
    </button>
  );

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "0 clamp(16px, 4vw, 48px)", height: 64,
      background: scrolled ? "rgba(21,26,37,0.97)" : "rgba(21,26,37,0.8)",
      backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.4s",
    }}>
      {/* Logo */}
      <button onClick={() => setPage("home")} style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: sans, fontSize: 20, fontWeight: 700, letterSpacing: "6px",
        color: C.white, textTransform: "uppercase",
      }}>
        ANALOGANGRIFF
      </button>

      {/* Desktop nav */}
      <div className="aa-desk-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {navLink("guides", "Build Guides")}
        {navLink("support", "Support")}
        {navLink("shop", "Shop")}

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          border: `1px solid ${C.border}`, borderRadius: 4, padding: "6px 14px",
        }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.textDim }}>Search circuits...</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: C.textDim, border: `1px solid ${C.border}`, borderRadius: 3, padding: "2px 6px" }}>⌘K</span>
        </div>

        {/* Cart */}
        <button onClick={() => setPage("cart")} style={{
          background: "none", border: "none", cursor: "pointer", position: "relative", padding: 4,
        }}>
          <Icon name="cart" size={22} />
          {cartCount > 0 && (
            <div style={{
              position: "absolute", top: -4, right: -6,
              width: 18, height: 18, borderRadius: "50%",
              background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: mono, fontSize: 10, color: "#fff", fontWeight: 700,
            }}>{cartCount}</div>
          )}
        </button>
      </div>

      {/* Mobile */}
      <div className="aa-mob-nav" style={{ display: "none", alignItems: "center", gap: 12 }}>
        <button onClick={() => setPage("cart")} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
          <Icon name="cart" size={22} />
          {cartCount > 0 && <div style={{ position: "absolute", top: -4, right: -6, width: 16, height: 16, borderRadius: "50%", background: "#ef4444", fontFamily: mono, fontSize: 9, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</div>}
        </button>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Icon name={mobileOpen ? "x" : "menu"} size={24} />
        </button>
      </div>

      {mobileOpen && (
        <div style={{
          position: "absolute", top: 64, left: 0, right: 0,
          background: "rgba(21,26,37,0.98)", borderBottom: `1px solid ${C.border}`,
          padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20,
        }}>
          {navLink("home", "Home")}
          {navLink("guides", "Build Guides")}
          {navLink("support", "Support")}
          {navLink("shop", "Shop")}
        </div>
      )}
    </nav>
  );
}

/* ══════════ HERO ══════════ */
function Hero({ setPage }) {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "120px 24px 80px", position: "relative", overflow: "hidden",
    }}>
      {/* Background layers */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(40,55,90,0.4) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 70%, rgba(30,40,70,0.3) 0%, transparent 50%),
          linear-gradient(180deg, #0f1420 0%, ${C.bg} 50%, ${C.bgLight} 100%)
        `,
      }} />
      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: `linear-gradient(${C.accent} 1px, transparent 1px), linear-gradient(90deg, ${C.accent} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />
      {/* Monitor shape silhouette */}
      <div style={{
        position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
        width: "min(700px, 80vw)", height: "min(420px, 50vw)",
        background: "linear-gradient(135deg, rgba(30,40,60,0.6), rgba(20,28,45,0.4))",
        borderRadius: "8px", border: `1px solid ${C.border}`,
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
      }}>
        <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)", width: 120, height: 30, background: `linear-gradient(180deg, ${C.border}, transparent)`, borderRadius: "0 0 4px 4px" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{
          fontFamily: sans, fontSize: "clamp(48px, 10vw, 100px)", fontWeight: 700,
          letterSpacing: "8px", textTransform: "uppercase",
          color: C.white, lineHeight: 1, margin: "0 0 24px",
        }}>
          ANALOG ANGRIFF
        </h1>
        <p style={{
          fontFamily: mono, fontSize: "clamp(13px, 1.4vw, 16px)",
          color: C.textMuted, maxWidth: 600, lineHeight: 1.7, margin: "0 auto 48px",
        }}>
          Premium DIY guitar pedal kits engineered for the Indian musician. Build your sound from the circuit up.
        </p>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      }}>
        <span style={{ ...label, fontSize: 9, letterSpacing: "4px" }}>EXPLORE GEAR</span>
        <Icon name="arrowDown" size={18} />
      </div>

      {/* Section numbers */}
      <div style={{
        position: "absolute", right: 24, bottom: 40,
        fontFamily: mono, fontSize: 13, color: C.textDim,
      }}>01</div>
    </section>
  );
}

/* ══════════ CIRCUIT CATEGORIES ══════════ */
function CircuitCategories({ setPage }) {
  const cats = [
    { name: "Pedal Accessories", desc: "Power, cables, and build tools" },
    { name: "Guitar Pedal Kits", desc: "Complete DIY build kits" },
    { name: "Effect Pedals", desc: "Assembled and ready to play" },
  ];
  return (
    <section style={{ padding: "80px clamp(16px, 4vw, 48px)", maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ ...heading, fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 8 }}>Circuit Categories</h2>
      <div style={{ width: 40, height: 3, background: C.white, marginBottom: 48 }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
        {cats.map((cat, i) => (
          <div key={i} onClick={() => setPage("shop")} style={{
            cursor: "pointer", position: "relative", overflow: "hidden",
            border: `1px solid ${C.border}`, transition: "all 0.4s",
          }}
            onMouseOver={e => e.currentTarget.style.borderColor = C.borderLight}
            onMouseOut={e => e.currentTarget.style.borderColor = C.border}
          >
            <PedalGraphic seed={i} />
            <div style={{ padding: "20px 24px", background: C.bgCard }}>
              <h3 style={{ fontFamily: sans, fontSize: 20, fontWeight: 600, color: C.white, letterSpacing: "1px", margin: "0 0 4px" }}>{cat.name}</h3>
              <p style={{ fontFamily: mono, fontSize: 11, color: C.textDim, margin: 0 }}>{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════ FEATURED CIRCUITS (carousel) ══════════ */
function FeaturedCircuits({ setPage, addToCart }) {
  const [offset, setOffset] = useState(0);
  const featured = PRODUCTS.slice(0, 6);
  const visible = 4;
  const maxOffset = Math.max(0, featured.length - visible);

  return (
    <section style={{ padding: "80px clamp(16px, 4vw, 48px)", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "stretch", gap: 16 }}>
            <div style={{ width: 3, background: C.white }} />
            <h2 style={{ ...heading, fontSize: "clamp(32px, 5vw, 48px)", margin: 0 }}>Featured Circuits</h2>
          </div>
          <p style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, marginTop: 16, maxWidth: 500, lineHeight: 1.7 }}>
            High-fidelity analog clones and original designs. Engineered for the modern pedalboard with premium PCB layouts.
          </p>
        </div>
        <button onClick={() => setPage("shop")} style={btnOutline}
          onMouseOver={e => { e.target.style.background = C.white; e.target.style.color = C.bg; }}
          onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.color = C.white; }}
        >BROWSE ALL KITS</button>
      </div>

      {/* Carousel */}
      <div style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, overflow: "hidden" }}>
          {featured.slice(offset, offset + visible).map((p, i) => (
            <div key={p.id} style={{ cursor: "pointer" }} onClick={() => addToCart(p)}>
              <PedalGraphic seed={p.id} size="small" />
              <div style={{ padding: "16px 0" }}>
                <h4 style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: C.white, letterSpacing: "1px", textTransform: "uppercase", lineHeight: 1.5, margin: "0 0 8px" }}>{p.name}</h4>
                <div style={{ fontFamily: mono, fontSize: 13, color: C.textMuted }}>{(p.price).toFixed(2)} INR</div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button onClick={() => setOffset(Math.max(0, offset - 1))} style={{
          position: "absolute", left: -20, top: "35%", background: C.bgCard,
          border: `1px solid ${C.border}`, borderRadius: "50%", width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          opacity: offset === 0 ? 0.3 : 1,
        }}><Icon name="arrowLeft" size={18} /></button>
        <button onClick={() => setOffset(Math.min(maxOffset, offset + 1))} style={{
          position: "absolute", right: -20, top: "35%", background: C.bgCard,
          border: `1px solid ${C.border}`, borderRadius: "50%", width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          opacity: offset >= maxOffset ? 0.3 : 1,
        }}><Icon name="arrowRight" size={18} /></button>
      </div>
    </section>
  );
}

/* ══════════ THE SIGNAL PATH ══════════ */
function SignalPath() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section style={{ padding: "80px clamp(16px, 4vw, 48px)", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ ...heading, fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 12 }}>THE SIGNAL PATH</h2>
      <p style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, maxWidth: 520, margin: "0 auto 56px", lineHeight: 1.7 }}>
        From raw components to legendary tone, follow our industrial process to build your own boutique analog gear.
      </p>

      {/* Steps */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 0, marginBottom: 48, flexWrap: "wrap" }}>
        {STEPS.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 180, cursor: "pointer" }} onClick={() => setActiveStep(i)}>
              <div style={{
                width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${i === activeStep ? C.accent : C.border}`,
                background: i === activeStep ? "rgba(197,202,214,0.08)" : "transparent",
                borderRadius: 4, transition: "all 0.3s", marginBottom: 16,
              }}>
                <Icon name={step.icon} size={24} />
              </div>
              <div style={{ fontFamily: mono, fontSize: 13, color: C.accent, fontWeight: 700, marginBottom: 6 }}>{step.num}. {step.title}</div>
              <p style={{ fontFamily: mono, fontSize: 11, color: C.textDim, lineHeight: 1.6, margin: 0, padding: "0 8px" }}>{step.desc}</p>
            </div>
            {i < 3 && <div style={{ width: 40, height: 1, background: C.border, marginTop: 28, flexShrink: 0 }} />}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
        <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))} style={{
          ...btnOutline, padding: "10px 24px", display: "flex", alignItems: "center", gap: 8,
          opacity: activeStep === 0 ? 0.4 : 1,
        }}><Icon name="arrowLeft" size={16} /> Previous</button>
        <span style={{ fontFamily: mono, fontSize: 12, color: C.textDim, letterSpacing: "3px" }}>STAGE {String(activeStep + 1).padStart(2, "0")}</span>
        <button onClick={() => setActiveStep(Math.min(3, activeStep + 1))} style={{
          ...btnOutline, padding: "10px 24px", background: C.white, color: C.bg,
          display: "flex", alignItems: "center", gap: 8,
          opacity: activeStep === 3 ? 0.4 : 1,
        }}>Next <Icon name="arrowRight" size={16} /></button>
      </div>

      {/* Specs bar */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        borderTop: `1px solid ${C.border}`, marginTop: 48,
      }}>
        {[
          { label: "SPEC-01:", value: "WIMA CAPACITORS" },
          { label: "SPEC-02:", value: "NEUTRIK JACKS" },
          { label: "SPEC-03:", value: "ALPHA POTS" },
        ].map((spec, i) => (
          <div key={i} style={{
            padding: "20px 16px", borderRight: i < 2 ? `1px solid ${C.border}` : "none",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            <span style={{ fontFamily: mono, fontSize: 11, color: C.textDim, letterSpacing: "2px" }}>{spec.label} {spec.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════ COMMUNITY BUILDS ══════════ */
function CommunityBuilds() {
  return (
    <section style={{ padding: "80px clamp(16px, 4vw, 48px)", maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ ...heading, fontSize: "clamp(32px, 5vw, 48px)", fontStyle: "italic", fontWeight: 400, marginBottom: 16 }}>COMMUNITY BUILDS</h2>
      <p style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, maxWidth: 500, lineHeight: 1.8, marginBottom: 8 }}>
        The workbench results from our community of tone-chasers across India. From pristine PCB soldering to custom enclosure art, see what happens when analog passion meets precision engineering.
      </p>
      <button style={{ fontFamily: mono, fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", background: "none", border: "none", color: C.white, cursor: "pointer", padding: "8px 0", fontWeight: 700, marginBottom: 48 }}>SUBMIT YOUR BUILD</button>

      {/* Gallery grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 40 }}>
        {COMMUNITY_BUILDS.slice(0, 2).map((build, i) => (
          <div key={i} style={{ position: "relative", overflow: "hidden" }}>
            <PedalGraphic seed={i + 10} size={i === 0 ? "full" : "full"} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, padding: "12px 16px",
              background: "rgba(21,26,37,0.85)", backdropFilter: "blur(8px)",
            }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: C.accent, letterSpacing: "1px" }}>BUILDER: {build.builder.toUpperCase()}</div>
              <div style={{ fontFamily: mono, fontSize: 10, color: C.textDim, letterSpacing: "1px" }}>KIT: {build.kit.toUpperCase()}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={btnOutline}
          onMouseOver={e => { e.target.style.background = C.white; e.target.style.color = C.bg; }}
          onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.color = C.white; }}
        >START YOUR OWN BUILD</button>
      </div>
    </section>
  );
}

/* ══════════ FOOTER ══════════ */
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, marginTop: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px clamp(16px, 4vw, 48px) 32px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 48 }}>
        <div>
          <h4 style={{ ...label, marginBottom: 24 }}>SHOP & SUPPORT</h4>
          {["Build Guides", "Support", "Shop"].map(l => (
            <div key={l} style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, marginBottom: 14, cursor: "pointer" }}>{l}</div>
          ))}
        </div>
        <div>
          <h4 style={{ ...label, marginBottom: 24 }}>COMMUNITY</h4>
          {["Instagram", "YouTube", "LinkedIn"].map(l => (
            <div key={l} style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, marginBottom: 14, cursor: "pointer" }}>{l}</div>
          ))}
        </div>
        <div>
          <h4 style={{ ...label, marginBottom: 24 }}>LEGAL</h4>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
            <div key={l} style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, marginBottom: 14, cursor: "pointer" }}>{l}</div>
          ))}
        </div>
      </div>
      <div style={{
        padding: "24px clamp(16px, 4vw, 48px)", borderTop: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        maxWidth: 1200, margin: "0 auto",
      }}>
        <span style={{ fontFamily: mono, fontSize: 11, color: C.textDim, letterSpacing: "3px" }}>DESIGNED IN INDIA</span>
        <span style={{ fontFamily: mono, fontSize: 11, color: C.textDim, letterSpacing: "1px" }}>{"\u00A9"} 2026 ANALOGANGRIFF. ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );
}

/* ══════════ SHOP PAGE ══════════ */
function ShopPage({ addToCart }) {
  const [catFilter, setCatFilter] = useState([]);
  const [sortBy, setSortBy] = useState("featured");

  const filtered = PRODUCTS.filter(p => catFilter.length === 0 || catFilter.includes(p.category));
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "low") return a.price - b.price;
    if (sortBy === "high") return b.price - a.price;
    return 0;
  });

  const toggleCat = (c) => setCatFilter(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  return (
    <section style={{ paddingTop: 64 }}>
      {/* Header */}
      <div style={{
        textAlign: "center", padding: "64px 24px 48px",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <h1 style={{ ...heading, fontSize: "clamp(36px, 6vw, 56px)", marginBottom: 16 }}>CIRCUIT CATALOG</h1>
        <div style={{ fontFamily: mono, fontSize: 11, color: C.textDim, letterSpacing: "3px", marginBottom: 20 }}>
          HOME / SHOP / DIY KITS / ANALOG CIRCUITS
        </div>
        <button style={btnOutline}>View Build Guides</button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px clamp(16px, 4vw, 48px)", display: "grid", gridTemplateColumns: "260px 1fr", gap: 40 }}>
        {/* Sidebar */}
        <div style={{ borderRight: `1px solid ${C.border}`, paddingRight: 32 }}>
          <h3 style={{ ...label, fontSize: 13, letterSpacing: "3px", marginBottom: 32 }}>PARAMETERS</h3>
          <div style={{ borderTop: `2px solid ${C.accent}`, paddingTop: 24, marginBottom: 32 }}>
            <h4 style={{ fontFamily: mono, fontSize: 12, color: C.white, letterSpacing: "1px", marginBottom: 16 }}>Category</h4>
            {CATEGORIES.map(c => (
              <label key={c} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, cursor: "pointer", fontFamily: mono, fontSize: 12, color: C.textMuted }}>
                <input type="checkbox" checked={catFilter.includes(c)} onChange={() => toggleCat(c)}
                  style={{ accentColor: C.accent }} />
                {c}
              </label>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <h3 style={{ fontFamily: sans, fontSize: 20, fontWeight: 600, color: C.white, letterSpacing: "1px", margin: 0 }}>Pedal Kits & Components</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: C.textDim }}>Filter by</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                fontFamily: mono, fontSize: 12, background: C.bgCard, color: C.textMuted,
                border: `1px solid ${C.border}`, padding: "6px 12px", borderRadius: 3,
              }}>
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {sorted.map(p => (
              <div key={p.id} style={{ background: C.bgCard, border: `1px solid ${C.border}`, overflow: "hidden", transition: "border-color 0.3s" }}
                onMouseOver={e => e.currentTarget.style.borderColor = C.borderLight}
                onMouseOut={e => e.currentTarget.style.borderColor = C.border}
              >
                <PedalGraphic seed={p.id} size="small" />
                <div style={{ padding: "16px 18px" }}>
                  <h4 style={{ fontFamily: mono, fontSize: 12, color: C.white, margin: "0 0 8px", lineHeight: 1.5 }}>{p.name}</h4>
                  <div style={{ fontFamily: mono, fontSize: 14, color: C.textMuted, marginBottom: 16 }}>{"\u20B9"}{p.price.toLocaleString("en-IN")}</div>
                  <button onClick={() => addToCart(p)} style={{
                    width: "100%", fontFamily: mono, fontSize: 10, letterSpacing: "2px", textTransform: "uppercase",
                    padding: "10px 0", background: "transparent", color: C.accent,
                    border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.3s",
                  }}
                    onMouseOver={e => { e.target.style.background = C.white; e.target.style.color = C.bg; }}
                    onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.color = C.accent; }}
                  >INITIALIZE BUILD</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ CART ══════════ */
function CartPage({ cart, updateQty, removeFromCart, setPage }) {
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  if (cart.length === 0) return (
    <section style={{ paddingTop: 140, textAlign: "center", maxWidth: 500, margin: "0 auto", padding: "140px 24px 80px" }}>
      <Icon name="cart" size={48} />
      <h2 style={{ ...heading, fontSize: 28, margin: "24px 0 12px" }}>Cart is empty</h2>
      <p style={{ fontFamily: mono, fontSize: 12, color: C.textMuted, marginBottom: 32 }}>Select a circuit to initialize your build.</p>
      <button onClick={() => setPage("shop")} style={{ ...btnOutline, background: C.white, color: C.bg }}>BROWSE CATALOG</button>
    </section>
  );

  return (
    <section style={{ paddingTop: 100, maxWidth: 700, margin: "0 auto", padding: "100px 24px 80px" }}>
      <h1 style={{ ...heading, fontSize: 32, marginBottom: 40 }}>YOUR BUILD QUEUE</h1>
      {cart.map(({ product: p, qty }) => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", borderBottom: `1px solid ${C.border}`, flexWrap: "wrap", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontFamily: mono, fontSize: 13, color: C.white, fontWeight: 700 }}>{p.name}</div>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.textDim }}>{p.category}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.border}` }}>
              <button onClick={() => updateQty(p.id, qty - 1)} style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="minus" size={14} /></button>
              <span style={{ width: 32, textAlign: "center", fontFamily: mono, fontSize: 13, color: C.white }}>{qty}</span>
              <button onClick={() => updateQty(p.id, qty + 1)} style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="plus" size={14} /></button>
            </div>
            <span style={{ fontFamily: mono, fontSize: 14, color: C.accent, width: 80, textAlign: "right" }}>{"\u20B9"}{(p.price * qty).toLocaleString("en-IN")}</span>
            <button onClick={() => removeFromCart(p.id)} style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.5 }}><Icon name="trash" size={16} /></button>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "24px 0", marginTop: 8 }}>
        <span style={{ ...label }}>TOTAL</span>
        <span style={{ fontFamily: mono, fontSize: 22, color: C.white, fontWeight: 700 }}>{"\u20B9"}{total.toLocaleString("en-IN")}</span>
      </div>
      <button onClick={() => setPage("checkout")} style={{ width: "100%", ...btnOutline, background: C.white, color: C.bg, fontWeight: 700, textAlign: "center" }}>PROCEED TO CHECKOUT</button>
    </section>
  );
}

/* ══════════ CHECKOUT ══════════ */
function CheckoutPage({ cart, setPage }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", utr: "" });
  const [done, setDone] = useState(false);
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  if (done) return (
    <section style={{ paddingTop: 160, textAlign: "center", maxWidth: 500, margin: "0 auto", padding: "160px 24px 80px" }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}><Icon name="check" size={28} /></div>
      <h2 style={{ ...heading, fontSize: 28, marginBottom: 12 }}>Order Received</h2>
      <p style={{ fontFamily: mono, fontSize: 12, color: C.textMuted, lineHeight: 1.8, marginBottom: 32 }}>{"We'll verify your payment and confirm via WhatsApp within a few hours."}</p>
      <button onClick={() => setPage("home")} style={{ ...btnOutline, background: C.white, color: C.bg }}>BACK TO HOME</button>
    </section>
  );

  const inputStyle = { width: "100%", background: C.bgCard, border: `1px solid ${C.border}`, color: C.white, fontFamily: mono, fontSize: 13, padding: "12px 16px", outline: "none", boxSizing: "border-box", borderRadius: 2 };

  return (
    <section style={{ paddingTop: 100, maxWidth: 600, margin: "0 auto", padding: "100px 24px 80px" }}>
      <h1 style={{ ...heading, fontSize: 32, marginBottom: 40 }}>CHECKOUT</h1>

      {/* Summary */}
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: 24, marginBottom: 32 }}>
        <div style={{ ...label, marginBottom: 16 }}>ORDER SUMMARY</div>
        {cart.map(({ product: p, qty }) => (
          <div key={p.id} style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 12, color: C.textMuted, marginBottom: 8 }}>
            <span>{p.name} {"\u00D7"} {qty}</span>
            <span>{"\u20B9"}{(p.price * qty).toLocaleString("en-IN")}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 16, color: C.white, fontWeight: 700, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
          <span>TOTAL</span><span>{"\u20B9"}{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* UPI */}
      <div style={{ border: `1px solid ${C.borderLight}`, padding: 32, textAlign: "center", marginBottom: 32 }}>
        <div style={{ ...label, color: C.accent, marginBottom: 20 }}>STEP 01 — PAY VIA UPI</div>
        <div style={{ width: 160, height: 160, margin: "0 auto 20px", background: "#fff", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "80%", height: "80%", border: "2px dashed #bbb", borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span style={{ fontSize: 28 }}>{"\u{1F4F1}"}</span>
            <span style={{ fontFamily: mono, fontSize: 9, color: "#888" }}>Your UPI QR here</span>
          </div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.textMuted }}>UPI ID: <span style={{ color: C.white }}>yourname@upi</span></div>
        <div style={{ fontFamily: mono, fontSize: 11, color: C.textDim, marginTop: 4 }}>GPay / PhonePe / Paytm</div>
      </div>

      {/* Form */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ ...label, color: C.accent, marginBottom: 24 }}>STEP 02 — SHIPPING DETAILS</div>
        {[
          { key: "name", label: "Full Name", ph: "Rahul Sharma", type: "text" },
          { key: "phone", label: "WhatsApp Number", ph: "+91 98765 43210", type: "tel" },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: 20 }}>
            <label style={{ display: "block", ...label, fontSize: 10, marginBottom: 8 }}>{f.label}</label>
            <input type={f.type} value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.ph} style={inputStyle} />
          </div>
        ))}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", ...label, fontSize: 10, marginBottom: 8 }}>Shipping Address</label>
          <textarea value={form.address} onChange={e => set("address", e.target.value)} placeholder="House/flat, street, city, state, PIN" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>
        <div>
          <label style={{ display: "block", ...label, fontSize: 10, marginBottom: 8 }}>UTR / Transaction ID (optional)</label>
          <input type="text" value={form.utr} onChange={e => set("utr", e.target.value)} placeholder="From your UPI app" style={inputStyle} />
        </div>
      </div>

      <button onClick={() => setDone(true)} style={{ width: "100%", ...btnOutline, background: C.white, color: C.bg, fontWeight: 700, textAlign: "center", marginBottom: 12, border: "none" }}>CONFIRM ORDER</button>
      <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" style={{
        display: "block", textAlign: "center", fontFamily: mono, fontSize: 11, color: "#25D366",
        padding: 14, border: "1px solid rgba(37,211,102,0.3)", textDecoration: "none", letterSpacing: "1px",
      }}>{"\u{1F4AC}"} OR MESSAGE US ON WHATSAPP</a>
    </section>
  );
}

/* ══════════ PLACEHOLDER PAGES ══════════ */
function PlaceholderPage({ title, desc }) {
  return (
    <section style={{ paddingTop: 140, textAlign: "center", maxWidth: 600, margin: "0 auto", padding: "140px 24px 80px" }}>
      <h1 style={{ ...heading, fontSize: 36, marginBottom: 16 }}>{title}</h1>
      <p style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, lineHeight: 1.8 }}>{desc}</p>
    </section>
  );
}

/* ══════════ TOAST ══════════ */
function Toast({ message, visible }) {
  return (
    <div style={{
      position: "fixed", bottom: visible ? 32 : -60, left: "50%", transform: "translateX(-50%)",
      background: C.white, color: C.bg, fontFamily: mono, fontSize: 12, fontWeight: 700,
      padding: "12px 28px", zIndex: 9999, transition: "bottom 0.4s ease",
      letterSpacing: "1px", borderRadius: 2, whiteSpace: "nowrap",
    }}>{message}</div>
  );
}

/* ══════════ MAIN APP ══════════ */
export default function Home() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ msg: "", visible: false });

  const showToast = (msg) => { setToast({ msg, visible: true }); setTimeout(() => setToast({ msg: "", visible: false }), 2200); };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
    showToast(`${product.name} added`);
  };

  const updateQty = (id, q) => {
    if (q < 1) setCart(prev => prev.filter(i => i.product.id !== id));
    else setCart(prev => prev.map(i => (i.product.id === id ? { ...i, qty: q } : i)));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.product.id !== id));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.white }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; }
        ::selection { background: rgba(197,202,214,0.3); }
        input:focus, textarea:focus, select:focus { border-color: ${C.borderLight} !important; outline: none; }
        .aa-desk-nav { display: flex; }
        .aa-mob-nav { display: none !important; }
        @media (max-width: 768px) {
          .aa-desk-nav { display: none !important; }
          .aa-mob-nav { display: flex !important; }
        }
      `}</style>

      <Nav cartCount={cartCount} page={page} setPage={setPage} />
      <Toast message={toast.msg} visible={toast.visible} />

      {page === "home" && <>
        <Hero setPage={setPage} />
        <CircuitCategories setPage={setPage} />
        <FeaturedCircuits setPage={setPage} addToCart={addToCart} />
        <SignalPath />
        <CommunityBuilds />
      </>}
      {page === "shop" && <ShopPage addToCart={addToCart} />}
      {page === "cart" && <CartPage cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} setPage={setPage} />}
      {page === "checkout" && <CheckoutPage cart={cart} setPage={setPage} />}
      {page === "guides" && <PlaceholderPage title="BUILD GUIDES" desc="Step-by-step industrial build documentation for every circuit in our catalog. Coming soon." />}
      {page === "support" && <PlaceholderPage title="SUPPORT" desc="Troubleshooting guides, component identification, and direct WhatsApp support for your build." />}

      <Footer />
    </div>
  );
}
