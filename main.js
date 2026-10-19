/* =========================================================
   SHARED — header, nav bar, and footer for every page
   To rename the app, change SITE.name below.
   ========================================================= */
const SITE = {
  name: "TechScale",
  tagline: "Free tech skills for every community: AI, coding, and computer basics.",
  announcement: "New: find free and low-cost tech classes near you",
  announcementLink: "locator.html"
};

const NAV = [
  {
    label: "Tracks",
    children: [
      { label: "AI Literacy", href: "ai-track.html", page: "ai", icon: "AI", color: "var(--ai)", desc: "How AI works and how to use it wisely" },
      { label: "Code", href: "code-track.html", page: "code", icon: "</>", color: "var(--code)", desc: "Write your first JavaScript programs" },
      { label: "Tech Basics", href: "tech-track.html", page: "tech", icon: "⌘", color: "var(--basics)", desc: "Computers, the internet, and staying safe online" }
    ]
  },
  { label: "Find a class", href: "locator.html", page: "locator" },
  { label: "Platforms", href: "platforms.html", page: "platforms" },
  {
    label: "Get involved",
    children: [
      { label: "Request a class", href: "request.html", page: "request", icon: "+", color: "var(--navy)", desc: "Ask for a class in your community" },
      { label: "Volunteer", href: "volunteer.html", page: "volunteer", icon: "♥", color: "var(--stem)", desc: "Teach a class and earn service hours" }
    ]
  },
  { label: "FAQ", href: "faq.html", page: "faq" }
];

(function buildLayout() {
  const current = document.body.dataset.page || "";
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const chevron = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  // ----- Header -----
  const header = document.getElementById("site-header");
  if (header) {
    const items = NAV.map((item, i) => {
      if (!item.children) {
        const active = item.page === current ? " active" : "";
        return `<a class="nav-link${active}" href="${item.href}"${active ? ' aria-current="page"' : ""}>${esc(item.label)}</a>`;
      }
      const groupActive = item.children.some((c) => c.page === current) ? " active" : "";
      const links = item.children.map((c) => `
        <a class="nav-menu-link${c.page === current ? " active" : ""}" href="${c.href}">
          <span class="nav-menu-icon" style="background:${c.color}">${esc(c.icon)}</span>
          <span><span class="nav-menu-title">${esc(c.label)}</span><span class="nav-menu-desc">${esc(c.desc)}</span></span>
        </a>`).join("");
      return `
        <div class="nav-item has-menu">
          <button type="button" class="nav-link${groupActive}" aria-expanded="false" aria-controls="nav-menu-${i}">${esc(item.label)} ${chevron}</button>
          <div class="nav-menu" id="nav-menu-${i}">${links}</div>
        </div>`;
    }).join("");

    header.outerHTML = `
      <div class="announce"><a href="${SITE.announcementLink}"><span>${esc(SITE.announcement)}</span> →</a></div>
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="index.html" aria-label="${esc(SITE.name)} home">
            <span class="brand-mark">${esc(SITE.name.charAt(0))}</span>
            <span class="brand-name">${esc(SITE.name)}</span>
          </a>
          <nav class="nav-pill" aria-label="Main">${items}</nav>
          <div class="header-actions">
            <a class="btn btn-dark header-cta" href="code-track.html">Start learning</a>
            <button type="button" class="menu-toggle" aria-label="Open menu" aria-expanded="false">
              <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
          </div>
        </div>
      </header>`;
  }

  // ----- Footer -----
  const footer = document.getElementById("site-footer");
  if (footer) {
    const col = (title, links) => `
      <div class="footer-col"><h3>${title}</h3>${links.map((l) => `<a href="${l.href}">${esc(l.label)}</a>`).join("")}</div>`;
    footer.outerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-top">
            <div class="footer-brand">
              <a class="brand" href="index.html"><span class="brand-mark">${esc(SITE.name.charAt(0))}</span><span class="brand-name">${esc(SITE.name)}</span></a>
              <p>${esc(SITE.tagline)}</p>
            </div>
            ${col("Learn", NAV[0].children)}
            ${col("Explore", [{ label: "Find a class", href: "locator.html" }, { label: "Online platforms", href: "platforms.html" }, { label: "FAQ", href: "faq.html" }])}
            ${col("Get involved", NAV[3].children)}
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} ${esc(SITE.name)}</span>
            <span>Built for the Congressional App Challenge</span>
          </div>
        </div>
      </footer>`;
  }

  // ----- Dropdowns -----
  const closeAll = (except) => {
    document.querySelectorAll(".nav-item.open").forEach((el) => {
      if (el !== except) {
        el.classList.remove("open");
        el.querySelector(".nav-link").setAttribute("aria-expanded", "false");
      }
    });
  };
  const hoverMode = () => window.matchMedia("(hover: hover) and (min-width: 1021px)").matches;
  document.querySelectorAll(".nav-item.has-menu").forEach((item) => {
    const btn = item.querySelector(".nav-link");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      // With a mouse, hovering already opened it, so a click keeps it open
      const open = hoverMode() ? true : !item.classList.contains("open");
      closeAll(item);
      item.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
    // Open on hover for mouse users on wide screens
    item.addEventListener("mouseenter", () => {
      if (hoverMode()) {
        closeAll(item);
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
    item.addEventListener("mouseleave", () => {
      if (hoverMode()) {
        item.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".nav-item")) closeAll(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeAll(); document.body.classList.remove("menu-open"); }
  });

  // ----- Mobile menu -----
  const toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }
})();
/* ===== END SHARED ===== */


/* Reveal the home-page learning tracks as they enter the viewport. */
(function trackCardReveal() {
  const cards = document.querySelectorAll(".track-card.scroll-reveal");
  if (!cards.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.documentElement.classList.add("js-scroll-reveal");
  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  cards.forEach((card) => observer.observe(card));
})();


/* Let visitors browse platform details without leaving the resources page. */
(function platformExplorers() {
  document.querySelectorAll("[data-platform-explorer]").forEach((explorer) => {
    const options = Array.from(explorer.querySelectorAll(".platform-option"));
    const detail = explorer.querySelector(".platform-detail");
    const title = detail && detail.querySelector("h3");
    const description = detail && detail.querySelector("p");
    const visit = detail && detail.querySelector(".platform-visit");
    const artNode = detail && detail.querySelector(".art-node");
    if (!options.length || !title || !description || !visit) return;

    const selectPlatform = (option) => {
      options.forEach((item) => item.removeAttribute("aria-current"));
      option.setAttribute("aria-current", "true");
      title.textContent = option.querySelector("span:nth-child(2)").textContent;
      description.textContent = option.dataset.summary;
      visit.href = option.href;
      visit.setAttribute("aria-label", `Visit ${title.textContent} (opens in a new tab)`);
      visit.firstChild.textContent = `Visit ${title.textContent} `;
      if (artNode) artNode.textContent = option.querySelector(".platform-number").textContent;

      detail.classList.remove("is-updating");
      void detail.offsetWidth;
      detail.classList.add("is-updating");
    };

    options.forEach((option) => {
      option.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        selectPlatform(option);
      });
    });

    selectPlatform(options.find((option) => option.getAttribute("aria-current") === "true") || options[0]);
  });
})();


/* =========================================================
   REQUEST-A-CLASS FORM (request.html)
   ========================================================= */
(function requestForm() {
  const form = document.getElementById("request-form");
  if (!form) return;

  // Later: paste a Formspree (or similar) URL here to collect requests online.
  const REQUEST_ENDPOINT = "";
  const msg = document.getElementById("request-msg");

  // Pre-fill the ZIP code if the locator sent one, e.g. request.html?zip=91730
  const zip = new URLSearchParams(location.search).get("zip");
  if (zip && /^\d{5}$/.test(zip)) form.elements.zip.value = zip;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.submittedAt = new Date().toISOString();
    try {
      if (REQUEST_ENDPOINT) {
        const res = await fetch(REQUEST_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: formData });
        if (!res.ok) throw new Error("Send failed");
      } else {
        // Testing mode: saved only in this browser
        let saved = [];
        try { saved = JSON.parse(localStorage.getItem("classRequests") || "[]"); } catch (_) {}
        saved.push(data);
        try { localStorage.setItem("classRequests", JSON.stringify(saved)); } catch (_) {}
        console.log("Class requests saved in this browser:", saved);
      }
      form.reset();
      msg.classList.remove("error");
      msg.textContent = "Thanks! Your request was sent. 🎉";
    } catch (err) {
      msg.classList.add("error");
      msg.textContent = "Something went wrong. Please try again.";
    }
  });
})();
/* ===== END REQUEST FORM ===== */


/* =========================================================
   LOCATOR (Elena) — locator.html
   ========================================================= */
(function locator() {
  const mapEl = document.getElementById("loc-map");
  if (!mapEl || typeof L === "undefined") return; // not on the locator page

  // ================= SETTINGS =================
  const SETTINGS = {
    START: { lat: 34.06, lng: -117.55, label: "the Inland Empire" },
    PAGE_SIZE: 20,      // result cards shown at a time
    MAX_PINS: 400       // most pins drawn at once
  };

  const CATS = {
    coding: { label: "Coding",          color: "#0d9488" },
    ai:     { label: "AI",              color: "#7c3aed" },
    basics: { label: "Computer basics", color: "#d97706" },
    stem:   { label: "STEM & robotics", color: "#db2777" }
  };

  // ================= CLASS DATA =================
  // EXAMPLE DATA: check each one on the program's own website, then set verified: true.
  // Coordinates are approximate. For exact ones, right-click the spot in Google Maps
  // and click the numbers at the top of the menu to copy them.
  // Use lat: null, lng: null for programs with no fixed location.
  const CLASSES = [
    {
      id: "ucr-bcoe",
      name: "UCR Bourns College of Engineering K-12 Programs",
      address: "900 University Ave, Riverside, CA 92521",
      lat: 33.9757, lng: -117.3263,
      topics: ["stem", "coding"],
      ages: "Middle & high school (FIRST LEGO League ages 9–14)",
      cost: "Varies by program",
      details: "MESA math and science support, STRIDE summer research, Bourns Engineering Day, and FIRST LEGO League.",
      url: "https://engr.ucr.edu/k12-stem-education-programs",
      verified: false
    },
    {
      id: "ucr-stem-academy",
      name: "UCR University STEM Academy",
      address: "UC Riverside, Riverside, CA",
      lat: 33.9737, lng: -117.3281,
      topics: ["stem"],
      ages: "Grades 6–9",
      cost: "Check with your district",
      details: "STEM mentoring and tutoring with local school districts such as Corona-Norco USD.",
      url: "https://www.cnusd.k12.ca.us/student_programs/s_t_e_m_academies",
      verified: false
    },
    {
      id: "tech-steam",
      name: "Tech Steam Center",
      address: "5051 Canyon Crest Dr, Suite 201A, Riverside, CA 92507",
      phone: "951-530-8188",
      lat: 33.9577, lng: -117.3348,
      topics: ["coding", "stem"],
      ages: "Ages 6 through teens",
      cost: "Paid",
      details: "After-school programs, clubs, and camps: Scratch, Roblox, Python, Blender, 3D modeling, robotics.",
      url: "https://inlandempire.kidsoutandabout.com/content/tech-steam-center-riverside",
      verified: false
    },
    {
      id: "efk-ie-north",
      name: "Engineering For Kids Inland Empire North",
      address: "Visits schools across the Inland Empire North",
      lat: 34.0975, lng: -117.6484,
      topics: ["stem", "coding"],
      ages: "Elementary & middle school",
      cost: "Varies",
      details: "Robotics, coding, and engineering workshops, plus regional World Robot Olympiad events.",
      url: "https://upland.macaronikid.com/articles/5cb6db7e3ae17f17cb9b8f04/engineering-for-kids-of-inland-empire-north",
      verified: false
    },
    {
      id: "ayala-aces",
      name: "Ayala High School ACES Computer Science Pathway",
      address: "14255 Peyton Dr, Chino Hills, CA 91709",
      lat: 33.9744, lng: -117.7324,
      topics: ["coding"],
      ages: "Chino Valley USD high school students",
      cost: "Free (public school)",
      details: "AP computer science and engineering courses with college-transferable credit.",
      url: "https://ayala.chino.k12.ca.us/computer-science-pathway",
      verified: false
    },
    {
      id: "id-tech",
      name: "iD Tech Camps",
      address: "Seasonal camps on Southern California university campuses",
      lat: null, lng: null,
      topics: ["coding", "stem"],
      ages: "Ages 7–17",
      cost: "Paid",
      details: "Game development, robotics, and programming camps.",
      url: "https://inlandempire.kidsoutandabout.com/content/id-tech-california",
      verified: false
    }
  ];

  // ================= STATE =================
  const state = {
    origin: { ...SETTINGS.START },
    radius: 25,
    cats: new Set(Object.keys(CATS)),
    shown: SETTINGS.PAGE_SIZE,
    selectedId: null,
    zip: ""
  };

  // ================= PAGE ELEMENTS =================
  const $ = (id) => document.getElementById(id);
  const listEl = $("loc-list");
  const onlineEl = $("loc-online-list");
  const onlineSection = $("loc-online-section");
  const statusEl = $("loc-status");
  const countEl = $("loc-count");
  const moreBtn = $("loc-more");
  const queryEl = $("loc-query");
  const radiusEl = $("loc-radius");

  // ================= MAP =================
  const map = L.map(mapEl, { zoomControl: false, scrollWheelZoom: true })
    .setView([state.origin.lat, state.origin.lng], 10);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.control.zoom({ position: "topright" }).addTo(map);

  // "Find me" button under the zoom buttons
  const LocateControl = L.Control.extend({
    options: { position: "topright" },
    onAdd() {
      const box = L.DomUtil.create("div", "leaflet-bar");
      const btn = L.DomUtil.create("a", "loc-locate-btn", box);
      btn.href = "#";
      btn.title = "Use my location";
      btn.setAttribute("role", "button");
      btn.setAttribute("aria-label", "Use my location");
      btn.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><circle cx="12" cy="12" r="7.5"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3"/></svg>';
      L.DomEvent.on(btn, "click", (e) => { L.DomEvent.stop(e); useMyLocation(); });
      L.DomEvent.disableClickPropagation(box);
      return box;
    }
  });
  map.addControl(new LocateControl());

  const pinLayer = L.layerGroup().addTo(map);
  const youLayer = L.layerGroup().addTo(map);
  const markers = {};

  const iconCache = {};
  function pinIcon(color, big) {
    const key = color + (big ? "-big" : "");
    if (iconCache[key]) return iconCache[key];
    const w = big ? 34 : 26;
    const h = big ? 46 : 35;
    iconCache[key] = L.divIcon({
      className: "loc-pin",
      html: `<svg width="${w}" height="${h}" viewBox="0 0 24 32"><path d="M12 .8C5.8.8.8 5.8.8 11.9c0 8.4 11.2 19.3 11.2 19.3s11.2-10.9 11.2-19.3C23.2 5.8 18.2.8 12 .8z" fill="${color}" stroke="#fff" stroke-width="1.6"/><circle cx="12" cy="12" r="4.3" fill="#fff"/></svg>`,
      iconSize: [w, h],
      iconAnchor: [w / 2, h],
      popupAnchor: [0, -h + 4]
    });
    return iconCache[key];
  }
  const youIcon = L.divIcon({ className: "", html: '<div class="loc-you"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });

  // ================= HELPERS =================
  function esc(text) {
    return String(text == null ? "" : text)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function milesBetween(a, b) {
    const R = 3958.8;
    const rad = (d) => (d * Math.PI) / 180;
    const dLat = rad(b.lat - a.lat);
    const dLng = rad(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  const primaryCat = (item) => item.topics.find((t) => state.cats.has(t)) || item.topics[0];
  const isVisible = (item) => item.topics.some((t) => state.cats.has(t));
  function directionsUrl(item) {
    const dest = item.address && /\d/.test(item.address) ? item.address : `${item.lat},${item.lng}`;
    return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(dest);
  }
  const requestUrl = () => "request.html" + (state.zip ? "?zip=" + state.zip : "");

  // ================= DRAWING =================
  function cardHtml(item) {
    const color = CATS[primaryCat(item)].color;
    const parts = String(item.address || "").split(",");
    const line1 = parts.length > 1 ? parts[0] : item.address;
    const line2 = parts.length > 1 ? parts.slice(1).join(",").trim() : "";

    let tags = item.topics
      .map((t) => `<span class="tag"><i class="dot" style="background:${CATS[t].color}"></i>${esc(CATS[t].label)}</span>`)
      .join("");
    if (item.cost && /^free/i.test(item.cost)) tags += `<span class="tag tag-free">Free</span>`;
    if (!item.verified) tags += `<span class="tag tag-warn">Info not yet verified</span>`;

    const actions = [];
    if (item.lat != null) actions.push(`<a href="${esc(directionsUrl(item))}" target="_blank" rel="noopener">Directions</a>`);
    if (item.url) actions.push(`<a href="${esc(item.url)}" target="_blank" rel="noopener">Website</a>`);
    if (item.phone) actions.push(`<a href="tel:${esc(item.phone.replace(/\D/g, ""))}">Call</a>`);

    return `
      <div class="loc-card-body">
        <h3 style="color:${color}">${esc(item.name)}</h3>
        <p class="loc-addr">${esc(line1)}${line2 ? "<br>" + esc(line2) : ""}</p>
        ${item.phone ? `<p class="loc-phone">${esc(item.phone)}</p>` : ""}
        ${item.details ? `<p class="loc-details">${esc(item.details)}</p>` : ""}
        ${item.ages ? `<p class="loc-details"><strong>Ages:</strong> ${esc(item.ages)} · <strong>Cost:</strong> ${esc(item.cost)}</p>` : ""}
        <div class="loc-tags">${tags}</div>
        ${actions.length ? `<div class="loc-actions">${actions.join("")}</div>` : ""}
      </div>
      <div class="loc-card-side">
        ${item.dist != null ? `<span class="loc-dist">${item.dist.toFixed(1)} mi</span>` : ""}
        ${item.lat != null ? '<svg class="loc-chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>' : ""}
      </div>`;
  }

  const popupHtml = (item) =>
    `<div class="loc-popup"><strong>${esc(item.name)}</strong><span>${esc(item.address)}</span>${item.phone ? `<span>${esc(item.phone)}</span>` : ""}<a href="${esc(directionsUrl(item))}" target="_blank" rel="noopener">Directions</a></div>`;

  function select(id, fromMap) {
    if (state.selectedId && markers[state.selectedId]) {
      const old = markers[state.selectedId];
      old.setIcon(pinIcon(old._color, false));
      old.setZIndexOffset(0);
    }
    state.selectedId = id;
    document.querySelectorAll(".loc-card.selected").forEach((el) => el.classList.remove("selected"));
    const card = listEl.querySelector(`[data-id="${CSS.escape(id)}"]`);
    if (card) {
      card.classList.add("selected");
      if (fromMap) card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const m = markers[id];
    if (m) {
      m.setIcon(pinIcon(m._color, true));
      m.setZIndexOffset(1000);
      if (!fromMap) {
        map.flyTo(m.getLatLng(), Math.max(map.getZoom(), 14), { duration: 0.6 });
        mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      m.openPopup();
    }
  }

  function render(fitMap) {
    const o = state.origin;
    const r = state.radius;
    const results = CLASSES
      .filter((p) => p.lat != null && isVisible(p))
      .map((item) => ({ ...item, dist: milesBetween(o, item) }))
      .filter((p) => p.dist <= r)
      .sort((a, b) => a.dist - b.dist);

    // Pins
    pinLayer.clearLayers();
    youLayer.clearLayers();
    Object.keys(markers).forEach((k) => delete markers[k]);
    state.selectedId = null;
    results.slice(0, SETTINGS.MAX_PINS).forEach((item) => {
      const color = CATS[primaryCat(item)].color;
      const m = L.marker([item.lat, item.lng], { icon: pinIcon(color, false), title: item.name, keyboard: true });
      m._color = color;
      m.bindPopup(popupHtml(item));
      m.on("click", () => select(item.id, true));
      pinLayer.addLayer(m);
      markers[item.id] = m;
    });
    L.marker([o.lat, o.lng], { icon: youIcon, interactive: false, keyboard: false }).addTo(youLayer);

    if (fitMap) {
      map.fitBounds(L.latLng(o.lat, o.lng).toBounds(r * 1609.34 * 2), { padding: [20, 20] });
    }

    // Results list
    const where = o.label ? ` of ${o.label}` : "";
    countEl.textContent = results.length
      ? `${results.length} ${results.length === 1 ? "class" : "classes"} within ${r} mi${where}`
      : "Results";
    $("loc-request-link").href = requestUrl();

    listEl.innerHTML = "";
    if (!results.length) {
      listEl.innerHTML = `
        <div class="loc-empty">
          <h3>No classes found within ${r} miles${esc(where)} yet</h3>
          <p>Try a bigger distance or more categories, or request a class for your community.</p>
          <a class="btn btn-dark" href="${requestUrl()}">Request a class</a>
        </div>`;
    }
    results.slice(0, state.shown).forEach((item) => {
      const card = document.createElement("article");
      card.className = "loc-card";
      card.dataset.id = item.id;
      card.tabIndex = 0;
      card.innerHTML = cardHtml(item);
      card.addEventListener("click", (e) => { if (!e.target.closest("a")) select(item.id, false); });
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.target.closest("a")) select(item.id, false); });
      listEl.appendChild(card);
    });
    moreBtn.hidden = results.length <= state.shown;

    // Online programs
    const online = CLASSES.filter((p) => p.lat == null && isVisible(p));
    onlineSection.hidden = online.length === 0;
    onlineEl.innerHTML = online.map((p) => `<article class="loc-card">${cardHtml({ ...p, dist: null })}</article>`).join("");
  }

  function update(fitMap) {
    state.shown = SETTINGS.PAGE_SIZE;
    render(fitMap);
  }

  // ================= SEARCH =================
  async function geocode(text) {
    const url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&q=" + encodeURIComponent(text);
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("Search failed");
    const data = await res.json();
    return data.length ? { lat: Number(data[0].lat), lng: Number(data[0].lon) } : null;
  }

  $("loc-search").addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = queryEl.value.trim();
    if (!text) { statusEl.textContent = "Type a ZIP code, city, or state first."; return; }
    statusEl.textContent = "Searching…";
    try {
      const place = await geocode(text);
      if (!place) { statusEl.textContent = `Couldn't find "${text}". Try a 5-digit ZIP code.`; return; }
      state.origin = { ...place, label: text };
      state.zip = /^\d{5}$/.test(text) ? text : "";
      statusEl.textContent = "";
      update(true);
    } catch (err) {
      statusEl.textContent = "Search isn't working right now. Check your internet and try again.";
    }
  });

  function useMyLocation() {
    if (!navigator.geolocation) { statusEl.textContent = "Your browser can't share location. Try a ZIP code."; return; }
    statusEl.textContent = "Finding your location…";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        state.origin = { lat: pos.coords.latitude, lng: pos.coords.longitude, label: "you" };
        state.zip = "";
        statusEl.textContent = "";
        update(true);
      },
      () => { statusEl.textContent = "Location permission was blocked. Try typing a ZIP code."; }
    );
  }

  radiusEl.addEventListener("change", () => { state.radius = Number(radiusEl.value); update(true); });

  $("loc-chips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const cat = chip.dataset.cat;
    if (state.cats.has(cat)) {
      if (state.cats.size === 1) return; // keep at least one category on
      state.cats.delete(cat);
    } else {
      state.cats.add(cat);
    }
    chip.classList.toggle("active", state.cats.has(cat));
    chip.setAttribute("aria-pressed", String(state.cats.has(cat)));
    state.shown = SETTINGS.PAGE_SIZE;
    render(false);
  });

  moreBtn.addEventListener("click", () => { state.shown += SETTINGS.PAGE_SIZE; render(false); });

  update(true);
})();
/* ===== END LOCATOR ===== */


/* =========================================================
   CODE TRACK — browser-isolated JavaScript exercises
   ========================================================= */
(function codeTrack() {
  const lessons = {
    "lesson-1-1": {
      expected: "Hello, world!",
      requiresCode: /console\s*\.\s*log\s*\(/,
      missingCodeMessage: "Use console.log() to print your greeting."
    },
    "lesson-1-2": {
      expected: "Hello, Maya!",
      requiresCode: /\b(?:let|const)\s+name\b/,
      missingCodeMessage: 'Create a variable named "name" with let or const.'
    }
  };

  const runnerDocument = `<!doctype html>
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; connect-src 'none'; img-src 'none'; style-src 'none'; form-action 'none'; base-uri 'none'">
    <script>
      const format = (value) => {
        if (typeof value === "string") return value;
        try {
          const json = JSON.stringify(value);
          return json === undefined ? String(value) : json;
        } catch (error) {
          return String(value);
        }
      };
      addEventListener("message", (event) => {
        if (event.source !== parent || !event.data || event.data.type !== "run") return;
        const output = [];
        const sandboxConsole = {
          log: (...values) => output.push(values.map(format).join(" ")),
          info: (...values) => output.push(values.map(format).join(" ")),
          warn: (...values) => output.push(values.map(format).join(" ")),
          error: (...values) => output.push(values.map(format).join(" "))
        };
        try {
          new Function("console", '"use strict";\\n' + event.data.code)(sandboxConsole);
          parent.postMessage({ type: "result", output }, "*");
        } catch (error) {
          parent.postMessage({
            type: "result",
            output,
            error: error && error.name ? error.name + ": " + error.message : String(error)
          }, "*");
        }
      });
    <\/script>`;

  function executeInSandbox(code) {
    return new Promise((resolve, reject) => {
      const frame = document.createElement("iframe");
      frame.setAttribute("sandbox", "allow-scripts");
      frame.setAttribute("title", "Isolated code runner");
      frame.tabIndex = -1;
      frame.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";

      let finished = false;
      const cleanUp = () => {
        window.removeEventListener("message", onMessage);
        window.clearTimeout(timeout);
        frame.remove();
      };
      const finish = (callback, value) => {
        if (finished) return;
        finished = true;
        cleanUp();
        callback(value);
      };
      const onMessage = (event) => {
        if (event.source !== frame.contentWindow || !event.data || event.data.type !== "result") return;
        finish(resolve, event.data);
      };
      const timeout = window.setTimeout(() => {
        finish(reject, new Error("Your code took too long to run. Check for a loop that never ends, then try again."));
      }, 2000);

      window.addEventListener("message", onMessage);
      frame.addEventListener("load", () => {
        if (!frame.contentWindow) {
          finish(reject, new Error("The code runner could not start. Please try again."));
          return;
        }
        frame.contentWindow.postMessage({ type: "run", code }, "*");
      }, { once: true });
      frame.srcdoc = runnerDocument;
      document.body.appendChild(frame);
    });
  }

  document.querySelectorAll(".run-code").forEach((button) => {
    button.addEventListener("click", async () => {
      const lessonId = button.dataset.lesson;
      const lesson = lessons[lessonId];
      const code = document.getElementById(`${lessonId}-code`);
      const output = document.getElementById(`${lessonId}-output`);
      const state = document.getElementById(`${lessonId}-state`);
      const feedback = document.getElementById(`${lessonId}-feedback`);
      if (!lesson || !code || !output || !state || !feedback) return;

      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      state.className = "output-state";
      state.textContent = "Running…";
      feedback.className = "lesson-feedback";
      feedback.textContent = "";

      try {
        const result = await executeInSandbox(code.value);
        output.textContent = result.output.length ? result.output.join("\n") : "(No output)";

        if (result.error) {
          state.textContent = "Error";
          state.classList.add("is-error");
          feedback.textContent = result.error;
          return;
        }

        const hasRequiredCode = lesson.requiresCode.test(code.value);
        const hasExpectedOutput = result.output.join("\n").trim() === lesson.expected;
        if (hasRequiredCode && hasExpectedOutput) {
          state.textContent = "Correct!";
          state.classList.add("is-correct");
          feedback.classList.add("is-correct");
          feedback.textContent = "That's right—nice work!";
        } else {
          state.textContent = "Try again";
          state.classList.add("is-error");
          feedback.textContent = hasRequiredCode
            ? `Check the output. It should be exactly: ${lesson.expected}`
            : lesson.missingCodeMessage;
        }
      } catch (error) {
        output.textContent = "The code could not finish.";
        state.textContent = "Error";
        state.classList.add("is-error");
        feedback.textContent = error.message;
      } finally {
        button.disabled = false;
        button.removeAttribute("aria-busy");
      }
    });
  });

  document.querySelectorAll("[data-reset]").forEach((button) => {
    button.addEventListener("click", () => {
      const editor = document.getElementById(button.dataset.reset);
      if (!editor) return;
      editor.value = button.dataset.reset === "lesson-1-1-code"
        ? "// Type your code here\n"
        : '// Create a variable named name\n// Then print: Hello, Maya!\n';
      editor.focus();
    });
  });

  document.querySelectorAll(".code-editor").forEach((editor) => {
    editor.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.setRangeText("  ", start, end, "end");
      }
    });
  });
})();
/* ===== END CODE TRACK ===== */


/* =========================================================
   AI LITERACY TRACK — interactive lesson quizzes
   ========================================================= */
(function aiTrack() {
  const quizzes = {
    "ai-quiz-1": [
      {
        question: "Which statement best describes artificial intelligence?",
        options: [
          "A computer system that finds patterns in information to perform tasks",
          "A machine that understands everything exactly like a person",
          "A database that only stores facts people type into it"
        ],
        answer: 0,
        explanation: "AI systems use patterns in data to do specific tasks. They do not understand everything the way people do."
      },
      {
        question: "How does a typical AI system learn to recognize pictures of cats?",
        options: [
          "It reads a dictionary definition of the word cat",
          "It finds patterns by learning from many example pictures",
          "It asks a person to identify every new picture"
        ],
        answer: 1,
        explanation: "Many AI systems learn patterns from examples. The examples help the system make predictions about new pictures."
      },
      {
        question: "Which task is a good example of narrow AI?",
        options: [
          "A tool that recommends songs based on what you listen to",
          "A computer that can do every job a person can do",
          "A program that always knows whether information is true"
        ],
        answer: 0,
        explanation: "Narrow AI is designed for a particular task, such as recommending music. It does not automatically know or do everything."
      }
    ],
    "ai-quiz-2": [
      {
        question: "An AI chatbot gives you a surprising fact. What should you do before using it in a school project?",
        options: [
          "Trust it because computers do not make mistakes",
          "Check the fact using reliable sources",
          "Ask the same chatbot to confirm its answer"
        ],
        answer: 1,
        explanation: "AI can produce incorrect or made-up information. Check important claims against reliable sources."
      },
      {
        question: "Which information should you avoid sharing with a public AI tool?",
        options: [
          "A general question about how rainbows form",
          "A fictional character's name",
          "Your password or private personal details"
        ],
        answer: 2,
        explanation: "Keep passwords and sensitive personal information private. You may not know how a public tool stores or uses what you share."
      },
      {
        question: "What is a thoughtful way to use AI for a class assignment?",
        options: [
          "Ask it to do the whole assignment and submit the answer as your own",
          "Use it to brainstorm, check the facts, and follow your teacher's rules",
          "Use its answer without mentioning it because it is always original"
        ],
        answer: 1,
        explanation: "AI can support brainstorming and learning, but you should verify its output, do your own thinking, and follow your class rules."
      }
    ]
  };

  document.querySelectorAll(".ai-quiz[data-quiz]").forEach((quiz) => {
    const questions = quizzes[quiz.dataset.quiz];
    const questionEl = quiz.querySelector(".ai-quiz-question");
    const optionsEl = quiz.querySelector(".ai-quiz-options");
    const progressText = quiz.querySelector(".ai-quiz-progress-text");
    const progressBar = quiz.querySelector(".ai-quiz-progress-track i");
    const feedback = quiz.querySelector(".ai-quiz-feedback");
    const scoreEl = quiz.querySelector(".ai-quiz-score");
    const action = quiz.querySelector(".ai-quiz-button");

    if (!questions || !questionEl || !optionsEl || !progressText || !progressBar || !feedback || !scoreEl || !action) return;

    let current = 0;
    let selected = null;
    let score = 0;
    let answered = false;
    let complete = false;

    const renderQuestion = (focusQuestion) => {
      const item = questions[current];
      selected = null;
      answered = false;
      complete = false;
      feedback.className = "ai-quiz-feedback";
      feedback.textContent = "";
      questionEl.textContent = item.question;
      progressText.textContent = `Question ${current + 1} of ${questions.length}`;
      progressBar.style.width = `${(current / questions.length) * 100}%`;
      scoreEl.textContent = `Score: ${score} / ${questions.length}`;
      action.disabled = true;
      action.textContent = "Check answer";
      optionsEl.replaceChildren();

      item.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "ai-quiz-option";
        button.setAttribute("aria-pressed", "false");
        const letter = document.createElement("span");
        letter.className = "ai-quiz-option-letter";
        letter.setAttribute("aria-hidden", "true");
        letter.textContent = String.fromCharCode(65 + index);
        const label = document.createElement("span");
        label.textContent = option;
        button.append(letter, label);
        button.addEventListener("click", () => {
          if (answered) return;
          selected = index;
          optionsEl.querySelectorAll(".ai-quiz-option").forEach((optionButton) => {
            optionButton.setAttribute("aria-pressed", String(optionButton === button));
          });
          action.disabled = false;
        });
        optionsEl.appendChild(button);
      });

      if (focusQuestion) questionEl.focus();
    };

    action.addEventListener("click", () => {
      if (complete) {
        current = 0;
        selected = null;
        score = 0;
        answered = false;
        complete = false;
        renderQuestion(true);
        return;
      }

      if (!answered) {
        if (selected === null) return;
        const item = questions[current];
        const isCorrect = selected === item.answer;
        answered = true;
        if (isCorrect) score += 1;

        optionsEl.querySelectorAll(".ai-quiz-option").forEach((optionButton, index) => {
          optionButton.disabled = true;
          if (index === item.answer) optionButton.classList.add("is-correct");
          else if (index === selected) optionButton.classList.add("is-incorrect");
        });

        feedback.classList.toggle("is-correct", isCorrect);
        feedback.textContent = `${isCorrect ? "Correct!" : "Not quite."} ${item.explanation}`;
        scoreEl.textContent = `Score: ${score} / ${questions.length}`;
        action.textContent = current === questions.length - 1 ? "See results" : "Next question";
        action.disabled = false;
        return;
      }

      if (current < questions.length - 1) {
        current += 1;
        renderQuestion(true);
        return;
      }

      complete = true;
      progressText.textContent = "Quiz complete";
      progressBar.style.width = "100%";
      questionEl.textContent = `You got ${score} out of ${questions.length} right.`;
      optionsEl.replaceChildren();
      feedback.className = "ai-quiz-feedback is-correct";
      feedback.textContent = score === questions.length
        ? "Excellent work—you've got the key ideas."
        : "Nice work. Review the explanations, then try again to strengthen what you learned.";
      scoreEl.textContent = "Lesson check complete";
      action.textContent = "Try again";
      action.disabled = false;
      questionEl.focus();
    });

    renderQuestion(false);
  });
})();
/* ===== END AI LITERACY TRACK ===== */