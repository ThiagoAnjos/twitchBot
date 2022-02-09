import mongoose from "mongoose";


const schema = new mongoose.Schema({
    message: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
});

export default mongoose.model('primemessages', schema);