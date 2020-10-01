const express = require('express');
const router = express.Router();

const{ UserAnswers } = require('../JS/orm');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/cheatsheet', (req,res) => {
    res.render('cheatsheet');
})

router.post('/user/answers/question/:questionNumber', (req, res) => {
    if(req.body.id) {
		return res.status(400).json({'message': 'ID should not be provided'});
    }    
    UserAnswers.create({
        user_id: req.body.userId,
        question_number: req.params.questionNumber,
        is_correct: req.body.isCorrect,
        elapsed_time_ms: req.body.elapsedTimeMs
    }).then(userAnswer => {
        return res.status(201).json(userAnswer)
    }).catch(error => {
        console.log(error);
        return res.status(400).json(error.errors)
    })
})


module.exports = router;
