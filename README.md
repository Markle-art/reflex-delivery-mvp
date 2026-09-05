# Reflex Delivery MVP

## 🚚 Simple Delivery Coordination for Kenyan Retailers

Reflex Delivery is a lightweight delivery coordination platform designed for small and growing retailers in Kenya who currently manage deliveries through WhatsApp messages, phone calls, spreadsheets, and manual follow-ups.

The platform creates a shared delivery workflow between **Retailers, Dispatchers, and Riders**, giving each role a clear view of what they need to do.

> **Created → Assigned → Picked Up → Delivered**

**Live Demo:** https://reflex-delivery-mvp.vercel.app/

---

## Table of Contents

1. [Overview](#overview)
2. [The Problem](#the-problem)
3. [Our Solution](#our-solution)
4. [Who Is Reflex For?](#who-is-reflex-for)
5. [How It Works](#how-it-works)
6. [Core Features](#core-features)
7. [Delivery Workflow](#delivery-workflow)
8. [User Roles](#user-roles)
9. [System Architecture](#system-architecture)
10. [Technology Stack](#technology-stack)
11. [Database Model](#database-model)
12. [Application Structure](#application-structure)
13. [User Experience](#user-experience)
14. [Demo Walkthrough](#demo-walkthrough)
15. [MVP Scope](#mvp-scope)
16. [Design Decisions](#design-decisions)
17. [Security Considerations](#security-considerations)
18. [Testing and QA](#testing-and-qa)
19. [Known Limitations](#known-limitations)
20. [Future Roadmap](#future-roadmap)
21. [Business Value](#business-value)
22. [Why Reflex Matters](#why-reflex-matters)
23. [Local Development](#local-development)
24. [Deployment](#deployment)
25. [Project Documentation](#project-documentation)
26. [Team](#team)
27. [Final Takeaway](#final-takeaway)

---

## Overview

Small retailers often coordinate deliveries through a mixture of WhatsApp messages, phone calls, notebooks, spreadsheets, and verbal instructions.

As the number of deliveries increases, this approach becomes difficult to manage.

A retailer may know that an order needs to be delivered, while the dispatcher is trying to find a rider and the rider is receiving information through a completely different communication channel.

Reflex provides one shared workflow for coordinating the delivery process.

Instead of relying on scattered communication, the delivery request moves through a simple digital lifecycle:

    Retailer
        |
        v
    Create Delivery
        |
        v
    Created
        |
        v
    Dispatcher Assigns Rider
        |
        v
    Assigned
        |
        v
    Rider Picks Up
        |
        v
    Picked Up
        |
        v
    Rider Delivers
        |
        v
    Delivered

The MVP focuses on one core objective:

**Make delivery coordination visible, simple, and structured for small retail operations.**

---

## The Problem

Many small and growing retailers do not have dedicated delivery-management systems.

Delivery coordination can depend on:

- WhatsApp conversations
- Phone calls
- Spreadsheets
- Paper records
- Verbal instructions
- Manual follow-ups

This creates several problems.

### 1. Poor Visibility

Different people may have different information about the same delivery.

A retailer may know an order was created while a dispatcher is unaware of it.

### 2. Manual Communication

Every update can require another message or phone call.

This increases the amount of work required to coordinate deliveries.

### 3. Status Ambiguity

Without a shared workflow, it can be difficult to know whether an order is:

- Waiting for assignment
- Assigned to a rider
- Picked up
- Delivered

### 4. Rider Coordination

Dispatchers need a simple way to see open delivery requests and assign them to specific riders.

### 5. Lack of a Shared Source of Truth

When information is spread across multiple conversations and documents, there is no single place where the current delivery status can be checked.

---

## Our Solution

Reflex converts the delivery process into a simple shared workflow.

The platform connects three operational roles:

**Retailer → Dispatcher → Rider**

The retailer creates the delivery request.

The dispatcher reviews open requests and assigns a rider.

The rider sees their assigned deliveries and updates the delivery status as the order moves through the process.

This creates a single delivery record that follows the order from creation to completion.

### The core idea

Instead of asking:

> "Who has this delivery?"

The team can check the system and see:

- What deliveries exist
- Which deliveries are waiting for assignment
- Which rider is assigned
- Which deliveries have been picked up
- Which deliveries have been delivered

---

## Who Is Reflex For?

Reflex is designed primarily for **small and growing retailers in Kenya** that need a simple way to coordinate deliveries without adopting a large logistics management platform.

The MVP focuses on three operational personas.

### Retailer

The retailer creates delivery requests and provides the information required to complete the delivery.

### Dispatcher

The dispatcher coordinates open delivery requests and assigns specific riders.

### Rider

The rider views assigned deliveries and updates their status as they complete each delivery.

---

## How It Works

The system follows a simple role-based workflow.

### Step 1 — Retailer Creates a Delivery

The retailer enters:

- Customer name
- Customer phone number
- Delivery address
- Item description

The delivery is stored with a status of:

**Created**

At this stage, no rider is assigned.

### Step 2 — Dispatcher Reviews Deliveries

The dispatcher can view delivery requests that require coordination.

The dispatcher selects a rider for the delivery.

The delivery becomes:

**Assigned**

### Step 3 — Rider Picks Up the Delivery

The assigned rider views their delivery and updates the status after collecting the item.

The delivery becomes:

**Picked Up**

### Step 4 — Rider Completes the Delivery

After delivering the item, the rider updates the delivery status.

The delivery becomes:

**Delivered**

### Complete Flow

    Retailer
       |
       v
    Create Request
       |
       v
    Created
       |
       v
    Dispatcher
       |
       v
    Assign Rider
       |
       v
    Assigned
       |
       v
    Rider
       |
       v
    Pick Up
       |
       v
    Picked Up
       |
       v
    Deliver
       |
       v
    Delivered

---

## Core Features

### Delivery Creation

Retailers can create delivery requests containing the essential information required to coordinate a delivery.

### Delivery Assignment

Dispatchers can assign a specific rider to an open delivery.

### Rider Delivery View

Riders can see deliveries assigned to them.

### Status Updates

The delivery status can move through the defined workflow:

    Created → Assigned → Picked Up → Delivered

### Persistent Delivery Records

Delivery information is stored in Supabase rather than existing only in the browser interface.

### Role-Based Workflow

The interface is designed around the responsibilities of:

- Retailers
- Dispatchers
- Riders

### Simple Operational Dashboard

The MVP prioritizes clarity over a large number of features.

The goal is to let each user quickly understand what needs to happen next.

---

## Delivery Workflow

Every delivery follows the same basic lifecycle.

### Created

The retailer has submitted the delivery request.

At this point:

- The delivery exists in the database.
- No rider is assigned.
- The status is `Created`.

### Assigned

A dispatcher has selected a rider.

At this point:

- The delivery has a rider.
- The status is `Assigned`.
- The delivery record is updated.

### Picked Up

The rider has collected the delivery.

At this point:

- The status is `Picked Up`.
- The same delivery record is updated.

### Delivered

The rider has completed the delivery.

At this point:

- The status is `Delivered`.
- The delivery record remains in the database.
- The update timestamp changes.

### State Model

    Created
       |
       v
    Assigned
       |
       v
    Picked Up
       |
       v
    Delivered

The MVP intentionally uses a straightforward linear workflow rather than introducing complex logistics states.

---

## User Roles

### Retailer

The retailer is responsible for creating delivery requests.

#### Main responsibilities

- Create a delivery
- Enter customer information
- Enter delivery information
- Monitor the delivery status

#### Information captured

- Customer name
- Customer phone
- Address
- Item description

---

### Dispatcher

The dispatcher is responsible for coordinating deliveries.

#### Main responsibilities

- View delivery requests
- Identify deliveries that need assignment
- Select a rider
- Assign the rider to a delivery

---

### Rider

The rider is responsible for completing assigned deliveries.

#### Main responsibilities

- View assigned deliveries
- Pick up the delivery
- Update the delivery to `Picked Up`
- Complete the delivery
- Update the delivery to `Delivered`

---

## System Architecture

Reflex uses a simple frontend-first architecture suitable for an MVP.

    ┌──────────────────────────┐
    │        User Browser      │
    │                          │
    │  HTML + CSS + JavaScript │
    └────────────┬─────────────┘
                 |
                 | Supabase JS Client
                 v
    ┌──────────────────────────┐
    │         Supabase         │
    │                          │
    │  Database                │
    │  users                   │
    │  deliveries              │
    └──────────────────────────┘

### Frontend

The application is built with standard:

- HTML
- CSS
- JavaScript

The frontend provides the interfaces used by the three operational roles.

### Backend Services

The MVP uses Supabase for data storage and database access.

The frontend communicates with Supabase through the Supabase JavaScript client.

### Database

Supabase stores:

- User records
- Delivery records
- Delivery status
- Rider assignments
- Creation and update timestamps

---

## Technology Stack

### Frontend

- HTML
- CSS
- JavaScript

### Database and Backend Services

- Supabase
- Supabase JavaScript client

### Development Environment

- Git
- GitHub
- GitHub Codespaces
- Python HTTP Server

### Deployment

- Vercel

The project intentionally avoids a large framework stack because the MVP is relatively small and the primary goal is to demonstrate the delivery workflow.

---

## Database Model

The MVP uses two main tables:

- `users`
- `deliveries`

### Users Table

The `users` table stores the people using the delivery platform.

Key fields:

- `id`
- `name`
- `role`

Supported roles include:

- `retailer`
- `dispatcher`
- `rider`

### Deliveries Table

The `deliveries` table stores the delivery request and its current state.

Key fields:

- `id`
- `customer_name`
- `customer_phone`
- `address`
- `item_description`
- `retailer_id`
- `rider_id`
- `status`
- `created_at`
- `updated_at`

### Delivery Relationships

A delivery is associated with the retailer who created it and, when assigned, the rider responsible for it.

When a delivery is first created:

    rider_id = NULL
    status = Created

When a dispatcher assigns a rider:

    rider_id = selected rider
    status = Assigned

The same delivery record continues through the rest of the workflow.

---

## Application Structure

The repository is organized around a lightweight static web application.

    reflex-delivery-mvp/
    │
    ├── public/
    │   └── Frontend application
    │
    ├── ARCHITECTURE.md
    ├── UX_REVIEW.md
    ├── qa-test-results.md
    ├── reflex-delivery-checklist.md
    ├── README.md
    └── .gitignore

### `public/`

Contains the main frontend application.

### `ARCHITECTURE.md`

Documents the system architecture and technical design decisions.

### `UX_REVIEW.md`

Contains the user experience review and observations from testing the application across the different roles.

### `qa-test-results.md`

Contains the quality-assurance test results for the core delivery workflow.

### `reflex-delivery-checklist.md`

Contains the project delivery checklist.

---

## User Experience

The MVP was designed around operational simplicity.

Each role should be able to understand:

1. What they are responsible for
2. Which deliveries they need to work on
3. What the current status is
4. What action should happen next

### UX Principles

#### Keep the workflow visible

The delivery status communicates where the order currently is.

#### Keep actions simple

The interface focuses on the actions required to move a delivery forward.

#### Avoid unnecessary complexity

The MVP does not attempt to become a complete logistics-management suite.

#### Separate responsibilities

Retailers, dispatchers, and riders have different responsibilities, so the workflow reflects those differences.

### UX Review Findings

Testing across the three roles found that:

- The workflow was understandable.
- Screens and actions were generally clear.
- Buttons and labels communicated their purpose.
- Status changes were understandable.

The main UX issue identified was completed deliveries.

A delivery can disappear from the active dashboard after being marked `Delivered`, making completed deliveries difficult to find if there is no dedicated history view.

---

## Demo Walkthrough

The live application is available at:

https://reflex-delivery-mvp.vercel.app/

A basic demonstration follows the complete delivery lifecycle.

### 1. Retailer

Start as a retailer.

Create a delivery by entering:

- Customer name
- Customer phone
- Address
- Item description

Submit the delivery.

The delivery should enter the workflow as:

**Created**

### 2. Dispatcher

Switch to the dispatcher workflow.

Find the newly created delivery.

Select a rider and assign the delivery.

The status becomes:

**Assigned**

### 3. Rider

Switch to the rider workflow.

The assigned delivery should be visible to the selected rider.

The rider updates the delivery after pickup.

The status becomes:

**Picked Up**

### 4. Complete Delivery

The rider completes the delivery and updates the status.

The status becomes:

**Delivered**

### Result

The complete lifecycle demonstrates the core purpose of Reflex:

    Create
       ↓
    Assign
       ↓
    Pick Up
       ↓
    Deliver

---

## MVP Scope

The MVP intentionally focuses on the core coordination problem.

### Included

- Delivery creation
- Customer information capture
- Delivery address capture
- Item description
- Rider assignment
- Rider delivery view
- Delivery status updates
- Supabase persistence
- Three operational roles
- Basic delivery lifecycle
- Deployed web application

### Not Included

The MVP does not currently attempt to provide:

- GPS tracking
- Automatic rider matching
- Route optimization
- Customer SMS notifications
- Customer-facing tracking
- Payment processing
- Advanced analytics
- Proof-of-delivery media
- Fleet management
- Automated dispatch optimization

These features can be considered for later versions if validated by users.

---

## Design Decisions

### 1. Vanilla JavaScript Instead of a Frontend Framework

The MVP uses standard HTML, CSS, and JavaScript.

This keeps the application lightweight and reduces unnecessary complexity for a small prototype.

For a larger production application, a framework such as React could be evaluated if the application grows significantly.

### 2. Supabase Instead of a Custom Backend

Supabase provides the database and API capabilities needed by the MVP without requiring a separate custom backend service.

This allows the project to remain small while still providing persistent data.

For a production system, server-side logic may be introduced for stronger authorization, validation, integrations, and sensitive operations.

### 3. Manual Rider Assignment

The dispatcher manually selects the rider.

The MVP does not automatically calculate the best rider based on:

- Distance
- Location
- Workload
- Availability
- Delivery priority

Manual assignment was chosen because it directly addresses the basic coordination problem without introducing unnecessary optimization complexity.

### 4. One Delivery Record

The system updates one delivery record as the delivery progresses.

It does not create a new record for every stage.

This makes the delivery lifecycle straightforward to understand and maintain.

---

## Security Considerations

The MVP is a prototype and should not be treated as a fully hardened production logistics system.

A production version should strengthen several areas.

### Authentication

Production users should have secure authentication rather than relying only on client-side role selection or identification.

### Authorization

Database access should ensure that users can only perform actions appropriate to their role.

For example:

- Retailers should manage their own delivery requests.
- Dispatchers should have appropriate assignment permissions.
- Riders should only access deliveries assigned to them.

### Supabase Row Level Security

Supabase Row Level Security should be properly configured and tested before production use.

### Input Validation

Production deployments should validate:

- Customer names
- Phone numbers
- Addresses
- Item descriptions
- User identifiers
- Delivery status transitions

Validation should exist both on the client and, where appropriate, on trusted server-side boundaries.

### Sensitive Information

Customer information should be handled carefully.

Production systems should consider:

- Data minimization
- Access control
- Secure authentication
- Secure database policies
- Appropriate data retention

---

## Testing and QA

The core delivery workflow was tested with Supabase persistence.

### Test Objective

Verify that the core delivery workflow works correctly and that delivery updates persist in the database.

### Core Test Cases

#### TC01 — Create Delivery

**Result:** PASS

A delivery was successfully created and stored in the `deliveries` table.

#### TC02 — Assign Rider

**Database Result:** PASS

The assigned rider was persisted.

The delivery status changed to:

**Assigned**

The `updated_at` field was also updated.

**UI Observation:**

The delivery disappeared from the dispatcher view after assignment even though the database record remained.

This requires further developer review and retesting.

#### TC03 — Picked Up

**Database Result:** PASS

The delivery remained in the database with:

**Picked Up**

The pickup workflow should continue to be retested after UI changes.

#### TC04 — Delivered

**Database Result:** PASS

The delivery remained in the database with:

**Delivered**

The `updated_at` value was updated.

**UI Observation:**

The completed delivery disappeared from the active dashboard.

This indicates that the current dashboard behavior needs a clearer completed-delivery or history experience.

### QA Conclusion

The underlying delivery persistence works across the core workflow.

The primary remaining concern is how completed and assigned deliveries are displayed in the active dashboard.

### Recommended Retest

After UI changes:

1. Create a delivery.
2. Assign a rider.
3. Refresh the dispatcher view.
4. Confirm the assigned delivery remains accessible.
5. Pick up the delivery.
6. Refresh.
7. Confirm the status remains `Picked Up`.
8. Deliver the order.
9. Refresh.
10. Confirm the completed delivery remains accessible through an appropriate completed/history view.

---

## Known Limitations

### No Dedicated Delivery History

Completed deliveries may disappear from the active dashboard.

A dedicated history or completed-deliveries section would improve usability.

### Manual Rider Assignment

The dispatcher must choose the rider manually.

There is no automated matching system.

### No Route Optimization

The platform does not calculate delivery routes or recommend efficient delivery sequences.

### No GPS Tracking

The MVP does not track riders using GPS.

### No Customer Notifications

The MVP does not currently send automated SMS, WhatsApp, email, or push notifications to customers.

### Limited Production Security

The MVP architecture is optimized for prototyping and demonstration.

Production deployment would require stronger authentication, authorization, validation, database policies, and server-side controls.

### No Advanced Analytics

The MVP does not currently provide operational dashboards for:

- Delivery completion rates
- Average delivery time
- Rider performance
- Delivery volume
- Failed deliveries

---

## Future Roadmap

Future versions can expand Reflex based on actual retailer and rider needs.

### Phase 1 — Workflow Improvements

- Add completed-delivery history
- Improve dashboard filtering
- Improve action feedback
- Improve status visibility
- Add clearer delivery timestamps

### Phase 2 — Notifications

- Customer SMS notifications
- Rider notifications
- Delivery status notifications
- WhatsApp integration

### Phase 3 — Smarter Dispatch

- Rider availability
- Rider workload
- Location-aware assignment
- Distance-based recommendations
- Delivery prioritization

### Phase 4 — Delivery Intelligence

- Delivery performance analytics
- Completion rates
- Average delivery times
- Rider performance
- Operational reports

### Phase 5 — Production Platform

- Secure authentication
- Strong role-based authorization
- Row Level Security
- Server-side validation
- Audit logging
- Production monitoring
- Scalable backend services

---

## Business Value

Reflex focuses on a simple business problem:

**Reducing the operational friction involved in coordinating deliveries.**

For a small retailer, the value is not necessarily in having a complicated logistics platform.

The value comes from knowing:

- What needs to be delivered
- Who is responsible for it
- What stage the delivery is in
- What needs to happen next

### Retailer Value

- Faster delivery request creation
- Better visibility
- Less reliance on scattered messages
- Clearer delivery status

### Dispatcher Value

- Centralized delivery requests
- Easier rider assignment
- Better visibility of delivery progress

### Rider Value

- Clear list of assigned deliveries
- Clear delivery information
- Simple status updates

### Operational Value

The system creates a shared source of truth for the delivery workflow.

Instead of repeatedly asking for updates, the team can use the delivery record as the reference point.

---

## Why Reflex Matters

Delivery coordination becomes harder as a retailer grows.

A business may start with a few deliveries managed through WhatsApp and phone calls.

As order volume increases, those methods can become difficult to scale.

Reflex addresses the transition from:

    Informal Coordination
            |
            v
    WhatsApp + Calls + Spreadsheets
            |
            v
    Fragmented Information
            |
            v
    Reflex
            |
            v
    Shared Delivery Workflow

The MVP does not try to solve every logistics problem.

It focuses on creating a clear foundation that can later support more advanced capabilities.

---

## Local Development

### Requirements

You need:

- Git
- A GitHub account
- GitHub Codespaces or a local development environment
- A modern web browser
- A configured Supabase project

### Clone the Repository

    git clone https://github.com/Markle-art/reflex-delivery-mvp.git

### Enter the Project

    cd reflex-delivery-mvp

### Serve the Public Directory

The application is a static frontend contained in the `public` directory.

From the project root, serve the directory with Python:

    cd public
    python3 -m http.server 8000

The application can then be opened through the local development server.

### GitHub Codespaces

The project can also be developed through GitHub Codespaces.

A typical workflow is:

    git clone https://github.com/Markle-art/reflex-delivery-mvp.git
    cd reflex-delivery-mvp
    cd public
    python3 -m http.server 8000

Then open the forwarded port provided by Codespaces.

---

## Deployment

The application is deployed as a web application through Vercel.

### Production Demo

https://reflex-delivery-mvp.vercel.app/

### Deployment Concept

The deployment consists of:

    GitHub Repository
            |
            v
        Vercel
            |
            v
      Public Web App
            |
            v
         Supabase

The frontend is deployed through Vercel while Supabase provides the persistent database service.

### Production Checklist

Before using the platform for real customer data, production hardening should include:

- Secure authentication
- Proper authorization
- Supabase Row Level Security
- Input validation
- Secure environment configuration
- Error handling
- Database backups
- Monitoring
- Audit logging
- Privacy and data-protection review

---

## Project Documentation

The repository contains additional project documentation.

### Architecture

`ARCHITECTURE.md`

Documents the technical architecture, data flow, and key design tradeoffs.

### UX Review

`UX_REVIEW.md`

Documents the user experience evaluation across the different personas and highlights improvements such as completed-delivery history.

### QA Results

`qa-test-results.md`

Documents testing of the delivery workflow and database persistence.

### Project Checklist

`reflex-delivery-checklist.md`

Contains the project delivery checklist and implementation requirements.

---

## Team

### Mark Kamaamia — Technical Lead

Responsible for the technical architecture, project setup, database integration, role logic, frontend implementation, and technical integration.

### Mark Ochieng — Product Lead

Responsible for product requirements, personas, user stories, scope definition, and acceptance criteria.

### Grace Murigi — Customer Experience Lead

Responsible for user flows, dashboards, navigation, forms, and overall usability.

### Loureen Shillah — QA & Testing Lead

Responsible for the test plan and test cases, functional and edge-case testing, bug identification, and QA evidence.

### Maureen Naranoi — Project & Delivery Lead

Responsible for team coordination, GitHub board and issues, milestones, documentation, and final project delivery.

---

## Final Takeaway

Reflex Delivery MVP is a focused delivery coordination platform for small and growing Kenyan retailers.

Its core purpose is simple:

**Turn fragmented delivery communication into one shared workflow.**

The MVP connects:

    Retailer
       ↓
    Dispatcher
       ↓
    Rider

And moves every delivery through:

    Created
       ↓
    Assigned
       ↓
    Picked Up
       ↓
    Delivered

Rather than attempting to build a complete logistics platform from the beginning, Reflex starts with the operational problem that matters most: **giving retailers, dispatchers, and riders a shared view of the delivery process.**

The current MVP demonstrates the foundation required to build on that workflow.

Future versions can add authentication, notifications, smarter dispatching, tracking, analytics, and other capabilities as the product is validated with real users.

**Reflex starts simple, solves a real coordination problem, and provides a foundation for a more scalable retail delivery system.**
