export declare namespace JWT {
    type Payload<T> = T & {
        iat: number;
        exp: number;
    };
}