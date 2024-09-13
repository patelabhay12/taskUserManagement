import mongoose, { Mongoose } from "mongoose";

const start = Date.now()
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        min: 6,
        max: 32,
        required: true
    },
    password: {
        type: String,
        min: 8,
        max: 16,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"

    }],
    data: {
        type: Date,
        default: start,
    }
});


export default mongoose.model("User", userSchema);
