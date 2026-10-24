# Testing & Verification

The private code snapshot represented by this showcase contains **45 Node test cases across four TypeScript test files**, together with a separate backend-focused authorization/readiness harness.

The production tests and environment-specific fixtures remain private; this document describes the verification strategy and covered boundaries.

## Test inventory

| Test area                    | Test cases |
| ---------------------------- | ---------: |
| Financial and derived values |         24 |
| Ledger authorization policy  |         11 |
| CSV import behavior          |          5 |
| Ledger input validation      |          5 |
| **Total**                    |     **45** |

## Financial and derived-value tests

The financial test suite covers behaviors including:

- invoice due-date calculation;
- aging calculations;
- ledger-entry amount calculation;
- accrued and staged totals;
- retainer remaining;
- retainer percentage;
- authorized-budget utilization;
- safe-integer handling for monetary values.

## Ledger validation tests

Input-validation coverage includes rules such as:

- note length and normalization;
- positive/valid quantities;
- supported ledger mutation inputs.

## Authorization-policy tests

Policy tests exercise combinations of:

- lead-expert permissions;
- collaborator ownership restrictions;
- attorney read-only behavior;
- staged-to-accrued publication;
- withdrawal transitions.

## CSV import tests

CSV-related tests cover areas including:

- known export-header detection;
- generic mapping behavior;
- parsing and normalization;
- snapshot-based rate resolution;
- mismatch and validation behavior.

## Backend readiness harness

A separate shell-based readiness harness targets backend boundaries directly rather than relying on frontend visibility.

The harness includes scenarios for:

1. unauthenticated request rejection;
2. cross-engagement isolation;
3. staged-row isolation;
4. direct-ID mutation attempts;
5. financial-summary consistency across authorized roles;
6. CSV preview authorization;
7. CSV publication authorization and server-authoritative fields;
8. ledger create/edit/publish permissions;
9. same-organization membership without matter participation;
10. separation between platform-administrator status and engagement participation.

## Why verify the backend directly?

A hidden interface control is not an authorization boundary.

Direct verification of the HTTP/service boundary tests whether a caller can bypass the UI and perform an operation the backend should reject.

## Public-repository boundary

The public showcase excludes:

- test credentials;
- environment files;
- disposable test-account identifiers;
- internal engagement identifiers;
- environment-specific endpoint configuration;
- the complete readiness scripts and setup topology.

This preserves the testing strategy as portfolio evidence without publishing the private system's operational test environment.