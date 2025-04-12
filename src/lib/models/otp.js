import mongoose, { mongo } from "mongoose";
import isEmail from "validator/lib/isEmail";

/**
 * Validate Jaedee ID (should be a 6-digit number)
 * @param {Number} id 
 */
const checkOTP = function (id) {
    return id >= 100000 && id <= 999999;
}

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [isEmail],
    },
    otp: {
        type: Number,
        require: true,
        validate: [checkOTP],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600
    }
}, { collection: 'otp' });

otpSchema.index({ otp: 1 }, { unique: true });

export default mongoose.models.OTP || mongoose.model("OTP", otpSchema);