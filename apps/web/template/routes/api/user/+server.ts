import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
    try {

        return new Response();
    } catch {
        error(500);
    }
};