import mongoose, {Model} from "mongoose";
import { isEmail } from "validator";
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, 'Email address is required'],
            validate: [isEmail, 'Please fill a valid email address'],
        },
        name: {
            type: String,
            required :[true, 'Please fill a name']
        }
    },
    {timestamps: true }
)

module.exports = mongoose.model('User', userSchema);