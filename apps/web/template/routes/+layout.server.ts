import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    // if(locals.user?.account.reward.lastReward)
    return { ...locals };
};