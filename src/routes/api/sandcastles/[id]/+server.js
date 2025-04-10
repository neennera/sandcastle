import Jaedeesai from '$lib/models/jaedeesai.js';
import { connectDB } from '$lib/db';
import JWTVerify from '../../jwtVerify';
/**
 * 
 * @param {*} param0 
 * @returns 
 */

export async function GET({ params, request }) {
    try {
        const authHeader = request.headers.get('Authorization');
        if(!authHeader){
            return new Response(JSON.stringify({ error: 'Unauthorized: Missing token' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const isTokenValid = JWTVerify(authHeader);
        if (!isTokenValid) {
            return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
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

export async function POST({ params, request }) {
    try {
        const authHeader = request.headers.get('Authorization');
        if(!authHeader){
            return new Response(JSON.stringify({ error: 'Unauthorized: Missing token' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const isTokenValid = JWTVerify(authHeader);
        if (!isTokenValid) {
            return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), {
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