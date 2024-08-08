import type { PageLoad } from './$types';
import api from '$lib/api';


export const load: PageLoad = async ({ url, fetch }) => {
    const limit = Number(url.searchParams.get('l')) || 15;
    const step = Number(url.searchParams.get('s')) || 0;

    const response = await api(fetch).get('users', {
        searchParams: {
            limit, step
        },
        // credentials: 'include'
    });

    return {
        ...(await response.json())
    };
}