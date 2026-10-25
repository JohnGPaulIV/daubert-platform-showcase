/**
 * Illustrative portfolio example.
 * Intentionally simplified; not production Daubert source.
 */

type EngagementRole =
    | "lead_expert"
    | "collaborator"
    | "attorney";

type EntryStatus =
    | "staged"
    | "accrued"
    | "withdrawn";


export function canViewEntry(
    role: EngagementRole,
    status: EntryStatus,
    isOwner: boolean,
): boolean {

    /**
     * Published/shared records are visible
     * to engagement participants.
     */
    if (status !== "staged") {
        return true;
    }

    /**
     * Staged work has narrower visibility.
     *
     * Lead experts may review all staged work.
     * Collaborators may only see their own.
     * Counsel cannot see staged expert-side work.
     */
    if (role === "lead_expert") {
        return true;
    }


    if (role === "collaborator") {
        return isOwner;
    }


    return false;
}


export function canCreateEntry(
    role: EngagementRole,
): boolean {

    return (
        role === "lead_expert"
        || role === "collaborator"
    );
}


export function canEditEntry(
    role: EngagementRole,
    status: EntryStatus,
    isOwner: boolean,
): boolean {

    /**
     * Example policy:
     * only editable expert-side records
     * may be changed.
     */
    if (
        status !== "staged"
        && status !== "accrued"
    ) {
        return false;
    }


    if (role === "lead_expert") {
        return true;
    }


    if (role === "collaborator") {
        return isOwner;
    }


    return false;
}


export function canPublishStagedEntry(
    role: EngagementRole,
): boolean {

    return role === "lead_expert";
}