const router = require("express").Router();
const db = require('../models');

router.post('/api/workouts', (req, res) => {
    db.Workout.create(req.body)
        .then((dbWorkout) => {
            res.json(dbWorkout)  
        })
        .catch((err) => {
            res.json(err)
        })
})

router.put('/api/workouts/:id', ({body, params}, res) => {
    db.Workout.findByIdAndUpdate(
        params.id,
        { $push: {exercises: body} },
        { new: true, runValidators: true }
    )
    .then((dbWorkout) => {
        res.json(dbWorkout)
    })
    .catch((err) => {
        res.json(err)
    })
})

router.get('/api/workouts', (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .then ((dbWorkout) => {
        res.json(dbWorkout)
    })
    .catch((err) => {
        res.json(err)
    })
}) 

router.get('/api/workouts/range', (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .sort({_id: -1})
    .limit(6)
    .then((dbWorkout) => {
        res.json(dbWorkout)
    })
    .catch((err) => {
        res.json(err)
    })
})

router.delete('/api/workouts', ({ body }, res) => {
    db.Workout.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true)
    })
    .catch ((err) => {
        res.json(err)
    })
})

module.exports = router;