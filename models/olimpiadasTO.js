import mongoose from "mongoose";

const schema = new mongoose.Schema({
    admin: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
    data: {
        type: Date,
        require: true
    },
    tempo: {
        type: Number,
        require: true
    },
});

export default mongoose.model('olimpiadasTO', schema);