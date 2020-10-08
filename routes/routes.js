const express = require('express');
const router = express.Router();

const { User, UserAnswers } = require('../JS/orm');

const ANSWER_HISTORY_LIMIT = 3;


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
    // Created won't be needed when issue #74 has been solved, should be changed by findOne and handle the errors
    User.findOrCreate({ 
        where: {id: req.body.userId}
    }).then(users => {
        let user = users[0];
        
        UserAnswers.create({
            user_id: user.id,
            question_number: req.params.questionNumber,
            is_correct: req.body.isCorrect,
            elapsed_time_ms: req.body.elapsedTimeMs
        }).then(userAnswer => {
            return res.status(201).json(userAnswer)
        }).catch(error => {
            console.log(error);
            return res.status(400).json(error.errors)
        })
    }).catch(error => {
        console.log(error);
        return res.status(400).json(error.errors)
    })
})

router.get('/user/answers/question/:questionNumber', (req, res) => {  
    // TODO: When issue #74 be done, the userId should be handled differently from req object   
    UserAnswers.findAll({
        where: {question_number: req.params.questionNumber, user_id: req.query.userId},
        order: [
            ['created_at', 'DESC']
        ],
        limit: ANSWER_HISTORY_LIMIT
    }).then(userAnswers => {
        return res.json({
            previousTimingMs: userAnswers.map(userAnswer => userAnswer.elapsed_time_ms)
        })
    }).catch(error => {
        console.log(error);
        return res.status(500).json(error.errors) // TODO: handle better error messages
    })
})

module.exports = router;
