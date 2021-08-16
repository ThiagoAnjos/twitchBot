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
    shortDate: {
        type: String,
        require: true
    },
    fullDate: {
        type: String,
        require: true
    },
});

export default mongoose.model('primeUsers', schema);