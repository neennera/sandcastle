import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Generates a JWT token with a 1-hour expiration.
 * @returns {Response} - Returns the generated token.
 */
export async function POST({ request }) {
    try {

        if (!SECRET_KEY) {
            return new Response(JSON.stringify({ error: 'Missing SECRETE key' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });        }
        // Parse the request body to get the payload (e.g., user data)
        const { userId } = await request.json();

        if (!userId ) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Generate the token
        const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });

        // Return the token
        return new Response(JSON.stringify({ token }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}