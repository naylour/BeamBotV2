import ms from "ms";

export const
    convertExpires = <T extends string | number>(time: T) => {
        return ms(time as number, { long: false }) as T extends string ? number : string;
    };