import config from "@repo/config";
import { createHmac } from "node:crypto";

interface UserData {
    year: number;
    users: number;
}

const data: UserData[] = [
    { year: 2014, users: 35000000 },
    { year: 2015, users: 60000000 },
    { year: 2016, users: 100000000 },
    { year: 2017, users: 180000000 },
    { year: 2018, users: 200000000 },
    { year: 2020, users: 400000000 },
    { year: 2022, users: 500000000 },
    { year: 2023, users: 700000000 },
    { year: 2024, users: 950000000 }
];

const knownIds = [
    { id: 540314239,  year: 2017 },
    { id: 1019328409, year: 2020 },
    { id: 6843901815, year: 2023 },
    { id: 7227866745, year: 2023 }
];

export const
    verify = (data: string): number | null => {
        if (!data) return null;

        const entries = Object.fromEntries(new URLSearchParams(data));

        const dataCheckString = `auth_date=${entries.auth_date}\nquery_id=${entries.query_id}\nuser=${entries.user}`;

        const secret = createHmac('sha256', 'WebAppData').update(config.TELEGRAM_API_TOKEN);
        // @ts-ignore
        const calculatedHash = createHmac('sha256', secret.digest())
            .update(dataCheckString)
            .digest('hex');

        return calculatedHash === entries.hash ? JSON.parse(entries.user).id : null;
    },
    interpolate = (x: number, x0: number, y0: number, x1: number, y1: number): number => {
		return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);
	},
    getAccountAge = (userId: number): number => {
		const currentYear = new Date().getFullYear();

		for (let i = 0; i < knownIds.length - 1; i++) {
			if (userId >= knownIds[i].id && userId <= knownIds[i + 1].id) {
				const year = interpolate(
					userId,
					knownIds[i].id,
					knownIds[i].year,
					knownIds[i + 1].id,
					knownIds[i + 1].year
				);
				return currentYear - Math.floor(year);
			}
		}

		for (let i = 0; i < data.length - 1; i++) {
			if (userId >= data[i].users && userId <= data[i + 1].users) {
				const year = interpolate(
					userId,
					data[i].users,
					data[i].year,
					data[i + 1].users,
					data[i + 1].year
				);
				return currentYear - Math.floor(year);
			}
		}

		// If ID exceeds known data, extrapolate based on the last known growth rate
		const lastYear = data[data.length - 1].year;
		const lastUsers = data[data.length - 1].users;
		const secondLastYear = data[data.length - 2].year;
		const secondLastUsers = data[data.length - 2].users;

		const growthRate = (lastUsers - secondLastUsers) / (lastYear - secondLastYear);
		const extraYears = (userId - lastUsers) / growthRate;
		const adjustedGrowthRate = growthRate;

		const year = lastYear + extraYears / adjustedGrowthRate;
		const age = currentYear - Math.floor(year);

		return age == 0 ? 1 : age;
	}