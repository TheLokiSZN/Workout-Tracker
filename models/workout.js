const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Please enter workout"
            },
            name: {
                type: String,
                trim: true,
                required: "Please enter workout"
            },
            duration: {
                type: Number,
                required: "Please enter a time"
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            distance: {
                type: Number,
            }
        }
    ]
});
const Workout = mongoose.model("Workout", workoutSchema)

module.exports = Workout;