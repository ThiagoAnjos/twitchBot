import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
    channel: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
    duration: {
        type: Number,
        require: true
    },
    reason: {
        type: String,
        require: false
    },
    shortDate: {
        type: String,
        require: true
    },
    fullDate: {
        type: String,
        require: true
    }
});

export default mongoose.model('timeout', schema);