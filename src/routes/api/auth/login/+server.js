import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { WEB_SECRET } from '$env/static/private';
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Generates a JWT token with a 1-day expiration.
 * @returns {Response} - Returns the generated token or an error message.
 */
export async function POST({ request, cookies, locals }) {
    try {
        // Check if the user is already authenticated
        if (locals.user) {
            return new Response(JSON.stringify({ message: 'Token still valid' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Parse the request body
        const { web_secret } = await request.json();
        if (!web_secret) {
            return new Response(JSON.stringify({ error: 'Missing WEB SECRET' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate the WEB_SECRET
        if (web_secret !== WEB_SECRET) {
            return new Response(JSON.stringify({ error: 'Unauthorized: WEB SECRET mismatch' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Ensure SECRET_KEY is defined
        if (!SECRET_KEY) {
            console.error('SECRET_KEY is missing');
            return new Response(JSON.stringify({ error: 'Internal server error: SECRET_KEY missing' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Generate a new token
        const token = jwt.sign({}, SECRET_KEY, { expiresIn: '1d' });

        // Set the token as an HTTP-only cookie
        cookies.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 // 1 day
        });

        // Return the generated token
        return new Response(JSON.stringify({ token }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error('Error in POST /auth/login:', err);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}