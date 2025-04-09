import Jaedeesai from '$lib/models/jaedeesai.js';

/**
 * 
 * @param {*} param0 
 * @returns 
 */

export async function GET({ params }) {
    try {
        const id = params.id; // Extract the 'id' from the route parameters
        const sandcastle = await Jaedeesai.find(); // Fetch data from the database

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