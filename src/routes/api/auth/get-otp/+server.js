import { connectDB } from '$lib/db.js';
import OTP from '$lib/models/otp';
import { json } from '@sveltejs/kit';
import { randomInt } from 'crypto';
import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '$env/static/private';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import jaedeesai from '$lib/models/jaedeesai.js';

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: 'api', key: MAILGUN_API_KEY });

export async function POST({ request, locals }) {
    if (locals.user === null) {
        return json({ message: "Unauthorized user" }, { status: 401 });
    }

    const { email, ownername } = await request.json();
    if (!email || !ownername) {
        return json({ message: "Missing required field" }, { status: 400 });
    }

    await connectDB();
    const existingOtp = await OTP.findOne({ email }).select('_id').lean();
    if (existingOtp) {
        return json({ message: "We already sent an email, please check your junk mail" }, { status: 400 });
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
            } catch (err) {
                if (err instanceof Error && typeof err === 'object' && 'code' in err) {
                    if (err.code !== 11000) {
                        console.error(err.message);
                        return json({ message: 'Error trying to save OTP' }, { status: 500 });
                    }
                } else {
                    if (err instanceof Error) console.error(err.message);
                    return json({ message: 'Unknown error trying to create OTP' }, { status: 500 });
                }
            }
        }

        const emailContent = `
            <html>
            <body>
                <h1>Confirm Your E-mail verification on Jaedeesai</h1>
                <p>สวัสดี <strong>${ownername}!😊</strong>,</p>
                <p>ขอบคุณมาร่วมสร้างเจดีย์ทราย บนเว็บไซต์ Jaedeesai ของพวกเรา✨</p>
                <p>กรุณานำ<strong> รหัส OTP ด้านล่าง</strong>ไประบุในหน้ายืนยันอีเมลเพื่อเข้าใช้งาน</p>
                <div style="font-size: 24px; font-weight: bold; padding: 10px; background-color: #ffecb3; text-align: center;">
                <strong>${otp}</strong>
                </div>
                <p>โปรดดำเนินการยืนยันอีเมล<strong>ภายใน 10 นาที</strong></p>
                <p>หากมีข้อสงสัยเพิ่มเติมกรุณาติดต่อ...</p>
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
            return json({ message: 'Successfully created OTP and sent email!' }, { status: 200 });
        } catch (emailError) {
            console.error('Failed to send email:', emailError instanceof Error ? emailError.message : 'Unknown error');

            await OTP.deleteOne({ email, otp });
            return json({ message: 'Failed to send email. OTP has been removed.' }, { status: 500 });
        }

    } catch (err) {
        if (err instanceof Error) {
            console.error(err);
            return json({ message: "Internal server error" }, { status: 500 });
        }
    }
}