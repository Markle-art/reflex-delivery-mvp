# Reflex Delivery MVP — QA Test Results

## Tester
QA & Testing Lead

## Test Objective
Verify that the core delivery lifecycle works correctly and that delivery records persist in Supabase as their status changes.

## Test Data

- Customer Name: Daniel Onyango
- Customer Phone: 0796 382 415
- Address: Rongo Town, Migori County
- Item Description: Lenovo wireless keyboard and mouse
- Rider: Brian Otieno

## Test Results

### TC01 — Create Delivery
**Expected:** Retailer can create a delivery containing customer name, phone number, address, and item description.

**Result:** PASS

**Evidence:** Delivery record was created successfully and appeared in the Supabase `deliveries` table.

---

### TC02 — Assign Rider
**Expected:** Dispatcher can assign a rider and the delivery status changes to `Assigned`.

**Result:** PASS

**Evidence:** Daniel Onyango's Supabase record contained a rider ID and:
`status = Assigned`

The `updated_at` value also changed, confirming that the assignment was persisted.

**Observation:** After assignment, the delivery disappeared from the dispatcher UI. The Supabase record remained available, so this appears to be a UI/filtering issue rather than data loss.

---

### TC03 — Mark as Picked Up
**Expected:** Rider can change the delivery status to `Picked Up` and the delivery remains stored.

**Result:** PASS

**Evidence:** A delivery record tested in Supabase remained present with:
`status = Picked Up`

---

### TC04 — Mark as Delivered
**Expected:** Rider can mark the delivery as `Delivered` and the record remains stored.

**Result:** PASS

**Evidence:** Daniel Onyango's Supabase record remained present with:
`status = Delivered`

The `updated_at` value was also updated.

**Observation:** The delivery disappears from the active UI after being marked Delivered. The database record remains available.

---

## Key QA Finding

The core delivery status updates are being persisted in Supabase:

**Open → Assigned → Picked Up → Delivered**

The main issue observed during testing is that deliveries disappear from the active dashboard after certain status changes even though their records remain in Supabase.

This indicates a possible dashboard filtering/display issue rather than deletion of delivery records.

## QA Recommendation

Verify that the dashboard displays deliveries according to their current status and that completed deliveries remain accessible through an appropriate Delivered/Completed view or history.

## Evidence

Supabase verification confirmed that delivery records remain stored after status changes and retain their customer, retailer, rider, and timestamp information.
