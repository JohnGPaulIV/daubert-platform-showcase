# Selected Engineering Decisions

This document summarizes several design decisions that materially shaped the current Daubert implementation.

## 1. Separate organization membership from matter access

**Problem:** A law-firm user may belong to an organization without being assigned to every confidential engagement handled by that firm.

**Decision:** Model organization membership and engagement participation separately.

**Result:** Matter access is granted explicitly and can be verified independently from firm membership.

---

## 2. Represent money as integer cents

**Problem:** Binary floating-point arithmetic is a poor canonical representation for currency.

**Decision:** Parse dollar inputs at the application boundary and carry monetary values through the backend as integer cents.

**Result:** Monetary calculations use an explicit, testable representation and can be checked against safe-integer limits.

---

## 3. Snapshot rates when an engagement is created

**Problem:** An expert's standing rates can change while an older engagement remains active.

**Decision:** Preserve the applicable rate schedule as an engagement-specific snapshot.

**Result:** Existing matters continue to use the rates captured for that engagement instead of silently changing when standing rates are updated.

---

## 4. Treat imported rates as non-authoritative

**Problem:** A CSV export may contain stale, malformed, or unexpected rate values.

**Decision:** Use imported rates as source metadata while resolving authoritative applied rates from the engagement snapshot.

**Result:** External data can assist matching and review without overriding the engagement's captured terms.

---

## 5. Route privileged writes through the backend

**Problem:** Business invariants are harder to enforce when multiple clients can write directly to core application tables.

**Decision:** Route privileged application writes through the Express service layer.

**Result:** Validation, authorization, calculations, transactions, and persistence rules are enforced through a consistent server boundary.

---

## 6. Treat the backend as the authorization boundary

**Problem:** Frontend-only access control can be bypassed through direct requests.

**Decision:** Enforce matter-level authorization in backend policies and data-access paths, with the interface reflecting those decisions rather than defining them.

**Result:** Known identifiers and direct HTTP requests still pass through engagement-level authorization.

---

## 7. Preserve ledger history through lifecycle state

**Problem:** Hard deletion can remove context needed to explain prior financial activity.

**Decision:** Use explicit ledger lifecycle transitions, including withdrawal, while maintaining separate update history.

**Result:** The system can represent reversals and changes without relying on deletion as the normal mechanism for rewriting history.