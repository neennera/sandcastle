import { connectDB } from '$lib/db.js';
import OTP from '$lib/models/otp';
import { json } from '@sveltejs/kit';
import { randomInt } from 'crypto';
import { BREVO_API_KEY, SENDGRID_API_KEY } from '$env/static/private';
import jaedeesai from '$lib/models/jaedeesai.js';
import fetch from 'node-fetch';

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
                <p>หากมีข้อสงสัยเพิ่มเติมกรุณาติดต่อผ่าน google form feedback บนหน้าเว็บ (อยู่ในเครื่องหมาย ? บนหน้าโฮมเพจ)</p>
            </body>
            </html>
        `;

        const msg = {
            sender: { name: "Jaedeesai", email: "jaedeesaiapp@gmail.com" },
            to: [{ email, name: ownername }],
            subject: "OTP for E-mail Address verification on Jaedeesai",
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

            return json({ message: 'Email sent!' }, { status: 200 });
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
                    return json({ message: 'Failed to send email, please try again or contact us via feedback form' }, { status: 500 });
                }

                return json({ message: 'Email sent!' }, { status: 200 });
            } catch (sendGridError) {
                console.error('SendGrid error:', sendGridError instanceof Error ? sendGridError.message : 'Unknown error');
                await OTP.deleteOne({ email, otp });
                return json({ message: 'Failed to send email, please try again or contact us via feedback form' }, { status: 500 });
            }
        }

    } catch (err) {
        if (err instanceof Error) {
            console.error(err);
            return json({ message: "Internal server error" }, { status: 500 });
        }
    }
}