# Authorization Model

## Core principle

**Organization membership is not engagement access.**

A user may belong to the same organization as another participant and still have no right to view a matter. Access is based on explicit engagement participation.

This prevents a common multi-tenant failure mode where broad organization membership accidentally becomers a substitute for matter-level authorization.

## Roles

The current engagement model distinguishes three participant roles:

- **lead expert** - controls expert-side publication and can review the engagement's staged expert work.
- **Collaborator** - can contribute expert-side work but receives narrower visibility and mutation permissions.
- **Attorney** - participates on the counsel side an receives the shared, published financial view without expert-side staging privileges.

A separate platform-administrator path exists for internal administrator. Admistrative status does not implicitly make someone a participant in a matter.

## Example permission matrix

| Capability                            | Lead expert | Collaborator | Attorney |
| ------------------------------------- | :---------: | :----------: | :------: |
| View shared/non-staged ledger records |     Yes     |     Yes      |   Yes    |
| View staged records                   |     All     |   Own only   |    No    |
| Create expert-side ledger record      |     Yes     |     Yes      |    No    |
| Edit eligible accrued record          |     Yes     |   Own only   |    No    |
| Publish staged record                 |     Yes     |      No      |    No    |
| Import / preview CSV                  |     Yes     |     Yes      |    No    |

## Enforcement layers

Authorization is intentionally not implemented in only one place.

### 1. Authenticated identity

The backend derives the user identity from verified authentication claims rather than accepting a user ID from the request body.

### 2. Engagement participation

Queries verify that the authenticated user is an explicit participant in the engagement.

### 3. Query-level filtering

Sensitive staged records are filtered in the database query so unauthorized rows are not fetched and then merely hidden in the UI.

### 4. Domain policy

A small policy layer describes role/state transitions in the code. This provides a second check and keeps authorization rules testable independently from SQL.

### 5. Database protection

Restrictive database access rules and constraints provide additional defense in depth.

## Why this matters.

Legal matters can contain sensitive financial and case information. A secure design needs to protect against:

- guessing another engagement ID;
- directly requesting a known ledger-record ID;
- assuming same-firm membership grants matter access;
- relying on hidden frontend controls as security;
- accidental permission broadening during future query refactors.

The private test harness includes cases specifically aimed at these boundaries.