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
    resposta: {
        type: Number
    }
});

export default mongoose.model('desafios', schema);