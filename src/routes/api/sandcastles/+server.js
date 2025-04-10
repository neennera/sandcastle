import Jaedeesai from "$lib/models/jaedeesai";
import { connectDB } from "$lib/db";
import crypto from 'crypto';
import mongoose from "mongoose";

export async function GET({ locals }) {
    try {
        if (locals.user === null) {
            return new Response(JSON.stringify({ error: 'Unautherized request' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        //Fetch all sandcastles
        await connectDB();
        const allSandcastles = await Jaedeesai.find().select('-_id id name ownername');
        if (!allSandcastles) {
            return new Response(JSON.stringify({ error: 'Sand castle not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(allSandcastles), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (err) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

//Create new user with castle
export async function POST({ request, locals }) {
    try {
        if (locals.user === null) {
            return new Response(JSON.stringify({
                error: 'Unauthorized request'
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const { name, type, ownername, email } = await request.json();

        // Validate input : If one of them is empty
        if (!name || !type || !ownername || !email) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate input : type validation
        if (!['lotus', 'octagonal', 'flora', 'layer'].includes(type)) {
            return new Response(JSON.stringify({ error: 'Type Invalid' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        await connectDB();

        // Validate input: Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ error: 'Invalid email format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate input : Check if email already exists
        const existingSandcastle = await Jaedeesai.findOne({ email });
        if (existingSandcastle) {
            return new Response(JSON.stringify({ error: 'Email already used for another sandcastle' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Create : Generate a unique 6-digit ID
        let ct = 0;
        let id;
        let isUnique = false;
        while (!isUnique) {
            // Error : if sandcastle id is already max
            if (ct == 900000) {
                return new Response(JSON.stringify({ error: 'Sandcastle is full' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            id = crypto.randomInt(100000, 1000000); // Generate a random 6-digit number
            const existingId = await Jaedeesai.findOne({ id });
            if (!existingId) {
                isUnique = true;
            }
        }

        // Create : Create and save the new sandcastle
        const newSandcastle = new Jaedeesai({
            id,
            name,
            type,
            ownername,
            email,
            decorations: []
        });
        await newSandcastle.save();

        return new Response(JSON.stringify({
            message: 'Sandcastle created successfully',
            data: newSandcastle
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            return new Response(JSON.stringify(
                { error: err.message }),
                { status: 400 }
            );
        }
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}