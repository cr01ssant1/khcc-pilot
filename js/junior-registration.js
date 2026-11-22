// Junior player registration form (based on "KHCC - Player Profile Form V8").
// Pilot only: validates and confirms in the browser, but does not send anywhere yet.

(() => {
  const form = document.getElementById("reg-form");
  if (!form) return;

  const errorBox = document.getElementById("reg-errors");
  const done = document.getElementById("reg-done");
  const childConsent = document.getElementById("child-consent");
  const dobInput = form.elements.child_dob;
  const ageHint = document.getElementById("age-hint");

  // ---- helpers -------------------------------------------------------------
  const todayISO = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  function ageFromDob(value) {
    if (!value) return null;
    const [y, m, d] = value.split("-").map(Number);
    const now = new Date();
    let age = now.getFullYear() - y;
    if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age--;
    return age;
  }

  const isChecked = (name, value) =>
    [...form.querySelectorAll(`[name="${name}"]`)].some((el) => el.checked && el.value === value);

  // Show/hide a block and disable its inputs while hidden so they are skipped by validation.
  function setShown(block, show) {
    block.hidden = !show;
    block.querySelectorAll("input, select, textarea").forEach((el) => { el.disabled = !show; });
  }

  // ---- conditional sections ------------------------------------------------
  function updateReveals() {
    // Document order means outer blocks are handled before the blocks nested inside them.
    form.querySelectorAll("[data-show-when]").forEach((block) => {
      const [name, value] = block.dataset.showWhen.split("=");
      const parentHidden = block.parentElement.closest(".reveal[hidden]");
      setShown(block, !parentHidden && isChecked(name, value));
    });

    const age = ageFromDob(dobInput.value);
    setShown(childConsent, age !== null && age >= 12 && age < 18);
  }

  function updateAgeHint() {
    const age = ageFromDob(dobInput.value);
    if (age === null || dobInput.value > todayISO()) { ageHint.textContent = ""; return; }
    ageHint.textContent = age >= 18 ? "This form is for players under 18." : `Age today: ${age}`;
  }

  function updateChildName() {
    const name = form.elements.child_name.value.trim();
    form.querySelectorAll(".child-name-slot").forEach((el) => {
      el.textContent = name || "the child named above";
    });
  }

  // ---- optional extra contacts (second parent, second emergency contact) ----
  // Hidden blocks have their inputs disabled, so their required fields only apply once added.
  form.querySelectorAll("[data-add]").forEach((btn) => {
    const block = document.getElementById(btn.dataset.add);
    setShown(block, false);
    btn.addEventListener("click", () => {
      setShown(block, true);
      btn.hidden = true;
      btn.setAttribute("aria-expanded", "true");
      block.querySelector("input").focus();
    });
  });
  form.querySelectorAll("[data-remove]").forEach((btn) => {
    const block = document.getElementById(btn.dataset.remove);
    const addBtn = form.querySelector(`[data-add="${btn.dataset.remove}"]`);
    btn.addEventListener("click", () => {
      block.querySelectorAll("input, textarea").forEach((el) => { el.value = ""; el.classList.remove("invalid"); });
      setShown(block, false);
      addBtn.hidden = false;
      addBtn.setAttribute("aria-expanded", "false");
      addBtn.focus();
    });
  });

  form.addEventListener("change", updateReveals);
  dobInput.addEventListener("input", () => { updateAgeHint(); updateReveals(); });
  form.elements.child_name.addEventListener("input", updateChildName);

  // Signing dates are always today.
  form.querySelectorAll('input[name$="_signed_date"]').forEach((el) => { el.value = todayISO(); });

  // ---- validation ----------------------------------------------------------
  function markInvalid(el) {
    const target = el.type === "radio" || el.type === "checkbox" ? el.closest("fieldset") : el;
    target.classList.add("invalid");
    return target;
  }

  function validate() {
    form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
    const problems = [];
    const invalid = [];

    // Date of birth: in the past and under 18.
    const age = ageFromDob(dobInput.value);
    if (dobInput.value && (dobInput.value > todayISO() || age >= 18)) {
      dobInput.setCustomValidity("invalid");
      problems.push("The child's date of birth must be for someone under 18.");
    } else {
      dobInput.setCustomValidity("");
    }

    let missing = false;
    [...form.elements].forEach((el) => {
      if (el.disabled || !el.willValidate) return;
      const empty = el.required && el.type !== "radio" && el.type !== "checkbox" && el.value.trim() === "";
      if (!el.checkValidity() || empty) {
        invalid.push(markInvalid(el));
        if (el.validity.valueMissing || empty) missing = true;
        else if (el.name === "postcode") problems.push("Please enter a valid UK postcode.");
        else if (el.type === "email") problems.push("Please enter a valid email address.");
      }
    });

    form.querySelectorAll("[data-min-one]").forEach((group) => {
      const boxes = group.querySelectorAll("input:not(:disabled)");
      if (boxes.length && ![...boxes].some((b) => b.checked)) {
        group.classList.add("invalid");
        invalid.push(group);
        missing = true;
      }
    });

    form.querySelectorAll("[data-must-be-yes]").forEach((group) => {
      if (group.querySelector('input[value="no"]:checked')) {
        group.classList.add("invalid");
        invalid.push(group);
        problems.push(group.dataset.mustBeYes);
      }
    });

    if (missing) problems.unshift("Please complete the highlighted fields.");
    return { problems: [...new Set(problems)], first: invalid[0] };
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { problems, first } = validate();

    if (problems.length) {
      errorBox.innerHTML = problems.map((p) => `<span>${p}</span>`).join("");
      errorBox.hidden = false;
      first.scrollIntoView({ behavior: "smooth", block: "center" });
      const focusable = first.matches("input, select, textarea") ? first : first.querySelector("input");
      focusable?.focus({ preventScroll: true });
      return;
    }

    errorBox.hidden = true;
    const child = form.elements.child_name.value.trim();
    const parent = form.elements.parent_name.value.trim().split(/\s+/)[0];
    document.getElementById("reg-done-msg").textContent =
      `Thanks ${parent} – ${child}'s registration has been completed. A member of the junior section will be in touch at ${form.elements.email.value.trim()}.`;

    // Lock the answers so the printed copy matches what was submitted.
    form.inert = true;
    form.classList.add("submitted");
    done.hidden = false;
    done.scrollIntoView({ behavior: "smooth", block: "start" });
    done.focus({ preventScroll: true });
  });

  // Clear an error mark as soon as the field is touched.
  form.addEventListener("input", (e) => e.target.closest(".invalid")?.classList.remove("invalid"));
  form.addEventListener("change", (e) => e.target.closest(".invalid")?.classList.remove("invalid"));

  document.getElementById("reg-print").addEventListener("click", () => window.print());

  updateReveals();
  updateAgeHint();
})();
