console.log("App loaded!");

/* ===== LOCATOR (Elena) ===== */
(function () {
  const mapEl = document.getElementById("loc-map");
  if (!mapEl || typeof L === "undefined") return; // locator not on this page

  // ================= SETTINGS =================
  const SETTINGS = {
    // Later: paste a Formspree (or similar) URL here to collect class requests online.
    REQUEST_ENDPOINT: "",
    START: { lat: 34.06, lng: -117.55, label: "the Inland Empire" },
    PAGE_SIZE: 20,      // result cards shown at a time
    MAX_PINS: 400       // most pins drawn at once
  };

  const CATS = {
    coding:  { label: "Coding",           color: "#0f9d9a" },
    ai:      { label: "AI",               color: "#7b3fe4" },
    basics:  { label: "Computer basics",  color: "#f08c1a" },
    stem:    { label: "STEM & robotics",  color: "#e2456f" }
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
    selectedId: null
  };

  // ================= PAGE ELEMENTS =================
  const $ = (id) => document.getElementById(id);
  const listEl = $("loc-list");
  const onlineEl = $("loc-online-list");
  const onlineSection = $("loc-online-section");
  const statusEl = $("loc-status");
  const countEl = $("loc-count");
  const moreBtn = $("loc-more");
  const creditEl = $("loc-credit");
  const queryEl = $("loc-query");
  const radiusEl = $("loc-radius");

  // ================= MAP =================
  const map = L.map(mapEl, { zoomControl: false, scrollWheelZoom: true })
    .setView([state.origin.lat, state.origin.lng], 11);

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

  const progLayer = L.layerGroup().addTo(map);
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

  function primaryCat(item) {
    return item.topics.find((t) => state.cats.has(t)) || item.topics[0];
  }
  function isVisible(item) {
    return item.topics.some((t) => state.cats.has(t));
  }
  function directionsUrl(item) {
    const dest = item.address && /\d/.test(item.address) ? item.address : `${item.lat},${item.lng}`;
    return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(dest);
  }

  // ================= DRAWING =================
  function cardHtml(item) {
    const cat = primaryCat(item);
    const color = CATS[cat].color;
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

    const meta = item.ages ? `<p class="loc-details"><strong>Ages:</strong> ${esc(item.ages)} · <strong>Cost:</strong> ${esc(item.cost)}</p>` : "";

    return `
      <div class="loc-card-body">
        <h3 style="color:${color}">${esc(item.name)}</h3>
        <p class="loc-addr">${esc(line1)}${line2 ? "<br>" + esc(line2) : ""}</p>
        ${item.phone ? `<p class="loc-phone">${esc(item.phone)}</p>` : ""}
        ${item.details ? `<p class="loc-details">${esc(item.details)}</p>` : ""}
        ${meta}
        <div class="loc-tags">${tags}</div>
        ${actions.length ? `<div class="loc-actions">${actions.join("")}</div>` : ""}
      </div>
      <div class="loc-card-side">
        ${item.dist != null ? `<span class="loc-dist">${item.dist.toFixed(1)} mi</span>` : ""}
        ${item.lat != null ? '<svg class="loc-chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>' : ""}
      </div>`;
  }

  function popupHtml(item) {
    return `<div class="loc-popup"><strong>${esc(item.name)}</strong><span>${esc(item.address)}</span>${item.phone ? `<span>${esc(item.phone)}</span>` : ""}<a href="${esc(directionsUrl(item))}" target="_blank" rel="noopener">Directions</a></div>`;
  }

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

    const withDist = (item) => ({ ...item, dist: milesBetween(o, item) });
    const programs = CLASSES.filter((p) => p.lat != null && isVisible(p)).map(withDist).filter((p) => p.dist <= r);
    const results = programs.sort((a, b) => a.dist - b.dist);

    // ---- pins ----
    progLayer.clearLayers();
    youLayer.clearLayers();
    Object.keys(markers).forEach((k) => delete markers[k]);
    state.selectedId = null;

    results.slice(0, SETTINGS.MAX_PINS).forEach((item) => {
      const color = CATS[primaryCat(item)].color;
      const m = L.marker([item.lat, item.lng], { icon: pinIcon(color, false), title: item.name, keyboard: true });
      m._color = color;
      m.bindPopup(popupHtml(item));
      m.on("click", () => select(item.id, true));
      progLayer.addLayer(m);
      markers[item.id] = m;
    });
    L.marker([o.lat, o.lng], { icon: youIcon, interactive: false, keyboard: false }).addTo(youLayer);

    if (fitMap) {
      const circleBounds = L.latLng(o.lat, o.lng).toBounds(r * 1609.34 * 2);
      map.fitBounds(circleBounds, { padding: [20, 20] });
    }

    // ---- results list ----
    const where = o.label ? ` of ${o.label}` : "";
    countEl.textContent = results.length
      ? `${results.length} ${results.length === 1 ? "class" : "classes"} within ${r} mi${where}`
      : "Results";

    listEl.innerHTML = "";
    if (!results.length) {
      listEl.innerHTML = `
        <div class="loc-empty">
          <h3>Nothing found within ${r} miles${esc(where)}</h3>
          <p>Try a bigger distance or more categories, or request a class for your community.</p>
          <button type="button" class="btn btn-primary js-open-request">Request a class</button>
        </div>`;
    }
    results.slice(0, state.shown).forEach((item) => {
      const card = document.createElement("article");
      card.className = "loc-card";
      card.dataset.id = item.id;
      card.tabIndex = 0;
      card.innerHTML = cardHtml(item);
      card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        select(item.id, false);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.target.closest("a")) select(item.id, false);
      });
      listEl.appendChild(card);
    });
    moreBtn.hidden = results.length <= state.shown;

    // ---- online programs ----
    const online = CLASSES.filter((p) => p.lat == null && isVisible(p));
    onlineSection.hidden = online.length === 0;
    onlineEl.innerHTML = online.map((p) => `<article class="loc-card">${cardHtml({ ...p, dist: null })}</article>`).join("");
  }

  async function update(fitMap) {
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
      if (/^\d{5}$/.test(text)) $("req-zip").value = text;
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
        statusEl.textContent = "";
        update(true);
      },
      () => { statusEl.textContent = "Location permission was blocked. Try typing a ZIP code."; }
    );
  }

  radiusEl.addEventListener("change", () => {
    state.radius = Number(radiusEl.value);
    update(true);
  });

  $("loc-chips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const cat = chip.dataset.cat;
    if (state.cats.has(cat)) {
      if (state.cats.size === 1) return; // keep at least one category on
      state.cats.delete(cat);
      chip.classList.remove("active");
    } else {
      state.cats.add(cat);
      chip.classList.add("active");
    }
    chip.setAttribute("aria-pressed", chip.classList.contains("active"));
    state.shown = SETTINGS.PAGE_SIZE;
    render(false);
  });

  moreBtn.addEventListener("click", () => {
    state.shown += SETTINGS.PAGE_SIZE;
    render(false);
  });

  // ================= REQUEST A CLASS =================
  const modal = $("loc-request");
  const requestForm = $("loc-request-form");
  const requestMsg = $("loc-request-msg");

  document.addEventListener("click", (e) => {
    if (e.target.closest(".js-open-request")) {
      modal.hidden = false;
      requestMsg.textContent = "";
      setTimeout(() => $("req-zip").focus(), 50);
    }
    if (e.target.closest(".js-close-request")) modal.hidden = true;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) modal.hidden = true;
  });

  requestForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(requestForm);
    const data = Object.fromEntries(formData.entries());
    data.submittedAt = new Date().toISOString();
    try {
      if (SETTINGS.REQUEST_ENDPOINT) {
        const res = await fetch(SETTINGS.REQUEST_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: formData });
        if (!res.ok) throw new Error("Send failed");
      } else {
        // Testing mode: saved only in this browser
        let saved = [];
        try { saved = JSON.parse(localStorage.getItem("classRequests") || "[]"); } catch (_) {}
        saved.push(data);
        try { localStorage.setItem("classRequests", JSON.stringify(saved)); } catch (_) {}
        console.log("Class requests saved in this browser:", saved);
      }
      requestForm.reset();
      requestMsg.style.color = "";
      requestMsg.textContent = "Thanks! Your request was sent. 🎉";
    } catch (err) {
      requestMsg.style.color = "#c0392b";
      requestMsg.textContent = "Something went wrong. Please try again.";
    }
  });

  creditEl.textContent = "Map: OpenStreetMap contributors, CARTO.";

  // ================= START =================
  update(true);
})();
/* ===== END LOCATOR ===== */