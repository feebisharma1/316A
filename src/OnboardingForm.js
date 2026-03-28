import { useState } from "react";
import { Link } from "react-router-dom";

const navy = "#161C2C";
const gold = "#C7B167";
const cream = "#F7F4EC";
const wrap = { maxWidth: 800, margin: "0 auto", padding: "0 24px" };
const PHONE = "(817) 438-2050";
const EMAIL = "316AiSolutions@gmail.com";
const FORMSPREE = "https://formspree.io/f/mqeyogyd";

const inputStyle = {
  width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #ddd8cc",
  fontFamily: "var(--body)", fontSize: 14, color: navy, background: "#fff", outline: "none"
};
const labelStyle = { fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, color: navy, display: "block", marginBottom: 6 };
const sectionTitle = (num, title) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, marginTop: 48, paddingBottom: 12, borderBottom: "2px solid " + gold }}>
    <div style={{ width: 32, height: 32, borderRadius: "50%", background: navy, color: gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, fontFamily: "var(--body)", flexShrink: 0 }}>{num}</div>
    <h3 style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 20, color: navy }}>{title}</h3>
  </div>
);
const fieldGroup = { marginBottom: 16 };
const row2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };
const checkboxLabel = { display: "flex", gap: 8, alignItems: "center", cursor: "pointer", fontFamily: "var(--body)", fontSize: 13, color: "#444" };
const checkboxStyle = { width: 16, height: 16, accentColor: gold, cursor: "pointer" };

export default function OnboardingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    date: "", rep: "", legalName: "", dba: "", ownerName: "", ownerCell: "", businessPhone: "", businessEmail: "",
    businessAddress: "", cityStateZip: "", websiteUrl: "", hearAbout: "", hasWebsite: "", websiteUrlIfYes: "",
    industry: "", industryOther: "", phoneSetup: "", currentNumber: "", carrier: "", preferredAreaCode: "",
    monOpen: "", monClose: "", tueOpen: "", tueClose: "", wedOpen: "", wedClose: "",
    thuOpen: "", thuClose: "", friOpen: "", friClose: "", satOpen: "", satClose: "",
    sunOpen: "", sunClose: "", aiHours: "", customHours: "",
    calendarSystem: "", calendarOther: "", calendarLogin: "", avgDuration: "",
    earliestBooking: "", latestBooking: "", bufferTime: "", maxBookings: "",
    apptType1: "", apptType2: "", apptType3: "", apptType4: "", apptType5: "", apptType6: "",
    services: "", serviceArea: "", responseTime: "", servicesNotOffered: "", emergencyService: "",
    aiGreeting: "", taglines: "", aiNeverSay: "", tone: "",
    quietStart: "", quietEnd: "", dndNames: "", notificationPref: "", notificationPhone: "", notificationEmail: "",
    servicePlan: "", firstBillingDate: "", billingContact: "", billingEmail: "", paymentMethod: "",
    additionalNotes: ""
  });
  const u = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const uCheck = (field, val) => () => setForm({ ...form, [field]: val });

  const handleSubmit = () => {
    fetch(FORMSPREE, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType: "ONBOARDING FORM", ...form })
    }).then(() => setSubmitted(true)).catch(() => setSubmitted(true));
  };

  if (submitted) return (
    <div style={{ paddingTop: 140, paddingBottom: 80, background: "#fff", minHeight: "80vh", textAlign: "center" }}>
      <div style={wrap}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontFamily: "var(--head)", fontWeight: 800, fontSize: 32, color: navy, marginBottom: 12 }}>Onboarding Form Submitted!</h2>
        <p style={{ fontFamily: "var(--body)", fontSize: 16, color: "#666", marginBottom: 32 }}>We will review your information and get your setup started within 48 hours.</p>
        <Link to="/" style={{ padding: "14px 28px", background: navy, color: "#fff", borderRadius: 8, textDecoration: "none", fontFamily: "var(--body)", fontWeight: 700, fontSize: 15 }}>Back to Home</Link>
      </div>
    </div>
  );

  return (<>
    <section style={{ paddingTop: 115, paddingBottom: 40, background: navy }}>
      <div style={{ ...wrap, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, color: gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>New Client</p>
        <h1 style={{ fontFamily: "var(--head)", fontWeight: 900, fontSize: "clamp(28px,3.5vw,44px)", color: "#fff", marginBottom: 12 }}>Client Onboarding Form</h1>
        <p style={{ fontFamily: "var(--body)", fontSize: 15, color: "rgba(255,255,255,.55)", maxWidth: 500, margin: "0 auto" }}>Missed Call Text Recovery Service</p>
      </div>
    </section>
    <section style={{ padding: "20px 0 80px", background: "#fff" }}>
      <div style={wrap}>
        <div style={{ padding: "32px", borderRadius: 16, border: "2px solid " + gold, background: cream, marginTop: -30 }}>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Date</label><input style={inputStyle} type="date" value={form.date} onChange={u("date")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>3:16 AI Rep</label><input style={inputStyle} value={form.rep} onChange={u("rep")} /></div>
          </div>

          {sectionTitle("1", "Business Information")}
          <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "#888", marginBottom: 20, fontStyle: "italic" }}>Please provide exact legal details as registered with the state and IRS.</p>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Legal Business Name *</label><input style={inputStyle} placeholder="Must match IRS/state records" value={form.legalName} onChange={u("legalName")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>DBA / Trade Name</label><input style={inputStyle} placeholder="If different from legal name" value={form.dba} onChange={u("dba")} /></div>
          </div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Owner / Contact Name *</label><input style={inputStyle} value={form.ownerName} onChange={u("ownerName")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>Owner Cell Phone *</label><input style={inputStyle} type="tel" value={form.ownerCell} onChange={u("ownerCell")} /></div>
          </div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Business Phone *</label><input style={inputStyle} placeholder="Number customers call" type="tel" value={form.businessPhone} onChange={u("businessPhone")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>Business Email *</label><input style={inputStyle} type="email" value={form.businessEmail} onChange={u("businessEmail")} /></div>
          </div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Business Address</label><input style={inputStyle} value={form.businessAddress} onChange={u("businessAddress")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>City, State, ZIP</label><input style={inputStyle} value={form.cityStateZip} onChange={u("cityStateZip")} /></div>
          </div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Website URL</label><input style={inputStyle} placeholder="www.yourbusiness.com" value={form.websiteUrl} onChange={u("websiteUrl")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>How did you hear about us?</label><input style={inputStyle} value={form.hearAbout} onChange={u("hearAbout")} /></div>
          </div>
          <div style={fieldGroup}>
            <label style={labelStyle}>Industry / Trade *</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 4 }}>
              {["HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping", "Pest Control", "General Contractor"].map(ind => (
                <label key={ind} style={checkboxLabel}><input type="radio" name="industry" style={checkboxStyle} checked={form.industry === ind} onChange={uCheck("industry", ind)} /> {ind}</label>
              ))}
              <label style={checkboxLabel}><input type="radio" name="industry" style={checkboxStyle} checked={form.industry === "Other"} onChange={uCheck("industry", "Other")} /> Other:</label>
              {form.industry === "Other" && <input style={{ ...inputStyle, width: 150 }} value={form.industryOther} onChange={u("industryOther")} />}
            </div>
          </div>

          {sectionTitle("2", "Phone Number Setup")}
          <div style={fieldGroup}>
            <label style={labelStyle}>How is your current business phone set up?</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
              {[["optA", "Personal cell used as business line"], ["optB", "Separate work phone (dedicated business cell)"], ["optC", "Virtual/VoIP forwarded to personal cell"]].map(([val, label]) => (
                <label key={val} style={checkboxLabel}><input type="radio" name="phoneSetup" style={checkboxStyle} checked={form.phoneSetup === val} onChange={uCheck("phoneSetup", val)} /> {label}</label>
              ))}
            </div>
          </div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Current Business Number *</label><input style={inputStyle} type="tel" value={form.currentNumber} onChange={u("currentNumber")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>Carrier / Provider</label><input style={inputStyle} placeholder="e.g. Verizon, AT&T" value={form.carrier} onChange={u("carrier")} /></div>
          </div>
          <div style={fieldGroup}><label style={labelStyle}>Preferred AI Number Area Code</label><input style={{ ...inputStyle, maxWidth: 200 }} placeholder="e.g. 817" value={form.preferredAreaCode} onChange={u("preferredAreaCode")} /></div>

          {sectionTitle("3", "Business Hours & AI Active Hours")}
          <label style={labelStyle}>Standard Business Hours</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginBottom: 20 }}>
            {[["Mon","mon"],["Tue","tue"],["Wed","wed"],["Thu","thu"],["Fri","fri"],["Sat","sat"],["Sun","sun"]].map(([day, key]) => (
              <div key={day} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--body)", fontSize: 12, fontWeight: 600, color: navy, marginBottom: 6 }}>{day}</div>
                <input style={{ ...inputStyle, padding: "8px 4px", fontSize: 12, textAlign: "center" }} placeholder="Open" value={form[key+"Open"]} onChange={u(key+"Open")} />
                <input style={{ ...inputStyle, padding: "8px 4px", fontSize: 12, textAlign: "center", marginTop: 4 }} placeholder="Close" value={form[key+"Close"]} onChange={u(key+"Close")} />
              </div>
            ))}
          </div>
          <div style={fieldGroup}>
            <label style={labelStyle}>When should the AI text back?</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["24/7", "24/7 Recommended"], ["business", "Business Hours Only"], ["custom", "Custom Hours"]].map(([val, label]) => (
                <label key={val} style={checkboxLabel}><input type="radio" name="aiHours" style={checkboxStyle} checked={form.aiHours === val} onChange={uCheck("aiHours", val)} /> {label}</label>
              ))}
            </div>
            {form.aiHours === "custom" && <div style={{ marginTop: 12 }}><input style={inputStyle} placeholder="e.g. Mon-Fri 7am-9pm" value={form.customHours} onChange={u("customHours")} /></div>}
          </div>

          {sectionTitle("4", "Calendar & Appointment Booking")}
          <div style={fieldGroup}>
            <label style={labelStyle}>Current Calendar System</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {["Google Calendar", "Outlook", "Jobber", "Housecall Pro", "ServiceTitan", "No system", "Paper/Manual"].map(cal => (
                <label key={cal} style={checkboxLabel}><input type="radio" name="calendar" style={checkboxStyle} checked={form.calendarSystem === cal} onChange={uCheck("calendarSystem", cal)} /> {cal}</label>
              ))}
            </div>
          </div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Calendar Login/Email</label><input style={inputStyle} value={form.calendarLogin} onChange={u("calendarLogin")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>Avg Appointment Duration</label><input style={inputStyle} placeholder="e.g. 1 hour" value={form.avgDuration} onChange={u("avgDuration")} /></div>
          </div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Earliest Booking Time</label><input style={inputStyle} placeholder="e.g. 8:00 AM" value={form.earliestBooking} onChange={u("earliestBooking")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>Latest Booking Time</label><input style={inputStyle} placeholder="e.g. 5:00 PM" value={form.latestBooking} onChange={u("latestBooking")} /></div>
          </div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Buffer Between Appointments</label><input style={inputStyle} placeholder="e.g. 30 min" value={form.bufferTime} onChange={u("bufferTime")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>Max Bookings Per Day</label><input style={inputStyle} placeholder="e.g. 5" value={form.maxBookings} onChange={u("maxBookings")} /></div>
          </div>
          <label style={labelStyle}>Appointment Types</label>
          <div style={row2}><input style={inputStyle} placeholder="Type 1 (e.g. Free Diagnosis)" value={form.apptType1} onChange={u("apptType1")} /><input style={inputStyle} placeholder="Type 2 (e.g. Service Call)" value={form.apptType2} onChange={u("apptType2")} /></div>
          <div style={{ ...row2, marginTop: 8 }}><input style={inputStyle} placeholder="Type 3 (e.g. Install)" value={form.apptType3} onChange={u("apptType3")} /><input style={inputStyle} placeholder="Type 4 (e.g. Maintenance)" value={form.apptType4} onChange={u("apptType4")} /></div>

          {sectionTitle("5", "Services & Pricing (AI Training)")}
          <div style={fieldGroup}><label style={labelStyle}>Services Offered (name, price, free estimate?)</label><textarea style={{ ...inputStyle, minHeight: 120 }} placeholder="List services, one per line" value={form.services} onChange={u("services")} /></div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Service Area</label><input style={inputStyle} placeholder="e.g. Fort Worth, 30-mile radius" value={form.serviceArea} onChange={u("serviceArea")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>Response Time</label><input style={inputStyle} placeholder="e.g. Same-day" value={form.responseTime} onChange={u("responseTime")} /></div>
          </div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Services NOT Offered</label><input style={inputStyle} value={form.servicesNotOffered} onChange={u("servicesNotOffered")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>Emergency / After Hours?</label>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>{["Yes", "No", "Extra charge"].map(v => (<label key={v} style={checkboxLabel}><input type="radio" name="emergency" style={checkboxStyle} checked={form.emergencyService === v} onChange={uCheck("emergencyService", v)} /> {v}</label>))}</div>
            </div>
          </div>

          {sectionTitle("6", "AI Personality & Messaging")}
          <div style={fieldGroup}><label style={labelStyle}>Preferred AI Greeting</label><input style={inputStyle} placeholder='"Hi! This is [Business]. Sorry we missed your call!"' value={form.aiGreeting} onChange={u("aiGreeting")} /></div>
          <div style={fieldGroup}><label style={labelStyle}>Taglines / Key Phrases</label><input style={inputStyle} value={form.taglines} onChange={u("taglines")} /></div>
          <div style={fieldGroup}><label style={labelStyle}>AI Should NEVER Say</label><input style={inputStyle} value={form.aiNeverSay} onChange={u("aiNeverSay")} /></div>
          <div style={fieldGroup}><label style={labelStyle}>Tone of Voice</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>{["Friendly & Casual", "Professional & Formal", "Warm & Reassuring", "Short & Efficient"].map(t => (<label key={t} style={checkboxLabel}><input type="radio" name="tone" style={checkboxStyle} checked={form.tone === t} onChange={uCheck("tone", t)} /> {t}</label>))}</div>
          </div>

          {sectionTitle("7", "Do Not Disturb & Notifications")}
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Quiet Hours Start</label><input style={inputStyle} placeholder="e.g. 9:00 PM" value={form.quietStart} onChange={u("quietStart")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>Quiet Hours End</label><input style={inputStyle} placeholder="e.g. 7:00 AM" value={form.quietEnd} onChange={u("quietEnd")} /></div>
          </div>
          <div style={fieldGroup}><label style={labelStyle}>Do Not Contact List</label><textarea style={{ ...inputStyle, minHeight: 80 }} placeholder="Name - Phone (one per line)" value={form.dndNames} onChange={u("dndNames")} /></div>
          <div style={fieldGroup}><label style={labelStyle}>Notification Preference</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>{["Text me", "Email me", "Both", "Check GHL app"].map(n => (<label key={n} style={checkboxLabel}><input type="radio" name="notif" style={checkboxStyle} checked={form.notificationPref === n} onChange={uCheck("notificationPref", n)} /> {n}</label>))}</div>
          </div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>Notification Phone</label><input style={inputStyle} type="tel" value={form.notificationPhone} onChange={u("notificationPhone")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>Notification Email</label><input style={inputStyle} type="email" value={form.notificationEmail} onChange={u("notificationEmail")} /></div>
          </div>

          {sectionTitle("8", "Payment Setup")}
          <div style={fieldGroup}><label style={{ ...checkboxLabel, padding: "12px 16px", borderRadius: 8, background: "#fff", border: "1px solid #e8e4d8" }}>
            <input type="checkbox" style={checkboxStyle} checked={form.servicePlan === "$300/month"} onChange={() => setForm({ ...form, servicePlan: form.servicePlan === "$300/month" ? "" : "$300/month" })} />
            $300/month - Missed Call Text Recovery (Month-to-month. Cancel anytime.)
          </label></div>
          <div style={row2}>
            <div style={fieldGroup}><label style={labelStyle}>First Billing Date</label><input style={inputStyle} placeholder="e.g. April 1, 2026" value={form.firstBillingDate} onChange={u("firstBillingDate")} /></div>
            <div style={fieldGroup}><label style={labelStyle}>Billing Email</label><input style={inputStyle} type="email" value={form.billingEmail} onChange={u("billingEmail")} /></div>
          </div>
          <div style={fieldGroup}><label style={labelStyle}>Payment Method</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>{["Credit Card (Stripe)", "Debit Card (Stripe)", "Zelle", "Cash"].map(m => (<label key={m} style={checkboxLabel}><input type="radio" name="payment" style={checkboxStyle} checked={form.paymentMethod === m} onChange={uCheck("paymentMethod", m)} /> {m}</label>))}</div>
          </div>

          {sectionTitle("9", "Additional Notes")}
          <textarea style={{ ...inputStyle, minHeight: 100 }} placeholder="Anything else we should know" value={form.additionalNotes} onChange={u("additionalNotes")} />

          <button onClick={handleSubmit} style={{ width: "100%", padding: "18px", borderRadius: 8, border: "none", cursor: "pointer", background: navy, color: "#fff", fontFamily: "var(--body)", fontWeight: 700, fontSize: 16, boxShadow: "0 4px 16px rgba(22,28,44,.18)", marginTop: 32 }}>Submit Onboarding Form</button>
          <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "#999", textAlign: "center", marginTop: 16 }}>Your information is secure and will only be used to set up your service.</p>
        </div>
      </div>
    </section>
  </>);
}
