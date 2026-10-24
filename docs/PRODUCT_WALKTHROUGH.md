# Product Walkthrough

This walkthrough is intended to accompnay the public screenshots.

## 1. Exper workspace

The dashboard gives the authenticated user a concise view of their current engagements. Expert-side users also receive actions for creating a matter and managing reusable standing rates.

**Screenshot:** `assets/screenshots/01-dashboard.png`

## 2. Create an engagement

An expert creates a matter with case information and finacial terms such as payment terms, retainer, authorized budget, testimony information, and late-interest settings.

The expert's standing rate schedule is copied into an engagement-specific snapshot.

**Screenshot:** `assets/screenshots/02-create-engagement.png`

## 3. Engagement overview

The engagement workspace combines matter information with derived financial context.

High-level metrics include:

- accrued compensation;
- retainer remaining;
- authorized budget utilization.

**Screenshot:** `assets/screenshots/03-engagement-overview.png`

## 4. Billing and compensation ledger

The billing view shows the frozen rate schedule and the compensation ledger for the engagement.

Expert-side participants can add eligible work. Counsel receives the shared published view without expert-side staging controls.

**Screenshot:** `assets/screenshots/04-billing-ledger.png`

## 5. Review-first CSV import

Time-entry CSV files are parsed into review candidates before publication.

The review interface can show:

- rows ready to publish;
- warnings such as a source-rate mismatch;
- validation errors requiring correction;
- discarded rows.

**Screenshot:** `assets/screenshots/05-csv-review.png`

## 6. Standing rate schedule

Experts can maintain reusable rates for activities such as analysis, report drafting, deposition work, testimony, travel, or **custom activities**.

changes apply to future engagement snapshots and do not silently rewrite existing ones.

**Screenshot:** `assets/screenshots/06-standing-rates.png`

## 7. Counsel view

A counsel-side screenshot demonstrates that the UI is role aware and that the expert-side staging/editing controls are not exposted to attorneys.

The backend independently enforces the same restriction.

**Screenshot:** `assets/screenshots/07-attorney-read-only.png`

## 8. Responsive shell

A movile screenshot can demonstrate that the authenticated shell, navigation, cards, and primary workflows remain usable at smaller widths.

**Screenshot:** `assets/screenshots/08-mobile.png`