import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

const PHONE = "(817) 438-2050";
const EMAIL = "316AiSolutions@gmail.com";
const BIZ = "3:16 AI Solutions LLC";
const SITE = "316aisolutions.com";

const navy = "#161C2C";
const gold = "#C7B167";
const cream = "#F7F4EC";
const wrap = { maxWidth: 1100, margin: "0 auto", padding: "0 24px" };
const h3Style = { fontFamily: "var(--head)", fontWeight: 700, fontSize: 18, color: navy, marginTop: 28, marginBottom: 8 };
const pStyle = { marginBottom: 14, fontFamily: "var(--body)", fontSize: 14, lineHeight: 1.75, color: "#555" };

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Reveal({ children, delay = 0, style = {} }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: "all .7s cubic-bezier(.22,1,.36,1)", ...style }}>
      {children}
    </div>
  );
}

function Bubble({ text, isAI, delay }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{ display: "flex", justifyContent: isAI ? "flex-start" : "flex-end", marginBottom: 3, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: "all .5s cubic-bezier(.22,1,.36,1)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: isAI ? "flex-start" : "flex-end", maxWidth: "80%" }}>
        <div style={{ fontSize: 9, color: isAI ? gold : "rgba(255,255,255,.4)", fontWeight: 600, fontFamily: "var(--body)", marginBottom: 3 }}>{isAI ? "AI" : "Customer"}</div>
        <div style={{
          padding: "7px 11px", borderRadius: isAI ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
          background: isAI ? "rgba(255,255,255,.08)" : gold, color: isAI ? "#fff" : navy,
          fontSize: 11.5, lineHeight: 1.4, fontFamily: "var(--body)", fontWeight: isAI ? 400 : 500
        }}>{text}</div>
      </div>
    </div>
  );
}

function Counter({ end, prefix = "", suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [go, setGo] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return;
    let s = 0; const step = end / (duration / 16);
    const t = setInterval(() => { s += step; if (s >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [go, end, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ═══ NAV ═══ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      padding: scrolled ? "10px 0" : "16px 0",
      background: scrolled ? "rgba(22,28,44,.97)" : navy,
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all .35s", borderBottom: "2px solid " + gold
    }}>
      <div style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none", fontFamily: "var(--head)", fontWeight: 800, fontSize: 22, color: "#fff" }}>
          3:16 <span style={{ color: gold }}>AI Solutions</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {isHome ? (
            <>
              <Link to="/services" className="nav-hide" style={{ color: "rgba(255,255,255,.7)", textDecoration: "none", fontSize: 13, fontFamily: "var(--body)", fontWeight: 500 }}>Services</Link>
              {["How It Works", "Results", "Pricing", "Contact"].map(t => (
                <a key={t} href={"#" + t.toLowerCase().replace(/\s/g, "-")} className="nav-hide" style={{ color: "rgba(255,255,255,.7)", textDecoration: "none", fontSize: 13, fontFamily: "var(--body)", fontWeight: 500 }}>{t}</a>
              ))}
              <Link to="/payment" className="nav-hide" style={{ color: gold, textDecoration: "none", fontSize: 13, fontFamily: "var(--body)", fontWeight: 700 }}>Pay Now</Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-hide" style={{ color: "rgba(255,255,255,.7)", textDecoration: "none", fontSize: 13, fontFamily: "var(--body)", fontWeight: 500 }}>Home</Link>
              <Link to="/payment" className="nav-hide" style={{ color: "rgba(255,255,255,.7)", textDecoration: "none", fontSize: 13, fontFamily: "var(--body)", fontWeight: 500 }}>Pay</Link>
            </>
          )}
          <a href="tel:8174382050" style={{ padding: "9px 22px", background: gold, color: navy, borderRadius: 6, textDecoration: "none", fontSize: 14, fontWeight: 700, fontFamily: "var(--body)" }}>Call Us</a>
        </div>
      </div>
    </nav>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <footer style={{ padding: "24px 0", background: navy, borderTop: "2px solid " + gold }}>
      <div style={{ ...wrap, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(255,255,255,.5)" }}>{BIZ} — Saginaw, TX</span>
        <div style={{ display: "flex", gap: 16 }}>
          <Link to="/services" style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(255,255,255,.5)", textDecoration: "none" }}>Services</Link>
          <Link to="/payment" style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(255,255,255,.5)", textDecoration: "none" }}>Payment</Link>
          <Link to="/privacy" style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(255,255,255,.5)", textDecoration: "none" }}>Privacy Policy</Link>
          <Link to="/terms" style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(255,255,255,.5)", textDecoration: "none" }}>Terms & Conditions</Link>
          <Link to="/optin" style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(255,255,255,.5)", textDecoration: "none" }}>SMS Opt-In</Link>
        </div>
        <span style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(255,255,255,.5)" }}>{SITE}</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════ */
/*  HOME PAGE                              */
/* ═══════════════════════════════════════ */
function HomePage() {
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cMsg, setCMsg] = useState("");
  const [cSent, setCSent] = useState(false);

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 8, border: "1px solid #ddd8cc",
    fontFamily: "var(--body)", fontSize: 15, color: navy, background: "#fff", outline: "none"
  };

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 115, paddingBottom: 40, background: "#fff" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "1fr 320px", gap: 60, alignItems: "start" }}>
          <div style={{ paddingTop: 10 }}>
            <Reveal><p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, color: gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>AI-Powered Revenue Automation</p></Reveal>
            <Reveal delay={100}><h1 style={{ fontFamily: "var(--head)", fontWeight: 900, fontSize: "clamp(34px,4vw,54px)", lineHeight: 1.12, letterSpacing: "-.02em", color: navy, marginBottom: 20 }}>What Happens When You Miss a Call?</h1></Reveal>
            <Reveal delay={200}><p style={{ fontFamily: "var(--body)", fontSize: 17, lineHeight: 1.75, color: "#666", maxWidth: 480, marginBottom: 36 }}>Below is a real example of how our AI engages your customer automatically — within 30 seconds of a missed call.</p></Reveal>
            <Reveal delay={300}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href="tel:8174382050" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: navy, color: "#fff", borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: 700, fontFamily: "var(--body)", boxShadow: "0 4px 16px rgba(22,28,44,.2)" }}>📞 {PHONE}</a>
                <a href="#how-it-works" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "transparent", border: "2px solid " + gold, color: navy, borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: 600, fontFamily: "var(--body)" }}>See How It Works ↓</a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ animation: "float 7s ease-in-out infinite" }}>
              <div style={{ width: 310, background: navy, borderRadius: 30, padding: 3, boxShadow: "0 0 0 2px " + gold + ", 0 24px 60px rgba(22,28,44,.2)" }}>
                <div style={{ background: navy, borderRadius: 27, padding: "10px 16px 8px" }}>
                  <div style={{ textAlign: "center", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                    <div style={{ fontFamily: "var(--body)", fontWeight: 700, fontSize: 14, color: "#fff" }}>Lone Star HVAC</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontFamily: "var(--body)" }}>Text Message</div>
                  </div>
                  <div style={{ fontSize: 10, textAlign: "center", color: gold, fontFamily: "var(--body)", fontWeight: 600, marginBottom: 12, background: "rgba(199,177,103,.1)", padding: "4px 8px", borderRadius: 6 }}>Missed Call from Customer</div>
                  <Bubble isAI delay={400} text="Hi! This is Lone Star HVAC. Sorry we missed your call! How can we help you today?" />
                  <Bubble isAI={false} delay={900} text="Hi, my AC stopped working and it's really hot in here." />
                  <Bubble isAI delay={1400} text="Oh no — sorry to hear that! We can get someone out fast. Are you available today or tomorrow for a free diagnosis?" />
                  <Bubble isAI={false} delay={1900} text="Today would be great if possible!" />
                  <Bubble isAI delay={2400} text="Perfect! Here's our booking link — we'll confirm your appointment right away!" />
                  <Bubble isAI={false} delay={2900} text="Booked! Thank you so much!" />
                  <Bubble isAI delay={3400} text="Awesome! See you soon. Our tech will call 30 min before arrival. Reply STOP to opt out." />
                  <div style={{ textAlign: "center", marginTop: 10, padding: "7px 10px", borderRadius: 8, background: "rgba(74,222,128,.12)", border: "1px solid rgba(74,222,128,.25)" }}>
                    <span style={{ fontSize: 11.5, fontFamily: "var(--body)", color: "#4ade80", fontWeight: 600 }}>✅ Appointment Booked Automatically</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "80px 0", background: cream }}>
        <div style={wrap}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(28px,3vw,40px)", textAlign: "center", color: navy, marginBottom: 12 }}>How It Works</h2>
            <p style={{ fontFamily: "var(--body)", color: "#888", fontSize: 15, textAlign: "center", maxWidth: 400, margin: "0 auto 48px" }}>Five steps. Zero effort on your end.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            {[
              { num: "1", title: "Customer calls your number" },
              { num: "2", title: "You miss the call" },
              { num: "3", title: "AI texts them within 30 seconds" },
              { num: "4", title: "AI answers questions & books appointment" },
              { num: "5", title: "You get a notification — job booked ✓" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "24px 16px", borderRadius: 12, background: "#fff", border: "1px solid #e8e4d8" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: navy, color: gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, fontFamily: "var(--body)", marginBottom: 12 }}>{s.num}</div>
                  <div style={{ fontFamily: "var(--body)", fontSize: 14, color: navy, lineHeight: 1.5, fontWeight: 500 }}>{s.title}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "56px 0", background: navy }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, textAlign: "center" }}>
          {[
            { val: "30", suffix: " sec", label: "Response Time" },
            { val: "24/7", label: "Always On", raw: true },
            { val: "$0", label: "Per Missed Call", raw: true },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ padding: "24px", borderRadius: 12, border: "1px solid rgba(199,177,103,.25)", background: "rgba(199,177,103,.06)" }}>
                <div style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: 40, color: gold, marginBottom: 4 }}>
                  {s.raw ? s.val : <Counter end={parseInt(s.val)} suffix={s.suffix} />}
                </div>
                <div style={{ fontFamily: "var(--body)", fontSize: 13, color: "rgba(255,255,255,.55)", fontWeight: 500 }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CUSTOMER EXPERIENCE */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={wrap}>
          <Reveal>
            <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px", borderRadius: 16, border: "2px solid " + gold, background: cream }}>
              <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(24px,2.5vw,32px)", color: navy, marginBottom: 28, textAlign: "center" }}>What Your Customers Experience</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                {["Instant response — they don't call your competitor", "Friendly, professional conversation every time", "Book appointments at 2am if they want", "No hold music. No voicemail. No lost job."].map((b, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: gold, fontSize: 18, fontWeight: 700, flexShrink: 0, lineHeight: 1.4 }}>✓</span>
                      <span style={{ fontFamily: "var(--body)", fontSize: 14.5, color: "#444", lineHeight: 1.6 }}>{b}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE MATH */}
      <section id="results" style={{ padding: "80px 0", background: cream }}>
        <div style={wrap}>
          <Reveal><h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(28px,3vw,40px)", color: navy, marginBottom: 40, textAlign: "center" }}>The Math Is Simple</h2></Reveal>
          <Reveal delay={100}>
            <div style={{ maxWidth: 580, margin: "0 auto" }}>
              {[
                { label: "Average HVAC job value", value: "$350 – $2,500" },
                { label: "Missed calls recovered / month", value: "3 – 8 calls" },
                { label: "Revenue recovered", value: "$1,000 – $20,000+", highlight: true },
                { label: "Your investment", value: "$300 / month" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: i < 3 ? "1px solid #ddd8cc" : "none" }}>
                  <span style={{ fontFamily: "var(--body)", fontSize: 15, color: "#555" }}>{r.label}</span>
                  <span style={{ fontFamily: "var(--body)", fontSize: 15, fontWeight: 700, color: r.highlight ? gold : navy }}>{r.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ ...wrap, textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(28px,3vw,40px)", color: navy, marginBottom: 12 }}>Simple Pricing</h2>
            <p style={{ fontFamily: "var(--body)", color: "#888", fontSize: 15, marginBottom: 48 }}>One plan. Everything included. No surprises.</p>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ maxWidth: 420, margin: "0 auto", padding: "48px 36px", borderRadius: 16, border: "2px solid " + gold, background: cream, boxShadow: "0 8px 40px rgba(22,28,44,.06)" }}>
              <div style={{ fontFamily: "var(--head)", fontWeight: 900, fontSize: 50, color: navy, marginBottom: 4 }}>$300<span style={{ fontSize: 20, fontWeight: 600, color: "#999" }}>/mo</span></div>
              <div style={{ fontFamily: "var(--body)", color: "#888", fontSize: 14, marginBottom: 32 }}>Everything below. Set up in 48 hours.</div>
              <div style={{ textAlign: "left" }}>
                {["AI missed-call text-back in 30 sec", "Smart conversation & appointment booking", "Works 24/7 — nights, weekends, holidays", "Custom setup for your business", "We handle all the tech", "No contracts — cancel anytime"].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
                    <span style={{ color: gold, fontSize: 16, fontWeight: 700 }}>✓</span>
                    <span style={{ fontFamily: "var(--body)", fontSize: 14, color: "#444" }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="tel:8174382050" style={{ display: "block", marginTop: 32, padding: "16px", borderRadius: 8, textAlign: "center", background: navy, color: "#fff", textDecoration: "none", fontFamily: "var(--body)", fontWeight: 700, fontSize: 16, boxShadow: "0 4px 16px rgba(22,28,44,.18)" }}>Get Started — Call {PHONE}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px 0", background: cream, borderTop: "2px solid " + gold }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start", maxWidth: 900, margin: "0 auto" }}>
            <Reveal>
              <div>
                <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(28px,3vw,40px)", color: navy, marginBottom: 12 }}>Get In Touch</h2>
                <p style={{ fontFamily: "var(--body)", color: "#666", fontSize: 15, lineHeight: 1.75, marginBottom: 32 }}>Ready to stop losing jobs? Have questions about our services? Drop us a message and we'll get back to you fast.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 20 }}>📞</span>
                    <div>
                      <div style={{ fontFamily: "var(--body)", fontSize: 12, color: "#999", fontWeight: 500 }}>Phone</div>
                      <a href="tel:8174382050" style={{ fontFamily: "var(--body)", fontSize: 15, color: navy, fontWeight: 600, textDecoration: "none" }}>{PHONE}</a>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 20 }}>✉️</span>
                    <div>
                      <div style={{ fontFamily: "var(--body)", fontSize: 12, color: "#999", fontWeight: 500 }}>Email</div>
                      <a href={"mailto:" + EMAIL} style={{ fontFamily: "var(--body)", fontSize: 15, color: navy, fontWeight: 600, textDecoration: "none" }}>{EMAIL}</a>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 20 }}>📍</span>
                    <div>
                      <div style={{ fontFamily: "var(--body)", fontSize: 12, color: "#999", fontWeight: 500 }}>Location</div>
                      <span style={{ fontFamily: "var(--body)", fontSize: 15, color: navy, fontWeight: 600 }}>Saginaw, TX</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              {cSent ? (
                <div style={{ textAlign: "center", padding: "60px 20px", borderRadius: 16, border: "2px solid " + gold, background: "#fff" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                  <h3 style={{ fontFamily: "var(--head)", fontSize: 24, color: navy, marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ fontFamily: "var(--body)", color: "#666", fontSize: 15 }}>We'll get back to you shortly.</p>
                </div>
              ) : (
                <div style={{ padding: "32px", borderRadius: 16, border: "2px solid " + gold, background: "#fff" }}>
                  <div style={{ marginBottom: 16 }}>
                    <input style={inputStyle} placeholder="Your Name *" value={cName} onChange={e => setCName(e.target.value)} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <input style={inputStyle} placeholder="Email *" type="email" value={cEmail} onChange={e => setCEmail(e.target.value)} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <input style={inputStyle} placeholder="Phone Number" type="tel" value={cPhone} onChange={e => setCPhone(e.target.value)} />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} placeholder="How can we help you?" value={cMsg} onChange={e => setCMsg(e.target.value)} />
                  </div>
                  <button onClick={() => {
                    if (!cName || !cEmail) return;
                    fetch("https://formspree.io/f/mqeyogyd", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name: cName, email: cEmail, phone: cPhone, message: cMsg })
                    }).then(() => setCSent(true)).catch(() => setCSent(true));
                  }}
                    style={{
                      width: "100%", padding: "16px", borderRadius: 8, border: "none",
                      cursor: (!cName || !cEmail) ? "not-allowed" : "pointer",
                      background: (!cName || !cEmail) ? "#ccc" : navy,
                      color: "#fff", fontFamily: "var(--body)", fontWeight: 700, fontSize: 16,
                      boxShadow: (!cName || !cEmail) ? "none" : "0 4px 16px rgba(22,28,44,.18)",
                      transition: "all .2s"
                    }}>
                    Send Message
                  </button>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}


/* ═══════════════════════════════════════ */
/*  SERVICES PAGE                          */
/* ═══════════════════════════════════════ */
function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 115, paddingBottom: 60, background: navy, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(199,177,103,.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ ...wrap, position: "relative", zIndex: 2, textAlign: "center" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, color: gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>What We Do</p>
            <h1 style={{ fontFamily: "var(--head)", fontWeight: 900, fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.1, color: "#fff", marginBottom: 20 }}>Services We Offer</h1>
            <p style={{ fontFamily: "var(--body)", fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,.6)", maxWidth: 560, margin: "0 auto" }}>AI-powered automation, professional web design, and financial intelligence to help your business grow and stay ahead.</p>
          </Reveal>
        </div>
      </section>

      {/* AI TEXT-BACK - FEATURED */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ ...wrap, maxWidth: 900 }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "center" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 50, background: "rgba(199,177,103,.1)", border: "1px solid rgba(199,177,103,.25)", marginBottom: 20 }}>
                  <span style={{ fontSize: 14 }}>💬</span>
                  <span style={{ fontFamily: "var(--body)", fontSize: 12, fontWeight: 600, color: gold }}>Our Flagship Service</span>
                </div>
                <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(26px,3vw,38px)", color: navy, marginBottom: 16 }}>AI Missed Call Text-Back</h2>
                <p style={{ fontFamily: "var(--body)", fontSize: 15, lineHeight: 1.75, color: "#555", marginBottom: 24 }}>Never lose a job to a missed call again. Our AI responds to your customers within 30 seconds, handles the conversation professionally, and books the appointment — 24/7, even while you sleep.</p>
                <div style={{ marginBottom: 24 }}>
                  {["Missed call text-back in 30 seconds", "AI-powered natural conversation", "Automatic appointment booking", "Works nights, weekends, and holidays", "Custom setup tailored to your business", "No tech skills needed — we handle everything"].map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                      <span style={{ color: gold, fontWeight: 700, fontSize: 16 }}>✓</span>
                      <span style={{ fontFamily: "var(--body)", fontSize: 14, color: "#444" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: 32, color: navy }}>$300<span style={{ fontSize: 16, fontWeight: 500, color: "#999" }}>/mo</span></div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ padding: "32px", borderRadius: 20, background: cream, border: "2px solid " + gold, textAlign: "center" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20 }}>
                    {[
                      { val: "30 sec", label: "Response" },
                      { val: "24/7", label: "Availability" },
                      { val: "$0", label: "Per Call" },
                    ].map((s, i) => (
                      <div key={i}>
                        <div style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: 24, color: gold }}>{s.val}</div>
                        <div style={{ fontFamily: "var(--body)", fontSize: 11, color: "#888", fontWeight: 500 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <a href="tel:8174382050" style={{ display: "block", padding: "14px 24px", background: navy, color: "#fff", borderRadius: 8, textDecoration: "none", fontFamily: "var(--body)", fontWeight: 700, fontSize: 15 }}>Get Started — Call {PHONE}</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ maxWidth: 900, margin: "0 auto", height: 1, background: "linear-gradient(90deg, transparent, " + gold + ", transparent)" }} />

      {/* WEBSITE DESIGN */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ ...wrap, maxWidth: 900 }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", order: 0 }}>
                <div style={{ padding: "32px", borderRadius: 20, background: cream, border: "2px solid " + gold, width: "100%" }}>
                  <div style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}>🌐</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {["Responsive on all devices", "Fast load times", "SEO-optimized", "Professional branding"].map((f, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 12px", borderRadius: 8, background: "#fff" }}>
                        <span style={{ color: gold, fontWeight: 700 }}>✓</span>
                        <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#444" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 50, background: "rgba(22,28,44,.05)", marginBottom: 20 }}>
                  <span style={{ fontSize: 12 }}>🏆</span>
                  <span style={{ fontFamily: "var(--body)", fontSize: 12, fontWeight: 600, color: navy }}>6+ Years Web Design Experience</span>
                </div>
                <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(26px,3vw,38px)", color: navy, marginBottom: 16 }}>Website Design</h2>
                <p style={{ fontFamily: "var(--body)", fontSize: 15, lineHeight: 1.75, color: "#555", marginBottom: 24 }}>Need a professional website that actually converts? We design and build clean, modern websites for home service businesses — so your customers can find you and trust you online.</p>
                <div style={{ marginBottom: 24 }}>
                  {["Custom design for your brand", "Mobile-friendly & lightning fast", "SEO-optimized to rank on Google", "Contact forms & booking links", "Ongoing support available"].map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                      <span style={{ color: gold, fontWeight: 700, fontSize: 16 }}>✓</span>
                      <span style={{ fontFamily: "var(--body)", fontSize: 14, color: "#444" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: 32, color: navy }}>$500<span style={{ fontSize: 16, fontWeight: 500, color: "#999" }}> starting</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", height: 1, background: "linear-gradient(90deg, transparent, " + gold + ", transparent)" }} />

      {/* WEBSITE MAINTENANCE */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ ...wrap, maxWidth: 900 }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "center" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 50, background: "rgba(199,177,103,.1)", border: "1px solid rgba(199,177,103,.25)", marginBottom: 20 }}>
                  <span style={{ fontSize: 14 }}>🔧</span>
                  <span style={{ fontFamily: "var(--body)", fontSize: 12, fontWeight: 600, color: gold }}>Keep Your Site Running Smooth</span>
                </div>
                <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(26px,3vw,38px)", color: navy, marginBottom: 16 }}>Website Maintenance</h2>
                <p style={{ fontFamily: "var(--body)", fontSize: 15, lineHeight: 1.75, color: "#555", marginBottom: 24 }}>Your website needs regular care to stay fast, secure, and up to date. We handle all the technical stuff so you can focus on running your business.</p>
                <div style={{ marginBottom: 24 }}>
                  {["Monthly updates and security patches", "Performance monitoring and speed optimization", "Content updates when you need them", "Uptime monitoring — we fix issues before you notice", "Priority support via phone and email", "Monthly report on site health and traffic"].map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                      <span style={{ color: gold, fontWeight: 700, fontSize: 16 }}>✓</span>
                      <span style={{ fontFamily: "var(--body)", fontSize: 14, color: "#444" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: 32, color: navy }}>$299<span style={{ fontSize: 16, fontWeight: 500, color: "#999" }}>/mo</span></div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ padding: "32px", borderRadius: 20, background: cream, border: "2px solid " + gold, width: "100%", textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🔧</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {["Updates & patches", "Speed optimization", "Content changes", "Uptime monitoring", "Priority support"].map((f, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 12px", borderRadius: 8, background: "#fff" }}>
                        <span style={{ color: gold, fontWeight: 700 }}>✓</span>
                        <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#444" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="/payment" style={{ display: "block", marginTop: 20, padding: "14px 24px", background: navy, color: "#fff", borderRadius: 8, textDecoration: "none", fontFamily: "var(--body)", fontWeight: 700, fontSize: 15 }}>Get Started</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", height: 1, background: "linear-gradient(90deg, transparent, " + gold + ", transparent)" }} />

      {/* COMING SOON SERVICES */}
      <section style={{ padding: "80px 0", background: cream }}>
        <div style={{ ...wrap, maxWidth: 900 }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(26px,3vw,36px)", color: navy, textAlign: "center", marginBottom: 8 }}>Coming Soon</h2>
            <p style={{ fontFamily: "var(--body)", color: "#888", fontSize: 15, textAlign: "center", maxWidth: 460, margin: "0 auto 48px" }}>We're building more ways to help your business run smarter.</p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Reveal delay={0}>
              <div style={{ padding: "36px 28px", borderRadius: 16, border: "2px solid " + gold, background: "#fff", height: "100%", position: "relative" }}>
                <div style={{ position: "absolute", top: 16, right: 16, padding: "4px 12px", borderRadius: 20, background: navy, fontFamily: "var(--body)", fontSize: 11, fontWeight: 600, color: gold }}>Coming Soon</div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>🤖</div>
                <h3 style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 22, color: navy, marginBottom: 12 }}>Full AI Receptionist</h3>
                <p style={{ fontFamily: "var(--body)", fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 20 }}>A complete AI-powered front desk for your business. Answers every call, handles scheduling, rescheduling, cancellations, and customer questions — so you never need a receptionist or answering service again.</p>
                <div>
                  {["Answers calls live with AI voice", "Schedules, reschedules & cancels appointments", "Handles FAQs about your business", "Transfers urgent calls to you", "Full call summaries & transcripts"].map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                      <span style={{ color: gold, fontWeight: 700 }}>✓</span>
                      <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#555" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ padding: "36px 28px", borderRadius: 16, border: "2px solid " + gold, background: "#fff", height: "100%", position: "relative" }}>
                <div style={{ position: "absolute", top: 16, right: 16, padding: "4px 12px", borderRadius: 20, background: navy, fontFamily: "var(--body)", fontSize: 11, fontWeight: 600, color: gold }}>Coming Soon</div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>📊</div>
                <h3 style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 22, color: navy, marginBottom: 12 }}>Financial Intelligence</h3>
                <p style={{ fontFamily: "var(--body)", fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 12 }}>AI-powered financial insights built for small business owners. Track revenue, expenses, cash flow, and profitability — with smart alerts and plain-English reports so you always know where your money is going.</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 6, background: "rgba(22,28,44,.05)", marginBottom: 16 }}>
                  <span style={{ fontSize: 12 }}>🏆</span>
                  <span style={{ fontFamily: "var(--body)", fontSize: 12, fontWeight: 600, color: navy }}>10+ Years Financial Experience</span>
                </div>
                <div>
                  {["Monthly P&L report — see exactly what you made and spent", "Identify your most profitable services and jobs", "Understand why revenue is up but cash feels tight", "Spot unusual expenses before they become big problems", "Tax-ready financial summary delivered every month", "Custom insights tailored to your specific business"].map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                      <span style={{ color: gold, fontWeight: 700 }}>✓</span>
                      <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#555" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 0", background: navy }}>
        <div style={{ ...wrap, textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(26px,3vw,36px)", color: "#fff", marginBottom: 12 }}>Ready to Get Started?</h2>
            <p style={{ fontFamily: "var(--body)", color: "rgba(255,255,255,.55)", fontSize: 16, marginBottom: 28 }}>Let's talk about what your business needs.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:8174382050" style={{ padding: "14px 28px", background: gold, color: navy, borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: 700, fontFamily: "var(--body)" }}>📞 {PHONE}</a>
              <Link to="/#contact" style={{ padding: "14px 28px", background: "transparent", border: "2px solid rgba(255,255,255,.2)", color: "#fff", borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: 600, fontFamily: "var(--body)" }}>Contact Us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════ */
/*  PAYMENT PAGE                           */
/* ═══════════════════════════════════════ */
function PaymentPage() {
  const [selected, setSelected] = useState(null);
  const [method, setMethod] = useState(null);

  // ⬇️ REPLACE THESE WITH YOUR REAL LINKS ⬇️
  const STRIPE_TEXTAI_LINK = "https://buy.stripe.com/7sY14n1Bb9dUcYq1VZfbq01";
  const STRIPE_WEBSITE_LINK = "https://buy.stripe.com/dRmaEXgw5ahY2jM7gjfbq02";
  const ZELLE_PHONE = "(817) 438-2050";
  
  // ⬆️ REPLACE THESE WITH YOUR REAL LINKS ⬆️

  const services = [
    { id: "textai", name: "AI Missed Call Text-Back", price: "$300/mo", desc: "Automated missed call recovery with AI conversation & booking", stripe: STRIPE_TEXTAI_LINK },
    { id: "website", name: "Website Design", price: "$500", desc: "Custom professional website for your business", stripe: STRIPE_WEBSITE_LINK },
    { id: "maintenance", name: "Website Maintenance", price: "$299/mo", desc: "Ongoing updates, support, and maintenance for your website", stripe: "https://buy.stripe.com/7sY00j7Zzdua1fIeILfbq03" },
  ];

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 8, border: "1px solid #ddd8cc",
    fontFamily: "var(--body)", fontSize: 15, color: navy, background: "#fff", outline: "none"
  };

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 115, paddingBottom: 50, background: navy }}>
        <div style={{ ...wrap, textAlign: "center" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, color: gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>Secure Payment</p>
            <h1 style={{ fontFamily: "var(--head)", fontWeight: 900, fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.1, color: "#fff", marginBottom: 16 }}>Make a Payment</h1>
            <p style={{ fontFamily: "var(--body)", fontSize: 16, color: "rgba(255,255,255,.55)", maxWidth: 480, margin: "0 auto" }}>Select your service and preferred payment method below.</p>
          </Reveal>
        </div>
      </section>

      {/* Step 1 - Select Service */}
      <section style={{ padding: "60px 0", background: "#fff" }}>
        <div style={{ ...wrap, maxWidth: 700 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: navy, color: gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, fontFamily: "var(--body)" }}>1</div>
              <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: 24, color: navy }}>Select Your Service</h2>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <div onClick={() => setSelected(s.id)}
                  style={{
                    padding: "24px", borderRadius: 14,
                    border: selected === s.id ? "2px solid " + gold : "2px solid #e8e4d8",
                    background: selected === s.id ? cream : "#fff",
                    cursor: "pointer", transition: "all .2s",
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      border: selected === s.id ? "6px solid " + gold : "2px solid #ccc",
                      background: selected === s.id ? gold : "#fff",
                      transition: "all .2s", flexShrink: 0
                    }} />
                    <div>
                      <div style={{ fontFamily: "var(--body)", fontWeight: 700, fontSize: 16, color: navy }}>{s.name}</div>
                      <div style={{ fontFamily: "var(--body)", fontSize: 13, color: "#888", marginTop: 2 }}>{s.desc}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: 20, color: navy, flexShrink: 0, marginLeft: 16 }}>{s.price}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Step 2 - Payment Method */}
      {selected && (
        <section style={{ padding: "0 0 60px", background: "#fff" }}>
          <div style={{ ...wrap, maxWidth: 700 }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: navy, color: gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, fontFamily: "var(--body)" }}>2</div>
                <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: 24, color: navy }}>Choose Payment Method</h2>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {[
                { id: "card", icon: "💳", label: "Credit / Debit Card", sub: "Powered by Stripe" },
                { id: "zelle", icon: "🏦", label: "Zelle", sub: "Bank transfer" },
                { id: "cash", icon: "💵", label: "Cash", sub: "In person" },
              ].map((m) => (
                <Reveal key={m.id}>
                  <div onClick={() => setMethod(m.id)}
                    style={{
                      padding: "24px 16px", borderRadius: 14, textAlign: "center",
                      border: method === m.id ? "2px solid " + gold : "2px solid #e8e4d8",
                      background: method === m.id ? cream : "#fff",
                      cursor: "pointer", transition: "all .2s"
                    }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{m.icon}</div>
                    <div style={{ fontFamily: "var(--body)", fontWeight: 700, fontSize: 14, color: navy }}>{m.label}</div>
                    <div style={{ fontFamily: "var(--body)", fontSize: 12, color: "#999", marginTop: 2 }}>{m.sub}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step 3 - Payment Details */}
      {selected && method && (
        <section style={{ padding: "0 0 80px", background: "#fff" }}>
          <div style={{ ...wrap, maxWidth: 700 }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: navy, color: gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, fontFamily: "var(--body)" }}>3</div>
                <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: 24, color: navy }}>Complete Payment</h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div style={{ padding: "36px", borderRadius: 16, border: "2px solid " + gold, background: cream }}>
                {/* Summary */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 20, marginBottom: 24, borderBottom: "1px solid #ddd8cc" }}>
                  <div>
                    <div style={{ fontFamily: "var(--body)", fontWeight: 700, fontSize: 16, color: navy }}>{services.find(s => s.id === selected)?.name}</div>
                    <div style={{ fontFamily: "var(--body)", fontSize: 13, color: "#888", marginTop: 2 }}>{method === "card" ? "Credit/Debit Card" : method === "zelle" ? "Zelle" : "Cash (In Person)"}</div>
                  </div>
                  <div style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: 24, color: navy }}>{services.find(s => s.id === selected)?.price}</div>
                </div>

                {/* Card - Stripe redirect */}
                {method === "card" && (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--body)", fontSize: 14, color: "#555", marginBottom: 24, lineHeight: 1.6 }}>You'll be redirected to our secure payment processor (Stripe) to complete your payment. Your card information is never stored on our servers.</p>
                    <a href={services.find(s => s.id === selected)?.stripe} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "inline-block", padding: "16px 40px", background: navy, color: "#fff",
                        borderRadius: 8, textDecoration: "none", fontFamily: "var(--body)", fontWeight: 700, fontSize: 16,
                        boxShadow: "0 4px 16px rgba(22,28,44,.18)"
                      }}>
                      Pay with Card →
                    </a>
                    <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 20 }}>
                      <span style={{ fontFamily: "var(--body)", fontSize: 12, color: "#999" }}>🔒 Secured by Stripe</span>
                      <span style={{ fontFamily: "var(--body)", fontSize: 12, color: "#999" }}>•</span>
                      <span style={{ fontFamily: "var(--body)", fontSize: 12, color: "#999" }}>256-bit encryption</span>
                    </div>
                  </div>
                )}

                {/* Zelle */}
                {method === "zelle" && (
                  <div>
                    <p style={{ fontFamily: "var(--body)", fontSize: 14, color: "#555", marginBottom: 20, lineHeight: 1.6 }}>Send your payment via Zelle using the details below. Please include your business name in the memo.</p>
                    <div style={{ padding: "20px", borderRadius: 10, background: "#fff", border: "1px solid #e8e4d8" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#888" }}>Send To (Phone):</span>
                        <span style={{ fontFamily: "var(--body)", fontSize: 15, fontWeight: 700, color: navy }}>{ZELLE_PHONE}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#888" }}>Recipient:</span>
                        <span style={{ fontFamily: "var(--body)", fontSize: 15, fontWeight: 700, color: navy }}>3:16 AI Solutions LLC</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#888" }}>Memo:</span>
                        <span style={{ fontFamily: "var(--body)", fontSize: 15, fontWeight: 600, color: "#555" }}>Your Business Name + Service</span>
                      </div>
                    </div>
                    <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "#999", marginTop: 16, textAlign: "center" }}>After sending, please email {EMAIL} with confirmation so we can activate your service promptly.</p>
                  </div>
                )}

                {/* Cash */}
                {method === "cash" && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🤝</div>
                    <p style={{ fontFamily: "var(--body)", fontSize: 15, color: "#555", marginBottom: 24, lineHeight: 1.7 }}>Cash payments are accepted in person. Please contact us to schedule a meeting and complete your setup.</p>
                    <div style={{ padding: "20px", borderRadius: 10, background: "#fff", border: "1px solid #e8e4d8", marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#888" }}>Call Us:</span>
                        <span style={{ fontFamily: "var(--body)", fontSize: 15, fontWeight: 700, color: navy }}>{PHONE}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#888" }}>Email:</span>
                        <span style={{ fontFamily: "var(--body)", fontSize: 15, fontWeight: 700, color: navy }}>{EMAIL}</span>
                      </div>
                    </div>
                    <a href="tel:8174382050" style={{
                      display: "inline-block", padding: "16px 40px", background: navy, color: "#fff",
                      borderRadius: 8, textDecoration: "none", fontFamily: "var(--body)", fontWeight: 700, fontSize: 16,
                      boxShadow: "0 4px 16px rgba(22,28,44,.18)"
                    }}>📞 Call to Schedule</a>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Trust badges */}
            <Reveal delay={200}>
              <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32 }}>
                {[
                  { icon: "🔒", text: "Secure Payments" },
                  { icon: "📄", text: "No Hidden Fees" },
                  { icon: "❌", text: "Cancel Anytime" },
                ].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 16 }}>{b.icon}</span>
                    <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#888", fontWeight: 500 }}>{b.text}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Questions */}
      <section style={{ padding: "50px 0", background: cream, borderTop: "2px solid " + gold }}>
        <div style={{ ...wrap, textAlign: "center" }}>
          <Reveal>
            <h3 style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 22, color: navy, marginBottom: 8 }}>Questions about billing?</h3>
            <p style={{ fontFamily: "var(--body)", color: "#777", fontSize: 15, marginBottom: 4 }}>Call us at {PHONE} or email {EMAIL}</p>
            <p style={{ fontFamily: "var(--body)", color: "#999", fontSize: 13 }}>We accept credit card, debit card, Zelle, and cash (in person).</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════ */
/*  OPT-IN PAGE                            */
/* ═══════════════════════════════════════ */
function OptInPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [biz, setBiz] = useState("");
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name || !phone || !consent1 || !consent2) return;
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 8, border: "1px solid #ddd8cc",
    fontFamily: "var(--body)", fontSize: 15, color: navy, background: "#fff", outline: "none"
  };

  return (
    <section style={{ paddingTop: 100, paddingBottom: 80, background: "#fff", minHeight: "80vh" }}>
      <div style={{ ...wrap, maxWidth: 560 }}>
        <Reveal>
          <h1 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: navy, marginBottom: 8 }}>SMS Opt-In</h1>
          <p style={{ fontFamily: "var(--body)", color: "#888", fontSize: 15, marginBottom: 40 }}>Sign up to receive automated text messages from {BIZ}.</p>
        </Reveal>

        {submitted ? (
          <Reveal>
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: "var(--head)", fontSize: 28, color: navy, marginBottom: 12 }}>You're Opted In!</h3>
              <p style={{ fontFamily: "var(--body)", color: "#666", fontSize: 16 }}>We'll be in touch shortly. Reply STOP anytime to opt out.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={100}>
            <div style={{ padding: "40px", borderRadius: 16, border: "2px solid " + gold, background: cream }}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, color: navy, display: "block", marginBottom: 6 }}>Your Name *</label>
                <input style={inputStyle} placeholder="John Smith" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, color: navy, display: "block", marginBottom: 6 }}>Phone Number *</label>
                <input style={inputStyle} placeholder="(555) 123-4567" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, color: navy, display: "block", marginBottom: 6 }}>Business Name <span style={{ color: "#aaa", fontWeight: 400 }}>(optional)</span></label>
                <input style={inputStyle} placeholder="Your Business LLC" value={biz} onChange={e => setBiz(e.target.value)} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", padding: "16px", borderRadius: 10, background: "#fff", border: "1px solid #e8e4d8" }}>
                  <input type="checkbox" checked={consent1} onChange={e => setConsent1(e.target.checked)}
                    style={{ marginTop: 3, width: 20, height: 20, accentColor: gold, cursor: "pointer", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                    I consent to receive marketing and promotional messages from {BIZ} at the phone number provided. Message frequency may vary. Message & data rates may apply. Reply HELP for help or STOP to opt out.
                  </span>
                </label>
                <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", padding: "16px", borderRadius: 10, background: "#fff", border: "1px solid #e8e4d8" }}>
                  <input type="checkbox" checked={consent2} onChange={e => setConsent2(e.target.checked)}
                    style={{ marginTop: 3, width: 20, height: 20, accentColor: gold, cursor: "pointer", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                    I consent to receive transactional messages from {BIZ} at the phone number provided, including missed call responses and appointment booking confirmations. Message frequency may vary. Message & data rates may apply. Reply HELP for help or STOP to opt out.
                  </span>
                </label>
                <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "#999", lineHeight: 1.5, paddingLeft: 4 }}>
                  View our <Link to="/services" style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(255,255,255,.5)", textDecoration: "none" }}>Services</Link>
          <Link to="/payment" style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(255,255,255,.5)", textDecoration: "none" }}>Payment</Link>
          <Link to="/privacy" style={{ color: gold, textDecoration: "underline" }}>Privacy Policy</Link> and <Link to="/terms" style={{ color: gold, textDecoration: "underline" }}>Terms & Conditions</Link>.
                </p>
              </div>

              <button onClick={handleSubmit}
                style={{
                  width: "100%", padding: "16px", borderRadius: 8, border: "none",
                  cursor: (!name || !phone || !consent1 || !consent2) ? "not-allowed" : "pointer",
                  background: (!name || !phone || !consent1 || !consent2) ? "#ccc" : navy,
                  color: "#fff", fontFamily: "var(--body)", fontWeight: 700, fontSize: 16,
                  boxShadow: (!name || !phone || !consent1 || !consent2) ? "none" : "0 4px 16px rgba(22,28,44,.18)",
                  transition: "all .2s"
                }}>
                Opt In to SMS Updates
              </button>

              <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "#999", textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
                By submitting this form, you agree to receive automated SMS messages from {BIZ}. Consent is not a condition of purchase. You can opt out at any time by replying STOP.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════ */
/*  PRIVACY POLICY PAGE                    */
/* ═══════════════════════════════════════ */
function PrivacyPage() {
  return (
    <section style={{ paddingTop: 100, paddingBottom: 80, background: "#fff", minHeight: "80vh" }}>
      <div style={{ ...wrap, maxWidth: 780 }}>
        <Reveal>
          <h1 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: navy, marginBottom: 8 }}>Privacy Policy</h1>
          <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "#999", marginBottom: 40 }}>Last updated: March 13, 2026</p>
        </Reveal>
        <Reveal delay={100}>
          <div>
            <p style={pStyle}>{BIZ} ("Company," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website {SITE}, use our services, or communicate with us via SMS, phone, or email.</p>
            <h3 style={h3Style}>Information We Collect</h3>
            <p style={pStyle}><strong>Personal Information:</strong> Name, phone number, email address, business name, and service address that you voluntarily provide when contacting us, filling out forms, or opting in to our SMS messaging service.</p>
            <p style={pStyle}><strong>Automatically Collected Information:</strong> IP address, browser type, device type, operating system, pages visited, and time spent on our website through cookies and similar tracking technologies.</p>
            <p style={pStyle}><strong>SMS & Communication Data:</strong> Phone numbers, message content, opt-in/opt-out status, and timestamps related to our automated text messaging services.</p>
            <h3 style={h3Style}>How We Use Your Information</h3>
            <p style={pStyle}>We use the information we collect to: provide, operate, and maintain our services; respond to your inquiries and missed calls via automated SMS; schedule and confirm appointments on your behalf; send service-related notifications; improve our website and services; and comply with legal obligations.</p>
            <h3 style={h3Style}>SMS Messaging</h3>
            <p style={pStyle}>By opting in to our SMS service, you consent to receive automated text messages from {BIZ} related to appointment scheduling, service updates, and marketing and promotional messages. Message frequency may vary. Message and data rates may apply. You can opt out at any time by replying STOP to any message. For help, reply HELP or contact us at {EMAIL}.</p>
            <p style={pStyle}><strong>We do not sell, rent, or share your phone number or SMS opt-in data with third parties for their marketing purposes.</strong> SMS consent and phone numbers are not shared with any third parties or affiliates for promotional purposes.</p>
            <h3 style={h3Style}>Consent</h3>
            <p style={pStyle}>Consent to receive SMS messages is not a condition of purchase. You may opt in through our website opt-in form or by texting a keyword to our business number. You may revoke consent at any time by replying STOP.</p>
            <h3 style={h3Style}>Information Sharing</h3>
            <p style={pStyle}>We do not sell your personal information. We may share your information with: service providers who assist in operating our business (e.g., CRM platforms, scheduling tools); legal authorities when required by law or to protect our rights; and business partners only with your explicit consent.</p>
            <h3 style={h3Style}>Data Security</h3>
            <p style={pStyle}>We implement reasonable administrative, technical, and physical safeguards to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
            <h3 style={h3Style}>Your Rights</h3>
            <p style={pStyle}>You may request to access, update, or delete your personal information at any time by contacting us at {EMAIL} or calling {PHONE}. To opt out of SMS messages, reply STOP to any message. To get help, reply HELP.</p>
            <h3 style={h3Style}>Contact Us</h3>
            <p style={pStyle}>{BIZ}<br />Saginaw, TX<br />Email: {EMAIL}<br />Phone: {PHONE}<br />Website: {SITE}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════ */
/*  TERMS & CONDITIONS PAGE                */
/* ═══════════════════════════════════════ */
function TermsPage() {
  return (
    <section style={{ paddingTop: 100, paddingBottom: 80, background: "#fff", minHeight: "80vh" }}>
      <div style={{ ...wrap, maxWidth: 780 }}>
        <Reveal>
          <h1 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: navy, marginBottom: 8 }}>Terms & Conditions</h1>
          <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "#999", marginBottom: 40 }}>Last updated: March 13, 2026</p>
        </Reveal>
        <Reveal delay={100}>
          <div>
            <h3 style={h3Style}>1. Agreement to Terms</h3>
            <p style={pStyle}>By accessing or using the website and services of {BIZ} ("Company," "we," "us," "our"), you ("you," "user," "subscriber") agree to be bound by these Terms & Conditions ("Terms"). If you do not agree with any part of these Terms, you may not access our website or use our services. You must be at least 18 years of age to use our website and services. By using our services or opting in to our SMS program, you confirm that you are at least 18 years old.</p>

            <h3 style={h3Style}>2. Description of Services</h3>
            <p style={pStyle}>{BIZ} provides AI-powered automation services for home service businesses and small businesses. Our services include:</p>
            <p style={pStyle}><strong>AI Missed Call Text-Back:</strong> When a customer calls your business and the call is missed, our AI system automatically sends the caller an SMS text message within 30 seconds. The AI engages the customer in a professional text conversation, answers common questions about your services, and assists with booking an appointment — all without any action required from you.</p>
            <p style={pStyle}><strong>Website Design & Development:</strong> Professional website design and development services for businesses, including custom design, mobile-responsive layouts, SEO optimization, and ongoing support.</p>
            <p style={pStyle}><strong>Additional Services:</strong> CRM setup and workflow automation, appointment scheduling systems, and related consulting and support.</p>

            <h3 style={h3Style}>3. SMS Program & Messaging Terms</h3>
            <p style={pStyle}>By opting in to our SMS messaging program, you agree to the following terms:</p>
            <p style={pStyle}><strong>Program Description:</strong> {BIZ} operates an SMS messaging program that sends automated text messages to end users (your customers) on behalf of your business. Messages include missed call follow-ups, appointment scheduling confirmations, appointment reminders, service updates, and marketing or promotional messages about our services.</p>
            <p style={pStyle}><strong>Message Frequency:</strong> Message frequency varies depending on your interactions and the services you have subscribed to. You may receive recurring messages. For businesses using our AI text-back service, your customers will receive automated messages when a call is missed and during the appointment booking process.</p>
            <p style={pStyle}><strong>Message & Data Rates:</strong> Message and data rates may apply. Please contact your wireless carrier for details about your messaging plan and any applicable charges. {BIZ} is not responsible for any charges incurred from your wireless carrier as a result of receiving SMS messages.</p>

            <h3 style={h3Style}>4. SMS Opt-In & Opt-Out</h3>
            <p style={pStyle}><strong>Opt-In:</strong> You may opt in to receive SMS messages from {BIZ} through our website opt-in form, by providing your phone number during service enrollment, or by texting a keyword to our business number. By opting in, you expressly consent to receive automated text messages from {BIZ} at the phone number provided.</p>
            <p style={pStyle}><strong>Opt-Out:</strong> You can opt out of receiving SMS messages at any time by texting <strong>STOP</strong> to any message you receive from us. After opting out, you will receive one final confirmation message and will no longer receive SMS messages from {BIZ} unless you opt in again.</p>
            <p style={pStyle}><strong>Help:</strong> For assistance with our SMS program, text <strong>HELP</strong> to any message you receive from us, or contact us at {EMAIL} or {PHONE}.</p>
            <p style={pStyle}><strong>Consent Not Required for Purchase:</strong> SMS consent is not a condition of purchasing any goods or services from {BIZ}. You may choose not to opt in and still use our non-SMS services.</p>
            <p style={pStyle}><strong>No Sharing of SMS Data:</strong> We will not sell, rent, or share your phone number, SMS consent, or opt-in data with any third parties or affiliates for their marketing or promotional purposes.</p>

            <h3 style={h3Style}>5. Carrier Liability Disclaimer</h3>
            <p style={pStyle}>Wireless carriers are not liable for delayed or undelivered messages. {BIZ} does not guarantee the delivery, timeliness, or accuracy of any SMS messages. Message delivery is subject to the effective transmission from your wireless carrier and their network conditions. Carriers are not responsible for the content of any messages sent through our SMS program. You acknowledge that wireless carriers may impose restrictions or limitations on messaging that are outside of our control.</p>

            <h3 style={h3Style}>6. Privacy Policy</h3>
            <p style={pStyle}>Your use of our services is also governed by our <a href="/privacy" style={{ color: gold, textDecoration: "underline" }}>Privacy Policy</a>, which describes how we collect, use, and protect your personal information including your phone number and SMS data. By using our services, you acknowledge that you have read and agree to the terms of our Privacy Policy.</p>

            <h3 style={h3Style}>7. Age Restriction</h3>
            <p style={pStyle}>Our website, services, and SMS messaging program are intended for individuals who are at least 18 years of age. By using our services or opting in to our SMS program, you represent and warrant that you are at least 18 years old. If we learn that we have collected personal information or SMS consent from a person under age 18, we will promptly delete that information.</p>

            <h3 style={h3Style}>8. Payment Terms</h3>
            <p style={pStyle}>Services are billed monthly at the agreed-upon rate. Payment is due upon receipt of invoice. We reserve the right to suspend services for non-payment after 15 days past due. There are no long-term contracts — you may cancel at any time with 30 days written notice.</p>

            <h3 style={h3Style}>9. Client Responsibilities</h3>
            <p style={pStyle}>You agree to: provide accurate business information for service setup; maintain an active business phone number; comply with all applicable federal, state, and local laws regarding SMS communications (including the Telephone Consumer Protection Act and CAN-SPAM Act) and your business operations; ensure that your customers have provided proper consent before their information is used in our automated messaging systems; and not use our services for any unlawful, harassing, or prohibited purpose.</p>

            <h3 style={h3Style}>10. Limitation of Liability</h3>
            <p style={pStyle}>{BIZ} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use or inability to use our services, including but not limited to lost revenue, missed appointments, or failed message delivery. Our total liability shall not exceed the amount paid by you for services in the preceding 30 days. This limitation applies to all claims, whether based on warranty, contract, tort, or any other legal theory.</p>

            <h3 style={h3Style}>11. Intellectual Property</h3>
            <p style={pStyle}>All content, branding, workflows, and automation systems created by {BIZ} remain our intellectual property unless otherwise agreed in writing. You retain ownership of your business data and customer information.</p>

            <h3 style={h3Style}>12. Termination</h3>
            <p style={pStyle}>Either party may terminate the service agreement with 30 days written notice. Upon termination, we will assist in transitioning your data and deactivating automated workflows. Any outstanding balances remain due upon termination.</p>

            <h3 style={h3Style}>13. Dispute Resolution</h3>
            <p style={pStyle}>Any disputes arising from these Terms or our services shall be governed by and construed in accordance with the laws of the State of Texas. Both parties agree to attempt to resolve any disputes through good-faith negotiation before pursuing other remedies.</p>

            <h3 style={h3Style}>14. Changes to Terms</h3>
            <p style={pStyle}>We reserve the right to update these Terms & Conditions at any time. Changes will be posted on this page with an updated "Last updated" date. Continued use of our services after changes are posted constitutes acceptance of the updated Terms. We encourage you to review this page periodically.</p>

            <h3 style={h3Style}>15. Contact Us</h3>
            <p style={pStyle}>If you have any questions about these Terms & Conditions, our SMS program, or need assistance opting out, please contact us:</p>
            <p style={pStyle}>{BIZ}<br />Saginaw, TX<br />Email: {EMAIL}<br />Phone: {PHONE}<br />Website: {SITE}</p>
            <p style={pStyle}>To opt out of SMS messages, text <strong>STOP</strong> to any message.<br />For help, text <strong>HELP</strong> or email {EMAIL}.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════ */
/*  APP WITH ROUTER                        */
/* ═══════════════════════════════════════ */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ background: "#FFFFFF", color: navy, minHeight: "100vh", overflowX: "hidden", maxWidth: "100vw" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
          :root { --head: 'Playfair Display', serif; --body: 'DM Sans', sans-serif; }
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body { background: #fff; }
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        
        @media (max-width: 860px) {
          [style*="grid-template-columns: 1fr 320px"] > div { text-align: center !important; }
          [style*="grid-template-columns: 1fr 320px"] > div > div > div[style*="display: flex"][style*="gap: 14"] { justify-content: center !important; }
          [style*="grid-template-columns: 1fr 320px"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(5"] { grid-template-columns: 1fr 1fr !important; }
          [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: 1fr 1fr"][style*="max-width: 800px"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: 1fr 1fr"][style*="max-width: 900px"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: 1fr 1fr"][style*="gap: 18"] { grid-template-columns: 1fr !important; }
          [style*="width: 310px"] { width: 280px !important; margin: 0 auto !important; }
          [style*="font-size: clamp(34px"] { font-size: 28px !important; }
          [style*="font-size: clamp(28px"] { font-size: 24px !important; }
          [style*="font-size: clamp(26px"] { font-size: 22px !important; }
          [style*="font-size: clamp(24px"] { font-size: 20px !important; }
          footer > div > div { flex-direction: column !important; text-align: center !important; }
          .nav-hide { display: none !important; }
          [style*="padding: 40px"] { padding: 20px !important; }
        }
        
        @media (max-width: 480px) {
          [style*="max-width: 1100px"] { padding-left: 16px !important; padding-right: 16px !important; }
          [style*="gap: 60px"] { gap: 30px !important; }
          [style*="width: 310px"] { width: 270px !important; }
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="width: 280px"] { width: 250px !important; }
          [style*="font-size: 50px"] { font-size: 36px !important; }
          [style*="font-size: 40px"] { font-size: 28px !important; }
        }
        `}</style>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/optin" element={<OptInPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
