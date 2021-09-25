const router = require("express").Router();
const workout = require('../models/workout');

router.post('/api/workouts', (req, res) => {
    workout.create({})
    .then((dbworkout) => {
        res.json(dbworkout)  
    })
    .catch((err) => {
        res.json(err)
    })
})

router.put('/api/workouts/:id', ({body, params}, res) => {
    workout.findByIdAndUpdate(
        params.id,
        {$push: {exercises: body}},
        {new: true, runValidators: true}
    )
    .then((dbworkout) => {
        res.json(dbworkout)
    })
    .catch((err) => {
        res.json(err)
    })
})

router.get('/api/workouts', (req, res) => {
    workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .then ((dbworkout) => {
        res.json(dbworkout)
    })
    .catch((err) => {
        res.json(err)
    })
}) 

router.get('/api/workouts/range', (req, res) => {
    workout.aggregate([
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
    .then((dbworkout) => {
        res.json(dbworkout)
    })
    .catch((err) => {
        res.json(err)
    })
})

router.delete('/api/workouts', ({body}, res) => {
    workout.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true)
    })
    .catch ((err) => {
        res.json(err)
    })
})

module.exports = router;