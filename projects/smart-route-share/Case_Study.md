# Smart Route Share
## APM portfolio case study   draft for review
**A shared-ride concept centred on rider control and predictable trade-offs.**

**Status:** Interactive conceptual prototype; usability testing pending.
**Role:** Concept originator and product decision owner. AI assisted with organising/drafting documentation and implementing the prototype.
**Boundary:** No live routing, marketplace, payment, authentication or dispatch integration. No customer adoption, business impact, revenue or validated pricing is claimed.

---

## 1. A costly journey prompted the question
My relatives reported booking an Uber pooled ride to a railway station. After they were picked up, additional passenger pickups delayed their journey, and they missed their train.

I heard about the incident afterwards; I did not witness it or independently verify trip records. It is an anecdotal signal, not proof that pooling caused every part of the delay or that the experience is representative.

**Problem:** Shared rides can reduce fares, but extra pickups and uncertain delays can undermine the speed and predictability riders seek from a cab.

**Design question:** How might sharing appeal to people who want to save money while keeping additional travel time bounded and understandable?

## 2. Evidence and research boundaries
I explored Reddit and recall similar stories involving additional pickups, changing arrival times and missed scheduled travel. Original links and a source-by-source synthesis have not yet been assembled. These are recalled secondary-research themes, not verified prevalence or formal interview findings.

Competitive research was assisted by AI and checked against official Uber information. UberX Share already matches riders heading in the same direction and supports additional co-rider pickups. Same direction is not necessarily the same destination.

Sources:
- UberX Share rider overview: https://www.uber.com/us/en/ride/uberx-share/
- UberX Share driver information: https://www.uber.com/us/en/drive/services/shared-rides/

**Learning:** Dynamic matching is not the invention. I reframed the concept around explicit rider control and narrower matching constraints.

No formal discovery interviews or prototype usability sessions have been completed for this project. No research percentages are claimed.

## 3. Target rider and hypothesis
**Primary segment:** A moderately flexible, price-sensitive rider who wants the convenience and speed of a private ride but would accept a small, clearly communicated delay to save money.

Time-critical travel is not the primary use case. A rider with an imminent train departure may be better served by a private ride; the concept cannot guarantee arrival.

**Hypothesis:** Offering a rider-selected maximum predicted added time, one co-rider and the same destination could make the time-versus-price trade-off easier to understand and accept.

The 0/5/10-minute choices reflect my design judgement that larger delays may increase anxiety. They are illustrative thresholds to test, not discovered user preferences.

## 4. The constrained solution
Rider A books a normal ride, opts into sharing and chooses a time limit. Only after A enters the pickup OTP and the journey starts does matching begin.

The system considers one solo Rider B travelling to exactly the same destination. Eligible candidates must satisfy capacity, availability, pickup reachability, route proximity and predicted added-time constraints. Rank eligible candidates by least disruption, using route proximity as a secondary factor.

A and B explicitly accept. The driver makes one B pickup. After B physically joins and their pickup OTP is verified, A's discount and B's shared fare activate. No more passengers are matched.

**Why one B:** Reduce pickup complexity and protect comfort and passenger space.
**Why one destination:** Avoid extra drop-off diversions affecting either rider.
**Why conditional pricing:** Avoid confusing fare changes for a share that never happens.

These are intended benefits, not measured outcomes.

## 5. MVP and non-goals
**Included:** Opt-in, time selection, active-trip matching, hard eligibility filters, explicit dual consent, one pickup, OTP-gated pricing, no-show recovery and reset/replay.

**Excluded:** B groups, different destinations, multiple sequential pickups, automatic discounts at proposal, dynamic pricing, real traffic integration and a full ride-hailing platform.

The prototype communicates the critical decisions rather than reproducing a complete service.

## 6. Journey and pricing
1. A books a normal ride at an illustrative Rs 400.
2. A opts in and chooses +5 minutes.
3. A's pickup OTP starts the original journey.
4. A +4-minute B candidate qualifies; a +10-minute candidate is excluded.
5. A sees potential Rs 80 savings and explicitly accepts.
6. B confirms solo travel and explicitly accepts the offer.
7. Driver arrives for the single additional pickup.
8. B verifies pickup OTP. A's fare becomes Rs 320; B's illustrative fare is Rs 110 plus a Rs 10 service fee.
9. Matching closes and both continue to Pune Railway Station.

The prices were chosen as examples. They are not based on tested willingness to pay, validated economics or actual fare records. Combined customer payments are not platform revenue.

**No actual sharing = no discount.**

## 7. Failure policies and trade-offs
| Situation | Proposed response |
| --- | --- |
| No eligible candidate | A continues at the original fare |
| Either rider declines / offer expires | Do not activate sharing |
| B does not arrive | After a proposed two-minute grace period, driver continues A's trip; A keeps original fare |
| Predicted added delay exceeds A's limit before B pickup | Explain the revised estimate and ask A to accept or reject |
| A rejects revised delay | Withdraw the match; A continues privately at original fare; B chooses whether to search again |

The traffic-change policy emerged during case-study review and is not yet implemented in the prototype.

A Google Maps traffic-aware integration is a future feasibility proposal, not an implemented dependency. Its travel durations are estimates rather than guarantees:
https://developers.google.com/maps/documentation/routes/reference/rest/v2/TrafficModel

**Open:** How waiting/boarding contributes to added time; handling delay after B joins; destination changes; driver compensation; luggage; payment failures; cancellation and emergency procedures.

**Trade-off:** Strict same-destination/time constraints protect predictability but may substantially reduce match availability.

## 8. Prototype and technical evidence
The mobile-first web prototype uses deterministic mocked routes, fares and OTPs. A guided walkthrough brings the reviewer to each rider's consent and the driver pickup without manual role switching. Advanced controls remain separate.

Named UI boundaries include RideStatus, RouteMapMock, SmartShareOptIn, TimeToleranceSelector, MatchOffer, PassengerCard, FareSummary, OTPVerification, NoShowState and DemoControls.

Core invariants:
- No search before A starts.
- No offer beyond the selected tolerance.
- Both consents before pickup.
- No discount before B pickup verification.
- No additional matching after B joins.
- No-show retains the original fare.

Programmatic checks reported 23 invariant checks and 72 role/state/scenario renders passing, with additional guided-path checks. These are technical checks, not browser visual verification or usability evidence.

## 9. Measurement and pending usability test
**Primary metric to define for a live pilot:** Eligible Smart Share attempts resulting in B pickup verification, divided by eligible attempts. Eligibility and counting windows need explicit operational definitions.

Supporting measures: A/B acceptance, actual savings, time to match, B no-show, repeat use and complaints.
Guardrails: actual incremental journey time relative to the selected limit, driver friction and safety signals.

These metrics are proposed; no performance values are available.

**Next prototype test:** Observe approximately 3-5 relevant people completing tasks without explaining the answer:
- Choose a ride with at most five extra minutes.
- Interpret the match and decide whether to accept.
- Explain exactly when A's fare changes.
- Interpret B's destination and passenger-pickup limits.
- Complete the no-show scenario and explain the fare outcome.

Capture misunderstandings, hesitation and trust concerns. Revise and record what changed. Such a small test assesses comprehension and usability; it does not validate marketplace demand, routing accuracy or economics.

## 10. Learning and next decisions
The project shifted from a matching idea toward a constrained decision experience after discovering existing shared-ride functionality.

The clearest learning is that predicted travel time and a guaranteed time bound are different promises. The product needs a transparent policy when estimates change.

Next:
1. Assemble dated secondary-research sources.
2. Test prototype comprehension with real participants.
3. Iterate the interface based on observed findings.
4. Add the revised-delay consent branch.
5. Investigate match availability, actual incremental delay and driver economics before any live-service claim.

**Reasons to reconsider the feature:** Poor comprehension or acceptance, inability to respect time limits, insufficient compatible demand, unacceptable driver friction or unsustainable economics. Thresholds are not yet established.

---

## Draft resume bullets   use only after personal review
- Defined a constrained shared-ride concept with rider-selected time tolerance, same-destination matching, dual consent and OTP-gated pricing.
- Owned product decisions and used AI to implement a mocked interactive prototype covering successful sharing, no-show, no-match, decline and expiry states.
- Designed a usability-test plan and product metrics for comprehension, acceptance, delay compliance and pickup reliability; testing remains pending.

## Concise interview story
 My relatives reported missing a train after additional pickups delayed their pooled ride. I explored similar public discussions and, through assisted competitive research, discovered that dynamic matching already existed. I narrowed my proposal to explicit time tolerance, one co-rider and a shared destination. I defined consent, pricing and failure rules, then used AI to implement a prototype. Technical checks passed, but usability testing and live feasibility are still pending. My next step is to test whether people understand the trade-off and when savings activate. 
