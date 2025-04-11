import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { SECRET_KEY } from '$env/static/private';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    if (!SECRET_KEY) {
        console.error('SECRET_KEY is not defined');
        return new Response(JSON.stringify({ error: 'SECRET_KEY is missing' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const token = event.cookies.get('token');

    if (token) {
        try {
            const userData = jwt.verify(token, SECRET_KEY);
            event.locals.user = userData;
        }
        catch (err) {
            console.error('Invalid token');
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    return resolve(event);
}