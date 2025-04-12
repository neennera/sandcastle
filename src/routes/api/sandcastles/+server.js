import Jaedeesai from "$lib/models/jaedeesai";
import { connectDB } from "$lib/db";
import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '$env/static/private';
import Mailgun from 'mailgun.js';
import OTP from '$lib/models/otp';

import crypto from 'crypto';
import mongoose from "mongoose";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: 'api', key: MAILGUN_API_KEY });

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
        const { name, type, ownername, email, otp } = await request.json();
        

        if (locals.user === null) {
            return new Response(JSON.stringify({
                error: 'Unauthorized request'
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        

        // Validate input : If one of them is empty
        if (!name || !type || !ownername || !email || !otp) {
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

         // Check if the email exists in the OTP collection
        const emailExists = await OTP.findOne({ email }).select("_id otp");
        if (!emailExists) {
            return new Response(JSON.stringify({ error: 'Invalid email or OTP not found' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
                    }

        // Check if the OTP matches
        if (emailExists.otp !== Number(otp)) {
            return new Response(JSON.stringify({ error: 'Wrong OTP' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
                
        
        // Delete the OTP after successful verification
        await OTP.deleteOne({ _id: emailExists._id });

        // Validate input: Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ error: 'Invalid email format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        

        // Validate input : Check if email already exists
        //Maybe we can delete this and only check on verify
        const existingSandcastle = await Jaedeesai.findOne({ email });
        // console.log(email, existingSandcastle);
        
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

        const emailContent = `
        <html>
        <body>
            <h1>Confirm Your E-mail verification on Jaedeesai</h1>
            <p>สวัสดี <strong>${ownername}!😊</strong>,</p>
            <p>ขอบคุณมาร่วมสร้างเจดีย์ทราย บนเว็บไซต์ Jaedeesai ของพวกเรา✨</p>
            <p>รหัสเจดีย์ของคุณคือ</p>
            <div style="font-size: 24px; font-weight: bold; padding: 10px; background-color: #ffecb3; text-align: center;">
            <strong>${otp}</strong>
        </body>
        </html>
        `;
        const msg = {
            from: `Mailgun Sandbox <postmaster@${MAILGUN_DOMAIN}>`,
            to: [`${ownername} <${email}>`],
            subject: "OTP for E-mail Address verification on Jaedeesai",
            html: emailContent
        };

        try {
            await mg.messages.create(MAILGUN_DOMAIN, msg);
        } catch (emailError) {
            console.error('Failed to send email:', emailError instanceof Error ? emailError.message : 'Unknown error');
            await OTP.deleteOne({ email, otp });
            await newSandcastle.deleteOne({ id : newSandcastle.id });
            return new Response(JSON.stringify({ error: 'Failed to send email' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

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