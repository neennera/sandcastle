import { connectDB } from '$lib/db.js';
import OTP from '$lib/models/otp';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    if (!locals.user) {
        return json({ message: "Unauthorized request" }, { status: 401 });
    }

    try {
        const { email, otp } = await request.json();

        // Validate input
        if (!email || !otp) {
            return json({ message: "Missing required field" }, { status: 400 });
        }

        if (typeof email !== 'string' || typeof otp !== 'string' || isNaN(Number(otp))) {
            return json({ message: "Invalid input format" }, { status: 400 });
        }

        // Connect to the database
        await connectDB();

        // Check if the email exists in the OTP collection
        const emailExists = await OTP.findOne({ email }).select("_id otp");
        if (!emailExists) {
            return json({ message: "Invalid email or OTP not found" }, { status: 404 });
        }

        // Check if the OTP matches
        if (emailExists.otp !== Number(otp)) {
            return json({ message: "Wrong OTP" }, { status: 401 });
        }

        // Delete the OTP after successful verification
        await OTP.deleteOne({ _id: emailExists._id });

        return json({ message: "Email is successfully verified" }, { status: 200 });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return json({ message: "Internal server error" }, { status: 500 });
    }
}