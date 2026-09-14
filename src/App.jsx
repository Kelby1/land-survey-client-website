import { useMemo, useState } from "react";

const COMPANY = {
  name: "SURVEYCO",
  legalName: "Your Company Name",
  tagline: "Land Surveying • Mapping • Geomatics",
  phone: "+63 9XX XXX XXXX",
  email: "hello@yourcompany.com",
  serviceArea: "Baguio City & surrounding areas",
};

const concepts = [
  {
    id: "contour",
    label: "Concept A",
    name: "Contour Precision",
    kicker: "TOPOGRAPHIC / MODERN",
    eyebrow: "Precision for property, planning, and construction",
    title: "Measure the land.",
    highlight: "See the whole picture.",
    note: "Clean, premium, topographic — best for a modern surveying brand.",
  },
  {
    id: "cadastral",
    label: "Concept B",
    name: "Cadastral Grid",
    kicker: "BOUNDARY / PARCEL / TITLE",
    eyebrow: "Clear boundaries. Clear decisions.",
    title: "Every parcel has a story.",
    highlight: "Map it with certainty.",
    note: "More formal and property-focused — strong for boundary and lot work.",
  },
  {
    id: "field",
    label: "Concept C",
    name: "Field Operations",
    kicker: "FIELD / CONTROL / DELIVERY",
    eyebrow: "From control point to client deliverable",
    title: "Field data in.",
    highlight: "Project clarity out.",
    note: "Operational and technical — ideal for engineering and contractor clients.",
  },
];

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

const seedContacts = [
  { name: "Maria Santos", type: "Property Owner", status: "Awaiting documents" },
  { name: "North Ridge Builders", type: "Contractor", status: "Site visit scheduled" },
  { name: "Pine Estates", type: "Developer", status: "Quotation sent" },
];

const automationSeed = [
  { id: "quote", title: "Quote acknowledgment", text: "Send a confirmation after a new survey request.", enabled: true },
  { id: "visit", title: "Site visit reminder", text: "Remind the client before the scheduled field visit.", enabled: true },
  { id: "docs", title: "Documents ready", text: "Notify the client when final files are ready for release.", enabled: false },
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
        <div><span className="live-dot" /> FIELD / CONTROL NETWORK</div>
        <span>GRID 01</span>
      </div>

      <div className="survey-map">
        <div className="topo topo-a" />
        <div className="topo topo-b" />
        <div className="topo topo-c" />
        <div className="parcel parcel-a" />
        <div className="parcel parcel-b" />
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


function SurveyCommandCenter() {
  const [layer, setLayer] = useState("parcel");
  const [terrain3D, setTerrain3D] = useState(false);
  const [selectedNote, setSelectedNote] = useState("CP-03");

  const progress = [
    { label: "Documents received", state: "done" },
    { label: "Control established", state: "done" },
    { label: "Field measurement", state: "active" },
    { label: "Processing", state: "next" },
    { label: "Final plan", state: "next" },
  ];

  const fieldNotes = [
    { id: "CP-01", x: 19, y: 68, label: "Boundary monument", note: "Existing monument located and photographed." },
    { id: "CP-03", x: 57, y: 42, label: "Control point", note: "Primary project control established for field work." },
    { id: "OBS-2", x: 78, y: 67, label: "Field observation", note: "Fence line observed near parcel edge." },
  ];

  const selected = fieldNotes.find((item) => item.id === selectedNote) || fieldNotes[1];

  return (
    <section className="section command-section" id="command-center">
      <div className="container">
        <div className="section-heading command-heading">
          <div>
            <p className="eyebrow">Survey Project Command Center</p>
            <h2>A client-friendly view of the survey from fieldwork to final files.</h2>
          </div>
          <div className="project-state">
            <span className="live-dot" />
            LOT-2026-014 · FIELD SURVEY
          </div>
        </div>

        <div className="command-shell">
          <div className="command-topbar">
            <div>
              <span>PROJECT</span>
              <strong>Boundary + Topographic Survey</strong>
            </div>
            <div className="command-actions">
              <button type="button" onClick={() => setTerrain3D((value) => !value)}>
                {terrain3D ? "Exit 3D terrain" : "Open 3D terrain"}
              </button>
              <a href="#portal">View documents</a>
            </div>
          </div>

          <div className="command-layout">
            <div className="project-map-panel">
              <div className="map-toolbar">
                {[
                  ["parcel", "Parcel"],
                  ["terrain", "Terrain"],
                  ["control", "Control"],
                  ["photos", "Photos"],
                ].map(([id, label]) => (
                  <button
                    type="button"
                    key={id}
                    className={layer === id ? "map-layer active" : "map-layer"}
                    onClick={() => setLayer(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className={terrain3D ? `project-map terrain-3d layer-${layer}` : `project-map layer-${layer}`}>
                <div className="project-contour c1" />
                <div className="project-contour c2" />
                <div className="project-contour c3" />
                <div className="parcel-shape">
                  <span className="parcel-corner p1" />
                  <span className="parcel-corner p2" />
                  <span className="parcel-corner p3" />
                  <span className="parcel-corner p4" />
                  <strong>LOT 014</strong>
                  <small>842.5 m²</small>
                </div>

                <svg className="project-boundary-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <polyline points="19,68 30,24 72,20 84,69 57,82 19,68" />
                  <line x1="30" y1="24" x2="57" y2="82" />
                  <line x1="72" y1="20" x2="19" y2="68" />
                </svg>

                {fieldNotes.map((note) => (
                  <button
                    type="button"
                    key={note.id}
                    className={selectedNote === note.id ? "field-pin active" : "field-pin"}
                    style={{ left: `${note.x}%`, top: `${note.y}%` }}
                    onClick={() => setSelectedNote(note.id)}
                    aria-label={note.label}
                  >
                    <i />
                    <span>{note.id}</span>
                  </button>
                ))}

                <div className="map-compass"><b>N</b><i /></div>

                <div className="field-note-card">
                  <span>{selected.id}</span>
                  <strong>{selected.label}</strong>
                  <p>{selected.note}</p>
                </div>
              </div>

              <div className="map-statusline">
                <span>LAYER: {layer.toUpperCase()}</span>
                <span>{terrain3D ? "PERSPECTIVE: 3D TERRAIN" : "PERSPECTIVE: PLAN"}</span>
                <span>CONTROL: 5 PTS</span>
              </div>
            </div>

            <aside className="command-sidebar">
              <div className="command-card">
                <div className="command-card-head">
                  <span>FIELD PROGRESS</span>
                  <strong>60%</strong>
                </div>
                <div className="progress-list">
                  {progress.map((item) => (
                    <div className={`progress-item ${item.state}`} key={item.label}>
                      <i />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="command-card metrics-card">
                <span className="card-label">PROJECT METRICS</span>
                <div className="metric-pairs">
                  <div><span>Elevation</span><strong>1,526.34 m</strong></div>
                  <div><span>Area</span><strong>842.5 m²</strong></div>
                  <div><span>Control points</span><strong>5</strong></div>
                  <div><span>Project files</span><strong>8</strong></div>
                </div>
              </div>

              <div className="command-card">
                <span className="card-label">DOCUMENTS</span>
                <div className="mini-doc"><i>PDF</i><div><strong>Land_Title.pdf</strong><span>Client upload</span></div></div>
                <div className="mini-doc"><i>CAD</i><div><strong>Lot_Plan.dxf</strong><span>Working file</span></div></div>
                <div className="mini-doc"><i>IMG</i><div><strong>Field_Photos</strong><span>12 photos</span></div></div>
              </div>
            </aside>
          </div>

          <div className="elevation-panel">
            <div className="elevation-copy">
              <span>ELEVATION PROFILE · A → B</span>
              <strong>Terrain change across the selected survey line</strong>
            </div>
            <div className="elevation-chart" aria-label="Sample elevation profile">
              <svg viewBox="0 0 600 110" preserveAspectRatio="none">
                <path d="M0 88 C60 78 74 42 130 51 S212 92 270 70 S336 25 395 38 S472 80 520 58 S570 33 600 44" />
                <line x1="0" y1="94" x2="600" y2="94" />
              </svg>
              <span className="elev-start">A · 1519m</span>
              <span className="elev-end">B · 1532m</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortalDemo() {
  const [activeTab, setActiveTab] = useState("documents");
  const [files, setFiles] = useState([
    { name: "Lot-Plan_Revision-B.pdf", size: 2.4, status: "Reviewed" },
    { name: "Control-Points.csv", size: 0.3, status: "Field data" },
  ]);
  const [contacts, setContacts] = useState(seedContacts);
  const [automations, setAutomations] = useState(automationSeed);
  const [contactName, setContactName] = useState("");

  const totalStorage = files.reduce((sum, file) => sum + file.size, 0);
  const storagePercent = Math.min((totalStorage / 25) * 100, 100);

  const handleFiles = (event) => {
    const picked = Array.from(event.target.files || []).map((file) => ({
      name: file.name,
      size: Number((file.size / 1024 / 1024).toFixed(1)) || 0.1,
      status: "Local demo",
    }));
    setFiles((current) => [...picked, ...current].slice(0, 8));
    event.target.value = "";
  };

  const addContact = (event) => {
    event.preventDefault();
    const clean = contactName.trim();
    if (!clean) return;
    setContacts((current) => [
      { name: clean, type: "New inquiry", status: "Needs follow-up" },
      ...current,
    ]);
    setContactName("");
  };

  const toggleAutomation = (id) => {
    setAutomations((current) =>
      current.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item)
    );
  };

  return (
    <section className="section portal-section" id="portal">
      <div className="container">
        <div className="section-heading portal-heading">
          <div>
            <p className="eyebrow">Client portal concept</p>
            <h2>Not just a brochure site — a simple digital survey desk.</h2>
          </div>
          <div className="demo-badge">
            <span className="live-dot" />
            INTERACTIVE PROTOTYPE
          </div>
        </div>

        <div className="portal-note">
          Demo only: uploaded files and contacts stay in this browser session. Nothing is stored or emailed yet.
        </div>

        <div className="portal-shell">
          <aside className="portal-sidebar">
            <div className="portal-mini-brand">
              <span className="brand-symbol">△</span>
              <div><strong>SURVEY DESK</strong><small>CLIENT WORKSPACE</small></div>
            </div>
            {[
              ["documents", "▤", "Documents"],
              ["contacts", "◎", "Contacts"],
              ["automations", "↻", "Email Automation"],
            ].map(([id, icon, label]) => (
              <button
                type="button"
                key={id}
                className={activeTab === id ? "portal-nav active" : "portal-nav"}
                onClick={() => setActiveTab(id)}
              >
                <span>{icon}</span>{label}
              </button>
            ))}
            <div className="portal-sidebar-foot">
              <span>PROJECT</span>
              <strong>LOT-2026-014</strong>
              <small>Boundary + Topographic</small>
            </div>
          </aside>

          <div className="portal-workspace">
            {activeTab === "documents" && (
              <div className="portal-panel">
                <div className="panel-head">
                  <div>
                    <span>DOCUMENT VAULT</span>
                    <h3>Project files</h3>
                  </div>
                  <label className="upload-button">
                    + Upload documents
                    <input type="file" multiple onChange={handleFiles} />
                  </label>
                </div>

                <div className="storage-card">
                  <div className="storage-top">
                    <div><span>DEMO STORAGE</span><strong>{totalStorage.toFixed(1)} MB / 25 MB</strong></div>
                    <span>{Math.round(storagePercent)}%</span>
                  </div>
                  <div className="storage-track"><i style={{ width: `${storagePercent}%` }} /></div>
                </div>

                <div className="file-list">
                  {files.map((file, index) => (
                    <div className="file-row" key={`${file.name}-${index}`}>
                      <div className="file-icon">DOC</div>
                      <div className="file-meta">
                        <strong>{file.name}</strong>
                        <span>{file.size.toFixed(1)} MB • {file.status}</span>
                      </div>
                      <button type="button" onClick={() => setFiles((current) => current.filter((_, i) => i !== index))}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "contacts" && (
              <div className="portal-panel">
                <div className="panel-head">
                  <div>
                    <span>CLIENT RELATIONSHIPS</span>
                    <h3>Contacts & project status</h3>
                  </div>
                </div>

                <form className="contact-demo-form" onSubmit={addContact}>
                  <input
                    value={contactName}
                    onChange={(event) => setContactName(event.target.value)}
                    placeholder="Add a sample client or company"
                  />
                  <button className="button primary" type="submit">Add contact</button>
                </form>

                <div className="contact-table">
                  {contacts.map((contact, index) => (
                    <div className="contact-row" key={`${contact.name}-${index}`}>
                      <span className="avatar">{contact.name.charAt(0)}</span>
                      <div><strong>{contact.name}</strong><span>{contact.type}</span></div>
                      <span className="contact-status">{contact.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "automations" && (
              <div className="portal-panel">
                <div className="panel-head">
                  <div>
                    <span>EMAIL WORKFLOWS</span>
                    <h3>Simple client automation</h3>
                  </div>
                </div>

                <div className="automation-list">
                  {automations.map((item) => (
                    <div className="automation-row" key={item.id}>
                      <div className="automation-icon">✉</div>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </div>
                      <button
                        type="button"
                        className={item.enabled ? "toggle active" : "toggle"}
                        onClick={() => toggleAutomation(item.id)}
                        aria-label={`Toggle ${item.title}`}
                      >
                        <i />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="automation-preview">
                  <span>EXAMPLE FLOW</span>
                  <strong>New quote → confirmation email → staff follow-up → site visit reminder</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! What kind of survey do you need help with?" },
  ]);

  const send = (text) => {
    const clean = (text || draft).trim();
    if (!clean) return;
    setMessages((current) => [
      ...current,
      { from: "user", text: clean },
      { from: "bot", text: "Thanks — a survey coordinator can review that request and get back to you with the next step." },
    ]);
    setDraft("");
  };

  return (
    <div className="chat-dock">
      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <div><span className="live-dot" /><strong>Survey Assistant</strong></div>
            <button type="button" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chat-body">
            {messages.slice(-5).map((message, index) => (
              <div className={message.from === "user" ? "chat-message user" : "chat-message"} key={index}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="quick-replies">
            <button type="button" onClick={() => send("I need a boundary survey")}>Boundary survey</button>
            <button type="button" onClick={() => send("I need a quotation")}>Get a quote</button>
          </div>
          <form className="chat-input" onSubmit={(event) => { event.preventDefault(); send(); }}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type a message…" />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      <button className="chat-bubble" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open survey chat">
        {open ? "×" : "◌"}
        {!open && <span />}
      </button>
    </div>
  );
}

function App() {
  const [conceptId, setConceptId] = useState("contour");
  const concept = concepts.find((item) => item.id === conceptId) || concepts[0];

  return (
    <div className={`site-shell concept-${concept.id}`}>
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
            <a href="#concepts">Concepts</a>
            <a href="#command-center">Command Center</a>
            <a href="#portal">Portal Demo</a>
            <a href="#quote">Request a Quote</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="concept-switcher-wrap" id="concepts">
          <div className="container concept-switcher">
            <div className="switcher-copy">
              <span>CLIENT DESIGN SELECTOR</span>
              <strong>Choose a visual direction</strong>
            </div>
            <div className="concept-tabs">
              {concepts.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={item.id === conceptId ? "concept-tab active" : "concept-tab"}
                  onClick={() => setConceptId(item.id)}
                >
                  <span>{item.label}</span>
                  <strong>{item.name}</strong>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="hero container">
          <div className="hero-copy">
            <div className="survey-label">{concept.kicker}</div>
            <p className="eyebrow">{concept.eyebrow}</p>
            <h1>
              {concept.title}
              <span> {concept.highlight}</span>
            </h1>
            <p className="hero-text">
              Professional surveying support for property owners, contractors,
              developers, and project teams — from field measurement to clear,
              project-ready survey information.
            </p>

            <div className="concept-note">
              <span>{concept.label}</span>
              <p>{concept.note}</p>
            </div>

            <div className="hero-actions">
              <a className="button primary" href="#quote">Request a survey</a>
              <a className="button secondary" href="#portal">Preview client portal</a>
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
            <span>CADASTRAL</span><i />
            <span>MAPPING</span><i />
            <span>LAYOUT</span><i />
            <span>FIELD DATA</span><i />
            <span>BOUNDARY</span><i />
          </div>
        </section>

        <section className="section container" id="services">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Survey services</p>
              <h2>Technical fieldwork translated into useful project information.</h2>
            </div>
            <p>
              The final list will be matched to the company’s actual professional services,
              licensing, equipment, and service area.
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
                This concept combines a public marketing site with a lightweight client workspace.
                The company can start simple, then add secure storage, contact management,
                notifications, and project collaboration after the client approves the direction.
              </p>
            </div>

            <div className="metric-grid">
              <div><span>01</span><strong>Field Accuracy</strong><p>Clear control, measurement, and verification workflows.</p></div>
              <div><span>02</span><strong>Document Flow</strong><p>Plans, field files, photos, and deliverables organized per project.</p></div>
              <div><span>03</span><strong>Client Updates</strong><p>Simple status, reminders, quote confirmation, and document-ready notices.</p></div>
              <div><span>04</span><strong>Human Contact</strong><p>Contact records and a friendly chat path without making the UI complicated.</p></div>
            </div>
          </div>
        </section>

        <SurveyCommandCenter />

        <PortalDemo />

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
                This working inquiry form can be kept simple while the client decides
                whether they also want a full client portal and document workflow.
              </p>

              <div className="contact-block">
                <span>{COMPANY.phone}</span>
                <span>{COMPANY.email}</span>
              </div>
            </div>

            <form className="quote-form" name="quote-request" method="POST" data-netlify="true" netlify-honeypot="bot-field">
              <input type="hidden" name="form-name" value="quote-request" />
              <p className="honeypot">
                <label>Don’t fill this out: <input name="bot-field" /></label>
              </p>
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
          <span>Interactive client concept • Final company content pending confirmation</span>
        </div>
      </footer>

      <ChatBubble />
    </div>
  );
}

export default App;
