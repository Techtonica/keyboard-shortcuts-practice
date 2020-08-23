const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/cheatsheet', (req,res) => {
    res.render('cheatsheet');
})

module.exports = router;
