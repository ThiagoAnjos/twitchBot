import mongoose from "mongoose";


const schema = new mongoose.Schema({
    pontuacao: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    }
});

export default mongoose.model('pontuacao', schema);