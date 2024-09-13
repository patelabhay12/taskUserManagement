import mongoose from "mongoose";
const start = Date.now()
const todoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        red: "User",
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    },
    date: {
        type: Date,
        default: start
    }
});

export default mongoose.model("Todo", todoSchema);