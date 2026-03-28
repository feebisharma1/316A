import { useState } from "react";
import { Link } from "react-router-dom";

const navy = "#161C2C";
const gold = "#C7B167";
const cream = "#F7F4EC";
const wrap = { maxWidth: 800, margin: "0 auto", padding: "0 24px" };
const FORMSPREE = "https://formspree.io/f/mqeyogyd";
const PHONE = "(817) 438-2050";
const EMAIL = "316AiSolutions@gmail.com";

const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #ddd8cc", fontFamily: "var(--body)", fontSize: 14, color: navy, background: "#fff", outline: "none" };
const labelStyle = { fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, color: navy, display: "block", marginBottom: 6 };
const pStyle = { fontFamily: "var(--body)", fontSize: 14, color: "#555", lineHeight: 1.75, marginBottom: 12 };
const fieldGroup = { marginBottom: 16 };
const row2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };
const checkboxStyle = { width: 16, height: 16, accentColor: gold, cursor: "pointer" };

const sectionTitle = (num, title) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, marginTop: 40, paddingBottom: 12, borderBottom: "2px solid " + gold }}>
    <div style={{ width: 32, height: 32, borderRadius: "50%", background: navy, color: gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, fontFamily: "var(--body)", flexShrink: 0 }}>{num}</div>
    <h3 style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 20, color: navy }}>{title}</h3>
  </div>
);

const bulletList = (items) => (
  <div style={{ padding: "16px", borderRadius: 10, background: "#fff", border: "1px solid #e8e4d8" }}>
    {items.map((item, i) => (
      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 6 }}>
        <span style={{ color: gold, fontWeight: 700, flexShrink: 0 }}>•</span>
        <span style={{ ...pStyle, marginBottom: 0 }}>{item}</span>
      </div>
    ))}
  </div>
);

export default function ServiceAgreement() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    agreementDate: "", clientBusinessName: "", clientOwnerName: "", clientPhone: "", clientEmail: "",
    firstBillingDate: "", billingEmail: "", recurringDay: "", billingContact: "", paymentMethod: "",
    clientSignature: "", clientPrintedName: "", clientTitle: "", clientSignDate: "", agreedToTerms: false
  });
  const u = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const uCheck = (field, val) => () => setForm({ ...form, [field]: val });

  const handleSubmit = () => {
    if (!form.agreedToTerms || !form.clientBusinessName || !form.clientSignature) return;
    fetch(FORMSPREE, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType: "SERVICE AGREEMENT", ...form })
    }).then(() => setSubmitted(true)).catch(() => setSubmitted(true));
  };

  if (submitted) return (
    <div style={{ paddingTop: 140, paddingBottom: 80, background: "#fff", minHeight: "80vh", textAlign: "center" }}>
      <div style={wrap}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: 32, color: navy, marginBottom: 12 }}>Service Agreement Submitted!</h2>
        <p style={{ fontFamily: "var(--body)", fontSize: 16, color: "#666", marginBottom: 32 }}>We will get your service activated within 48 hours.</p>
        <Link to="/" style={{ padding: "14px 28px", background: navy, color: "#fff", borderRadius: 8, textDecoration: "none", fontFamily: "var(--body)", fontWeight: 700, fontSize: 15 }}>Back to Home</Link>
      </div>
    </div>
  );

  return (<>
    <section style={{ paddingTop: 115, paddingBottom: 40, background: navy }}>
      <div style={{ ...wrap, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, color: gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Service Agreement</p>
        <h1 style={{ fontFamily: "var(--head)", fontWeight: 900, fontSize: "clamp(28px,3.5vw,44px)", color: "#fff", marginBottom: 12 }}>Service Agreement</h1>
        <p style={{ fontFamily: "var(--body)", fontSize: 15, color: "rgba(255,255,255,.55)" }}>Month-to-Month | No Long-Term Contract</p>
      </div>
    </section>
    <section style={{ padding: "20px 0 80px", background: "#fff" }}>
      <div style={wrap}>
        <div style={{ padding: "32px", borderRadius: 16, border: "2px solid " + gold, background: cream, marginTop: -30 }}>
          <div style={fieldGroup}><label style={labelStyle}>Agreement Date</label><input style={{ ...inputStyle, maxWidth: 250 }} type="date" value={form.agreementDate} onChange={u("agreementDate")} /></div>

          {sectionTitle("1", "Parties")}
          <p style={pStyle}><em>This agreement is between 3:16 AI Solutions LLC and the client named below.</em></p>
          <div style={row2}>
            <div style={{ padding: "16px", borderRadius: 10, background: "#fff", border: "1px solid #e8e4d8" }}>
              <div style={{ fontFamily: "var(--body)", fontSize: 14, fontWeight: 700, color: navy, marginBottom: 8 }}>SERVICE PROVIDER</div>
              <div style={{ fontFamily: "var(--body)", fontSize: 14, color: "#555", lineHeight: 1.6 }}>3:16 AI Solutions LLC<br/>Saginaw, TX | {PHONE}<br/>{EMAIL}</div>
            </div>
            <div style={{ padding: "16px", borderRadius: 10, background: "#fff", border: "1px solid #e8e4d8" }}>
              <div style={{ fontFamily: "var(--body)", fontSize: 14, fontWeight: 700, color: navy, marginBottom: 8 }}>CLIENT</div>
              <div style={fieldGroup}><input style={inputStyle} placeholder="Business Name *" value={form.clientBusinessName} onChange={u("clientBusinessName")} /></div>
              <div style={fieldGroup}><input style={inputStyle} placeholder="Owner Name *" value={form.clientOwnerName} onChange={u("clientOwnerName")} /></div>
              <div style={fieldGroup}><input style={inputStyle} placeholder="Phone *" type="tel" value={form.clientPhone} onChange={u("clientPhone")} /></div>
              <div style={fieldGroup}><input style={inputStyle} placeholder="Email *" type="email" value={form.clientEmail} onChange={u("clientEmail")} /></div>
            </div>
          </div>

          {sectionTitle("2", "What We Will Do For You")}
          {bulletList(["Set up a dedicated AI-powered phone number within 48 hours.", "When a customer calls and you miss it, AI sends a text within 30 seconds.", "AI answers questions and books appointments on your calendar.", "We connect to your existing calendar so bookings show up automatically.", "We monitor and maintain the system on your behalf.", "We make adjustments, update messaging, or troubleshoot any issues."])}

          {sectionTitle("3", "Pricing & Payment")}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
            {[{l:"Monthly Fee",v:"$300"},{l:"Setup Fee",v:"$0"},{l:"Contract",v:"Month-to-Month"},{l:"Cancel",v:"Anytime"}].map((x,i) => (
              <div key={i} style={{ padding: "16px", borderRadius: 10, background: "#fff", border: "1px solid #e8e4d8", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--body)", fontSize: 11, color: "#888", marginBottom: 4 }}>{x.l}</div>
                <div style={{ fontFamily: "var(--body)", fontSize: 15, fontWeight: 700, color: navy }}>{x.v}</div>
              </div>
            ))}
          </div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>First Billing Date</label><input style={inputStyle} placeholder="e.g. April 1, 2026" value={form.firstBillingDate} onChange={u("firstBillingDate")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>Billing Email</label><input style={inputStyle} type="email" value={form.billingEmail} onChange={u("billingEmail")} /></div>
          </div>
          <div style={fieldGroup}><label style={labelStyle}>Payment Method</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[{v:"Stripe",d:"Credit/debit via Stripe"},{v:"Zelle",d:"Send to (817) 438-2050"},{v:"Cash",d:"In person only"}].map(m => (
                <label key={m.v} onClick={uCheck("paymentMethod", m.v)} style={{ padding: "14px", borderRadius: 10, background: "#fff", border: form.paymentMethod === m.v ? "2px solid "+gold : "1px solid #e8e4d8", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="radio" name="pay" style={checkboxStyle} checked={form.paymentMethod === m.v} readOnly />
                    <span style={{ fontFamily: "var(--body)", fontSize: 14, fontWeight: 700, color: navy }}>{m.v}</span>
                  </div>
                  <span style={{ fontFamily: "var(--body)", fontSize: 12, color: "#888" }}>{m.d}</span>
                </label>
              ))}
            </div>
          </div>

          {sectionTitle("4", "Late Payments")}
          {bulletList(["Payment due same day each month.", "5 day grace period if payment fails.", "Service paused if not paid within 5 days.", "Agreement terminated if not paid within 30 days."])}

          {sectionTitle("5", "Cancellation Policy")}
          {bulletList(["Cancel anytime - email 316AiSolutions@gmail.com.", "Service continues through end of current month.", "No refunds for current month once billed.", "We may cancel with 14 days notice if needed."])}

          {sectionTitle("6", "Your Responsibilities")}
          {bulletList(["Provide accurate business information.", "Notify us if your phone number changes.", "Keep your calendar up to date.", "Respond to booked appointments.", "Only use for legitimate business communications."])}

          {sectionTitle("7", "What We Are Not Responsible For")}
          {bulletList(["Missed calls from carrier/internet issues.", "SMS delays from carrier networks.", "Appointments not honored on your end.", "Lost revenue from before service was set up.", "Customer actions after receiving AI text."])}

          {sectionTitle("8", "SMS Compliance")}
          {bulletList(["Auto opt-out when customer replies STOP.", "All messages include opt-out instructions (TCPA).", "A2P 10DLC registration for deliverability.", "System only contacts people who called you first."])}

          {sectionTitle("9", "Confidentiality")}
          {bulletList(["Both parties keep agreement terms private.", "We never share your customer data with third parties.", "You keep our system details and pricing confidential."])}

          {sectionTitle("10", "Governing Law")}
          <p style={pStyle}>This agreement is governed by Texas law. Disputes handled in Tarrant County, TX.</p>

          {sectionTitle("11", "Acknowledgment & Signature")}
          <p style={pStyle}><em>By signing below, both parties agree to these terms.</em></p>
          <div style={{ padding: "24px", borderRadius: 12, background: "#fff", border: "2px solid " + gold, marginTop: 20 }}>
            <div style={{ fontFamily: "var(--body)", fontSize: 14, fontWeight: 700, color: navy, marginBottom: 16 }}>CLIENT SIGNATURE</div>
            <div style={row2}>
              <div style={fieldGroup}><label style={labelStyle}>Full Legal Name *</label><input style={inputStyle} value={form.clientPrintedName} onChange={u("clientPrintedName")} /></div>
              <div style={fieldGroup}><label style={labelStyle}>Title</label><input style={inputStyle} placeholder="e.g. Owner" value={form.clientTitle} onChange={u("clientTitle")} /></div>
            </div>
            <div style={fieldGroup}><label style={labelStyle}>Signature (type full name to sign) *</label>
              <input style={{ ...inputStyle, fontFamily: "'Playfair Display', serif", fontSize: 20, fontStyle: "italic", padding: "16px" }} placeholder="Type your full name" value={form.clientSignature} onChange={u("clientSignature")} />
            </div>
            <div style={fieldGroup}><label style={labelStyle}>Date *</label><input style={{ ...inputStyle, maxWidth: 250 }} type="date" value={form.clientSignDate} onChange={u("clientSignDate")} /></div>
            <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", marginTop: 16, padding: "16px", borderRadius: 10, background: cream, border: "1px solid #e8e4d8" }}>
              <input type="checkbox" checked={form.agreedToTerms} onChange={(e) => setForm({ ...form, agreedToTerms: e.target.checked })} style={{ marginTop: 3, width: 20, height: 20, accentColor: gold, cursor: "pointer", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "#555", lineHeight: 1.7 }}>I have read and agree to all terms in this Service Agreement. I confirm the information is accurate and I have authority to sign on behalf of my business.</span>
            </label>
          </div>

          <button onClick={handleSubmit} style={{ width: "100%", padding: "18px", borderRadius: 8, border: "none", cursor: (!form.agreedToTerms || !form.clientBusinessName || !form.clientSignature) ? "not-allowed" : "pointer", background: (!form.agreedToTerms || !form.clientBusinessName || !form.clientSignature) ? "#ccc" : navy, color: "#fff", fontFamily: "var(--body)", fontWeight: 700, fontSize: 16, marginTop: 32, transition: "all .2s" }}>Submit Service Agreement</button>
          <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "#999", textAlign: "center", marginTop: 16 }}>A copy will be sent to our team. We will follow up with activation details.</p>
        </div>
      </div>
    </section>
  </>);
}
