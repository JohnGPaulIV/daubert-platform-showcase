/**
 * Illustrative portfolio example.
 * Intentionally simplified; not production Daubert source.
 */

type Cents = number & {
    readonly __brand: "Cents";
};


export function cents(
    value: number,
): Cents {

    if (!Number.isSafeInteger(value)) {
        throw new Error(
            "Money must be a safe integer number of cents.",
        );
    }


    return value as Cents;
}


export function calculateEntryAmount(
    quantity: number,
    rateApplied: Cents,
): Cents {

    if (
        !Number.isFinite(quantity)
        || quantity <= 0
    ) {
        throw new Error(
            "Quantity must be positive.",
        );
    }


    return cents(
        Math.round(
            quantity * rateApplied,
        ),
    );
}


export function calculateRetainerRemaining(
    retainer: Cents | null,
    accrued: Cents,
): Cents | null {

    if (retainer === null) {
        return null;
    }


    return cents(
        Math.max(
            0,
            retainer - accrued,
        ),
    );
}


export function calculateBudgetUtilization(
    accrued: Cents,
    authorizedBudget: Cents | null,
): number | null {

    if (
        authorizedBudget === null
        || authorizedBudget === 0
    ) {
        return null;
    }


    return (
        accrued
        / authorizedBudget
    ) * 100;
}