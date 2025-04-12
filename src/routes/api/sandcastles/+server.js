import Jaedeesai from "$lib/models/jaedeesai";
import { connectDB } from "$lib/db";
import { BREVO_API_KEY, SENDGRID_API_KEY } from '$env/static/private';
import OTP from '$lib/models/otp';

import crypto from 'crypto';
import mongoose from "mongoose";
import fetch from 'node-fetch';

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
            if (ct == 900000) {
                return new Response(JSON.stringify({ error: 'Sandcastle is full' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            id = crypto.randomInt(100000, 1000000);
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

        // Delete the OTP after successful verification
        await OTP.deleteOne({ _id: emailExists._id });

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
            sender: { name: "Jaedeesai", email: "jaedeesaiapp@gmail.com" },
            to: [{ email, name: ownername }],
            subject: "ID for your jaedee created on Jaedeesai",
            htmlContent: emailContent
        };

        try {
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': BREVO_API_KEY
                },
                body: JSON.stringify(msg)
            });

            if (!response.ok) {
                console.error('Brevo failed to send email:', await response.text());
                throw new Error('Brevo email sending failed');
            }

            return new Response(JSON.stringify({
                message: 'Sandcastle created successfully',
                data: newSandcastle
            }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (brevoError) {
            console.error('Brevo error:', brevoError instanceof Error ? brevoError.message : 'Unknown error');

            // Fallback to SendGrid
            try {
                const sendGridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${SENDGRID_API_KEY}`
                    },
                    body: JSON.stringify({
                        personalizations: [
                            {
                                to: [{ email, name: ownername }],
                                subject: "OTP for E-mail Address verification on Jaedeesai"
                            }
                        ],
                        from: { email: "jaedeesaiapp@gmail.com", name: "Jaedeesai" },
                        content: [{ type: "text/html", value: emailContent }]
                    })
                });

                if (!sendGridResponse.ok) {
                    console.error('SendGrid failed to send email:', await sendGridResponse.text());
                    await OTP.deleteOne({ email, otp });
                    await newSandcastle.deleteOne({ id: newSandcastle.id });
                    return new Response(JSON.stringify({ error: 'Failed to send email, please try again or contact us via feedback form' }), {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                return new Response(JSON.stringify({
                    message: 'Successfully created OTP and sent email',
                    data: newSandcastle
                }), {
                    status: 201,
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (sendGridError) {
                console.error('SendGrid error:', sendGridError instanceof Error ? sendGridError.message : 'Unknown error');
                await OTP.deleteOne({ email, otp });
                await newSandcastle.deleteOne({ id: newSandcastle.id });
                return new Response(JSON.stringify({ error: 'Failed to send email, please try again or contact us via feedback form' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }
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