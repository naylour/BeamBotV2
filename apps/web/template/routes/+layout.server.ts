import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

// export const load: LayoutServerLoad = async ({ locals, url }) => {
//     // console.log(locals.user)
//     if(!locals.user?.account.heSeeWelcomeScreen && url.pathname !== '/welcome') {
//         throw redirect(307, '/welcome');
//     }

//     const lastRewordDate = locals.user?.wallet?.reward.lastReward && new Date(locals.user?.wallet.reward.lastReward);

//     if(
//         lastRewordDate &&
//         (new Date().getTime() - lastRewordDate.getTime()) > 1000 * 60 * 60 * 24 &&
//         url.pathname !== '/daily'
//     )  throw redirect(307, '/daily');

//     return { ...locals };
// };
