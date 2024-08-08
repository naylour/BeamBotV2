import ky from "ky";

export default (fetch: typeof window.fetch) => ky.create({
    prefixUrl: 'https://test.bluebeam.xyz',
    fetch,
    
});