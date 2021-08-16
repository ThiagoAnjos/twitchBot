import mongoose from "mongoose"

export async function dbConnect() {
    mongoose.Promise = global.Promise;
    if (mongoose.connect.readyState > 0) {
        console.log(`Readystate`)
        return;
    } else {
        return mongoose.connect(process.env.MONGODB_URI, {
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(`Conexão realizada com sucesso!`)
        }).catch((err) => {
            console.log(`Ocorreu um erro ao conectar ao MongoDB: ${err}`)
        });
    }
}