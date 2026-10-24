# Authorization Model

## Core principle

**Organization membership is not engagement access.**

A user may belong to the same organization as another participant without having access to the same legal matter. Engagement access depends on explicit engagement participation rather than broad organizational membership.

This distinction reduces the risk of a multi-tenant authorization error in which firm membership unintentionally exposes unrelated matters.

## Engagement roles

The current engagement model distinguishes three participant roles:

- **Lead expert** — can review all staged expert-side work and controls publication of staged entries.
- **Collaborator** — can contribute expert-side work, with narrower visibility and mutation permissions.
- **Attorney** — participates on the counsel side and receives access to the shared/non-staged ledger without expert-side staging privileges.

Platform administration is handled separately. Administrative status does not automatically make an administrator a participant in a matter.

## Permission matrix

| Capability                            | Lead expert | Collaborator | Attorney |
| ------------------------------------- | :---------: | :----------: | :------: |
| View shared/non-staged ledger records |     Yes     |     Yes      |   Yes    |
| View staged records                   |     All     |   Own only   |    No    |
| Create expert-side ledger records     |     Yes     |     Yes      |    No    |
| Edit eligible accrued records         |     Yes     |   Own only   |    No    |
| Publish staged records                |     Yes     |      No      |    No    |
| Withdraw eligible expert-side records |     Yes     |   Own only   |    No    |
| Import / preview CSV                  |     Yes     |     Yes      |    No    |

## Enforcement layers

Authorization is enforced across multiple layers rather than relying on a single UI or middleware check.

### 1. Authenticated identity

The backend derives identity from verified authentication claims rather than trusting a user identifier supplied in the request body.

### 2. Explicit engagement participation

Backend access checks verify that the authenticated user is a participant in the requested engagement.

### 3. Query-level filtering

Sensitive staged records are filtered at the data-access layer so unauthorized rows are not fetched and then merely hidden in the interface.

### 4. Domain policy

Role, ownership, lifecycle state, and transition rules are expressed in testable domain-policy functions.

### 5. Database protection

Database constraints and restrictive access policies provide additional defense in depth around application invariants and data access.

## Threats addressed by the model

The authorization design is intended to protect against scenarios such as:

- requesting another engagement by guessing or obtaining its identifier;
- directly targeting a ledger-entry identifier outside the caller's authorized scope;
- treating same-organization membership as automatic matter access;
- relying on hidden frontend controls as the only permission check;
- broadening access accidentally when data-access queries are refactored;
- assuming platform-administrator status is equivalent to engagement participation.

These boundaries are exercised by the private backend readiness harness described in [Testing & Verification](TESTING.md).