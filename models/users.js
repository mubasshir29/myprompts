import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: [true, "Email already exists"]
    },
    username: {
        type: String,
        required: [true,"Username is required"],
        unique: [true, "Email already exists"]
    },
    image: String
})

export const User = mongoose.models.User || mongoose.model("User", userSchema,"Users")
