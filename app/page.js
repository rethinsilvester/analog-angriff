"use client";
import { useState, useEffect } from "react";

// --- DATA ---
const PRODUCTS = [
  {
    id: 1,
    name: "Screamer Drive",
    subtitle: "Tube Screamer Clone",
    price: 1499,
    image: "\u{1F7E2}",
    color: "#22c55e",
    tag: "BESTSELLER",
    desc: "The classic mid-hump overdrive that defined a generation. Smooth clipping, singing sustain. JRC4558 IC included.",
    specs: ["JRC4558D IC", "Symmetric Si clipping", "True bypass", "9V DC"],
    difficulty: 2,
  },
  {
    id: 2,
    name: "Golden Horse",
    subtitle: "Klon Centaur Clone",
    price: 1999,
    image: "\u{1F7E1}",
    color: "#eab308",
    tag: "POPULAR",
    desc: "The legendary transparent overdrive. Clean-drive blend circuit, charge pump for 18V headroom. Germanium diodes included.",
    specs: ["Charge pump 18V", "Ge diode clipping", "Clean/drive blend", "True bypass"],
    difficulty: 3,
  },
  {
    id: 3,
    name: "Time Warp",
    subtitle: "PT2399 Delay",
    price: 1299,
    image: "\u{1F535}",
    color: "#3b82f6",
    tag: "NEW",
    desc: "Warm analog-style delay using the PT2399 chip. Up to 600ms of lush, dark repeats with modulation.",
    specs: ["PT2399 delay chip", "Up to 600ms", "Modulation control", "True bypass"],
    difficulty: 2,
  },
  {
    id: 4,
    name: "Fuzz Factory",
    subtitle: "Silicon Fuzz",
    price: 999,
    image: "\u{1F534}",
    color: "#ef4444",
    tag: "BEGINNER",
    desc: "Raw, aggressive silicon fuzz. Simple circuit, perfect first build. BC108 transistors for that classic British bite.",
    specs: ["BC108 transistors", "Volume & Fuzz controls", "True bypass", "9V DC"],
    difficulty: 1,
  },
  {
    id: 5,
    name: "Phase Drift",
    subtitle: "4-Stage Phaser",
    price: 1699,
    image: "\u{1F7E3}",
    color: "#a855f7",
    tag: "",
    desc: "Lush, swirling 4-stage OTA phaser. From subtle shimmer to deep jet-engine swoosh.",
    specs: ["LM13700 OTA", "4 phase stages", "Rate & Depth controls", "True bypass"],
    difficulty: 3,
  },
  {
    id: 6,
    name: "Trinity Drive",
    subtitle: "3-in-1 Hybrid OD",
    price: 2499,
    image: "\u{1F536}",
    color: "#f97316",
    tag: "ADVANCED",
    desc: "Three legendary overdrives in one. Tube Screamer + Timmy + Klon topology with 4-position clipping selector.",
    specs: ["Charge pump 18V", "JFET input buffer", "4-way clipping", "Clean/drive blend"],
    difficulty: 4,
  },
];

const DIFFICULTY_LABELS = ["", "Beginner", "Intermediate", "Advanced", "Expert"];

// --- COMPONENTS ---

function Nav({ cartCount, currentPage, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "12px 24px" : "20px 24px",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,160,0,0.15)" : "none",
        transition: "all 0.4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        onClick={() => setPage("home")}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: "2px solid #ff9900",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "14px",
            fontWeight: 700,
            color: "#ff9900",
            transform: "rotate(-3deg)",
          }}
        >
          AA
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "16px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            ANALOG
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: "#ff9900",
              letterSpacing: "5px",
              textTransform: "uppercase",
              marginTop: "-2px",
            }}
          >
            ANGRIFF
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
        }}
        className="desktop-nav"
      >
        {[
          ["home", "Home"],
          ["kits", "Pedal Kits"],
          ["about", "About"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setPage(key)}
            style={{
              background: "none",
              border: "none",
              color: currentPage === key ? "#ff9900" : "#888",
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: "pointer",
              padding: "4px 0",
              borderBottom:
                currentPage === key ? "1px solid #ff9900" : "1px solid transparent",
              transition: "all 0.3s",
            }}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => setPage("cart")}
          style={{
            background: cartCount > 0 ? "#ff9900" : "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,153,0,0.3)",
            color: cartCount > 0 ? "#000" : "#888",
            fontFamily: "'Space Mono', monospace",
            fontSize: "12px",
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "2px",
            transition: "all 0.3s",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          CART {cartCount > 0 && `(${cartCount})`}
        </button>
      </div>

      <div className="mobile-nav">
        <button
          onClick={() => setPage("cart")}
          style={{
            background: cartCount > 0 ? "#ff9900" : "transparent",
            border: "none",
            color: cartCount > 0 ? "#000" : "#888",
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            padding: "6px 10px",
            cursor: "pointer",
            marginRight: 8,
          }}
        >
          CART{cartCount > 0 ? ` (${cartCount})` : ""}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#ff9900",
            fontSize: "24px",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          {menuOpen ? "\u2715" : "\u2630"}
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(10,10,10,0.98)",
            borderBottom: "1px solid rgba(255,160,0,0.2)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {[
            ["home", "Home"],
            ["kits", "Pedal Kits"],
            ["about", "About"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setPage(key);
                setMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                color: currentPage === key ? "#ff9900" : "#aaa",
                fontFamily: "'Space Mono', monospace",
                fontSize: "14px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
                textAlign: "left",
                padding: "8px 0",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero({ setPage }) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,153,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,153,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          mask: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMask: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(255,120,0,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          color: "#ff9900",
          letterSpacing: "6px",
          textTransform: "uppercase",
          marginBottom: "24px",
          opacity: 0.8,
        }}
      >
        Build Your Own Tone
      </div>

      <h1
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: "clamp(48px, 10vw, 96px)",
          fontWeight: 400,
          color: "#fff",
          lineHeight: 0.95,
          margin: "0 0 12px",
          position: "relative",
        }}
      >
        Analog
        <br />
        <span style={{ color: "#ff9900", fontStyle: "italic" }}>Angriff</span>
      </h1>

      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "13px",
          color: "#666",
          maxWidth: "480px",
          lineHeight: 1.8,
          margin: "24px 0 48px",
          letterSpacing: "0.5px",
        }}
      >
        Premium DIY guitar pedal kits shipped across India.
        <br />
        Every component. Every resistor. Clear build docs.
        <br />
        Just add solder.
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={() => setPage("kits")}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "12px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            padding: "16px 40px",
            background: "#ff9900",
            color: "#000",
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            transition: "all 0.3s",
          }}
        >
          Browse Kits
        </button>
        <button
          onClick={() => setPage("about")}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "12px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            padding: "16px 40px",
            background: "transparent",
            color: "#888",
            border: "1px solid rgba(255,255,255,0.12)",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          Our Story
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0.4,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            color: "#666",
            letterSpacing: "3px",
          }}
        >
          SCROLL
        </div>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, #ff9900, transparent)",
          }}
        />
      </div>
    </section>
  );
}

function ProductCard({ product: p, addToCart }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hover ? "rgba(255,153,0,0.25)" : "rgba(255,255,255,0.06)"}`,
        padding: "32px 24px 24px",
        transition: "all 0.4s ease",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {p.tag && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            letterSpacing: "2px",
            color: p.color,
            background: `${p.color}15`,
            padding: "4px 10px",
            border: `1px solid ${p.color}30`,
          }}
        >
          {p.tag}
        </div>
      )}

      <div
        style={{
          width: "100%",
          height: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "120px",
            background: `linear-gradient(135deg, ${p.color}15, ${p.color}05)`,
            border: `1px solid ${p.color}30`,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            position: "relative",
          }}
        >
          {p.image}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "12px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  border: `1px solid ${p.color}50`,
                  background: `${p.color}20`,
                }}
              />
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              border: `1px solid ${p.color}40`,
              background: `${p.color}10`,
            }}
          />
        </div>
      </div>

      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "9px",
          color: "#666",
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        {p.subtitle}
      </div>

      <h3
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: "24px",
          color: "#fff",
          fontWeight: 400,
          margin: "0 0 8px",
        }}
      >
        {p.name}
      </h3>

      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          color: "#666",
          lineHeight: 1.7,
          margin: "0 0 16px",
        }}
      >
        {p.desc}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "3px" }}>
          {[1, 2, 3, 4].map((d) => (
            <div
              key={d}
              style={{
                width: "16px",
                height: "3px",
                background: d <= p.difficulty ? p.color : "rgba(255,255,255,0.08)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            color: "#555",
            letterSpacing: "1px",
          }}
        >
          {DIFFICULTY_LABELS[p.difficulty]}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "16px",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "18px",
            color: "#ff9900",
            fontWeight: 700,
          }}
        >
          {"\u20B9"}{p.price.toLocaleString("en-IN")}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(p);
          }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "2px",
            padding: "10px 20px",
            background: hover ? "#ff9900" : "transparent",
            color: hover ? "#000" : "#ff9900",
            border: "1px solid rgba(255,153,0,0.4)",
            cursor: "pointer",
            transition: "all 0.3s",
            fontWeight: 700,
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

function FeaturedKits({ setPage, addToCart }) {
  return (
    <section style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "48px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#ff9900", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px" }}>Featured</div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 5vw, 48px)", color: "#fff", fontWeight: 400, margin: 0 }}>Pedal Kits</h2>
        </div>
        <button
          onClick={() => setPage("kits")}
          style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#ff9900", background: "none", border: "1px solid rgba(255,153,0,0.3)", padding: "10px 24px", cursor: "pointer", letterSpacing: "2px", transition: "all 0.3s" }}
        >
          VIEW ALL →
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
        {PRODUCTS.slice(0, 3).map((p) => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}

function WhyDIY() {
  const items = [
    { icon: "\u26A1", title: "Learn Electronics", desc: "Understand how circuits shape your tone. Every resistor, cap, and diode has a purpose." },
    { icon: "\u{1F527}", title: "Complete Kits", desc: "Every component included \u2014 PCB, enclosure, knobs, jacks, wire. Just add solder." },
    { icon: "\u{1F4E6}", title: "Ships Pan-India", desc: "Fast shipping via India Post & Delhivery. Most orders delivered in 4\u20137 days." },
    { icon: "\u{1F4D6}", title: "Build Guides", desc: "Step-by-step PDF guides with high-res photos, schematics, and troubleshooting tips." },
  ];

  return (
    <section style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#ff9900", letterSpacing: "4px", marginBottom: "12px" }}>WHY DIY</div>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(28px, 4vw, 40px)", color: "#fff", fontWeight: 400, margin: 0 }}>Build pedals. Build knowledge.</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "32px" }}>
        {items.map((item, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", marginBottom: "16px" }}>{item.icon}</div>
            <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "13px", color: "#fff", letterSpacing: "1px", margin: "0 0 8px" }}>{item.title}</h3>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#666", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function KitsPage({ addToCart }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => {
    if (filter === "beginner") return p.difficulty <= 2;
    if (filter === "advanced") return p.difficulty >= 3;
    return true;
  });

  return (
    <section style={{ padding: "120px 24px 80px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#ff9900", letterSpacing: "4px", marginBottom: "12px" }}>ALL KITS</div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(36px, 6vw, 56px)", color: "#fff", fontWeight: 400, margin: "0 0 24px" }}>Pedal Kits</h1>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["all", "beginner", "advanced"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", padding: "8px 20px",
                background: filter === f ? "#ff9900" : "transparent",
                color: filter === f ? "#000" : "#666",
                border: `1px solid ${filter === f ? "#ff9900" : "rgba(255,255,255,0.1)"}`,
                cursor: "pointer", transition: "all 0.3s",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}

function CartPage({ cart, updateQty, removeFromCart, setPage }) {
  const total = cart.reduce((s, item) => s + item.product.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <section style={{ padding: "160px 24px 80px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "24px", opacity: 0.3 }}>{"\u{1F6D2}"}</div>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "32px", color: "#fff", fontWeight: 400, margin: "0 0 16px" }}>Cart is empty</h2>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#666", marginBottom: "32px" }}>Add some pedal kits to get started.</p>
        <button onClick={() => setPage("kits")} style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "2px", padding: "14px 32px", background: "#ff9900", color: "#000", border: "none", cursor: "pointer", fontWeight: 700 }}>BROWSE KITS</button>
      </section>
    );
  }

  return (
    <section style={{ padding: "120px 24px 80px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "40px", color: "#fff", fontWeight: 400, margin: "0 0 40px" }}>Your Cart</h1>
      {cart.map(({ product: p, qty }) => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ flex: 1, minWidth: "180px" }}>
            <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "14px", color: "#fff", margin: "0 0 4px" }}>{p.name}</h3>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#666" }}>{p.subtitle}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
              <button onClick={() => updateQty(p.id, qty - 1)} style={{ width: "32px", height: "32px", background: "none", border: "none", color: "#888", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "14px" }}>{"\u2212"}</button>
              <span style={{ width: "32px", textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: "13px", color: "#fff" }}>{qty}</span>
              <button onClick={() => updateQty(p.id, qty + 1)} style={{ width: "32px", height: "32px", background: "none", border: "none", color: "#888", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "14px" }}>+</button>
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "14px", color: "#ff9900", width: "80px", textAlign: "right" }}>{"\u20B9"}{(p.price * qty).toLocaleString("en-IN")}</div>
            <button onClick={() => removeFromCart(p.id)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "16px", padding: "4px 8px" }}>{"\u2715"}</button>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", marginTop: "8px" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "13px", color: "#888", letterSpacing: "2px" }}>TOTAL</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "24px", color: "#ff9900", fontWeight: 700 }}>{"\u20B9"}{total.toLocaleString("en-IN")}</span>
      </div>
      <button onClick={() => setPage("checkout")} style={{ width: "100%", fontFamily: "'Space Mono', monospace", fontSize: "13px", letterSpacing: "3px", padding: "18px", background: "#ff9900", color: "#000", border: "none", cursor: "pointer", fontWeight: 700, marginTop: "8px" }}>PROCEED TO CHECKOUT</button>
    </section>
  );
}

function CheckoutPage({ cart, setPage }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [utr, setUtr] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const total = cart.reduce((s, item) => s + item.product.price * item.qty, 0);

  if (submitted) {
    return (
      <section style={{ padding: "160px 24px 80px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "24px" }}>{"\u2713"}</div>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "36px", color: "#fff", fontWeight: 400, margin: "0 0 16px" }}>Order Received!</h2>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#888", lineHeight: 1.8, maxWidth: "400px", margin: "0 auto 32px" }}>{"We'll confirm your order on WhatsApp once payment is verified. Expect a message within a few hours."}</p>
        <button onClick={() => setPage("home")} style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "2px", padding: "14px 32px", background: "#ff9900", color: "#000", border: "none", cursor: "pointer" }}>BACK TO HOME</button>
      </section>
    );
  }

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontFamily: "'Space Mono', monospace",
    fontSize: "13px",
    padding: "12px 16px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'Space Mono', monospace",
    fontSize: "10px",
    color: "#888",
    letterSpacing: "1px",
    marginBottom: "8px",
    textTransform: "uppercase",
  };

  return (
    <section style={{ padding: "120px 24px 80px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "40px", color: "#fff", fontWeight: 400, margin: "0 0 12px" }}>Checkout</h1>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#666", margin: "0 0 40px", lineHeight: 1.7 }}>Pay via UPI, then fill in your details below.</p>

      {/* Order summary */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "24px", marginBottom: "32px" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#888", letterSpacing: "2px", marginBottom: "16px" }}>ORDER SUMMARY</div>
        {cart.map(({ product: p, qty }) => (
          <div key={p.id} style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>
            <span>{p.name} {"\u00D7"} {qty}</span>
            <span>{"\u20B9"}{(p.price * qty).toLocaleString("en-IN")}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Mono', monospace", fontSize: "16px", color: "#ff9900", fontWeight: 700, marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span>TOTAL</span>
          <span>{"\u20B9"}{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* UPI QR Section */}
      <div style={{ background: "rgba(255,153,0,0.04)", border: "1px solid rgba(255,153,0,0.15)", padding: "32px", textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#ff9900", letterSpacing: "3px", marginBottom: "20px" }}>STEP 1 {"\u2014"} PAY VIA UPI</div>
        <div style={{ width: "180px", height: "180px", margin: "0 auto 20px", background: "#fff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px" }}>
          <div style={{ width: "100%", height: "100%", border: "2px dashed #ccc", borderRadius: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <span style={{ fontSize: "32px" }}>{"\u{1F4F1}"}</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: "#999", textAlign: "center" }}>Your UPI QR<br/>goes here</span>
          </div>
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#aaa", marginBottom: "4px" }}>UPI ID: <span style={{ color: "#ff9900" }}>yourname@upi</span></div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#666" }}>Scan with any UPI app {"\u2014"} GPay, PhonePe, Paytm</div>
      </div>

      {/* Details form */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#ff9900", letterSpacing: "3px", marginBottom: "20px" }}>STEP 2 {"\u2014"} YOUR DETAILS</div>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Rahul Sharma" style={inputStyle} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>WhatsApp Number</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" style={inputStyle} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Shipping Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House/flat, street, city, state, PIN" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>UTR / Transaction ID (optional)</label>
          <input type="text" value={utr} onChange={(e) => setUtr(e.target.value)} placeholder="From your UPI app after payment" style={inputStyle} />
        </div>
      </div>

      <button onClick={() => setSubmitted(true)} style={{ width: "100%", fontFamily: "'Space Mono', monospace", fontSize: "13px", letterSpacing: "3px", padding: "18px", background: "#ff9900", color: "#000", border: "none", cursor: "pointer", fontWeight: 700, marginBottom: "12px" }}>CONFIRM ORDER</button>
      <a href="https://wa.me/91XXXXXXXXXX?text=Hi!%20I%20just%20placed%20an%20order%20on%20Analog%20Angriff" target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#25D366", padding: "14px", border: "1px solid rgba(37,211,102,0.3)", textDecoration: "none", letterSpacing: "1px" }}>{"\u{1F4AC}"} OR MESSAGE US ON WHATSAPP</a>
    </section>
  );
}

function AboutPage() {
  return (
    <section style={{ padding: "120px 24px 80px", maxWidth: "700px", margin: "0 auto" }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#ff9900", letterSpacing: "4px", marginBottom: "12px" }}>ABOUT</div>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(36px, 6vw, 56px)", color: "#fff", fontWeight: 400, margin: "0 0 32px" }}>Why we exist</h1>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "13px", color: "#999", lineHeight: 2 }}>
        <p style={{ marginBottom: "16px" }}>Analog Angriff started because buying guitar pedals in India is expensive, and building them from scratch is confusing {"\u2014"} sourcing components from five different shops, decoding cryptic schematics, hoping the PCB you etched actually works.</p>
        <p style={{ marginBottom: "16px" }}>We package everything you need into a single kit: a proper through-hole PCB, every component sorted and labeled, a pre-drilled enclosure, and a build guide that assumes {"you've"} never soldered before.</p>
        <p style={{ marginBottom: "16px" }}>Every circuit we sell is based on proven, classic designs {"\u2014"} Tube Screamers, Klon variants, PT2399 delays, Big Muff fuzzes {"\u2014"} tweaked for reliability with modern, easily-sourced components.</p>
        <p style={{ color: "#ff9900" }}>{'"Angriff" is German for "attack." It\'s the front edge of your signal. The moment pick meets string and electrons start moving. We\'re here to help you shape what happens next.'}</p>
      </div>
      <div style={{ marginTop: "48px", padding: "32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#ff9900", letterSpacing: "3px", marginBottom: "16px" }}>GET IN TOUCH</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#aaa", lineHeight: 2.2 }}>
          <div>{"\u{1F4E7}"} <a href="mailto:hello@analogangriff.com" style={{ color: "#ff9900", textDecoration: "none" }}>hello@analogangriff.com</a></div>
          <div>{"\u{1F4AC}"} <a href="https://wa.me/91XXXXXXXXXX" style={{ color: "#ff9900", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
          <div>{"\u{1F4F7}"} <a href="#" style={{ color: "#ff9900", textDecoration: "none" }}>@analogangriff</a> on Instagram</div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "48px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#444", letterSpacing: "1px" }}>{"\u00A9"} 2026 Analog Angriff {"\u00B7"} Bengaluru, India</div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: "#333", marginTop: "8px", letterSpacing: "1px" }}>SOLDER IS CHEAPER THAN THERAPY</div>
    </footer>
  );
}

function Toast({ message, visible }) {
  return (
    <div style={{ position: "fixed", bottom: visible ? "32px" : "-60px", left: "50%", transform: "translateX(-50%)", background: "#ff9900", color: "#000", fontFamily: "'Space Mono', monospace", fontSize: "12px", fontWeight: 700, padding: "12px 28px", zIndex: 9999, transition: "bottom 0.4s ease", letterSpacing: "1px", whiteSpace: "nowrap" }}>
      {message}
    </div>
  );
}

// --- APP ---
export default function Home() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ msg: "", visible: false });

  const showToast = (msg) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: "", visible: false }), 2000);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) return prev.map((item) => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { product, qty: 1 }];
    });
    showToast(`${product.name} added to cart`);
  };

  const updateQty = (id, newQty) => {
    if (newQty < 1) setCart((prev) => prev.filter((item) => item.product.id !== id));
    else setCart((prev) => prev.map((item) => (item.product.id === id ? { ...item, qty: newQty } : item)));
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.product.id !== id));
  const cartCount = cart.reduce((s, item) => s + item.qty, 0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <Nav cartCount={cartCount} currentPage={page} setPage={setPage} />
      <Toast message={toast.msg} visible={toast.visible} />
      {page === "home" && (
        <>
          <Hero setPage={setPage} />
          <FeaturedKits setPage={setPage} addToCart={addToCart} />
          <WhyDIY />
        </>
      )}
      {page === "kits" && <KitsPage addToCart={addToCart} />}
      {page === "cart" && <CartPage cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} setPage={setPage} />}
      {page === "checkout" && <CheckoutPage cart={cart} setPage={setPage} />}
      {page === "about" && <AboutPage />}
      <Footer />
    </div>
  );
}
