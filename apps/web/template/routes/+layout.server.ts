import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
    if(!locals.user?.account.heSeeWelcomeScreen && url.pathname !== '/welcome') redirect(301, '/welcome');

    return { ...locals };
};