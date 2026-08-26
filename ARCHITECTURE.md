# Reflex Delivery MVP — Architecture

## 1. System Overview

Reflex is a web-based delivery coordination system for small Kenyan retailers.

The system replaces delivery coordination through WhatsApp messages and phone calls with a shared system of record.

The MVP supports three user roles:

- Retailer — creates delivery requests.
- Dispatcher — views unassigned requests and assigns riders.
- Rider — views assigned deliveries and updates delivery status.

### Core delivery flow

Retailer creates a delivery request.

    Retailer
        |
        v
    Created
        |
        v
    Dispatcher assigns rider
        |
        v
    Assigned
        |
        v
    Rider picks up delivery
        |
        v
    Picked Up
        |
        v
    Rider completes delivery
        |
        v
    Delivered

The delivery record is stored in Supabase throughout the workflow. Each status change updates the same delivery record rather than creating separate records for each stage.

### MVP boundary

The MVP focuses on the core delivery coordination workflow:

1. Creating a delivery request.
2. Assigning a rider.
3. Viewing assigned deliveries.
4. Updating delivery status.

Features outside this core workflow are treated separately as future improvements or extensions.

## 2. Technology Stack

### Frontend

**HTML**
- Defines the application structure.
- Contains the three role dashboards and delivery forms.

**CSS**
- Controls layout, spacing, forms, buttons, and delivery cards.
- Keeps the interface simple for the three user roles.

**JavaScript**
- Handles user interactions.
- Sends requests to Supabase.
- Loads deliveries for each role.
- Updates delivery status.
- Controls the movement between dashboards.

### Backend and Database

**Supabase**
- Stores users and delivery records.
- Provides the database API used by the frontend.
- Persists delivery status and rider assignments.

### Development Environment

**GitHub Codespaces**
- Used as the development environment.
- Provides the terminal and project workspace.
- Allows the project to be developed and tested without requiring a local development setup.

**Python HTTP Server**
- Used during development to serve the frontend locally.
- The application is run from the `public/` directory.

### Why this stack?

The MVP needed a simple stack that the team could build and explain within the available time.

We chose vanilla HTML, CSS, and JavaScript instead of introducing a frontend framework because the MVP has a small number of screens and straightforward interactions.

We chose Supabase because the MVP requires persistent data storage and a database API, while the team did not need to build a custom backend server for the core workflow.

This reduces development overhead while keeping the main delivery workflow functional and easy to demonstrate.

cat > ARCHITECTURE.md <<'EOF'
## 3. Data Model

Reflex uses two main tables for the MVP:

- users
- deliveries

### Users

The users table identifies the people using the system.

| Field | Purpose |
|---|---|
| id | Unique identifier for the user |
| name | User's name |
| role | Identifies whether the user is a retailer, dispatcher, or rider |

Example roles:

retailer
dispatcher
rider

### Deliveries

The deliveries table stores each delivery request and its current status.

| Field | Purpose |
|---|---|
| id | Unique identifier for the delivery |
| customer_name | Customer receiving the delivery |
| customer_phone | Customer's phone number |
| address | Delivery destination |
| item_description | Item being delivered |
| retailer_id | Identifies the retailer who created the request |
| rider_id | Identifies the rider assigned to the delivery |
| status | Current stage of the delivery |
| created_at | Time the delivery was created |
| updated_at | Time the delivery was last updated |

### Relationship Between Users and Deliveries
```text
A delivery connects to users using retailer_id and rider_id.

users
  |
  |-- id
  |
  +----------------------+
                         |
                    deliveries
                         |
             +-----------+-----------+
             |                       |
        retailer_id              rider_id
             |                       |
             v                       v
         Retailer                  Rider
```
When a retailer creates a delivery, rider_id is initially NULL.

When the dispatcher assigns a rider, the system stores that rider's id in rider_id.
### Delivery Status Lifecycle

Created → Assigned → Picked Up → Delivered
```text
- Created — retailer has submitted the request.
- Assigned — dispatcher has assigned a rider.
- Picked Up — rider has collected the item.
- Delivered — rider has completed the delivery.
```
## 4. System Architecture

Reflex has three main layers:

```text
Retailer / Dispatcher / Rider
            |
            v
       Reflex Web App
      HTML / CSS / JS
            |
            v
         Supabase
            |
            v
      PostgreSQL Database
       users / deliveries
       ```
       ## 5. Data Access

The Reflex frontend communicates directly with Supabase using the Supabase JavaScript client.

The application uses database operations to:

1. Create delivery requests.
2. Retrieve open delivery requests.
3. Assign riders to deliveries.
4. Retrieve deliveries assigned to a rider.
5. Update delivery status.

### Delivery Creation

When the retailer submits the delivery form, JavaScript sends the delivery information to the `deliveries` table.

The initial state is:

```text
status = Created
rider_id = NULL
```
## 6. Architecture Trade-offs

The MVP was intentionally kept small so the team could deliver and demonstrate the core delivery workflow within the available time.

### Trade-off 1 — Vanilla JavaScript instead of a frontend framework

**Decision:**  
We used HTML, CSS, and vanilla JavaScript instead of React or another frontend framework.

**Why we accepted it:**  
The MVP has a small number of screens and simple interactions. A framework would add setup and complexity that was not necessary for the current scope.

**Cost:**  
As the application grows, maintaining UI state and larger amounts of frontend code could become harder.

**What we would change:**  
For a larger production application, we would evaluate a frontend framework such as React to improve component reuse and state management.

---

### Trade-off 2 — Direct frontend access to Supabase

**Decision:**  
The frontend communicates directly with Supabase rather than using a separate custom backend API.

**Why we accepted it:**  
Supabase provides the database and API functionality required by the MVP, allowing the team to focus on the delivery workflow instead of building and maintaining a separate backend service.

**Cost:**  
More application logic is exposed in the frontend, and a larger production system would need stronger backend controls and authorization.

**What we would change:**  
For production, we would introduce a dedicated backend or server-side layer for sensitive business logic, authorization, validation, and integrations.

---

### Trade-off 3 — Simple rider assignment

**Decision:**  
The dispatcher manually selects a rider from the available riders.

**Why we accepted it:**  
The case study requires assignment but does not require automatic rider matching. Manual assignment is simple and easy to demonstrate.

**Cost:**  
The system does not automatically consider rider location, workload, availability, or delivery distance.

**What we would change:**  
With more time and real operational data, we would introduce rider availability and workload tracking, then evaluate an assignment algorithm based on factors such as distance and current workload.