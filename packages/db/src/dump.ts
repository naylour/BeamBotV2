import prisma from './index.ts';

console.log(await prisma.user.count({
    where: {
        account: {
            heSeeWelcomeScreen: true
        },
        Partner: {
            name: 'Bcoin'
        },
    }
}))