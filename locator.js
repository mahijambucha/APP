/* Find a Class: ZIP or device location -> nearest classes from classes.js */
(function () {
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let origin = { lat: SETTINGS.START.lat, lng: SETTINGS.START.lng, label: SETTINGS.START.label, searched: false, zip: "" };

  function miles(a, b) {
    const R = 3958.8, r = x => x * Math.PI / 180;
    const dLat = r(b.lat - a.lat), dLng = r(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function render() {
    const topic = $("topic").value, list = $("results");
    const rows = (typeof CLASSES !== "undefined" ? CLASSES : [])
      .filter(c => !topic || c.topic === topic)
      .map(c => ({ c, d: (typeof c.lat === "number" && typeof c.lng === "number") ? miles(origin, c) : null }))
      .sort((a, b) => (a.d == null) - (b.d == null) || a.d - b.d)
      .slice(0, SETTINGS.PAGE_SIZE);

    const where = origin.searched ? (origin.zip ? "ZIP " + esc(origin.zip) : "your location") : esc(origin.label);
    const mapQ = encodeURIComponent("free computer classes near " + (origin.zip || origin.label));
    const fallback = `<div class="btns"><a class="btn" href="request-class.html">Request a class</a><a class="btn ghost" target="_blank" rel="noopener" href="https://www.google.com/maps/search/${mapQ}">Search nearby libraries on a map</a></div>`;

    if (!rows.length) {
      list.innerHTML = `<div class="empty"><h3>No classes listed ${topic ? "for that topic " : ""}yet.</h3><p style="color:var(--muted);margin-top:8px">We don't have a class listed near ${where} yet. Tell us what you'd like to learn and where, and we'll work on it.</p>${fallback}</div>`;
      return;
    }
    list.innerHTML = `<p class="lead" style="margin:0 0 14px">Showing ${rows.length} class${rows.length === 1 ? "" : "es"}, closest to ${where} first.</p><div class="grid">` +
      rows.map(({ c, d }) => `<div class="card"><div class="result"><h3>${esc(c.name)}</h3>${d != null ? `<span class="dist">${d.toFixed(1)} mi</span>` : ""}</div>
        <span class="tag">${esc(c.topic)}</span><span class="tag ${c.cost === "Free" ? "free" : ""}">${esc(c.cost || "Free")}</span>
        <p><b>${esc(c.place)}</b><br>${esc(c.address)}</p><p><b>When:</b> ${esc(c.when)}</p><p><b>For:</b> ${esc(c.audience)}</p>
        ${c.url ? `<p><a class="btn" style="margin-top:12px" href="${esc(c.url)}" target="_blank" rel="noopener">Details</a></p>` : ""}</div>`).join("") + `</div><div class="empty" style="margin-top:24px"><p>Don't see what you need?</p>${fallback}</div>`;
  }

  function status(t, err) { const m = $("lmsg"); m.className = "msg" + (err ? " err" : ""); m.textContent = t; }

  $("zipform").addEventListener("submit", async e => {
    e.preventDefault();
    const zip = $("zip").value.trim();
    if (!/^\d{5}$/.test(zip)) { status("Enter a 5-digit ZIP code.", true); return; }
    status("Searching...");
    try {
      const r = await fetch("https://api.zippopotam.us/us/" + zip);
      if (!r.ok) throw new Error("not found");
      const p = (await r.json()).places[0];
      origin = { lat: +p.latitude, lng: +p.longitude, label: p["place name"], searched: true, zip };
      status("");
      render();
    } catch (_) { status("We couldn't find that ZIP code. Check it and try again.", true); }
  });

  $("geo").addEventListener("click", () => {
    if (!navigator.geolocation) { status("Your browser can't share location. Try a ZIP code.", true); return; }
    status("Finding your location...");
    navigator.geolocation.getCurrentPosition(
      pos => { origin = { lat: pos.coords.latitude, lng: pos.coords.longitude, label: "your location", searched: true, zip: "" }; status(""); render(); },
      () => status("Location was blocked. Try a ZIP code instead.", true),
      { timeout: 10000 });
  });

  $("topic").addEventListener("change", render);
  render();
})();
