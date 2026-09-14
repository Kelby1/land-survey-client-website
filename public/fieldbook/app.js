const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

const recommendations = {
  boundary: {
    title: "Boundary / Relocation Survey",
    copy:
      "Used to re-establish or verify property corners and boundaries from the available title, technical descriptions, approved plans, and field evidence.",
  },
  divide: {
    title: "Subdivision / Consolidation Survey",
    copy:
      "Used when land will be divided into smaller parcels or combined into a new configuration. Approval and documentation requirements depend on the property and transaction.",
  },
  build: {
    title: "Topographic / Engineering Survey",
    copy:
      "Provides elevations, terrain, site features, and other measured information used as a technical base for design, drainage, construction, and site planning.",
  },
  record: {
    title: "As-Built Survey",
    copy:
      "Documents the measured location of completed structures, utilities, improvements, or project elements for comparison, records, coordination, or turnover.",
  },
  large: {
    title: "Aerial / Geospatial Mapping",
    copy:
      "For larger or harder-to-cover sites, aerial imagery, photogrammetry, GIS, terrain models, or related geospatial workflows may be appropriate, subject to project needs and permissions.",
  },
};

document.querySelectorAll(".goal").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".goal").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const item = recommendations[button.dataset.goal];
    if (!item) return;

    const title = document.getElementById("rec-title");
    const copy = document.getElementById("rec-copy");
    if (title) title.textContent = item.title;
    if (copy) copy.textContent = item.copy;
  });
});

document.querySelectorAll(".note-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const detail = button.nextElementSibling;
    if (!detail) return;
    const nowOpen = detail.hasAttribute("hidden");
    if (nowOpen) {
      detail.removeAttribute("hidden");
      button.textContent = "Typical document checklist −";
    } else {
      detail.setAttribute("hidden", "");
      button.textContent = "Typical document checklist +";
    }
    button.setAttribute("aria-expanded", String(nowOpen));
  });
});

const deliverables = {
  plan: {
    code: "PLAN / PDF",
    title: "Survey Plan",
    text:
      "A readable plan showing parcel geometry, survey references, dimensions, annotations, and project information appropriate to the scope.",
    art: `
      <svg viewBox="0 0 500 330" aria-hidden="true">
        <polyline points="82,72 336,45 418,215 284,282 61,231 82,72" />
        <line x1="82" y1="72" x2="284" y2="282" />
        <line x1="336" y1="45" x2="61" y2="231" />
        <text x="190" y="156">LOT PLAN</text>
        <text x="192" y="178">SAMPLE 014</text>
      </svg>`,
  },
  cad: {
    code: "CAD / DXF",
    title: "CAD / DXF Drawing",
    text:
      "A digital drafting file that can support engineering, architectural, construction, or project coordination workflows when included in the agreed deliverables.",
    art: `
      <svg viewBox="0 0 500 330" aria-hidden="true">
        <rect x="92" y="62" width="312" height="205"></rect>
        <line x1="92" y1="62" x2="404" y2="267"></line>
        <line x1="404" y1="62" x2="92" y2="267"></line>
        <polyline points="118,222 163,143 239,173 297,98 372,177"></polyline>
        <text x="168" y="292">CAD LAYERS / SAMPLE</text>
      </svg>`,
  },
  coords: {
    code: "DATA / CSV",
    title: "Coordinate List",
    text:
      "A structured list of point identifiers and coordinates for the survey scope. Coordinate system and formatting should be confirmed for the intended use.",
    art: `
      <svg viewBox="0 0 500 330" aria-hidden="true">
        <line x1="85" y1="68" x2="415" y2="68"></line>
        <line x1="85" y1="112" x2="415" y2="112"></line>
        <line x1="85" y1="156" x2="415" y2="156"></line>
        <line x1="85" y1="200" x2="415" y2="200"></line>
        <line x1="85" y1="244" x2="415" y2="244"></line>
        <line x1="165" y1="68" x2="165" y2="244"></line>
        <line x1="292" y1="68" x2="292" y2="244"></line>
        <text x="97" y="98">P-01</text><text x="178" y="98">N 1638.24</text><text x="305" y="98">E 492.71</text>
        <text x="97" y="142">P-02</text><text x="178" y="142">N 1755.33</text><text x="305" y="142">E 575.75</text>
        <text x="97" y="186">P-03</text><text x="178" y="186">N 1872.42</text><text x="305" y="186">E 658.79</text>
        <text x="97" y="230">P-04</text><text x="178" y="230">N 1989.51</text><text x="305" y="230">E 741.83</text>
      </svg>`,
  },
  terrain: {
    code: "SURFACE / TERRAIN",
    title: "Terrain / Elevation Data",
    text:
      "Contours, spot elevations, surfaces, terrain models, or related outputs can support site design and analysis depending on the agreed topographic or mapping scope.",
    art: `
      <svg viewBox="0 0 500 330" aria-hidden="true">
        <path d="M45 240 C105 190 112 105 184 120 S271 250 337 180 S406 94 458 117"></path>
        <path d="M45 260 C103 220 135 149 194 155 S285 268 344 209 S405 134 458 148"></path>
        <path d="M45 281 C116 250 150 196 210 198 S302 280 358 241 S414 183 458 187"></path>
        <text x="58" y="76">ELEVATION PROFILE / SAMPLE</text>
      </svg>`,
  },
};

document.querySelectorAll(".deliverable-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".deliverable-tab").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const item = deliverables[button.dataset.deliverable];
    if (!item) return;

    document.getElementById("preview-code").textContent = item.code;
    document.getElementById("preview-title").textContent = item.title;
    document.getElementById("preview-text").textContent = item.text;
    document.getElementById("preview-canvas").innerHTML = item.art;
  });
});

const briefBuilder = document.getElementById("brief-builder");
const briefOutput = document.getElementById("brief-output");
const copyBrief = document.getElementById("copy-brief");
let latestBrief = "";

briefBuilder?.addEventListener("submit", (event) => {
  event.preventDefault();

  const goal = document.getElementById("brief-goal").value;
  const location = document.getElementById("brief-location").value.trim() || "Location not yet provided";
  const area = document.getElementById("brief-area").value.trim() || "Area not yet provided";
  const purpose = document.getElementById("brief-purpose").value.trim() || "Purpose to be discussed";
  const docs = Array.from(
    briefBuilder.querySelectorAll('fieldset input[type="checkbox"]:checked')
  ).map((input) => input.value);

  latestBrief =
`Suggested conversation: ${goal}
Location: ${location}
Approximate area: ${area}
Documents available: ${docs.length ? docs.join(", ") : "Not specified"}
Project purpose: ${purpose}

Next step: Review the available property records and project objective with the responsible survey professional so the final survey scope, requirements, schedule, and deliverables can be confirmed.`;

  briefOutput.innerHTML = `
    <span>PROJECT BRIEF / PREVIEW</span>
    <h3>${goal}</h3>
    <p></p>
    <button id="copy-brief" type="button">Copy brief</button>
  `;
  briefOutput.querySelector("p").textContent = latestBrief;
  briefOutput.querySelector("#copy-brief").addEventListener("click", copyCurrentBrief);
});

async function copyCurrentBrief() {
  if (!latestBrief) return;
  try {
    await navigator.clipboard.writeText(latestBrief);
    const button = briefOutput.querySelector("#copy-brief");
    if (button) {
      const old = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = old;
      }, 1400);
    }
  } catch {
    // Clipboard support can vary; the generated brief remains visible for manual copy.
  }
}

copyBrief?.addEventListener("click", copyCurrentBrief);

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    nav?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }
});
