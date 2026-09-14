import { useMemo, useState } from "react";

const COMPANY = {
  name: "SURVEYCO",
  legalName: "Your Company Name",
  tagline: "Land Surveying • Mapping • Geomatics",
  phone: "+63 9XX XXX XXXX",
  email: "hello@yourcompany.com",
  serviceArea: "Baguio City & surrounding areas",
};

const services = [
  {
    code: "01",
    title: "Boundary & Property Surveys",
    text: "Field measurement and property-line documentation for owners, buyers, developers, and project teams.",
  },
  {
    code: "02",
    title: "Topographic Surveys",
    text: "Site elevation, terrain, features, and reference data prepared for planning, design, and engineering use.",
  },
  {
    code: "03",
    title: "Construction & Layout",
    text: "Survey support for site layout, reference points, alignment, and field verification during construction.",
  },
  {
    code: "04",
    title: "Subdivision & Mapping",
    text: "Survey and mapping support for parcel planning, documentation, lot configuration, and project coordination.",
  },
];

const process = [
  ["01", "Tell us about the site", "Share the property location, project type, timeline, and the survey output you need."],
  ["02", "Scope & quotation", "The team reviews the request, confirms requirements, and prepares the appropriate survey scope."],
  ["03", "Field survey", "On-site measurements are completed using the company’s approved field workflow and equipment."],
  ["04", "Deliverables", "Survey results and agreed documentation are prepared for the client and project stakeholders."],
];

const points = [
  { x: 16, y: 70, label: "P-01" },
  { x: 31, y: 30, label: "P-02" },
  { x: 55, y: 46, label: "P-03" },
  { x: 78, y: 24, label: "P-04" },
  { x: 84, y: 73, label: "P-05" },
];

function SurveyMap() {
  const [activePoint, setActivePoint] = useState(2);
  const active = points[activePoint];

  const coordinate = useMemo(
    () => ({
      northing: `N ${1638 + activePoint * 117}.${24 + activePoint * 9}`,
      easting: `E ${492 + activePoint * 83}.${71 + activePoint * 4}`,
    }),
    [activePoint]
  );

  return (
    <div className="survey-console" aria-label="Interactive survey visualization">
      <div className="console-head">
        <div>
          <span className="live-dot" /> FIELD / CONTROL NETWORK
        </div>
        <span>GRID 01</span>
      </div>

      <div className="survey-map">
        <div className="topo topo-a" />
        <div className="topo topo-b" />
        <div className="topo topo-c" />
        <div className="north-arrow"><span>N</span><i /></div>

        <svg className="survey-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points="16,70 31,30 55,46 78,24 84,73 55,46 16,70" />
          <line x1="31" y1="30" x2="84" y2="73" />
        </svg>

        {points.map((point, index) => (
          <button
            key={point.label}
            type="button"
            className={index === activePoint ? "survey-point active" : "survey-point"}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            onClick={() => setActivePoint(index)}
            aria-label={`View ${point.label} coordinates`}
          >
            <span className="point-core" />
            <small>{point.label}</small>
          </button>
        ))}

        <div className="coordinate-card">
          <span>CONTROL POINT</span>
          <strong>{active.label}</strong>
          <code>{coordinate.northing}</code>
          <code>{coordinate.easting}</code>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#top">
            <span className="brand-symbol">△</span>
            <span>
              <strong>{COMPANY.name}</strong>
              <small>{COMPANY.tagline}</small>
            </span>
          </a>

          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#process">Process</a>
            <a href="#quote">Request a Quote</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <div className="survey-label">LAND SURVEYING / FIELD + DATA</div>
            <p className="eyebrow">Precision for property, planning, and construction</p>
            <h1>
              Measure with confidence.
              <span> Build from certainty.</span>
            </h1>
            <p className="hero-text">
              Professional surveying support for property owners, contractors,
              developers, and project teams — from field measurement to clear,
              project-ready survey information.
            </p>

            <div className="hero-actions">
              <a className="button primary" href="#quote">Request a survey</a>
              <a className="button secondary" href="#services">Explore services</a>
            </div>

            <div className="hero-meta">
              <div><span>AREA</span><strong>{COMPANY.serviceArea}</strong></div>
              <div><span>FOCUS</span><strong>Accuracy • Clarity • Field Reliability</strong></div>
            </div>
          </div>

          <SurveyMap />
        </section>

        <section className="signal-bar" aria-hidden="true">
          <div className="signal-track">
            <span>BOUNDARY</span><i />
            <span>TOPOGRAPHY</span><i />
            <span>CONTROL</span><i />
            <span>MAPPING</span><i />
            <span>LAYOUT</span><i />
            <span>FIELD DATA</span><i />
            <span>BOUNDARY</span><i />
            <span>TOPOGRAPHY</span><i />
          </div>
        </section>

        <section className="section container" id="services">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Survey services</p>
              <h2>Technical fieldwork translated into useful project information.</h2>
            </div>
            <p>
              Service names and final descriptions should be confirmed with the client
              before publication.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.code}>
                <div className="service-top"><span>{service.code}</span><i /></div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className="service-mark">+</div>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div className="about-copy">
              <p className="eyebrow">Built around reliable field data</p>
              <h2>A surveying website should feel as precise as the work behind it.</h2>
              <p>
                This draft positions {COMPANY.legalName} as a technical, dependable
                surveying partner. The final company story, experience, licenses,
                accreditations, equipment, and service coverage will be added only
                after the client confirms them.
              </p>
            </div>

            <div className="metric-grid">
              <div><span>01</span><strong>Field Accuracy</strong><p>Clear control, measurement, and verification workflows.</p></div>
              <div><span>02</span><strong>Project Clarity</strong><p>Survey information communicated in a practical client-ready format.</p></div>
              <div><span>03</span><strong>Professional Process</strong><p>Defined scope, coordinated fieldwork, and documented deliverables.</p></div>
              <div><span>04</span><strong>Local Support</strong><p>Accessible communication for property and project requirements.</p></div>
            </div>
          </div>
        </section>

        <section className="section container" id="process">
          <div className="section-heading">
            <p className="eyebrow">Project flow</p>
            <h2>From inquiry to fieldwork to deliverables.</h2>
          </div>

          <div className="process-list">
            {process.map(([number, title, text]) => (
              <article className="process-row" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section equipment-section">
          <div className="container equipment-grid">
            <div>
              <p className="eyebrow">Field capability</p>
              <h2>Equipment, methods, and credentials belong here.</h2>
              <p className="muted-copy">
                Once the client provides the exact instruments, professional licenses,
                team qualifications, and accreditations, this section can become a
                strong trust-builder without making unsupported claims.
              </p>
            </div>

            <div className="equipment-panel">
              <div className="equipment-line"><span>GNSS / GPS</span><b>CLIENT TO CONFIRM</b></div>
              <div className="equipment-line"><span>TOTAL STATION</span><b>CLIENT TO CONFIRM</b></div>
              <div className="equipment-line"><span>CAD / MAPPING</span><b>CLIENT TO CONFIRM</b></div>
              <div className="equipment-line"><span>LICENSE / PRC</span><b>CLIENT TO CONFIRM</b></div>
            </div>
          </div>
        </section>

        <section className="quote-section" id="quote">
          <div className="container quote-card">
            <div className="quote-copy">
              <p className="eyebrow">Request a quotation</p>
              <h2>Tell us where the property is and what you need surveyed.</h2>
              <p>
                The form is already structured for Netlify Forms. Contact details are
                placeholders until the client provides the official phone and email.
              </p>

              <div className="contact-block">
                <span>{COMPANY.phone}</span>
                <span>{COMPANY.email}</span>
              </div>
            </div>

            <form
              className="quote-form"
              name="quote-request"
              method="POST"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="quote-request" />
              <label>
                Name
                <input name="name" type="text" placeholder="Your name" required />
              </label>
              <label>
                Email
                <input name="email" type="email" placeholder="you@email.com" required />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" placeholder="09XX XXX XXXX" />
              </label>
              <label>
                Property / project location
                <input name="location" type="text" placeholder="City, barangay, or site" />
              </label>
              <label>
                Survey needed
                <select name="service" defaultValue="General inquiry">
                  <option>General inquiry</option>
                  <option>Boundary & property survey</option>
                  <option>Topographic survey</option>
                  <option>Construction / layout survey</option>
                  <option>Subdivision / mapping</option>
                </select>
              </label>
              <label className="full-field">
                Project details
                <textarea name="message" rows="5" placeholder="Tell us what you need and your target schedule." />
              </label>
              <button className="button primary submit-button" type="submit">Send survey request</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong>{COMPANY.name}</strong>
            <span>{COMPANY.tagline}</span>
          </div>
          <span>Website draft • Client content pending confirmation</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
