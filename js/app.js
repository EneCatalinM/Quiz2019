import Question from "./Question.js";
import Quiz from "./Quiz.js";

const App = (() => {
  //cache the dom
  const quizEl = document.querySelector(".quiz__container");
  const quizQuestionEl = document.querySelector(".quiz__question");
  const trackerEl = document.querySelector("#quiz__count");
  const progressEl = document.querySelector(".quiz__progressBarInner");
  const taglineEl = document.querySelector(".quiz__text");
  const choicesEl = document.querySelector(".quiz__choices");
  //const choiceEl = document.querySelectorAll(".quiz__choice");
  const nextButtonEl = document.querySelector(".quiz__next");
  const restartButtonEl = document.querySelector(".quiz__restart");
  //create the questions
  const q1 = new Question(
    "First president of US",
    ["Barrack", "Osama", "George", "Monkey"],
    2
  );
  const q2 = new Question(
    "When was JS created?",
    ["June 1995", "May 1995", "July 1885", "Sep 1996"],
    1
  );
  const q3 = new Question(
    "What does CSS stand for?",
    [
      "Country Sheriff Service",
      "Cascading sexy sheets",
      "Cascading style sheets",
      "Monkey"
    ],
    2
  );
  const q4 = new Question(
    "The full form of HTML is...",
    ["Hyper Text Markup Language", "Hold The Mic", "Error", "Monkey"],
    0
  );
  const q5 = new Question(
    "console.log(typeOf []) would return what?",
    ["Array", "Object", "null", "array"],
    1
  );
  //creating the quizz
  const quiz = new Quiz([q1, q2, q3, q4, q5]);
  const listeners = _ => {
    nextButtonEl.addEventListener("click", function() {
      const userGuess = document.querySelector('input[name="choice"]:checked');

      if (userGuess) {
        const key = Number(userGuess.getAttribute("data-order"));
        quiz.guess(key);
        renderAll();
      } else {
        alert("Choose an option");
      }
    });
    restartButtonEl.addEventListener("click", function() {
      console.log("restart");
      quiz.currentIndex = 0;
      quiz.score = 0;
      nextButtonEl.style.opacity = 1;
      setValue(taglineEl, `Pick an option below!`);
      renderAll();
    });
  };

  const renderQuestion = _ => {
    const currentQuestion = quiz.getCurrentQuestion().question;
    setValue(quizQuestionEl, currentQuestion);
  };
  const setValue = (elem, value) => {
    elem.innerHTML = value;
  };
  const renderChoices = _ => {
    const currentChoices = quiz.getCurrentQuestion().choices;
    let markup = ``;
    currentChoices.forEach((item, index) => {
      markup += `<li class="quiz__choice">
      <input type="radio" name="choice" class="quiz__input" data-order="${index}" id="choice${index}"/>
      <label for="choice${index}" class="quiz__label">
        <i></i>
        <span>${item}</span>
      </label>
    </li>`;
    });
    setValue(choicesEl, markup);
  };
  const renderTracker = _ => {
    const currentIndex = quiz.currentIndex + 1;
    const finalIndex = quiz.questions.length;
    let markup = `${currentIndex} of ${finalIndex}`;
    setValue(trackerEl, markup);
  };
  const launch = (width, maxPercent) => {
    let loadingBar = setInterval(function() {
      if (width > maxPercent) {
        clearInterval(loadingBar);
      } else {
        width++;
        progressEl.style.width = `${width}%`;
      }
    }, 3);
  };
  const renderProgress = _ => {
    const currentIndex = quiz.currentIndex;
    const finalIndex = quiz.questions.length;
    const calc = Math.round((currentIndex / finalIndex) * 100);
    launch(0, calc);
  };
  const getPercentage = (num1, num2) => {
    return Math.round((num1 / num2) * 100);
  };
  const renderEndScreen = _ => {
    setValue(quizQuestionEl, `Great JOB`);
    setValue(taglineEl, `Complete!`);
    setValue(
      trackerEl,
      `Your score: ${getPercentage(quiz.score, quiz.questions.length)}%`
    );
    nextButtonEl.style.opacity = 0;
    renderProgress();
  };

  //render
  const renderAll = () => {
    if (quiz.hasEnd()) {
      //renderEndScreen
      renderEndScreen();
      console.log("END");
    } else {
      //1.render the question
      renderQuestion();
      //2.render the choices elements
      renderChoices();
      //3.render the tracker
      renderTracker();
      //4.render the progress
      renderProgress();
    }
  };

  return {
    renderAll,
    listeners
  };
})();
App.renderAll();
App.listeners();
