const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Add at least one exercise"
        },
        name: {
            type: String,
            trim: true,
            required: "Please name your exercise"
        },
        duration: {
            type: Number,
            required: "Please enter a duration for your exercise"
        },
        weight: {
            type: Number
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
    }],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;