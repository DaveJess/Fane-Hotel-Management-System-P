import mongoose, { Schema, models } from "mongoose";

 const UserSchema = new Schema(
    {
        name: { type: String },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["USER", "HOTEL", "ADMIN", "SUPER_ADMIN"],
            default: "USER",
        },
    },
    { timestamps: true }
 );

 export default models.User || mongoose.model("User", UserSchema );