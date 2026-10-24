# Sanitized Implementation Examples

The TypeScript files in this directory are **illustrative portfolio examples**, not production Daubert source code.

Each example is intentionally simplified and rewritten to demonstrate a specific engineering pattern while omitting private implementation details such as:

- production route structure;
- complete database schemas and queries;
- internal identifiers;
- deployment configuration;
- environment-specific behavior;
- complete business logic;
- proprietary source organization.

## Included examples

### `authorization-policy.ts`

Demonstrates role-, ownership-, and lifecycle-aware permission decisions for staged and shared ledger records.

### `financial-calculations.ts`

Demonstrates explicit integer-cent handling for monetary calculations and derived financial values.

### `service-boundary.ts`

Demonstrates a simplified server-side workflow in which input validation, authorization, authoritative rate resolution, calculation, and persistence occur inside a trusted backend boundary.

### `csv-import-pipeline.ts`

Demonstrates review-candidate generation and the distinction between source-provided rates and server-resolved engagement rates.

These examples are intentionally incomplete by design and exist only to make selected engineering ideas inspectable without distributing the private application.