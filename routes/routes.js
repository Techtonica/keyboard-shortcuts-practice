const express = require('express');
const router = express.Router();

const{ User, UserAnswers } = require('../JS/orm');

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
    let pageSize = 3; // TODO: define it in more stadarized way 
    
    User.findOne({ 
        where: {id: req.body.userId}
    }).then(user => {
        
        UserAnswers.findAll({
            where: {question_number: req.params.questionNumber, user_id: user.id},
            order: [
                ['created_at', 'DESC']
            ],
            limit: pageSize
        }).then(userAnswers => {
            return res.json({
                previousTimingMs: userAnswers.map(userAnswer => userAnswer.elapsed_time_ms)
            })
        }).catch(error => {
            console.log(error);
            return res.status(400).json(error.errors) // TODO: handle better error messages
        })
    }).catch(error => {
        console.log(error); 
        return res.status(400).json({message: "User doesn't exists."}) // TODO: handle better error messages
    })
})

module.exports = router;
