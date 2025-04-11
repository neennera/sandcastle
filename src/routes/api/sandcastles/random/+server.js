import Jaedeesai from '$lib/models/jaedeesai.js';
import { connectDB } from '$lib/db';
import JWTVerify from '../../jwtVerify';

/**
 * 
 * @param {any} request
 */


export async function GET({ request }) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
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
    try {
        const randomSandcastles = await Jaedeesai.aggregate([
            { $sample: { size: 6 } },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    name: 1,
                    ownername: 1
                }
            }
        ]);
        
        if (!randomSandcastles) {
            return new Response(JSON.stringify({ error: 'Sandcastle not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(randomSandcastles), {
            status: 200,
            headers: { 'content-type': 'application/json' }
        });
    }
    catch (err) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 400,
            headers: { 'content-type': 'application/json' }
        });
    }

}