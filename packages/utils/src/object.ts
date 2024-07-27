export type Serialize<T> =
        T extends BigInt ? number :
        T extends Date ? string :
        T extends (infer U)[] ? Serialize<U>[] :
        T extends object ? { [K in keyof T]: Serialize<T[K]> } :
        T;

export const 
    stringify = (object: object): string => JSON.stringify(
        object, 
        (key: string, value: any) => 
            typeof value === 'bigint' ? Number(value) : 
            value instanceof Date ? value.toISOString() :
            value
    ),
    serialize = <T extends object>(object: T): Serialize<T> => JSON.parse(stringify(object)),
    omitKeys = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
        const result = {} as Omit<T, K>;

        for (const key in obj) {
            if (!keys.includes(key as unknown as K)) {
                // @ts-ignore
                result[key as Exclude<keyof T, K>] = obj[key];
            }
        }

        return result;
    };