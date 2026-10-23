# Testing & Verification

The current private code snapshot behind this showcase contains **45 Node test cases across four TypeScript test files**, plus a separate backend-focused authorization/readiness harness.

The source tests themselves are private; this document describes the verification strategy.

## Unit-level coverage

### Financial derivations

Tests cover behaviors such as:

- due-date and aging calculations;
- ledger amount calculation;
- accrued and staged totals;
- retainer remaining and retainer percentage;
- authorized-budget utilization;
- safe-integer handling for monetary values.

### Ledger validation

Tests cover input invariants such as:

- note length and normalization;
- valid/invalid quantities;
- valid lifecycle mutation inputs.

### Authorization policies

Tests exercise role/state combinations such as:

- lead-expert edit permissions;
- collaborator ownership restrictions;
- attorney read-only behavior;
- staged-to-published transitions;
- withdrawal rules;

### CSV handling

Tests cover areas such as:

- common export-header detection;
- generic mapping behavior;
- parsing;
- snapshot-based rate resolution;
- mismatch/error handling.

## Integration / readiness verification

A shell-based readiness harness targets the backend directly so frontend UI behavior cannot create a false security pass.

The harness includes checks for:

1. unauthenticated request rejection;
2. cross-engagement isolation;
3. staged-row isolation;
4. direct-ID mutation attempts;
5. financial-summary consistency across allowed roles;
6. CSV preview authorization;
7. CSV publication authorization and server-authoritative fields;
8. ledger create/edit/publish permissions;
9. proof that same-organization membership alone does not grant engagement access;
10. separation between platform-administrator status and matter participation.

## Why test the backend directly?

A hidden button is not an authorization control.

Testing the HTTP/service boundary directly verifies that a caller cannot bypass the UI and perform an operation the backend should reject.

## Public-repo policy

This showcase intentionally does not include:

- test credentials;
- private environment files;
- disposable test-account identifiers;
- internal engagement IDs;
- exact production endpoints;
- the complete readiness scripts.

The goal is to demonstrate engineering rigor without distributing a map of our private system.