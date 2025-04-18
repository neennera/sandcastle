import mongoose, { Model } from "mongoose";
import isEmail from "validator/lib/isEmail";

/**
 * Validate Jaedee ID (should be a 6-digit number)
 * @param {Number} id 
 */
const checkJeadeeID = function (id) {
    return id >= 100000 && id <= 999999;
}

const decorationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['ratchapruek', 'mali', 'banmairooroi', 'flag', 'stone', 'leaf'] 
    },
    wishing_text: {
        type: String,
        maxlength: 70
    },
    sender_name: {
        type: String,
        default: 'ผู้หวังดีนิรนาม'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, { versionKey: false });


const jaedeesaiSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        validate: [checkJeadeeID, "ID must be 6 digits"],
        length : 6
    },
    name: {
        type: String,
        required: [true, 'Please add your Jaedee name!'],
        maxlength: 15,
    },
    type: {
        type: String,
        enum: ['lotus', 'octagonal', 'flora', 'layer'],
        required: true
    },
    ownername: {
        type: String,
        required: [true, 'Please add your Jaedee name!'],
        maxlength: 15,
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
    },
    decorations: {
        type: [decorationSchema]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, { collection: 'jaedeesai', versionKey: false })

export default mongoose.models.Jaedeesai || mongoose.model("Jaedeesai", jaedeesaiSchema);
