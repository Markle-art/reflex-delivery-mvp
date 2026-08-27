# Reflex Delivery MVP — QA Test Results

## Tester
QA & Testing Lead

## Test Objective
Verify the core delivery workflow and confirm that delivery records persist correctly in Supabase as their status changes.

## Test Environment
- Application: Reflex Delivery MVP
- Database: Supabase
- Branch tested: main

## Test Data

- Customer Name: Daniel Onyango
- Customer Phone: 0796 382 415
- Address: Rongo Town, Migori County
- Item Description: Lenovo wireless keyboard and mouse
- Rider: Brian Otieno

---

## Test Results

### TC01 — Create Delivery

**Expected:**  
The retailer should be able to create a delivery request containing the customer's name, phone number, address, and item description.

**Result:** PASS

**Evidence:**  
The delivery was successfully created and a corresponding record was stored in the Supabase `deliveries` table.

---

### TC02 — Assign Rider

**Expected:**  
The dispatcher should be able to assign a rider and the delivery status should change to `Assigned`.

**Result:** PASS — database persistence

**Evidence:**  
The Supabase record for Daniel Onyango showed:

- `rider_id` populated
- `status = Assigned`
- `updated_at` updated
- Delivery record remained in the `deliveries` table

**UI Observation:**  
After assigning the rider, the delivery disappeared from the dispatcher view even though the Supabase record remained available.

**Status:** Needs developer review and retest.

---

### TC03 — Mark as Picked Up

**Expected:**  
The rider should be able to change the delivery status to `Picked Up`, and the delivery record should remain stored.

**Result:** PASS — database persistence

**Evidence:**  
A delivery record tested in Supabase remained present after pickup with:

`status = Picked Up`

**Note:**  
The pickup workflow should be retested after the latest developer changes.

---

### TC04 — Mark as Delivered

**Expected:**  
The rider should be able to change the delivery status to `Delivered`, and the delivery record should remain stored.

**Result:** PASS — database persistence

**Evidence:**  
Daniel Onyango's delivery remained in the Supabase `deliveries` table with:

`status = Delivered`

The `updated_at` value was also updated.

**UI Observation:**  
The delivery disappeared from the active dashboard after being marked as Delivered.

**Status:** Needs clarification on whether completed deliveries are intentionally removed from the active view or should remain accessible through a Delivered/Completed history view.

---

## Overall QA Finding

The Supabase database successfully persists delivery records through the delivery lifecycle:

**Open → Assigned → Picked Up → Delivered**

Testing confirmed that status changes do not delete the delivery records from Supabase.

The main issue observed was that deliveries disappeared from the application interface after certain status changes, despite remaining in the database.

This suggests that the remaining issue is related to dashboard filtering or display logic rather than database persistence.

---

## Developer Follow-Up

The developer has been informed about the dashboard behavior after rider assignment and is working on a correction.

After the correction, QA will retest:

1. Create delivery
2. Assign rider
3. Refresh dispatcher dashboard
4. Confirm assigned delivery remains visible
5. Mark as Picked Up
6. Refresh and confirm delivery remains visible in the appropriate view
7. Mark as Delivered
8. Confirm the completed delivery remains accessible through the appropriate view/history

---

## QA Conclusion

The core delivery data is being persisted successfully in Supabase.

The remaining validation is focused on ensuring that the application UI correctly reflects delivery status changes and provides appropriate visibility of active and completed deliveries.
