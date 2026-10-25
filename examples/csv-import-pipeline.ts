/**
 * Illustrative portfolio example.
 * Intentionally simplified; not production Daubert source.
 */

type ImportRow = {
    date:
    string;

    activity:
    string;

    quantity:
    number;

    sourceRate?:
    number;
};


type ReviewCandidate = {
    valid:
    boolean;

    warnings:
    string[];

    appliedRate?:
    number;

    amount?:
    number;
};


export function buildReviewCandidate(
    row: ImportRow,
    resolveSnapshotRate: (activity: string) => number | null,
): ReviewCandidate {

    const warnings:
        string[] = [];


    /**
     * Resolve the rate from the engagement's
     * frozen schedule rather than trusting
     * the imported CSV.
     */
    const appliedRate =
        resolveSnapshotRate(
            row.activity,
        );


    if (
        appliedRate === null
        || row.quantity <= 0
    ) {
        return {
            valid: false,

            warnings,
        };
    }


    /**
     * An imported rate can help identify
     * inconsistencies, but does not become
     * authoritative financial state.
     */
    if (
        row.sourceRate !== undefined
        && row.sourceRate !== appliedRate
    ) {
        warnings.push(
            "Imported rate differs from the engagement rate; "
            + "the engagement snapshot will be used.",
        );
    }


    return {
        valid: true,

        warnings,

        appliedRate,

        amount: Math.round(
            row.quantity
            * appliedRate,
        ),
    };
}