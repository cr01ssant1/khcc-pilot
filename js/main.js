// ---------------------------------------------------------------------------
// Club data – edit these lists to update the site. Dates are YYYY-MM-DD.
// Fixtures in the past are hidden automatically.
// ---------------------------------------------------------------------------
const FIXTURES = [
  // Source: keymer.play-cricket.com (Nov 2026). All at Adastra Park.
  { date: "2027-05-09", time: "13:00", team: "Development XI", opponent: "Grasshoppers",                 venue: "home" },
  { date: "2027-05-30", time: "13:00", team: "Development XI", opponent: "Cutters",                      venue: "home" },
  { date: "2027-06-06", time: "13:00", team: "Development XI", opponent: "Hurstpierpoint CC Sunday XI",  venue: "home" },
  { date: "2027-07-04", time: "13:00", team: "Development XI", opponent: "Brighton Xiles CC 1st XI",     venue: "home" },
];

const RESULTS = [
  { date: "2026-09-05", team: "1st XI", opponent: "Felbridge & Sunnyside 2nd XI", outcome: "won",       summary: "Keymer & Hassocks 297/5 (40) beat Felbridge & Sunnyside 119 all out (21.1) by 178 runs" },
  { date: "2026-09-05", team: "2nd XI", opponent: "Haywards Heath CC 4th XI",     outcome: "lost",      summary: "Haywards Heath 142/4 (33.4) beat Keymer & Hassocks 141 all out (36.1) by 6 wickets" },
  { date: "2026-09-05", team: "3rd XI", opponent: "Streat & Westmeston CC 2nd XI", outcome: "cancelled", summary: "Match cancelled" },
  { date: "2026-08-29", team: "1st XI", opponent: "Burgess Hill CC 4th XI",       outcome: "cancelled", summary: "Match cancelled" },
];

// ---------------------------------------------------------------------------

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const parseDate = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };

function renderFixtures(team = "all") {
  const list = document.getElementById("fixture-list");
  if (!list) return;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const items = FIXTURES
    .filter((f) => parseDate(f.date) >= today)
    .filter((f) => team === "all" || f.team === team)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  if (!items.length) {
    list.innerHTML = `<p class="empty">No upcoming fixtures – check back soon.</p>`;
    return;
  }

  list.innerHTML = items.map((f) => {
    const d = parseDate(f.date);
    const isHome = f.venue === "home";
    return `
      <div class="fixture">
        <div class="fx-date"><span class="d">${d.getDate()}</span><span class="m">${MONTHS[d.getMonth()]}</span></div>
        <div>
          <div class="fx-teams">${f.team} v ${f.opponent}</div>
          <div class="fx-meta">${d.toLocaleDateString("en-GB", { weekday: "long" })} · ${f.time} start</div>
        </div>
        <span class="tag ${isHome ? "tag-home" : "tag-away"}">${isHome ? "Home" : "Away"}</span>
      </div>`;
  }).join("");
}

function renderResults() {
  const list = document.getElementById("results-list");
  if (!list) return;
  list.innerHTML = [...RESULTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((r) => {
      const d = parseDate(r.date);
      return `
        <article class="result">
          <span class="result-badge ${r.outcome}">${r.outcome.toUpperCase()}</span>
          <h3>${r.team} v ${r.opponent}</h3>
          <p class="fx-meta">${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}</p>
          <p class="score">${r.summary}</p>
        </article>`;
    }).join("");
}

// Fixture filter chips
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    renderFixtures(chip.dataset.team);
  });
});

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

// Join form – pilot only: validates and confirms, but does not send anywhere yet.
const form = document.getElementById("join-form");
const status = document.getElementById("form-status");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("[required]").forEach((el) => {
    const ok = el.checkValidity() && el.value.trim() !== "";
    el.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    status.textContent = "Please enter your name and a valid email address.";
    status.className = "form-status err";
    return;
  }
  const name = form.elements.name.value.trim().split(" ")[0];
  status.textContent = `Thanks ${name}! We'll be in touch soon.`;
  status.className = "form-status ok";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
renderFixtures();
renderResults();
