import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
    displayName: {
        type: String,
        required: true,
        index: true
    },
    channel: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
    message: {
        type: String,
        index: true,
        required: true,
    },
    channelId: {
        type: Number,
        required: true,
        index: true
    },
    messageId: {
        type: String,
        required: true,
        index: true
    },
    channelGame: {
        type: String,
        required: true,
        index: false
    },
    channelGameId: {
        type: String,
        required: true,
        index: false
    },
    channelTitle: {
        type: String,
        required: true,
        index: false
    },
    shortDate: {
        type: String,
        require: true
    },
    fullDate: {
        type: String,
        require: true
    },
    isAwnsered: {
        type: Boolean,
        require: true
    }

});

export default mongoose.model('perguntascast', schema);