# CSV Import Pipeline

The CSV workflow is built as a **review-first ingestion pipeline**, not a direct bulk insert.

## Pipeline

```mermaid
flowchart LR
    U[Upload CSV] --> A[Authorize engagement access]
    A --> P[Parse file]
    P --> D[Detect known source shape]
    D --> M[Resolve / suggest column mapping]
    M --> N[Normalize values]
    N --> R[Resolve activity against frozen rate snapshot]
    R --> V[Validate each candidate]
    V --> H[Human review]
    H --> C{Ready?}
    C -->|Correct / discard| H
    C -->|Publish| T[Transactional write]
```

## Why authorize before parsing?

Uploaded files consume CPU and memory. The backend verifies the caller's engagement access before doing the more expensive parsing work.

## Source detection and mapping

The current workflow recognizes common exported time-entry shapes and can fall back to a generic CSV path.

The importer separates:

- column mapping;
- parsing;
- normalization;
- business validation;
- rate resolution.

That makes it possible to support additional source formats without making the ledger itself dependent on a vendor-specific schema.

## Candidate rows

Previewing a file produces review candidates rather than immediately writing ledger records.

A candidate can include:

- normalized work data;
- normalized activity;
- quantity;
- source-provided rate;
- server-resolved rate;
- calculated amount;
- warnings;
- validation errors;
- original source values.

## Server-authoritative rate resolution

A source-provided rate is never blindly copied into the authoritative applied-rate field.

Instead:

1. the activity is mapped to the engagement's rate snapshot;
2. the server resolves the applicable snapshot rate;
3. the amount is derived from that rate;
4. a mismatch with the imported rate can be surfaced as a warning.

## Human review

The UI allows the reviewer to correct or discard problematic rows before publication. Invalid rows must be resolved before the reviewed set is committed.

This keeps import convenience from bypassing business rules.