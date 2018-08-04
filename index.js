'use strict';
let questionNumber = 0;
let score = 0;

function generateQuestion() {
  console.log(`'genQ' ran`);
  if (questionNumber < STORE.length) {
    return`
    <img class="graphic" src="graphics/Penalty-Kick.png" alt="penalty kick">
      <form>
        <fieldset name="multiple-choice-answers">
          <legend><h1 class="js-question">${STORE[questionNumber].question}</h1></legend>
          <input class="option" id="choice-1" type="radio" name="answer" role="button" value="${STORE[questionNumber].answers[0]}"/>
          <label for="choice-1">${STORE[questionNumber].answers[0]}</label>
          <input class="option" id="choice-2" type="radio" name="answer" role="button" value="${STORE[questionNumber].answers[1]}"/>
          <label for="choice-2">${STORE[questionNumber].answers[1]}</label>
          <input class="option" id="choice-3" type="radio" name="answer" role="button" value="${STORE[questionNumber].answers[2]}"/>
          <label for="choice-3">${STORE[questionNumber].answers[2]}</label>
          <input class="option" id="choice-4" type="radio" name="answer" role="button" value="${STORE[questionNumber].answers[3]}" required/>
          <label for="choice-4">${STORE[questionNumber].answers[3]}</label>
        </fieldset>
        <button type="submit" class="js-answer-button answer-button" role="button">Submit</button>
      </form>
        <ul>
          <li>Question: ${questionNumber + 1}/10</li>
          <li>Current Score: ${score}</li>
        </ul>`;
  } else {
    generateQuizResultPage();
  }
  // this function is responsible for generating the correct
  // question in the sequence
  console.log('`generateQuestion` ran');
}

function displayQuestion() {
  $('.js-question-page').html(generateQuestion());
  console.log('`displayQuestion` ran');
  // this function will display the correct question to the browser
}

function handleStartClicked() {
  $('.js-start-page').on('click', '.js-start-button', function(event) {
    console.log('`handleStartEvent` ran');
    $('.js-start-page').css('display', 'none');
    // $('.js-result-page').css('display', 'none');
    $(displayQuestion);
    $('.js-question-page').css('display', 'block');
  });
  // this function is responsible for when the user
  // is ready to begin the quiz and clicks start
  console.log('`handleStartClicked` ran');
}

function handleAnswerSubmit() {
  $('.js-question-page').on('submit', 'form', function(event) {
    event.preventDefault();
    let selectedRadio = $('input:checked');
    let answer = selectedRadio.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    console.log('`handleAnswerSubmit` ran');
    if (answer === correctAnswer) {
      $('.js-question-page').css('display', 'none'),
      handleCorrectAnswer();
      $('.js-correct-answer-page').css('display', 'block');
      } else {
         $('.js-question-page').css('display', 'none'),
         handleIncorrectAnswer();
         $('.js-incorrect-answer-page').css('display', 'block');

      }
    return false;
  });
  // this function will decide if the answer is correct or
  // not

}

function handleIncorrectAnswer() {
  $('.js-incorrect-answer-page').html(`<img class="graphic" src="graphics/GoalKeeper.png" alt="goal saved">
           <h1>Wrong!</h1>
           <h2>The correct answer is ${STORE[questionNumber].correctAnswer}</h2>
           <p>${STORE[questionNumber].fact}</p>
           <button class="next-button" type="button">NEXT</button>
           <ul>
             <li>Question: ${questionNumber + 1}/10</li>
             <li>Current Score: ${score}</li>
           </ul>`)
  // this function is responsible for generating the
  // incorrect answer screen
  console.log('`handleIncorrectAnswer` ran');
}

function handleCorrectAnswer() {
  score++;
  $('.js-correct-answer-page').html(`<img class="graphic" src="graphics/Goal.png" alt="goal scored">
           <h1>Correct!</h1>
           <h2>${STORE[questionNumber].correctAnswer}</h2>
           <p>${STORE[questionNumber].fact}</p>
           <button class="next-button type="button">NEXT</button>
           <ul>
             <li>Question: ${questionNumber + 1}/10</li>
             <li>Current Score: ${score}</li>
           </ul>`);
  // this function is responsible for generating the
  // correct answer screen
  console.log('`handleCorrectAnswer` ran');
}

function handleNextQuestionClicked() {
  $('div').on('click', '.next-button', function(event) {
    console.log('stuff');
    $('.js-answer-page').css('display', 'none');
    questionNumber++;
    console.log('more stuff');
    $(displayQuestion);
    $('.js-question-page').css('display', 'block');
  });
  // this function is responsible for handling when the
  // user clicks 'next' on the correct/incorrect answer
  // screen
  console.log('`handleNextQuestionClicked` ran');
}

function generateQuizResultPage() {
  if (score >= 7) {
    $('.js-question-page').css('display', 'none');
    $('.js-result-page').html(`<h3>EXCELLENT!</h3>
      <img class="graphic" src="graphics/Cup.png" alt="trophy held up">
      <p>Your Final Score Is: ${score} out of 10!</p>
      <p>Consider yourself an expert in the history of the club!</p>
      <button class="restart-button js-restart-button">Re-start</button>`);
    $('.js-result-page').css('display', 'block');
    } else if (score < 7 && score >= 5) {
      $('.js-question-page').css('display', 'none');
      $('.js-result-page').html(`<h3>Well Done!</h3>
        <img class="graphic" src="graphics/Yellow-Card.png" alt="yellow card">
        <p>Your Final Score Is: ${score} out of 10!</p>
        <p>You know more about the illustrious history of this club than most!</p>
        <button class="restart-button js-restart-button">Re-start</button>`);
      $('.js-result-page').css('display', 'block');
    } else {
      $('.js-question-page').css('display', 'none');
      $('.js-result-page').html(`<h3>Better Luck Next Time!</h3>
        <img class="graphic" src="graphics/Red-Card.png" alt="red card">
        <p>Your Final Score Is: ${score} out of 10!</p>
        <p>Your knowledge of Tottenhams history is limited but you can improve
        by taking this quiz again!</p>
        <button class="restart-button js-restart-button">Re-start</button>`);
      $('.js-result-page').css('display', 'block');
    }
  // after the final answer has been submitted, display
  // the results with appropriate messages
  console.log('`generateResultPage` ran');
}

function restartQuiz() {
  $('div').on('click', '.js-restart-button', function(event) {
    $('.js-result-page').css('display', 'none');
    $('.js-start-page').css('display', 'block');
    questionNumber = questionNumber - 10;
    score = score - score;
  });
  // if the user hits the 'Re-Take the quiz' button
  //they are taken back to the start of the quiz
  console.log('`restartQuiz` ran');
}

function handleQuiz() {
  $(handleStartClicked);
  $(handleNextQuestionClicked);
  $(handleAnswerSubmit);
  $(restartQuiz);
}

$(handleQuiz);
