/**
 * This is where you will create routes for our
 * questions API
 * Base url: /api/questions
 * We have imported express and router and
 * exported the router. 
 * 
 * Your task is to fill in the router with appropriate
 * routes and implement the functionality of getting
 * data from mongodb and return appropriate results
 */

const express = require('express');
const router = express.Router();

// Question Data
const Questions = require('../../models/questions-data.json')
// Hint: get a bonus task here
const shuffleArray = require('../../utils/shuffle');


/**
 * Route details
 * api GET /api/questions
 * Description: Get all questions in the database
 * IMPORTANT: remove the answers from it's data
 * we don't want the client to know the answer.
 * 
 * Structure of the return JSON:
 * [
 *    {
 *      question: 'sample question',
 *      options: [
 *        'option1',
 *        'option2'
 *      ],
 *      id: '1234'
 *    }
 * ]
 * 
 */

router.get('/', (req, res) => {
  let ques_data = Questions.map(q => {
    return {
      question: q.question,
      options: q.options,
      id: q.id,
    }
  });
  res.send(shuffleArray(ques_data));
})

/**
 * Route details
 * api GET /api/questions/count
 * Description: This will get the count of the questions
 * from the database and return it 
 * Structure of the return JSON:
 * {
 *  count: 4
 * }
 */
router.get('/count', (req, res) => {
  // Remove the lines below and write your implementation
  let count = 0;
  for (var i in Questions) {
    count++
  }

  res.send({
    count: count
  })
})

/**
 * Route details
 * api GET /api/questions/:qId
 * Description: This will get one question given the question ID
 * Structure of the return JSON:
 * {
 *    question: 'sample question',
 *    options: [
 *      'option1',
 *      'option2'
 *    ],
 *    id: '1234'
 * }
 */
router.get('/:qId', (req, res) => {
  let question = Questions.find(q => q.id == req.qID)

  res.send({
    question: question.question,
    options: question.options,
    id: [req.qID]
  })
})


/**
 * Route details
 * api POST /api/questions/result
 * Description: This will receive a body with user
 * entered answers and will return the results. 
 * Calculation of the result will happen here and you
 * would only send the results.
 * 
 * Structure of body JSON:
 * {
 *    'questionID': 'user-answer',
 *    'questionID': 'user-answer'
 * }
 * 
 * Structure of the return JSON:
 * {
 *    summary: 'passed OR failed',
 *    score: (how many answers were correct),
 *    total: (how many questions were there)
 * }
 */
router.post('/result', (req, res) => {
  let score = 0;
  let values = Object.values(req.body);
  Questions.map((q) => {
    if (values.includes(q.answer)) {
      score++;
    }
  });
  const result = {
    summary: 'passed',
    score: Questions.length / 2,
    total: Questions.length
 }
 const failed = {
  summary: 'failed',
  score: score,
  total: Questions.length
}
  const quiz_result = {
    summary: 'passed',
    score: score,
    total: Questions.length
  }

  if (quiz_result.score >= result.score) {
    res.send(quiz_result);
  } else {
    res.send(failed);
  }
})


module.exports = router;
