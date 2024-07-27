import type { Handle } from '@sveltejs/kit';

import { check } from '@repo/auth';

export const handle: Handle = check;