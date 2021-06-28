const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.post("/api/workouts", res => {
    Workout.create({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", res => {
    Workout.aggregate([
        {
            $addfields: {
                totalDuration: {
                    $sum: "$exercise.duration"
                }
            }
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/api/workouts/range", res => {
    Workout.aggregate([
        {
            $addfields: {
                totalDuration: {
                    $sum: "$exercise.duration"
                }
            }
        }
    ])
        .sort({ _id: -1 })
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", res => {
    Workout.findByIdAndUpdate(
        params.id, {
        $push: { excercises: body }
    },
        {
            new: true,
            runValidators: true,
        }
    )
        .then((dbWorkout) => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err)
        });
});

router.delete("/api/workouts/:id", res => {
    Workout.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true)
    })
    .catch(err => {
        res.json(err)
    });
});

module.exports = router;