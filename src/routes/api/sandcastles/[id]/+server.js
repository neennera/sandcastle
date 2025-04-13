import Jaedeesai from '$lib/models/jaedeesai.js';
import { connectDB } from '$lib/db';
import { WEB_SECRET, SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
/**
 * Fetch a sandcastle by ID.
 */
export async function GET({ request, params, cookies, locals }) {
    try {
        // Check if the user is already authenticated
        if (locals.user === null) {
            return new Response(JSON.stringify({ error: 'Unautherized request' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        await connectDB();
        const sandcastle = await Jaedeesai.findOne({ id: params.id }).select('-_id -decorations._id');

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
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function POST({ params, request, locals }) {
    try {
        if (locals.user === null) {
            return new Response(JSON.stringify({ error: 'Unauthorized request' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const id = params.id;
        const { type, wishing_text, sender_name } = await request.json();

        // Validate input : If one of them is empty
        if (!type || !wishing_text || !sender_name) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate input : wishing_text length
        if (wishing_text.length > 70) {
            return new Response(JSON.stringify({ error: 'Wishing text exceeds 70 characters' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate input : type validation
        if (!['ratchapruek', 'mali', 'banmairooroi', 'flag', 'stone', 'leaf'].includes(type)) {
            return new Response(JSON.stringify({ error: 'Type Invalid' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        await connectDB();

        // Find the sandcastle by ID
        const sandcastle = await Jaedeesai.findOne({ id: id });
        if (!sandcastle) {
            return new Response(JSON.stringify({ error: 'Sandcastle not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Add the new decoration
        sandcastle.decorations.push({
            type,
            wishing_text,
            sender_name
        });

        // Save the updated sandcastle
        await sandcastle.save();

        return new Response(JSON.stringify({ message: 'Decoration added successfully' }), {
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
