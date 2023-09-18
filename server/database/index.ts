import mongoose from "mongoose";

const config = useRuntimeConfig()

export default async () => {
    try {
        mongoose.connect(config.mongoDbUri)
    } catch(error) {
        console.log(error)
    }
}