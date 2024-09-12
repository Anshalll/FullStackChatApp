import mongoose from 'mongoose'



export const Connect_db = async () => {

    const connection = await mongoose.connect(process.env.MONGO_URI , {
        dbName: process.env.DB_NAME
    })
    if (!connection) {
        console.log("Failed to connect to database")
    }
    console.log(`Connected to database ${process.env.DB_NAME}`)

}
