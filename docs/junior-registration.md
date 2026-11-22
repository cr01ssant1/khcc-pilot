# Junior registration form

The online youth registration form lives at `junior-registration.html`. It is built from the Word template `docs/KHCC - Player Profile Form V8 030221_SHORT.docx`.

The home page links to it in two places:

- a **Junior registration form** button in the Join section
- a **Register a junior player →** link on the Juniors team card

## Files

| File | What it does |
| --- | --- |
| `junior-registration.html` | The form page, with the same header and footer as the home page |
| `js/junior-registration.js` | Form behaviour: questions that appear and disappear, the age check, optional contacts, validation and the confirmation |
| `css/styles.css` | The form styles, in the "Junior registration page" block at the end of the file, including print styles |
| `js/main.js` | Shared site script. It checks that the fixtures and enquiry-form elements exist before using them, so it runs safely on both pages |

## What's on the form

The form has the template's GDPR note and all six sections in the same order, as numbered cards.

1. **Young player and parent/guardian details.** School year is a dropdown and the postcode is checked as a UK format. A second parent/guardian can be added (see below).
2. **Emergency contact.** A second emergency contact can be added (see below).
3. **Disability.** The disability-type tick-boxes only appear if the answer is Yes. Choosing "Other" asks them to specify.
4. **Cricket experience.** Works the same way as section 3, plus a "Which club?" box when Club is ticked.
5. **Medical information and doctor.**
6. **Parent/guardian consents.** Every statement is a Yes/No choice with nothing pre-selected, so a photography No has to be chosen deliberately. Where the template has a blank for the child's name, the name they entered is filled in.
7. **Player's own photography consent.** This only appears when the date of birth makes the child 12–17, as in the template.

## Optional second parent and second emergency contact

Each starts as a dashed "+ Add…" button. Clicking it opens the fields, which have a Remove link.

**Second parent/guardian (section 1):**

- Required once added: full name and mobile number.
- Optional: relationship to the child, email, work phone, and home address and postcode if different.

**Second emergency contact (section 2):** name, phone and relationship, all required once added, the same as the first contact.

How these blocks behave:

- A family that doesn't add either block isn't asked for anything extra, and empty extra fields never block submission.
- If someone adds a block and leaves its required fields empty, submission is blocked and those fields are highlighted.
- Remove clears what was typed, so re-adding the block starts empty.
- In a printed or saved copy, the add buttons and Remove links are hidden, and an extra contact that was filled in prints with the rest of the form.

## Choices that go beyond the template

- **Three consents must be Yes to submit:** legal responsibility, accuracy of the information, and taking part. Saying No to any of them shows a short explanation. The other consents accept either answer.
- **Signatures are typed full names,** and the signing date fills in as today.
- **Doctor/surgery name and phone are required.** The template doesn't say whether they are optional, so this can be relaxed if the club prefers.
- **Date of birth must be for someone under 18.**

## Before using this with real families

- **Nothing is sent to the club.** Like the existing enquiry form, the page checks the answers and shows a confirmation, then offers **Print / save a copy** (a clean printout of the answers) for the parent to email or bring to training. Collecting the form online needs a backend or form service. Because the form holds children's medical and contact details, that service needs to store data securely and meet GDPR.
- **The privacy statement has no link yet.** The GDPR note at the top of the form refers to the privacy statement on the club website, which should be linked once its URL is available. The club policies are linked from the "Club policies" part of section 6 ([club policies on Play-Cricket](https://keymer.play-cricket.com/doc_details?doc_id=54623)). The link opens in a new tab so the form isn't lost.
- **The thank-you message names only the first parent.**

## Testing done

The form was tested in headless Microsoft Edge, with no script errors. The checks were:

- an empty submission
- the questions that appear based on earlier answers
- the age check and the 12–17 consent section
- the consents that must be Yes
- adding, leaving empty, filling in and removing the optional contacts
- a full valid submission

The layout was checked in screenshots at desktop and phone widths.
