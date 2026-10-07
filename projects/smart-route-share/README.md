# Smart Route Share

**Conceptual APM portfolio project — usability testing pending.**

[Read the case study](Case_Study.md) · [Download the self-contained prototype](Smart-Route-Share.html)

## Open the demo

GitHub displays HTML source rather than running it. Open the standalone prototype link, choose **Download raw file** (or save the raw file), then open the downloaded HTML in a browser. It contains its styles and JavaScript and needs no installation or network connection. Alternatively download this project folder and open index.html.

No live website deployment is configured by this addition.

# Smart Route Share

Conceptual APM portfolio prototype. All identities, routes, fares, timing and OTPs are illustrative. No user interviews, validation percentages, business impact, revenue, or platform data are claimed. Not affiliated with Uber/Ola.

## Run
Open index.html in a modern browser. No installation or build required. Demo OTP: 2468.

The default guided walkthrough automatically switches views at the explicit consent and pickup steps. Choose Co-rider joins or Co-rider does not arrive; follow the step explanation next to the phone. Both riders still explicitly accept, and only verified B pickup changes the fare. Manual role selection and technical checks are available under Advanced demo controls. Fill demo OTP supplies the mock code without verifying it automatically. Restart resets the journey. Open Smart-Route-Share.html for a self-contained version, or index.html alongside its CSS and JavaScript files.

## Logic
PRIVATE_BOOKED -> A_STARTED -> SEARCHING_B -> MATCH_PROPOSED -> MATCH_ACCEPTED -> B_PICKUP -> B_OTP_VERIFIED -> SHARE_ACTIVE -> COMPLETED.
Alternatives: NO_ELIGIBLE_MATCH, MATCH_DECLINED, MATCH_EXPIRED, B_NO_SHOW.

Only A OTP starts the original trip; search is then permitted if opted in. Candidate hard filters cover solo B, exact shared destination, capacity, added time, availability and reachability. Candidates rank by added time then route proximity. +0 yields no candidate; +5 rejects +10 and offers +4. Both riders must accept before pickup. Only B OTP unlocks discount: A 400 -> 320, B 110 + 10 service fee. No-show retains A 400. Matching stays closed after verification.

CONFIG and transition() in app.js centralize values and product rules. Named component render functions correspond to the requested boundaries. Static SVG map; no external integrations or dependencies.

## Checks
Run node test.js for deterministic state-machine checks, or click Run logic checks in the demo. No formal user testing has been performed. Browser visual and assistive-technology testing remain necessary.

## Open questions
Prediction drift from traffic, destination changes, driver compensation, payment failures, luggage, cancellation and emergency/support procedures are not solved by this prototype. Timers are manually advanced demo controls, not operational policy. Illustrative fare totals are not platform revenue.

## Suggested usability tasks
Ask 3-5 real participants to choose +5, explain the match, say when the fare changes, interpret B's stop/destination promise and complete a no-show. Record confusion and changes honestly. This project does not claim dynamic matching is novel.

## Usability improvements
A plain-language concept overview, eight-step explanatory guide, automatic role handoffs, clearly labelled illustrative fares and savings, scenario comparison, reduced-motion support and advanced controls separated from the main walkthrough. Guided happy path, wrong OTP, no-show, zero-tolerance and manual/resume controls were checked programmatically, along with 23 invariants and 72 role/state/scenario renders. These are not visual browser tests or user-validation results. Original files are retained as .v1.backup.


## Reproduce logic checks

Run `node test.js` from this folder. Browser visual/accessibility checks and participant testing remain pending.
