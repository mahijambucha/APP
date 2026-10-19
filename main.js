/* ===== TechScale shared script: navbar, footer, reveal, safe storage, forms ===== */
/* ---------- SETTINGS (edit here) ---------- */
const SETTINGS = {
  FORM_ENDPOINT: "",            // paste a Formspree URL, e.g. https://formspree.io/f/xxxx. Empty = save to localStorage + console
  START: { lat: 34.06, lng: -117.55, label: "the Inland Empire" },
  PAGE_SIZE: 20
};
/* ---------- safe localStorage ---------- */
const store = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (_) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
};
/* ---------- navbar + footer ---------- */
(function () {
  const page = document.body.dataset.page || "";
  const link = (href, label, key) => `<li><a href="${href}" class="${page === key ? "active" : ""}"${page === key ? ' aria-current="page"' : ""}>${label}</a></li>`;
  const learn = ["ai-literacy", "code", "computer-basics"].includes(page);
  const nav = document.getElementById("nav");
  if (nav) nav.innerHTML = `<header class="navbar">
    <a class="logo" href="index.html"><b>T</b>TechScale</a>
    <button class="burger" aria-label="Menu" aria-expanded="false">☰</button>
    <ul class="nav-links">
      ${link("index.html", "Home", "home")}
      <li class="dd"><button aria-haspopup="true" aria-expanded="false" class="${learn ? "active" : ""}">Learn ▾</button>
        <ul class="dd-menu">${link("ai-literacy.html", "AI Literacy", "ai-literacy")}${link("code.html", "Code", "code")}${link("computer-basics.html", "Computer Basics", "computer-basics")}</ul></li>
      ${link("directory.html", "Directory", "directory")}${link("locator.html", "Find a Class", "locator")}${link("request-class.html", "Request a Class", "request")}${link("volunteer.html", "Volunteer", "volunteer")}${link("faq.html", "FAQ", "faq")}
    </ul></header>`;
  const foot = document.getElementById("foot");
  if (foot) foot.innerHTML = `<footer><div class="wrap cols"><div><div class="logo" style="color:#fff">TechScale</div><p>Free AI literacy, coding, and computer basics for everyone.</p></div>
    <div><a href="locator.html">Find a class</a><br><a href="volunteer.html">Volunteer</a><br><a href="faq.html">FAQ</a></div></div></footer>`;
  const burger = document.querySelector(".burger"), links = document.querySelector(".nav-links");
  if (burger) burger.onclick = () => { const o = links.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
  const dd = document.querySelector(".dd");
  if (dd) {
    const b = dd.querySelector("button");
    b.onclick = () => { const o = dd.classList.toggle("open"); b.setAttribute("aria-expanded", o); };
    dd.addEventListener("keydown", e => { if (e.key === "Escape") { dd.classList.remove("open"); b.focus(); } });
    document.addEventListener("click", e => { if (!dd.contains(e.target)) dd.classList.remove("open"); });
  }
})();
/* ---------- fade-in on scroll ---------- */
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) return els.forEach(e => e.classList.add("in"));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .1 });
  els.forEach(e => io.observe(e));
})();
/* ---------- forms: <form data-form="name" class="f"> followed by a .msg element ---------- */
document.querySelectorAll("form[data-form]").forEach(form => {
  const msg = form.parentElement.querySelector(".msg");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    msg.className = "msg";
    if (!form.checkValidity()) { msg.classList.add("err"); msg.textContent = "Please fill in the required fields (marked *)."; form.reportValidity(); return; }
    const fd = new FormData(form), data = {};
    fd.forEach((v, k) => { data[k] = data[k] ? data[k] + ", " + v : v; });
    data.form = form.dataset.form; data.submittedAt = new Date().toISOString();
    try {
      if (SETTINGS.FORM_ENDPOINT) {
        const r = await fetch(SETTINGS.FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: fd });
        if (!r.ok) throw new Error("send failed");
      } else {
        const all = store.get("ts_" + data.form, []); all.push(data); store.set("ts_" + data.form, all);
        console.log("Saved locally (no endpoint set):", data);
      }
      form.reset(); msg.textContent = form.dataset.thanks || "Thank you! We got it. 🎉";
    } catch (_) { msg.classList.add("err"); msg.textContent = "Something went wrong. Please try again."; }
  });
});
