const router = require("express").Router();
const Workout = require('../models/Workout.js');

router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
});

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addfields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
        .sort({ _id: -1 })
        .limit(7)
        .then(dbWorkout => {
            console.log(dbWorkout)
            console.log("test")
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    console.log('test')
    Workout.findByIdAndUpdate(
        params.id, {
            $push: { exercises: body }
        },
        {
            new: true,
            runValidators: true,
        })
        .then((dbWorkout) => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err)
        });
});

router.delete("/api/workouts/:id", ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true)
    })
    .catch(err => {
        res.json(err)
    });
});

module.exports = router;