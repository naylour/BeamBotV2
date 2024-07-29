import { user } from '@repo/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
    try {
        const updatedData = await user.findOrCreate({
            where: { id: locals.user?.id }
        });
        if(updatedData) return json(updatedData);
        else return error(401);
    } catch {
        error(500);
    }
};