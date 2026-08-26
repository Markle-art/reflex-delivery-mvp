## Problem Statement

**The problem: Small Kenyan retailers coordinate deliveries blind.**

Electronics shops, pharmacies, and hardware stores manage deliveries over
WhatsApp messages and phone calls. That means:

- No record of who's assigned to what
- No visibility into delivery status
- No proof a delivery actually happened

When a customer calls asking "where's my order," staff can't answer without
chasing a rider by phone.

**Key takeaway:** coordination currently has no system of record — everything
lives in someone's memory or a chat thread.

---

## Persona-Fit Checklist

Use this to check every feature against the three personas — if a feature
doesn't serve one of these, flag it as scope creep.

| Persona        | Core need                                                     | Built? |
|----------------|----------------------------------------------------------------|:------:|
| Retailer staff | Log a delivery request (customer name, phone, address, item)   | ☐ |
| Retailer staff | See status of requests they've logged                          | ☐ |
| Dispatcher     | See all open (unassigned) requests                             | ☐ |
| Dispatcher     | Assign a request to a specific rider                            | ☐ |
| Rider          | See their own assigned deliveries only                          | ☐ |
| Rider          | Update status: Assigned → Picked Up → Delivered                 | ☐ |

**Red-flag check** — for anything built beyond this table (e.g. real-time
sync, scanning), ask:

- Does this serve one of the three personas directly, or is it stretch
  language from the problem statement?
- Can we defend why we built it if the panel asks "did you need this"?

If the answer to either is shaky, it's a candidate to cut or clearly label
as a roadmap item rather than a built feature.
