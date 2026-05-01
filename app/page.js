"use client";
import { useState, useEffect, useRef } from "react";

/* ── palette ── */
const C = {
  bg: "#151a25", bgLight: "#1c2233", bgCard: "#1e2538",
  border: "#2a3145", borderLight: "#354060",
  text: "#ffffff", textMuted: "#8891a4", textDim: "#5a6378",
  accent: "#c5cad6", white: "#ffffff",
};

/* ── PRODUCT DATA ── */
const EFFECT_CATEGORIES = [
  "Overdrive & Distortion", "Fuzz", "Modulation & Delay",
  "Boost", "Compression", "Preamp", "Bass Pedals", "Utility",
];
const PRODUCT_TYPES = ["PCB", "Full Kit", "Components"];
const DIFFICULTY_LEVELS = ["Beginner", "Easy", "Intermediate", "Advanced", "Expert"];

const PRODUCTS = [
  { id: 1, name: "Screamer PCB", ref: "TS-808 Clone", price: 249, type: "PCB", effectCat: "Overdrive & Distortion", difficulty: "Beginner", tag: "Popular", desc: "Classic mid-hump overdrive PCB. Through-hole, single-sided." },
  { id: 2, name: "Golden Horse PCB", ref: "Klon Centaur", price: 349, type: "PCB", effectCat: "Overdrive & Distortion", difficulty: "Intermediate", tag: "Popular", desc: "Transparent overdrive with charge pump. Premium PCB layout." },
  { id: 3, name: "Trinity Drive PCB", ref: "3-in-1 Hybrid OD", price: 449, type: "PCB", effectCat: "Overdrive & Distortion", difficulty: "Advanced", tag: "New", desc: "TS + Timmy + Klon topology. 4-position clipping selector." },
  { id: 4, name: "Buzz Bomb PCB", ref: "Fuzz Face Clone", price: 199, type: "PCB", effectCat: "Fuzz", difficulty: "Beginner", tag: "", desc: "Classic germanium fuzz. Simple 2-transistor circuit." },
  { id: 5, name: "Muff Monster PCB", ref: "Big Muff Pi", price: 299, type: "PCB", effectCat: "Fuzz", difficulty: "Easy", tag: "Popular", desc: "4-stage fuzz with tone stack. Sustain for days." },
  { id: 6, name: "Phase Drift PCB", ref: "Phase 90 Clone", price: 349, type: "PCB", effectCat: "Modulation & Delay", difficulty: "Intermediate", tag: "", desc: "4-stage OTA phaser. LM13700 based." },
  { id: 7, name: "Echo Chamber PCB", ref: "PT2399 Delay", price: 299, type: "PCB", effectCat: "Modulation & Delay", difficulty: "Easy", tag: "", desc: "Analog-voiced digital delay. Up to 600ms." },
  { id: 8, name: "Clean Boost PCB", ref: "LPB-1 Style", price: 149, type: "PCB", effectCat: "Boost", difficulty: "Beginner", tag: "", desc: "Simple JFET boost. Up to +20dB clean gain." },
  { id: 9, name: "Squeeze Box PCB", ref: "Dyna Comp Clone", price: 299, type: "PCB", effectCat: "Compression", difficulty: "Easy", tag: "", desc: "OTA compressor with attack control." },
  { id: 10, name: "Tube Pre PCB", ref: "Preamp Circuit", price: 399, type: "PCB", effectCat: "Preamp", difficulty: "Advanced", tag: "New", desc: "12AX7 tube preamp PCB with HV supply section." },
  { id: 11, name: "Low Growl PCB", ref: "Bass Overdrive", price: 299, type: "PCB", effectCat: "Bass Pedals", difficulty: "Intermediate", tag: "", desc: "Bass overdrive with clean blend and low-pass filter." },
  { id: 12, name: "Signal Split PCB", ref: "ABY Switcher", price: 199, type: "PCB", effectCat: "Utility", difficulty: "Beginner", tag: "", desc: "Buffered ABY splitter. Phase switch, ground lift." },
  { id: 101, name: "Screamer Kit", ref: "TS-808 Clone", price: 1499, type: "Full Kit", effectCat: "Overdrive & Distortion", difficulty: "Beginner", tag: "Bestseller", desc: "Complete kit with PCB, components, enclosure, knobs, jacks." },
  { id: 102, name: "Golden Horse Kit", ref: "Klon Centaur", price: 2199, type: "Full Kit", effectCat: "Overdrive & Distortion", difficulty: "Intermediate", tag: "Popular", desc: "Full Klon clone with germanium diodes and charge pump." },
  { id: 103, name: "Trinity Drive Kit", ref: "3-in-1 Hybrid OD", price: 2999, type: "Full Kit", effectCat: "Overdrive & Distortion", difficulty: "Advanced", tag: "New", desc: "Flagship kit. 3 overdrives, JFET buffer, 4-way clipping. Hammond 1590BB." },
  { id: 104, name: "Buzz Bomb Kit", ref: "Fuzz Face Clone", price: 999, type: "Full Kit", effectCat: "Fuzz", difficulty: "Beginner", tag: "Bestseller", desc: "Germanium fuzz kit with matched transistor pair." },
  { id: 105, name: "Muff Monster Kit", ref: "Big Muff Pi", price: 1599, type: "Full Kit", effectCat: "Fuzz", difficulty: "Easy", tag: "", desc: "Full Big Muff build with tone bypass mod." },
  { id: 106, name: "Echo Chamber Kit", ref: "PT2399 Delay", price: 1799, type: "Full Kit", effectCat: "Modulation & Delay", difficulty: "Easy", tag: "Popular", desc: "Complete delay with modulation. PT2399 chip." },
  { id: 107, name: "Phase Drift Kit", ref: "Phase 90 Clone", price: 1999, type: "Full Kit", effectCat: "Modulation & Delay", difficulty: "Intermediate", tag: "", desc: "4-stage phaser kit. LM13700 OTA." },
  { id: 108, name: "Clean Boost Kit", ref: "LPB-1 Style", price: 799, type: "Full Kit", effectCat: "Boost", difficulty: "Beginner", tag: "", desc: "Simplest kit. 1 transistor, 5 components." },
  { id: 109, name: "Squeeze Box Kit", ref: "Dyna Comp Clone", price: 1699, type: "Full Kit", effectCat: "Compression", difficulty: "Easy", tag: "", desc: "OTA compressor with attack knob." },
  { id: 110, name: "Low Growl Kit", ref: "Bass Overdrive", price: 1899, type: "Full Kit", effectCat: "Bass Pedals", difficulty: "Intermediate", tag: "New", desc: "Bass overdrive with clean blend." },
  { id: 201, name: "9V Power Supply & Cables", ref: "Regulated PSU", price: 499, type: "Components", effectCat: "Utility", difficulty: "Beginner", tag: "", desc: "Clean 9V DC supply with 5 daisy-chain cables." },
  { id: 202, name: "Enclosure — 1590B", ref: "Pre-drilled", price: 349, type: "Components", effectCat: "Utility", difficulty: "Beginner", tag: "Popular", desc: "Powder-coated 1590B, pre-drilled for 3-knob layouts." },
  { id: 203, name: "Enclosure — 1590BB", ref: "Pre-drilled", price: 449, type: "Components", effectCat: "Utility", difficulty: "Beginner", tag: "", desc: "Larger 1590BB for complex builds." },
  { id: 204, name: "Premium Knob Set (6pc)", ref: "Davies 1900h", price: 199, type: "Components", effectCat: "Utility", difficulty: "Beginner", tag: "", desc: "6 fluted knobs. Fits 6mm shaft pots." },
  { id: 205, name: "3PDT Footswitch + PCB", ref: "True Bypass", price: 149, type: "Components", effectCat: "Utility", difficulty: "Beginner", tag: "", desc: "3PDT stomp switch with breakout PCB." },
  { id: 206, name: "Resistor & Cap Pack", ref: "250pc Assorted", price: 399, type: "Components", effectCat: "Utility", difficulty: "Beginner", tag: "", desc: "250 assorted resistors & caps for pedal building." },
];

const STEPS = [
  { num: "01", title: "Select Circuit", desc: "Choose your tone from our curated PCB library", icon: "sliders" },
  { num: "02", title: "Receive Kit", desc: "Premium components delivered to your door", icon: "package" },
  { num: "03", title: "Solder & Assemble", desc: "Follow our detailed industrial build guides", icon: "cpu" },
  { num: "04", title: "Plug In", desc: "Experience pure analog sound in your signal chain", icon: "zap" },
];

/* ── Icons ── */
function Icon({ name, size = 24, color }) {
  const s = { width: size, height: size, stroke: color || C.accent, strokeWidth: 1.5, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  const I = {
    sliders: <svg {...s} viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
    package: <svg {...s} viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    cpu: <svg {...s} viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    zap: <svg {...s} viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    search: <svg {...s} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    cart: <svg {...s} viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    menu: <svg {...s} viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    x: <svg {...s} viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    arrowLeft: <svg {...s} viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
    arrowRight: <svg {...s} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    arrowDown: <svg {...s} viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
    chevDown: <svg {...s} viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>,
    chevUp: <svg {...s} viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>,
    minus: <svg {...s} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    plus: <svg {...s} viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    trash: <svg {...s} viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    check: <svg {...s} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  };
  return I[name] || null;
}

/* ── Pedal placeholder ── */
function PedalGraphic({ seed = 0, height = 180 }) {
  const hues = [220, 240, 200, 260, 210, 250, 230, 190];
  const h = hues[seed % hues.length];
  const base = `hsl(${h}, 20%, 18%)`;
  const light = `hsl(${h}, 25%, 25%)`;
  return (
    <div style={{ width: "100%", height, background: `linear-gradient(145deg, ${base}, ${light})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "18%", display: "flex", gap: 16 }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${C.borderLight}` }} />)}
      </div>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 6px #ef444466", position: "absolute", top: "42%" }} />
      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `1.5px solid ${C.borderLight}`, position: "absolute", bottom: "14%" }} />
    </div>
  );
}

/* ── Shared ── */
const mono = "'IBM Plex Mono', 'Fira Code', monospace";
const sans = "'Barlow Condensed', 'Oswald', sans-serif";
const lbl = { fontFamily: mono, fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.textMuted };
const hdg = { fontFamily: sans, fontWeight: 600, color: C.white, textTransform: "uppercase", letterSpacing: "2px" };
const btnO = { fontFamily: mono, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase", padding: "14px 32px", background: "transparent", color: C.white, border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.3s" };

/* ══ NAV ══ */
function Nav({ cartCount, page, setPage, onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [userDropdown, setUserDropdown] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { if (searchOpen && searchRef.current) searchRef.current.focus(); }, [searchOpen]);

  // Check login state on every render (cheap localStorage read)
  useEffect(() => {
    const check = () => {
      try { const s = localStorage.getItem("aa_user"); setLoggedInUser(s ? JSON.parse(atob(s)) : null); } catch { setLoggedInUser(null); }
    };
    check();
    window.addEventListener("focus", check);
    const interval = setInterval(check, 2000);
    return () => { window.removeEventListener("focus", check); clearInterval(interval); };
  }, [page]);

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setUserDropdown(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const nl = (k, l, style = {}) => <button key={k} onClick={() => { setPage(k); setMob(false); setUserDropdown(false); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: mono, letterSpacing: "2px", textTransform: "uppercase", color: page === k ? C.white : C.textMuted, padding: "4px 0", transition: "color 0.3s", ...style }}>{l}</button>;

  const topLinkStyle = { fontSize: 11, letterSpacing: "1.5px" };
  const subLinkStyle = { fontSize: 12, letterSpacing: "2.5px" };

  const handleLogout = () => {
    localStorage.removeItem("aa_user");
    setLoggedInUser(null);
    setUserDropdown(false);
    setPage("home");
  };

  // User avatar button (logged in)
  const UserAvatar = ({ mobile = false }) => (
    <div ref={mobile ? null : dropdownRef} style={{ position: "relative" }}>
      <button onClick={() => mobile ? setPage("signin") : setUserDropdown(!userDropdown)} style={{
        background: "none", border: `1.5px solid ${C.borderLight}`, cursor: "pointer",
        width: mobile ? 28 : 32, height: mobile ? 28 : 32, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: sans, fontSize: mobile ? 12 : 14, fontWeight: 700, color: C.white,
        transition: "border-color 0.3s",
      }}
        onMouseOver={e => e.currentTarget.style.borderColor = C.accent}
        onMouseOut={e => e.currentTarget.style.borderColor = C.borderLight}
      >
        {loggedInUser.name.charAt(0).toUpperCase()}
      </button>

      {/* Desktop dropdown */}
      {!mobile && userDropdown && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          background: C.bgCard, border: `1px solid ${C.border}`,
          minWidth: 200, boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
          zIndex: 1001,
        }}>
          {/* User info header */}
          <div style={{ padding: "16px 18px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.white, fontWeight: 700 }}>{loggedInUser.name}</div>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.textDim, marginTop: 2 }}>{loggedInUser.email}</div>
          </div>
          {/* Menu items */}
          {[
            { label: "Order History", action: () => { setPage("signin"); setUserDropdown(false); } },
            { label: "Edit Profile", action: () => { setPage("profile"); setUserDropdown(false); } },
          ].map((item, i) => (
            <button key={i} onClick={item.action} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "12px 18px", background: "none", border: "none",
              fontFamily: mono, fontSize: 11, color: C.textMuted, letterSpacing: "1px",
              cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseOver={e => { e.target.style.background = "rgba(255,255,255,0.04)"; e.target.style.color = C.white; }}
              onMouseOut={e => { e.target.style.background = "none"; e.target.style.color = C.textMuted; }}
            >{item.label}</button>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            <button onClick={handleLogout} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "12px 18px", background: "none", border: "none",
              fontFamily: mono, fontSize: 11, color: "#ef4444", letterSpacing: "1px",
              cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseOver={e => e.target.style.background = "rgba(239,68,68,0.06)"}
              onMouseOut={e => e.target.style.background = "none"}
            >Sign Out</button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(21,26,37,0.97)" : "rgba(21,26,37,0.85)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`, transition: "all 0.4s" }}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px,4vw,48px)", height: 48, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: sans, fontSize: 22, fontWeight: 700, letterSpacing: "6px", color: C.white }}>ANALOGANGRIFF</button>
        <div className="dn" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {nl("about", "About", topLinkStyle)}
          {nl("contact", "Contact", topLinkStyle)}
          {loggedInUser ? <UserAvatar /> : nl("signin", "Sign In / Register", { ...topLinkStyle, fontWeight: 700, color: C.white })}
        </div>
        {/* Mobile hamburger */}
        <div className="mn" style={{ display: "none", alignItems: "center", gap: 12 }}>
          {loggedInUser && <UserAvatar mobile />}
          <button onClick={() => setPage("cart")} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
            <Icon name="cart" size={20} />
            {cartCount > 0 && <div style={{ position: "absolute", top: -4, right: -6, width: 16, height: 16, borderRadius: "50%", background: "#ef4444", fontFamily: mono, fontSize: 9, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</div>}
          </button>
          <button onClick={() => setMob(!mob)} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name={mob ? "x" : "menu"} size={22} /></button>
        </div>
      </div>

      {/* Sub row */}
      <div className="dn" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px,4vw,48px)", height: 44 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {nl("pcbs", "PCBs", subLinkStyle)}
          {nl("kits", "Kits", subLinkStyle)}
          {nl("components", "Components", subLinkStyle)}
          {nl("forum", "Forum", subLinkStyle)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${searchOpen ? C.borderLight : C.border}`, borderRadius: 4, padding: "5px 14px", cursor: "pointer", background: searchOpen ? C.bgCard : "transparent", transition: "all 0.3s", minWidth: searchOpen ? 220 : "auto" }}>
            <Icon name="search" size={14} />
            {searchOpen ? (
              <input ref={searchRef} value={searchVal} onChange={e => setSearchVal(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && searchVal.trim()) { onSearch(searchVal.trim()); setSearchOpen(false); setSearchVal(""); } if (e.key === "Escape") { setSearchOpen(false); setSearchVal(""); } }}
                onBlur={() => { if (!searchVal) setSearchOpen(false); }}
                placeholder="Search circuits..." style={{ background: "none", border: "none", outline: "none", color: C.white, fontFamily: mono, fontSize: 12, width: "100%" }} />
            ) : (
              <span onClick={() => setSearchOpen(true)} style={{ fontFamily: mono, fontSize: 11, color: C.textDim }}>Search...</span>
            )}
          </div>
          <button onClick={() => setPage("cart")} style={{ background: "none", border: "none", cursor: "pointer", position: "relative", padding: 4, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="cart" size={20} />
            <span style={{ fontFamily: mono, fontSize: 11, color: C.textMuted }}>{cartCount} items</span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mob && (
        <div style={{ position: "absolute", top: 48, left: 0, right: 0, background: "rgba(21,26,37,0.98)", borderBottom: `1px solid ${C.border}`, padding: "20px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontFamily: mono, fontSize: 9, color: C.textDim, letterSpacing: "3px", marginBottom: 4 }}>SHOP</div>
          {nl("pcbs", "PCBs", { fontSize: 13 })}
          {nl("kits", "Kits", { fontSize: 13 })}
          {nl("components", "Components", { fontSize: 13 })}
          <div style={{ height: 1, background: C.border, margin: "4px 0" }} />
          {nl("forum", "Forum", { fontSize: 13 })}
          {nl("about", "About", { fontSize: 13 })}
          {nl("contact", "Contact", { fontSize: 13 })}
          <div style={{ height: 1, background: C.border, margin: "4px 0" }} />
          {loggedInUser ? (
            <>
              {nl("signin", "My Orders", { fontSize: 13 })}
              {nl("profile", "Edit Profile", { fontSize: 13 })}
              <button onClick={() => { handleLogout(); setMob(false); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: mono, fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", color: "#ef4444", padding: "4px 0", textAlign: "left" }}>Sign Out</button>
            </>
          ) : (
            nl("signin", "Sign In / Register", { fontSize: 13, fontWeight: 700, color: C.white })
          )}
        </div>
      )}
    </nav>
  );
}

/* ══ HERO ══ */
function Hero({ setPage }) {
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "140px 24px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 30%, rgba(40,55,90,0.4) 0%, transparent 60%), linear-gradient(180deg, #0f1420 0%, ${C.bg} 50%, ${C.bgLight} 100%)` }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `linear-gradient(${C.accent} 1px, transparent 1px), linear-gradient(90deg, ${C.accent} 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "min(700px,80vw)", height: "min(420px,50vw)", background: "linear-gradient(135deg, rgba(30,40,60,0.6), rgba(20,28,45,0.4))", borderRadius: 8, border: `1px solid ${C.border}`, boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ fontFamily: sans, fontSize: "clamp(48px,10vw,100px)", fontWeight: 700, letterSpacing: "8px", color: C.white, lineHeight: 1, margin: "0 0 24px" }}>ANALOG ANGRIFF</h1>
        <p style={{ fontFamily: mono, fontSize: "clamp(13px,1.4vw,16px)", color: C.textMuted, maxWidth: 600, lineHeight: 1.7, margin: "0 auto 48px" }}>Premium DIY guitar pedal kits engineered for the Indian musician. Build your sound from the circuit up.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage("shop")} style={{ ...btnO, background: C.white, color: C.bg, border: "none", fontWeight: 700 }}>BROWSE CATALOG</button>
          <button onClick={() => setPage("about")} style={btnO}>OUR STORY</button>
        </div>
      </div>
      <div onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })} style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", opacity: 0.6, transition: "opacity 0.3s" }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.6}>
        <span style={{ ...lbl, fontSize: 9, letterSpacing: "4px" }}>EXPLORE GEAR</span>
        <Icon name="arrowDown" size={18} />
      </div>
    </section>
  );
}

/* ══ FEATURED HOME SECTIONS ══ */
function FeaturedRow({ title, products, addToCart }) {
  const [off, setOff] = useState(0);
  const v = 4, mx = Math.max(0, products.length - v);
  return (
    <div style={{ marginBottom: 48 }}>
      <h3 style={{ fontFamily: sans, fontSize: 22, fontWeight: 600, color: C.white, letterSpacing: "1px", marginBottom: 20 }}>{title}</h3>
      <div style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(v, products.length)},1fr)`, gap: 18 }}>
          {products.slice(off, off + v).map(p => (
            <div key={p.id} style={{ background: C.bgCard, border: `1px solid ${C.border}`, overflow: "hidden", cursor: "pointer" }} onClick={() => addToCart(p)}>
              <PedalGraphic seed={p.id} height={150} />
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: C.white, textTransform: "uppercase", marginBottom: 3, lineHeight: 1.4 }}>{p.name}</div>
                <div style={{ fontFamily: mono, fontSize: 10, color: C.textDim, marginBottom: 6 }}>{p.ref}</div>
                <div style={{ fontFamily: mono, fontSize: 13, color: C.textMuted }}>{"\u20B9"}{p.price.toLocaleString("en-IN")}</div>
              </div>
            </div>
          ))}
        </div>
        {products.length > v && <>
          <button onClick={() => setOff(Math.max(0, off - 1))} style={{ position: "absolute", left: -16, top: "28%", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: off === 0 ? 0.3 : 1 }}><Icon name="arrowLeft" size={15} /></button>
          <button onClick={() => setOff(Math.min(mx, off + 1))} style={{ position: "absolute", right: -16, top: "28%", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: off >= mx ? 0.3 : 1 }}><Icon name="arrowRight" size={15} /></button>
        </>}
      </div>
    </div>
  );
}

function HomeFeatured({ addToCart }) {
  return (
    <section id="featured" style={{ padding: "60px clamp(16px,4vw,48px)", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "stretch", gap: 16, marginBottom: 48 }}>
        <div style={{ width: 3, background: C.white }} />
        <div>
          <h2 style={{ ...hdg, fontSize: "clamp(32px,5vw,48px)", margin: 0 }}>FEATURED CIRCUITS</h2>
          <p style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, marginTop: 12, maxWidth: 500, lineHeight: 1.7 }}>High-fidelity analog clones and original designs for the modern pedalboard.</p>
        </div>
      </div>
      <FeaturedRow title="Newest Releases" products={PRODUCTS.filter(p => p.tag === "New")} addToCart={addToCart} />
      <FeaturedRow title="Popular Projects" products={PRODUCTS.filter(p => ["Popular", "Bestseller"].includes(p.tag))} addToCart={addToCart} />
    </section>
  );
}

/* ══ SIGNAL PATH ══ */
function SignalPath() {
  return (
    <section style={{ padding: "80px clamp(16px,4vw,48px)", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ ...hdg, fontSize: "clamp(28px,4vw,40px)", marginBottom: 12 }}>THE SIGNAL PATH</h2>
      <p style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, maxWidth: 520, margin: "0 auto 56px", lineHeight: 1.7 }}>From raw components to legendary tone.</p>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap" }}>
        {STEPS.map((st, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 180 }}>
              <div style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.border}`, borderRadius: 4, marginBottom: 16 }}><Icon name={st.icon} size={24} /></div>
              <div style={{ fontFamily: mono, fontSize: 13, color: C.accent, fontWeight: 700, marginBottom: 6 }}>{st.num}. {st.title}</div>
              <p style={{ fontFamily: mono, fontSize: 11, color: C.textDim, lineHeight: 1.6, margin: 0, padding: "0 8px" }}>{st.desc}</p>
            </div>
            {i < 3 && <div style={{ width: 40, height: 1, background: C.border, marginTop: 28, flexShrink: 0 }} />}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: `1px solid ${C.border}`, marginTop: 56 }}>
        {[["SPEC-01:", "WIMA CAPACITORS"], ["SPEC-02:", "NEUTRIK JACKS"], ["SPEC-03:", "ALPHA POTS"]].map(([a, b], i) => (
          <div key={i} style={{ padding: "20px 16px", borderRight: i < 2 ? `1px solid ${C.border}` : "none", fontFamily: mono, fontSize: 11, color: C.textDim, letterSpacing: "2px", textAlign: "center" }}>{a} {b}</div>
        ))}
      </div>
    </section>
  );
}

/* ══ FILTER COMPONENTS ══ */
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 24 }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "8px 0" }}>
        <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: C.white, letterSpacing: "1px" }}>{title}</span>
        <Icon name={open ? "chevUp" : "chevDown"} size={16} />
      </button>
      {open && <div style={{ paddingTop: 10 }}>{children}</div>}
    </div>
  );
}
function Chk({ checked, onChange, label: l }) {
  return <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9, cursor: "pointer", fontFamily: mono, fontSize: 12, color: C.textMuted }}>
    <div onClick={onChange} style={{ width: 16, height: 16, border: `1.5px solid ${checked ? "#4a9eff" : C.border}`, borderRadius: 2, background: checked ? "#4a9eff" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}>
      {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
    </div>{l}
  </label>;
}
function Rad({ checked, onChange, label: l }) {
  return <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9, cursor: "pointer", fontFamily: mono, fontSize: 12, color: C.textMuted }}>
    <div onClick={onChange} style={{ width: 16, height: 16, border: `1.5px solid ${checked ? "#4a9eff" : C.border}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}>
      {checked && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4a9eff" }} />}
    </div>{l}
  </label>;
}

/* ══ SHOP ══ */
function ShopPage({ addToCart, initialType = "", initialSearch = "", searchId = 0 }) {
  const [search, setSearch] = useState(initialSearch);
  const [eCat, setECat] = useState([]);
  const [tFilt, setTFilt] = useState(initialType ? [initialType] : []);
  const [diff, setDiff] = useState("Any");
  const [sort, setSort] = useState("featured");
  const [mobF, setMobF] = useState(false);

  // Sync search when nav search changes (fixes re-search from any page)
  useEffect(() => { setSearch(initialSearch); }, [initialSearch, searchId]);
  useEffect(() => { setTFilt(initialType ? [initialType] : []); }, [initialType]);

  const togE = c => setECat(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  const togT = c => setTFilt(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);

  let res = PRODUCTS.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.ref.toLowerCase().includes(search.toLowerCase())) return false;
    if (eCat.length > 0 && !eCat.includes(p.effectCat)) return false;
    if (tFilt.length > 0 && !tFilt.includes(p.type)) return false;
    if (diff !== "Any") { const di = DIFFICULTY_LEVELS.indexOf(diff), pi = DIFFICULTY_LEVELS.indexOf(p.difficulty); if (pi > di) return false; }
    return true;
  });
  if (sort === "low") res.sort((a, b) => a.price - b.price);
  else if (sort === "high") res.sort((a, b) => b.price - a.price);
  else if (sort === "name") res.sort((a, b) => a.name.localeCompare(b.name));

  const ac = eCat.length + tFilt.length + (diff !== "Any" ? 1 : 0);
  const clearAll = () => { setECat([]); setTFilt([]); setDiff("Any"); setSearch(""); };

  const Sidebar = () => <>
    <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 4, padding: "8px 12px", marginBottom: 24, background: C.bgCard }}>
      <Icon name="search" size={16} />
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." style={{ flex: 1, background: "none", border: "none", outline: "none", color: C.white, fontFamily: mono, fontSize: 12, marginLeft: 8 }} />
    </div>
    <FilterSection title="Categories">
      {EFFECT_CATEGORIES.map(c => <Chk key={c} checked={eCat.includes(c)} onChange={() => togE(c)} label={c} />)}
    </FilterSection>
    <FilterSection title="Project Type">
      <Chk checked={tFilt.length === 0} onChange={() => setTFilt([])} label="Any" />
      {PRODUCT_TYPES.map(t => <Chk key={t} checked={tFilt.includes(t)} onChange={() => togT(t)} label={t} />)}
    </FilterSection>
    <FilterSection title="Maximum Build Difficulty">
      <Rad checked={diff === "Any"} onChange={() => setDiff("Any")} label="Any" />
      {DIFFICULTY_LEVELS.map(d => <Rad key={d} checked={diff === d} onChange={() => setDiff(d)} label={d} />)}
    </FilterSection>
    {ac > 0 && <button onClick={clearAll} style={{ fontFamily: mono, fontSize: 11, color: "#ef4444", background: "none", border: "none", cursor: "pointer", letterSpacing: "1px", padding: "8px 0" }}>CLEAR ALL FILTERS ({ac})</button>}
  </>;

  return (
    <section style={{ paddingTop: 92 }}>
      <div style={{ textAlign: "center", padding: "64px 24px 48px", borderBottom: `1px solid ${C.border}` }}>
        <h1 style={{ ...hdg, fontSize: "clamp(36px,6vw,56px)", marginBottom: 16 }}>CIRCUIT CATALOG</h1>
        <div style={{ fontFamily: mono, fontSize: 11, color: C.textDim, letterSpacing: "3px", marginBottom: 20 }}>HOME / SHOP / DIY KITS / ANALOG CIRCUITS</div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px clamp(16px,4vw,48px)" }}>
        <div className="mfb"><button onClick={() => setMobF(!mobF)} style={{ ...btnO, width: "100%", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 16px" }}><Icon name="sliders" size={16} /> FILTERS {ac > 0 ? `(${ac})` : ""}</button></div>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 40 }} className="sg">
          <div className="sb" style={{ borderRight: `1px solid ${C.border}`, paddingRight: 32 }}><Sidebar /></div>
          {mobF && <div className="ms" style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex" }}>
            <div style={{ flex: 1, background: "rgba(0,0,0,0.5)" }} onClick={() => setMobF(false)} />
            <div style={{ width: 300, background: C.bg, padding: 24, overflowY: "auto", borderLeft: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <span style={{ fontFamily: mono, fontSize: 14, color: C.white, fontWeight: 700, letterSpacing: "2px" }}>FILTERS</span>
                <button onClick={() => setMobF(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="x" size={20} /></button>
              </div>
              <Sidebar />
            </div>
          </div>}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <span style={{ fontFamily: sans, fontSize: 18, fontWeight: 600, color: C.white, letterSpacing: "1px" }}>Pedal Kits & Components</span>
                <span style={{ fontFamily: mono, fontSize: 11, color: C.textDim, marginLeft: 12 }}>{res.length} results</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: mono, fontSize: 11, color: C.textDim }}>Sort by</span>
                <select value={sort} onChange={e => setSort(e.target.value)} style={{ fontFamily: mono, fontSize: 12, background: C.bgCard, color: C.textMuted, border: `1px solid ${C.border}`, padding: "6px 12px", borderRadius: 3, outline: "none" }}>
                  <option value="featured">Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>
            {res.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <div style={{ fontFamily: mono, fontSize: 14, color: C.textDim, marginBottom: 12 }}>No circuits match your filters.</div>
                <button onClick={clearAll} style={{ fontFamily: mono, fontSize: 12, color: "#4a9eff", background: "none", border: "none", cursor: "pointer" }}>Clear all filters</button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                {res.map(p => (
                  <div key={p.id} style={{ background: C.bgCard, border: `1px solid ${C.border}`, overflow: "hidden", transition: "border-color 0.3s" }}
                    onMouseOver={e => e.currentTarget.style.borderColor = C.borderLight}
                    onMouseOut={e => e.currentTarget.style.borderColor = C.border}>
                    <PedalGraphic seed={p.id} height={140} />
                    <div style={{ padding: "12px 14px" }}>
                      {p.tag && <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: "2px", color: p.tag === "New" ? "#4ade80" : p.tag === "Bestseller" ? "#f59e0b" : "#60a5fa", marginBottom: 4, textTransform: "uppercase" }}>{p.tag}</div>}
                      <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: C.white, textTransform: "uppercase", marginBottom: 2, lineHeight: 1.4 }}>{p.name}</div>
                      <div style={{ fontFamily: mono, fontSize: 10, color: C.textDim, marginBottom: 2 }}>{p.ref}</div>
                      <div style={{ display: "flex", gap: 4, marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: mono, fontSize: 9, color: C.textDim, background: "rgba(255,255,255,0.05)", padding: "2px 5px", borderRadius: 2 }}>{p.type}</span>
                        <span style={{ fontFamily: mono, fontSize: 9, color: C.textDim, background: "rgba(255,255,255,0.05)", padding: "2px 5px", borderRadius: 2 }}>{p.difficulty}</span>
                      </div>
                      <div style={{ fontFamily: mono, fontSize: 14, color: C.accent, fontWeight: 700, marginBottom: 10 }}>{"\u20B9"}{p.price.toLocaleString("en-IN")}</div>
                      <button onClick={() => addToCart(p)} style={{ width: "100%", fontFamily: mono, fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", padding: "9px 0", background: "transparent", color: C.accent, border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.3s" }}
                        onMouseOver={e => { e.target.style.background = C.white; e.target.style.color = C.bg; }}
                        onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.color = C.accent; }}>
                        {p.type === "PCB" ? "ADD PCB" : p.type === "Full Kit" ? "INITIALIZE BUILD" : "ADD TO CART"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ CART ══ */
function CartPage({ cart, updateQty, removeFromCart, setPage }) {
  const tot = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  if (!cart.length) return <section style={{ paddingTop: 140, textAlign: "center", maxWidth: 500, margin: "0 auto", padding: "140px 24px 80px" }}><Icon name="cart" size={48} /><h2 style={{ ...hdg, fontSize: 28, margin: "24px 0 12px" }}>Cart is empty</h2><p style={{ fontFamily: mono, fontSize: 12, color: C.textMuted, marginBottom: 32 }}>Select a circuit to begin.</p><button onClick={() => setPage("shop")} style={{ ...btnO, background: C.white, color: C.bg }}>BROWSE CATALOG</button></section>;
  return (
    <section style={{ paddingTop: 100, maxWidth: 700, margin: "0 auto", padding: "100px 24px 80px" }}>
      <h1 style={{ ...hdg, fontSize: 32, marginBottom: 40 }}>YOUR BUILD QUEUE</h1>
      {cart.map(({ product: p, qty }) => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", borderBottom: `1px solid ${C.border}`, flexWrap: "wrap", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 180 }}><div style={{ fontFamily: mono, fontSize: 13, color: C.white, fontWeight: 700 }}>{p.name}</div><div style={{ fontFamily: mono, fontSize: 10, color: C.textDim }}>{p.type} {"\u00B7"} {p.ref}</div></div>
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
      <div style={{ display: "flex", justifyContent: "space-between", padding: "24px 0" }}><span style={lbl}>TOTAL</span><span style={{ fontFamily: mono, fontSize: 22, color: C.white, fontWeight: 700 }}>{"\u20B9"}{tot.toLocaleString("en-IN")}</span></div>
      <button onClick={() => setPage("checkout")} style={{ width: "100%", ...btnO, background: C.white, color: C.bg, fontWeight: 700, textAlign: "center" }}>PROCEED TO CHECKOUT</button>
    </section>
  );
}

/* ══ CHECKOUT ══ */
function CheckoutPage({ cart, setPage }) {
  const [f, sF] = useState({ name: "", phone: "", address: "", utr: "" });
  const [done, setDone] = useState(false);
  const tot = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const iS = { width: "100%", background: C.bgCard, border: `1px solid ${C.border}`, color: C.white, fontFamily: mono, fontSize: 13, padding: "12px 16px", outline: "none", boxSizing: "border-box", borderRadius: 2 };

  // Auto-fill from saved profile
  useEffect(() => {
    try {
      const stored = localStorage.getItem("aa_user");
      if (stored) {
        const user = JSON.parse(atob(stored));
        sF(prev => ({
          name: user.name || prev.name,
          phone: user.phone || prev.phone,
          address: user.address || prev.address,
          utr: prev.utr,
        }));
      }
    } catch (e) { /* no saved user */ }
  }, []);

  const handleConfirm = () => {
    // Save order to history
    try {
      const order = {
        id: Date.now().toString(36).toUpperCase(),
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        items: cart.map(({ product: p, qty }) => ({ name: p.name, type: p.type, price: p.price, qty })),
        total: tot,
        status: "Pending Verification",
      };
      const existing = (() => { try { const s = localStorage.getItem("aa_orders"); return s ? JSON.parse(atob(s)) : []; } catch { return []; } })();
      existing.unshift(order);
      localStorage.setItem("aa_orders", btoa(JSON.stringify(existing.slice(0, 50))));
    } catch (e) { /* order save failed, non-critical */ }
    setDone(true);
  };
  if (done) return <section style={{ paddingTop: 160, textAlign: "center", maxWidth: 500, margin: "0 auto", padding: "160px 24px 80px" }}><div style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}><Icon name="check" size={28} /></div><h2 style={{ ...hdg, fontSize: 28, marginBottom: 12 }}>Order Received</h2><p style={{ fontFamily: mono, fontSize: 12, color: C.textMuted, lineHeight: 1.8, marginBottom: 32 }}>{"We'll verify payment and confirm via WhatsApp."}</p><button onClick={() => setPage("home")} style={{ ...btnO, background: C.white, color: C.bg }}>BACK TO HOME</button></section>;
  return (
    <section style={{ paddingTop: 100, maxWidth: 600, margin: "0 auto", padding: "100px 24px 80px" }}>
      <h1 style={{ ...hdg, fontSize: 32, marginBottom: 40 }}>CHECKOUT</h1>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: 24, marginBottom: 32 }}>
        <div style={{ ...lbl, marginBottom: 16 }}>ORDER SUMMARY</div>
        {cart.map(({ product: p, qty }) => <div key={p.id} style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 12, color: C.textMuted, marginBottom: 8 }}><span>{p.name} ({p.type}) {"\u00D7"} {qty}</span><span>{"\u20B9"}{(p.price * qty).toLocaleString("en-IN")}</span></div>)}
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 16, color: C.white, fontWeight: 700, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}><span>TOTAL</span><span>{"\u20B9"}{tot.toLocaleString("en-IN")}</span></div>
      </div>
      <div style={{ border: `1px solid ${C.borderLight}`, padding: 32, textAlign: "center", marginBottom: 32 }}>
        <div style={{ ...lbl, color: C.accent, marginBottom: 20 }}>STEP 01 {"\u2014"} PAY VIA UPI</div>
        <div style={{ width: 150, height: 150, margin: "0 auto 16px", background: "#fff", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "80%", height: "80%", border: "2px dashed #bbb", borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <span style={{ fontSize: 24 }}>{"\u{1F4F1}"}</span><span style={{ fontFamily: mono, fontSize: 9, color: "#888" }}>UPI QR here</span>
          </div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.textMuted }}>UPI ID: <span style={{ color: C.white }}>yourname@upi</span></div>
      </div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ ...lbl, color: C.accent, marginBottom: 24 }}>STEP 02 {"\u2014"} SHIPPING DETAILS</div>
        {[["name", "Full Name", "Rahul Sharma", "text"], ["phone", "WhatsApp Number", "+91 98765 43210", "tel"]].map(([k, l, p, t]) => <div key={k} style={{ marginBottom: 20 }}><label style={{ display: "block", ...lbl, fontSize: 10, marginBottom: 8 }}>{l}</label><input type={t} value={f[k]} onChange={e => sF(x => ({ ...x, [k]: e.target.value }))} placeholder={p} style={iS} /></div>)}
        <div style={{ marginBottom: 20 }}><label style={{ display: "block", ...lbl, fontSize: 10, marginBottom: 8 }}>Shipping Address</label><textarea value={f.address} onChange={e => sF(x => ({ ...x, address: e.target.value }))} placeholder="House, street, city, state, PIN" rows={3} style={{ ...iS, resize: "vertical" }} /></div>
        <div><label style={{ display: "block", ...lbl, fontSize: 10, marginBottom: 8 }}>UTR / Transaction ID</label><input type="text" value={f.utr} onChange={e => sF(x => ({ ...x, utr: e.target.value }))} placeholder="From your UPI app" style={iS} /></div>
      </div>
      <button onClick={handleConfirm} style={{ width: "100%", ...btnO, background: C.white, color: C.bg, fontWeight: 700, textAlign: "center", border: "none", marginBottom: 12 }}>CONFIRM ORDER</button>
      <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", fontFamily: mono, fontSize: 11, color: "#25D366", padding: 14, border: "1px solid rgba(37,211,102,0.3)", textDecoration: "none", letterSpacing: "1px" }}>{"\u{1F4AC}"} MESSAGE ON WHATSAPP</a>
    </section>
  );
}

/* ══ ABOUT PAGE ══ */
function AboutPage() {
  return (
    <section style={{ paddingTop: 120, maxWidth: 800, margin: "0 auto", padding: "120px 24px 80px" }}>
      {/* Page header banner */}
      <div style={{ textAlign: "center", padding: "40px 24px 48px", marginBottom: 48, borderBottom: `1px solid ${C.border}`, background: `linear-gradient(180deg, rgba(40,55,90,0.2) 0%, transparent 100%)`, margin: "-20px -24px 48px", padding: "60px 24px 48px" }}>
        <h1 style={{ ...hdg, fontSize: "clamp(36px,6vw,52px)", marginBottom: 0 }}>About</h1>
      </div>

      <div style={{ maxWidth: 650, margin: "0 auto" }}>
        <h2 style={{ fontFamily: sans, fontSize: 32, fontWeight: 600, color: C.white, letterSpacing: "1px", marginBottom: 32 }}>Why we exist</h2>

        <div style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, lineHeight: 2 }}>
          <p style={{ marginBottom: 20 }}>
            Analog Angriff started because buying guitar pedals in India is expensive, and building
            them from scratch is confusing {"\u2014"} sourcing components from five different shops, decoding
            cryptic schematics, hoping the PCB you etched actually works.
          </p>
          <p style={{ marginBottom: 20 }}>
            We package everything you need into a single kit: a proper through-hole PCB, every
            component sorted and labeled, a pre-drilled enclosure, and a build guide that assumes
            {"you've"} never soldered before.
          </p>
          <p style={{ marginBottom: 20 }}>
            Every circuit we sell is based on proven, classic designs {"\u2014"} Tube Screamers, Klon
            variants, PT2399 delays, Big Muff fuzzes {"\u2014"} tweaked for reliability with modern,
            easily-sourced components.
          </p>
          <p style={{ color: C.accent, borderLeft: `3px solid ${C.accent}`, paddingLeft: 20, marginTop: 32, marginBottom: 32, fontStyle: "italic" }}>
            {'"Angriff" is German for "attack." It\'s the front edge of your signal. The moment pick meets string and electrons start moving. We\'re here to help you shape what happens next.'}
          </p>
        </div>

        {/* What's in a kit */}
        <div style={{ marginTop: 48, padding: 32, background: C.bgCard, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: 20, textTransform: "uppercase" }}>{"What's in every kit"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {["Through-hole PCB", "All resistors & capacitors", "Semiconductors (ICs, diodes, transistors)", "Potentiometers & knobs", "Pre-drilled enclosure", "Jacks, switches & LED", "Hook-up wire", "Step-by-step build guide (PDF)"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: mono, fontSize: 11, color: C.textMuted }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Quality specs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 32 }}>
          {[
            { label: "PCB Finish", value: "HASL Lead-Free" },
            { label: "Board Thickness", value: "1.6mm FR4" },
            { label: "Components", value: "Through-Hole" },
          ].map((spec, i) => (
            <div key={i} style={{ padding: 20, background: C.bgCard, border: `1px solid ${C.border}`, textAlign: "center" }}>
              <div style={{ fontFamily: mono, fontSize: 9, color: C.textDim, letterSpacing: "2px", marginBottom: 8, textTransform: "uppercase" }}>{spec.label}</div>
              <div style={{ fontFamily: mono, fontSize: 13, color: C.white, fontWeight: 700 }}>{spec.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ CONTACT PAGE ══ */
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const inputStyle = { width: "100%", background: C.bgCard, border: `1px solid ${C.border}`, color: C.white, fontFamily: mono, fontSize: 13, padding: "12px 16px", outline: "none", boxSizing: "border-box", borderRadius: 2 };

  return (
    <section style={{ paddingTop: 120, maxWidth: 800, margin: "0 auto", padding: "120px 24px 80px" }}>
      {/* Page header banner */}
      <div style={{ textAlign: "center", padding: "40px 24px 48px", marginBottom: 48, borderBottom: `1px solid ${C.border}`, background: `linear-gradient(180deg, rgba(40,55,90,0.2) 0%, transparent 100%)`, margin: "-20px -24px 48px", padding: "60px 24px 48px" }}>
        <h1 style={{ ...hdg, fontSize: "clamp(36px,6vw,52px)", marginBottom: 0 }}>Contact</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 700, margin: "0 auto" }}>
        {/* Contact info */}
        <div>
          <h3 style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: C.white, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 24 }}>Get in touch</h3>
          <div style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, lineHeight: 2.2 }}>
            <div>{"\u{1F4E7}"} <a href="mailto:hello@analogangriff.com" style={{ color: C.accent, textDecoration: "none" }}>hello@analogangriff.com</a></div>
            <div>{"\u{1F4AC}"} <a href="https://wa.me/91XXXXXXXXXX" style={{ color: "#25D366", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
            <div>{"\u{1F4F7}"} <a href="#" style={{ color: C.accent, textDecoration: "none" }}>@analogangriff</a> on Instagram</div>
          </div>
          <div style={{ marginTop: 32, padding: 20, background: C.bgCard, border: `1px solid ${C.border}` }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.textDim, letterSpacing: "2px", marginBottom: 8, textTransform: "uppercase" }}>Response Time</div>
            <div style={{ fontFamily: mono, fontSize: 13, color: C.white }}>Usually within a few hours on WhatsApp. Email replies within 24 hours.</div>
          </div>
          <div style={{ marginTop: 16, padding: 20, background: C.bgCard, border: `1px solid ${C.border}` }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.textDim, letterSpacing: "2px", marginBottom: 8, textTransform: "uppercase" }}>Location</div>
            <div style={{ fontFamily: mono, fontSize: 13, color: C.white }}>Bengaluru, India</div>
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h3 style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: C.white, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 24 }}>Send a message</h3>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", border: `2px solid ${C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Icon name="check" size={24} /></div>
              <div style={{ fontFamily: mono, fontSize: 13, color: C.textMuted }}>{"Message sent! We'll get back to you soon."}</div>
            </div>
          ) : (
            <>
              {[
                { k: "name", l: "Name", p: "Your name", t: "text" },
                { k: "email", l: "Email", p: "you@email.com", t: "email" },
                { k: "subject", l: "Subject", p: "Build help, order inquiry, etc.", t: "text" },
              ].map(f => (
                <div key={f.k} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontFamily: mono, fontSize: 10, color: C.textDim, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>{f.l}</label>
                  <input type={f.t} value={form[f.k]} onChange={e => set(f.k, e.target.value)} placeholder={f.p} style={inputStyle} />
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontFamily: mono, fontSize: 10, color: C.textDim, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Message</label>
                <textarea value={form.message} onChange={e => set("message", e.target.value)} placeholder="How can we help?" rows={5} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: "100%", ...btnO, background: C.white, color: C.bg, fontWeight: 700, textAlign: "center", border: "none" }}>SEND MESSAGE</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ══ PLACEHOLDER ══ */
function Placeholder({ title, desc }) {
  return <section style={{ paddingTop: 140, textAlign: "center", maxWidth: 600, margin: "0 auto", padding: "140px 24px 80px" }}><h1 style={{ ...hdg, fontSize: 36, marginBottom: 16 }}>{title}</h1><p style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, lineHeight: 1.8 }}>{desc}</p></section>;
}

/* ══ ACCOUNT PAGE — Orders view (default when clicking avatar) ══ */
function AccountPage({ setPage, view = "orders" }) {
  const [mode, setMode] = useState("login");
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", pin: "" });
  const [loginForm, setLoginForm] = useState({ email: "", pin: "" });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aa_user");
      if (stored) { const parsed = JSON.parse(atob(stored)); setUser(parsed); setForm(parsed); setMode(view === "profile" ? "profile" : "orders"); }
    } catch (e) {}
  }, [view]);

  const [orders, setOrders] = useState([]);
  useEffect(() => { try { const s = localStorage.getItem("aa_orders"); if (s) setOrders(JSON.parse(atob(s))); } catch (e) {} }, []);

  const saveUser = (data) => { localStorage.setItem("aa_user", btoa(JSON.stringify(data))); setUser(data); setForm(data); setMode("orders"); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const handleRegister = () => {
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.pin.trim()) { setError("Name, email, phone, and PIN are all required."); return; }
    if (form.pin.length < 4) { setError("PIN must be at least 4 characters."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Enter a valid email address."); return; }
    if (!/^[\+]?[0-9\s\-]{10,15}$/.test(form.phone.replace(/\s/g, ""))) { setError("Enter a valid phone number."); return; }
    saveUser({ ...form });
  };

  const handleLogin = () => {
    setError("");
    try {
      const stored = localStorage.getItem("aa_user");
      if (!stored) { setError("No account found. Please register first."); return; }
      const parsed = JSON.parse(atob(stored));
      if (parsed.email.toLowerCase() !== loginForm.email.toLowerCase() || parsed.pin !== loginForm.pin) { setError("Email or PIN does not match."); return; }
      setUser(parsed); setForm(parsed); setMode("orders");
    } catch (e) { setError("No account found. Please register first."); }
  };

  const handleUpdate = () => {
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) { setError("Name, email, and phone are required."); return; }
    saveUser({ ...form });
  };

  const handleDeleteAccount = () => { localStorage.removeItem("aa_user"); localStorage.removeItem("aa_orders"); setUser(null); setOrders([]); setForm({ name: "", email: "", phone: "", address: "", pin: "" }); setMode("login"); };

  const iS = { width: "100%", background: C.bgCard, border: `1px solid ${C.border}`, color: C.white, fontFamily: mono, fontSize: 13, padding: "12px 16px", outline: "none", boxSizing: "border-box", borderRadius: 2 };
  const labelS = { display: "block", fontFamily: mono, fontSize: 10, color: C.textDim, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 };

  // ── ORDERS VIEW ──
  if (mode === "orders" && user) {
    return (
      <section style={{ paddingTop: 120, maxWidth: 750, margin: "0 auto", padding: "120px 24px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", border: `2px solid ${C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sans, fontSize: 22, fontWeight: 700, color: C.white }}>{user.name.charAt(0).toUpperCase()}</div>
            <div>
              <div style={{ fontFamily: sans, fontSize: 20, fontWeight: 600, color: C.white, letterSpacing: "1px" }}>{user.name}</div>
              <div style={{ fontFamily: mono, fontSize: 11, color: C.textDim }}>{user.email}</div>
            </div>
          </div>
          <button onClick={() => setMode("profile")} style={{ ...btnO, fontSize: 10, padding: "10px 20px" }}>EDIT PROFILE</button>
        </div>
        {saved && <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", padding: "12px 20px", marginBottom: 24, fontFamily: mono, fontSize: 12, color: "#4ade80", textAlign: "center", letterSpacing: "1px" }}>PROFILE SAVED</div>}
        <h2 style={{ ...hdg, fontSize: 22, marginBottom: 24 }}>ORDER HISTORY</h2>
        {orders.length === 0 ? (
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "48px 24px", textAlign: "center" }}>
            <Icon name="package" size={40} />
            <div style={{ fontFamily: mono, fontSize: 14, color: C.textMuted, marginTop: 16, marginBottom: 20 }}>No orders yet</div>
            <button onClick={() => setPage("shop")} style={{ ...btnO, background: C.white, color: C.bg, fontWeight: 700, border: "none", fontSize: 11 }}>BROWSE CATALOG</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {orders.map((order, i) => (
              <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                  <div><span style={{ fontFamily: mono, fontSize: 13, color: C.white, fontWeight: 700 }}>Order #{order.id}</span><span style={{ fontFamily: mono, fontSize: 11, color: C.textDim, marginLeft: 12 }}>{order.date}</span></div>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "2px", padding: "4px 10px", background: order.status === "Confirmed" ? "rgba(74,222,128,0.1)" : "rgba(250,204,21,0.1)", color: order.status === "Confirmed" ? "#4ade80" : "#facc15", border: `1px solid ${order.status === "Confirmed" ? "rgba(74,222,128,0.2)" : "rgba(250,204,21,0.2)"}` }}>{order.status.toUpperCase()}</span>
                </div>
                {order.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 12, color: C.textMuted, marginBottom: 6 }}><span>{item.name} ({item.type}) {"\u00D7"} {item.qty}</span><span>{"\u20B9"}{(item.price * item.qty).toLocaleString("en-IN")}</span></div>
                ))}
                <div style={{ display: "flex", justifyContent: "flex-end", fontFamily: mono, fontSize: 15, color: C.white, fontWeight: 700, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>{"\u20B9"}{order.total.toLocaleString("en-IN")}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  // ── PROFILE EDIT VIEW ──
  if (mode === "profile" && user) {
    return (
      <section style={{ paddingTop: 120, maxWidth: 600, margin: "0 auto", padding: "120px 24px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <button onClick={() => setMode("orders")} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="arrowLeft" size={20} /></button>
          <h1 style={{ ...hdg, fontSize: 22, margin: 0 }}>EDIT PROFILE</h1>
        </div>
        {saved && <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", padding: "12px 20px", marginBottom: 24, fontFamily: mono, fontSize: 12, color: "#4ade80", textAlign: "center" }}>CHANGES SAVED</div>}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: 28, marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><label style={labelS}>Full Name *</label><input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={iS} /></div>
            <div><label style={labelS}>Email *</label><input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={iS} /></div>
            <div><label style={labelS}>WhatsApp Number *</label><input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 98765 43210" style={iS} /></div>
            <div><label style={labelS}>PIN (for login)</label><input type="password" value={form.pin} onChange={e => setForm(p => ({ ...p, pin: e.target.value }))} style={iS} /></div>
          </div>
          <div style={{ marginTop: 16 }}><label style={labelS}>Shipping Address</label><textarea value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="House/flat, street, city, state, PIN code" rows={3} style={{ ...iS, resize: "vertical" }} /></div>
          {error && <div style={{ fontFamily: mono, fontSize: 11, color: "#ef4444", marginTop: 12 }}>{error}</div>}
          <button onClick={handleUpdate} style={{ ...btnO, background: C.white, color: C.bg, fontWeight: 700, border: "none", marginTop: 20, width: "100%", textAlign: "center" }}>SAVE CHANGES</button>
        </div>
        <div style={{ background: "rgba(239,68,68,0.03)", border: "1px solid rgba(239,68,68,0.15)", padding: 24 }}>
          <h3 style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: "#ef4444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>DANGER ZONE</h3>
          <p style={{ fontFamily: mono, fontSize: 11, color: C.textDim, marginBottom: 16 }}>Permanently delete your account and all order history from this device.</p>
          <button onClick={handleDeleteAccount} style={{ ...btnO, fontSize: 10, padding: "10px 20px", color: "#ef4444", borderColor: "rgba(239,68,68,0.3)" }}>DELETE ACCOUNT</button>
        </div>
      </section>
    );
  }

  // ── LOGIN / REGISTER VIEW ──
  return (
    <section style={{ paddingTop: 120, maxWidth: 440, margin: "0 auto", padding: "120px 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><Icon name="sliders" size={24} /></div>
        <h1 style={{ ...hdg, fontSize: 28, marginBottom: 8 }}>{mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}</h1>
        <p style={{ fontFamily: mono, fontSize: 12, color: C.textDim }}>{mode === "login" ? "Sign in to track orders and auto-fill checkout." : "Create an account to save your details and track orders."}</p>
      </div>
      <div style={{ display: "flex", marginBottom: 32, border: `1px solid ${C.border}` }}>
        {["login", "register"].map(m => (
          <button key={m} onClick={() => { setMode(m); setError(""); }} style={{ flex: 1, padding: "12px 0", fontFamily: mono, fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", background: mode === m ? C.white : "transparent", color: mode === m ? C.bg : C.textDim, border: "none", cursor: "pointer", fontWeight: mode === m ? 700 : 400, transition: "all 0.3s" }}>{m === "login" ? "Sign In" : "Register"}</button>
        ))}
      </div>
      {error && <div style={{ fontFamily: mono, fontSize: 11, color: "#ef4444", marginBottom: 16, padding: "10px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>{error}</div>}
      {mode === "login" ? (
        <>
          <div style={{ marginBottom: 16 }}><label style={labelS}>Email</label><input type="email" value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" style={iS} /></div>
          <div style={{ marginBottom: 24 }}><label style={labelS}>PIN</label><input type="password" value={loginForm.pin} onChange={e => setLoginForm(p => ({ ...p, pin: e.target.value }))} placeholder="Your 4+ character PIN" style={iS} onKeyDown={e => { if (e.key === "Enter") handleLogin(); }} /></div>
          <button onClick={handleLogin} style={{ width: "100%", ...btnO, background: C.white, color: C.bg, fontWeight: 700, textAlign: "center", border: "none" }}>SIGN IN</button>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}><label style={labelS}>Full Name *</label><input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Rahul Sharma" style={iS} /></div>
          <div style={{ marginBottom: 16 }}><label style={labelS}>Email *</label><input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" style={iS} /></div>
          <div style={{ marginBottom: 16 }}><label style={labelS}>WhatsApp Number *</label><input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 98765 43210" style={iS} /></div>
          <div style={{ marginBottom: 16 }}><label style={labelS}>Shipping Address</label><textarea value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="House/flat, street, city, state, PIN code" rows={2} style={{ ...iS, resize: "vertical" }} /></div>
          <div style={{ marginBottom: 24 }}><label style={labelS}>Create PIN * (4+ characters)</label><input type="password" value={form.pin} onChange={e => setForm(p => ({ ...p, pin: e.target.value }))} placeholder="Used to sign in later" style={iS} onKeyDown={e => { if (e.key === "Enter") handleRegister(); }} /></div>
          <button onClick={handleRegister} style={{ width: "100%", ...btnO, background: C.white, color: C.bg, fontWeight: 700, textAlign: "center", border: "none" }}>CREATE ACCOUNT</button>
        </>
      )}
      <div style={{ textAlign: "center", marginTop: 24, fontFamily: mono, fontSize: 11, color: C.textDim, lineHeight: 1.8 }}>Your data is stored locally on this device only.<br />No passwords are sent to any server.</div>
    </section>
  );
}
/* ══ FOOTER ══ */
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, marginTop: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px clamp(16px,4vw,48px) 32px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 48 }}>
        {[{ t: "SHOP", l: ["PCBs", "Kits", "Components"] }, { t: "COMMUNITY", l: ["Forum", "Instagram", "YouTube"] }, { t: "COMPANY", l: ["About", "Contact", "Privacy Policy"] }].map((c, i) => <div key={i}><h4 style={{ ...lbl, marginBottom: 24 }}>{c.t}</h4>{c.l.map(x => <div key={x} style={{ fontFamily: mono, fontSize: 13, color: C.textMuted, marginBottom: 14, cursor: "pointer" }}>{x}</div>)}</div>)}
      </div>
      <div style={{ padding: "24px clamp(16px,4vw,48px)", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, maxWidth: 1200, margin: "0 auto" }}>
        <span style={{ fontFamily: mono, fontSize: 11, color: C.textDim, letterSpacing: "3px" }}>DESIGNED IN INDIA</span>
        <span style={{ fontFamily: mono, fontSize: 11, color: C.textDim }}>{"\u00A9"} 2026 ANALOGANGRIFF</span>
      </div>
    </footer>
  );
}

function Toast({ message, visible }) {
  return <div style={{ position: "fixed", bottom: visible ? 32 : -60, left: "50%", transform: "translateX(-50%)", background: C.white, color: C.bg, fontFamily: mono, fontSize: 12, fontWeight: 700, padding: "12px 28px", zIndex: 9999, transition: "bottom 0.4s ease", letterSpacing: "1px", borderRadius: 2, whiteSpace: "nowrap" }}>{message}</div>;
}

/* ══ APP ══ */
export default function Home() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ msg: "", visible: false });
  const [navSearch, setNavSearch] = useState("");
  const [searchId, setSearchId] = useState(0);
  const handleSearch = (term) => { setNavSearch(term); setSearchId(c => c + 1); setPage("shop"); };
  const handleSetPage = (p) => { if (p !== "shop" && p !== "pcbs" && p !== "kits" && p !== "components") setNavSearch(""); setPage(p); };
  const showToast = m => { setToast({ msg: m, visible: true }); setTimeout(() => setToast({ msg: "", visible: false }), 2200); };
  const addToCart = p => { setCart(prev => { const e = prev.find(i => i.product.id === p.id); if (e) return prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i); return [...prev, { product: p, qty: 1 }]; }); showToast(`${p.name} added`); };
  const updateQty = (id, q) => { if (q < 1) setCart(p => p.filter(i => i.product.id !== id)); else setCart(p => p.map(i => i.product.id === id ? { ...i, qty: q } : i)); };
  const removeFromCart = id => setCart(p => p.filter(i => i.product.id !== id));
  const cc = cart.reduce((s, i) => s + i.qty, 0);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.white }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{background:${C.bg}}
        ::selection{background:rgba(197,202,214,0.3)}
        input:focus,textarea:focus,select:focus{border-color:${C.borderLight}!important;outline:none}
        .dn{display:flex}.mn{display:none!important}.mfb{display:none}.ms{display:none}
        @media(max-width:768px){.dn{display:none!important}.mn{display:flex!important}.sg{grid-template-columns:1fr!important}.sb{display:none!important}.mfb{display:block!important}.ms{display:flex!important}}
      `}</style>
      <Nav cartCount={cc} page={page} setPage={handleSetPage} onSearch={handleSearch} />
      <Toast message={toast.msg} visible={toast.visible} />
      {page === "home" && <><Hero setPage={handleSetPage} /><HomeFeatured addToCart={addToCart} /><SignalPath /></>}
      {(page === "shop" || page === "pcbs" || page === "kits" || page === "components") && <ShopPage addToCart={addToCart} initialType={page === "pcbs" ? "PCB" : page === "kits" ? "Full Kit" : page === "components" ? "Components" : ""} initialSearch={navSearch} searchId={searchId} />}
      {page === "cart" && <CartPage cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} setPage={handleSetPage} />}
      {page === "checkout" && <CheckoutPage cart={cart} setPage={handleSetPage} />}
      {page === "about" && <AboutPage />}
      {page === "contact" && <ContactPage />}
      {page === "forum" && <Placeholder title="FORUM" desc="Community discussion board for builders across India. Share your builds, ask questions, help others. Coming soon." />}
      {page === "signin" && <AccountPage setPage={handleSetPage} view="orders" />}
      {page === "profile" && <AccountPage setPage={handleSetPage} view="profile" />}
      <Footer />
    </div>
  );
}
