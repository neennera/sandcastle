import Jaedeesai from '$lib/models/jaedeesai.js';
import { connectDB } from '$lib/db';
/**
 * 
 * @param {*} param0 
 * @returns 
 */

export async function GET({ params }) {
    try {
        await connectDB();
        const id = params.id;
        const sandcastle = await Jaedeesai.findOne({ id: id }).select("-_id -decorations._id"); // Fetch data from the database

        if (!sandcastle) {
            return new Response(JSON.stringify({ error: 'Sandcastle not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(sandcastle), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}