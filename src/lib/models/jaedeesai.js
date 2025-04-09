import mongoose, {Model, mongo} from "mongoose";

/**
 * 
 * @param {Number} id 
 */
const checkJeadeeID = function(id){
    return  id >= 100000 && id <= 999999;
}

const decorationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['ratchapruek', 'mali', 'banmairooroi', 'flag', 'stone', 'leaf']
    },
    wishing_text: {
        type: String,
        maxlength: 200 //Will find a perfect length later
    },
    sender_name:{
        type: String,
        default: 'ผู้หวังดีนิรนาม'
    }
  });


const jaedeesaiSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        validate: [checkJeadeeID, "ID must be 6 digits"] //Check if it's 6 digits
    },
    name: {
        type: String,
        required: [true, 'Please add your Jaedee name!'],
        maxlength: 50 //Should we fix name length???
    },
    type:{
        type: String, 
        enum: ['lotus', 'octagonal', 'flora', 'layer'],
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',  
        required: true,
    },
    decorations: {
        type: [decorationSchema]
    }
}, {timestamps: true})

module.exports = mongoose.model("Jaedeesai", jaedeesaiSchema)