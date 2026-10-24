# Selected Engineering Decisions

## 1. Organization membership does not imply matter access

**Problem:** A law-firm user may belong to an organization without being assigned to every confidential engagement handled by that firm.

**Decision:** Model organization membership and engagement participation separately.

**Result:** Matter access can be granted explicitly and tested independently from firm membership.

---

## 2. Use integer cents for money

**Problem:** Floating-point arithmetic is a poor canonical representation for currency.

**Decision:** Parse dollar inputs at the boundary and carry monetary values internally as integer cents.

**Result:** Financial calculations have an explicit, testable representation and can be checked for safe-integer overflow.

---

### 3. Snapshot rates at engagement creation

**Problem:** An expert's standing rate can change while an older engagement is still active.

**Decision:** Copy the applicable standing schedule into an engagement-specific snapshot.

**Result:** Existing matters continue to use the terms that were captured for that engagement instead of silently drifting when standing rates change.

---

## 4. Make imported rates non-authoritative

**Problem:** A CSV export can contain stale, malformed, or unexpected rate values.

**Decision:** Treat imported rates as source metadata and resolve authoritative rates from the engagement snapshot.

**Result:** External data can assist matching and review without overriding the platform's contractual/engagement terms.

---

## 5. Put privileged writes behind the backend

**Problem:** Business rules become difficult to audit when multiple clients can write directly to core tables.

**Decision:** Rout application writes through the Express service layer.

**Result:** Validation, authorization, calculations, transactions, and persistence can be enforced consistently.

---

## 6. Enforce authorization before UI

**Problem:** Frontend-only access control is bypassable.

**Decision:** Treat the backend/query layer as the security boundary and the UI as a convenience layer.

**Result:** Direct HTTP requests and known identifiers still pass through matter-level authorization.

---

## 7. Preserve ledger history

**Problem:** Hard deletion can erase the context needed to explain prior financial state.

**Decision:** Prevent normal ledger deletion and use explicit lifecycle transitions such as withdrawal, with separate update history.

**Result:** The record remains explainable without pretending that every field is forever immutable.