import mongoose, { Schema, models } from "mongoose";

const RoomSchema = new Schema (
    {
        hotel: {
            type: Schema.Types.ObjectId,
            ref: "Hotel",
            required: true,
        },
        name: String,
        pricePerNight: Number,
        capacity: Number,
        totalRooms: Number,
    },
    { timestamps: true}
);

export default models.Room || mongoose.model("Room", RoomSchema);
