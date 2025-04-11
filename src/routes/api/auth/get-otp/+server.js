import { connectDB } from '$lib/db.js';
import OTP from '$lib/models/otp';
import { json } from '@sveltejs/kit';
import { randomInt } from 'crypto';
import { SENDGRID_API_KEY, EMAIL_USER } from '$env/static/private';
import sgMail from '@sendgrid/mail';
import jaedeesai from '$lib/models/jaedeesai.js';

sgMail.setApiKey(SENDGRID_API_KEY);
export async function POST({ request, locals }) {
    if (locals.user === null) {
        return json({ message: "Unauthorized user" }, { status: 401 });
    }

    const { email } = await request.json();
    if (!email) {
        return json({ message: "Missing required field" }, { status: 400 });
    }

    await connectDB();
    const existingOtp = await OTP.findOne({ email }).select('_id').lean();
    if (existingOtp) {
        return json({ message: "We already sent an email, please check your junk email" }, { status: 400 });
    }
    const existingUser = await jaedeesai.findOne({ email }).select('_id').lean();
    if (existingUser) {
        return json({ message: "This email has already used" }, { status: 400 });
    }


    let otp;
    try {

        while (true) {
            otp = randomInt(100000, 1000000);
            try {
                await new OTP({
                    email,
                    otp,
                }).save();
                break;
            }
            catch (err) {
                if (err instanceof Error && typeof err === 'object' && 'code' in err) {
                    if (err.code !== 11000) {
                        console.error(err.message);
                        return json({ message: 'Error trying to save OTP' }, { status: 500 });
                    }
                }
                else {
                    if (err instanceof Error) console.error(err.message);
                    return json({ message: 'Unknown error trying to create OTP' }, { status: 500 });
                }
            }
        }

        const msg = {
            to: email,
            from: EMAIL_USER,
            subject: "Your OTP code",
            text: `Your OTP code is ${otp}`
        };

        await sgMail.send(msg);
        return json({ message: 'Successfully created OTP and sent email!' }, { status: 200 });

    } catch (err) {
        if (err instanceof Error) {
            console.error(err);
            return json({ message: "Internal server error" }, { status: 500 });
        }
    }
}