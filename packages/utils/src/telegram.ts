import config from "@repo/config";
import { createHmac } from "node:crypto";

export const
    verify = (data: string): number | null => {
        if (!data) return null;

        const entries = Object.fromEntries(new URLSearchParams(data));

        const dataCheckString = `auth_date=${entries.auth_date}\nquery_id=${entries.query_id}\nuser=${entries.user}`;

        const secret = createHmac('sha256', 'WebAppData').update(config.TELEGRAM_API_TOKEN);
        const calculatedHash = createHmac('sha256', secret.digest())
            .update(dataCheckString)
            .digest('hex');

        return calculatedHash === entries.hash ? JSON.parse(entries.user).id : null;
    };