const router = require("express").Router();
const path = require("path");

router.get("/exercise", res =>{
    res.sendFile(path.join(_dirname, "../public/exercise.html"))
});

router.get("/stats", res =>{
    res.sendFile(path.join(_dirname, "../public/stats.html"))
});

module.exports = router;