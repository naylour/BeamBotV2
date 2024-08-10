// import prisma from '@repo/db';
// import { serialize } from '@repo/utils/object';
// import { error, json, type RequestHandler } from '@sveltejs/kit';

// function getRandomItemId(items: { id: number; chance: number }[]): number {
//     const totalChance = items.reduce((sum, item) => sum + item.chance, 0);

//     let random = Math.random() * totalChance;

//     for (const item of items) {
//         random -= item.chance;
//         if (random <= 0) {
//             return item.id;
//         }
//     }



//     return items[0].id;
// }

// export const GET: RequestHandler = async ({ locals }) => {
//     try {
//         let spinElems: App.SpinType[];


//         if (locals.user?.wallet.spins.length === 0) spinElems = (await prisma.appData.findUnique({
//             where: { title: 'spinFree' }
//         }))?.data as unknown as App.SpinType[];
//         else spinElems = (await prisma.appData.findUnique({
//             where: { title: 'spin' }
//         }))?.data as unknown as App.SpinType[];

//         const winId = getRandomItemId(spinElems);
//         const winElem = spinElems.find(elem => elem.id === winId);

//         const userWallet =await prisma.wallet.findUnique({
//             where: { id: locals.user?.id },
//             include: {
//                 spins: true
//             }
//         });

//         if(!userWallet) return error(500);
//         if(locals.user?.wallet.spins.length !== 0 && userWallet.tickets - 1 < 0) return error(401);

//         const newWalletData = await prisma.wallet.update({
//             where: { id: locals.user?.id },
//             data: {
//                 coins: {
//                     increment: winElem?.type === 'coin' ? winElem?.total as number : 0
//                 },
//                 tickets: {
//                     increment: (winElem?.type === 'ticket' ? winElem?.total as number : 0) - (userWallet?.spins.length === 0 ? 0 : 1)
//                 },
//                 spins: {
//                     create: {
//                         amount: winElem?.total as number,
//                         type: winElem?.type === 'coin' ? 'Coin' : 'Ticket',
//                     }
//                 }
//             }
//         })

//         return json({
//             winId
//         });
//     } catch(__error__) {
//         error(__error__.status, __error__.body);
//     }
// };

// // 89604996552
