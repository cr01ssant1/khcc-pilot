# Junior registration: suggestions and to-do

This tracks improvement ideas and open tasks for the junior registration form (`junior-registration.html`). For how the form works, see [junior-registration.md](junior-registration.md).

Last updated: 22 November 2026.

## To do before real families use it

- [ ] **Get submissions to the club.** Nothing is sent yet: parents print or save a copy and email it in. The site is on GitHub Pages, which can't receive form data, so it needs an outside service. Options:
  - a form service such as Formspree
  - a Google or Microsoft form under a club account
  - Play-Cricket's own membership features, if the club already uses them

  The form holds children's medical details, so the club should pick a service that stores data in the UK or EU, and decide who can see submissions and how long they're kept. Once a service is chosen, the form needs wiring up to it.
- [ ] **Confirm the Welfare Officer details.** The name, email and phone are placeholders: `[Welfare Officer name]`, `welfare@example.com` and `07700 900000`. Replace them in both places in `junior-registration.html`. Each place is marked with a `TODO` comment: the "Questions or concerns?" card above Submit, and the thank-you message.
- [ ] **Link the privacy statement.** The GDPR note at the top of the form mentions the club's privacy statement but doesn't link to it. Add the link once the URL is known, for example if it's on Play-Cricket like the policies.

## Suggested improvements

- [ ] **Register siblings without retyping.** Add "Register another child" to the thank-you screen, keeping the parent, address and emergency contact details. This saves families with several juniors a lot of typing.
- [ ] **Ask whether it's new or a renewal.** Ask at the start whether this is a new registration or a renewal. Returning families could be told to update only what has changed, and the club could see renewals at a glance.
- [ ] **Show the player's age group.** Work out the age group (U9, U11 and so on) from the date of birth. The club needs to confirm the cut-off date it uses first, so the result is always right.
- [ ] **Explain what happens next.** Add to the thank-you screen how fees are paid, when training starts and what kit is needed.
- [ ] **Add spam protection.** Once submissions are actually sent, add a simple hidden check so bots can't fill the club inbox with junk.
- [ ] **Name both parents in the thank-you message.** It currently names only the first parent.

**Not recommended for now: "save your progress".** It would help on a long form, but it would keep a child's medical details stored in the browser, which is risky on a shared family computer.

## Small design follow-ups

- [ ] **Progress bar's resting position.** Before the parent scrolls, the green progress bar sits between the GDPR note and section 1, and there its square top corners look slightly unfinished. One option is to round all four corners in that position and switch to the tab shape once it sticks under the header.
- [ ] **Home page stats band contrast.** Since the main green changed to green-800, the stats band at the bottom of the home page hero is closer in colour to the hero behind it. It still stands out thanks to its gold top edge, but it could go back to the darker green-900 if more contrast is wanted.

## Housekeeping

- [ ] **Publish the latest styling changes.** These changes are in `css/styles.css` but not committed yet:
  - the main green changed to green-800 (header, phone menu, home page stats band, footer and the crest outline)
  - the gold line under the header doubled to 6px
  - the progress bar restyled in green-700

  To publish, commit and push to `main`, then merge `main` into `Live`.
- [ ] **Decide whether to commit the Word template.** `docs/KHCC - Player Profile Form V8 030221_SHORT.docx` isn't committed. Commit it if it should be kept in the repo. Never commit the `~$…docx` lock file Word creates while the document is open. A `.gitignore` rule for it would stop it being picked up by accident.

## Done

- [x] Junior registration form built from the Word template, with all six sections and the player's own consent for ages 12–17
- [x] Optional second parent/guardian and second emergency contact
- [x] Link to the club policies on Play-Cricket, in an info box in section 6
- [x] Club Welfare Officer contact card and thank-you line, with placeholder details
- [x] Progress indicator ("Step 3 of 6 · Disability") that stays under the header while scrolling
