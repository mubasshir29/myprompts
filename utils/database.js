import mongoose, { mongo } from "mongoose";

let isConnected = false

export const connectDB = async ()=>{
    if(isConnected){
        console.log("Database is connected")
        return
    }
    else{
        try{
            mongoose.set('strictQuery',true)
            await mongoose.connect(process.env.DB_URI, {
                dbName: "prompt_users",
                useUnifiedTopology: true,
                useNewUrlParser: true
            })

            isConnected = true,
            console.log("Database connected")
        }
        catch(error){
            console.log(error)
        }
    }
}