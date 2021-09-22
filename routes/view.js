const router = require("express").Router();
const path = require("path");

router.get('/exercise', (res, req) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
});

router.get('/stats', (res, req) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'))
});

module.exports = router;