export type * from '@prisma/client';

import type { Account, User as PrismaUser, RefferAccount, Reward, Spin, Task, Wallet } from '@prisma/client';
import type { Serialize } from '@repo/utils/object';

export type User = Serialize<PrismaUser & {
    account: Omit<Account, 'id'> & {
        _count: {
            reffers: number;
        };
        completedTasks: Task[]
    };
    wallet: Omit<Wallet, 'id'> & {
        reward: Reward;
        spins: Omit<Spin, 'wallet'>[]
    };
    refferAccount: (Omit<RefferAccount, 'id' | 'oneWhoInvited'> & {
        OneWhoInvited: Omit<Account, 'id'> & {
            User: User
        }
    }) | null;
}>