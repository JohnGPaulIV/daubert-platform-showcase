/**
 * Illustrative portfolio example.
 * Intentionally simplified; not production Daubert source.
 */

import {
    z,
} from "zod";


const CreateWorkInput =
    z.object({
        workDate: z.string(),

        activity: z.string(),

        quantity: z
            .number()
            .positive(),

        note: z
            .string()
            .max(120)
            .nullable(),
    });


type AuthContext = {
    userId: string;

    engagementId: string;
};


export async function createWorkExample(
    context: AuthContext,
    unknownInput: unknown,
) {

    /*
     * Runtime validation happens before
     * business logic is executed.
     */
    const input = CreateWorkInput.parse(
        unknownInput,
    );


    /**
     * Authorization, rate resolution,
     * calculation, and persistence happen
     * inside the trusted server boundary.
     */
    return transaction(
        async (db) => {

            const access = await db.loadEngagementAccessForUpdate(
                context.engagementId,
                context.userId,
            );


            if (!access?.canCreateWork) {
                throw new Error("Forbidden");
            }


            /**
             * The authoritative rate comes
             * from the engagement snapshot.
             *
             * A client cannot choose the
             * applied financial rate.
             */
            const rate = access.snapshot
                .resolve(input.activity,);


            const amount = calculateFromAuthoritativeRate(
                input.quantity,
                rate,
            );


            /**
             * Authenticated actor, applied
             * rate, and calculated amount are
             * all resolved by the server.
             */
            return db.insertWork({
                actorId: context.userId,

                engagementId: context.engagementId,

                ...input,

                rateApplied: rate,

                amount,
            });
        },
    );
}


/**
 * Private persistence and financial
 * implementation details are intentionally
 * omitted from this showcase.
 */
declare function transaction<T>(
    fn: (db: any) => Promise<T>,
): Promise<T>;


declare function calculateFromAuthoritativeRate(
    quantity: number,
    rate: number,
): number;