export type * from '@prisma/client';

import type { Account, User as PrismaUser, RefferAccount, Reward, Wallet } from '@prisma/client';
import type { Serialize } from '@repo/utils/object';

export type User = Serialize<PrismaUser & {
    account: Omit<Account, 'id'> & {
        _count: {
            reffers: number;
        };
        reward: Reward
    };
    wallet: Omit<Wallet, 'id'>;
    refferAccount: (Omit<RefferAccount, 'id' | 'oneWhoInvited'> & {
        OneWhoInvited: Omit<Account, 'id'> & {
            User: User
        }
    }) | null;
}>