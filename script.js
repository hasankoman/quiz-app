function Question(questionText, questionOptions, correctAnswer) {
  this.questionText = questionText;
  this.questionOptions = questionOptions;
  this.correctAnswer = correctAnswer;
}

Question.prototype.checkQuestionsAnswer = function (cevap) {
  return cevap === this.correctAnswer;
};

let questions = [
  new Question(
    "1-Hangisi javascript paket yönetim uygulamasıdır?",
    {
      a: "Node.js",
      b: "Typescript",
      c: "Nuget",
      d: "Npm",
    },
    "a"
  ),
  new Question(
    "2-Hangisi javascript paket yönetim uygulamasıdır?",
    {
      a: "Node.js",
      b: "Typescript",
      c: "Nuget",
      d: "Npm",
    },
    "c"
  ),
  new Question(
    "3-Hangisi javascript paket yönetim uygulamasıdır?",
    {
      a: "Node.js",
      b: "Typescript",
      c: "Nuget",
      d: "Npm",
    },
    "b"
  ),
  new Question(
    "4-Hangisi javascript paket yönetim uygulamasıdır?",
    {
      a: "Node.js",
      b: "Typescript",
      c: "Nuget",
      d: "Npm",
    },
    "d"
  ),
];

const quiz = new Quiz(questions);
let options = document.querySelector(".option-list");
let correctIcon = '<i class="fas fa-check "></i>';
let incorrectIcon = '<i class="fas fa-times "></i>';
let correctCounter = 0;
function Quiz(questions) {
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.bringQuestion = function () {
  return this.questions[this.questionIndex];
};

console.log(quiz.bringQuestion());

showQuestion(quiz.bringQuestion());
document.querySelector(".btn-start").addEventListener("click", function () {
  hideNextBtn();
  console.log(quiz.questionIndex);
  showQuestion(quiz.bringQuestion());

  showQuestionNumber(quiz.questionIndex + 1, questions.length);
  startTimer(9);
  startTimerLine();
  document.querySelector(".quiz-card").classList.add("show");
  document.querySelector(".btn-next").textContent = "Next Question";
});

document.querySelector(".btn-next").addEventListener("click", function () {
  if (questions.length - 1 > quiz.questionIndex + 1) {
    hideNextBtn();
    quiz.questionIndex += 1;
    showQuestionNumber(quiz.questionIndex + 1, quiz.questions.length);
    startTimer(9);
    startTimerLine();

    document.querySelector(".card-header .timer .timer-time").textContent = 10;
    showQuestion(quiz.bringQuestion());

    console.log(quiz.questionIndex);
  } else if (questions.length == quiz.questionIndex + 2) {
    hideNextBtn();
    quiz.questionIndex += 1;
    showQuestionNumber(quiz.questionIndex + 1, quiz.questions.length);
    startTimer(9);
    startTimerLine();
    document.querySelector(".card-header .timer .timer-time").textContent = 10;
    console.log(quiz.questionIndex);
    showQuestion(quiz.bringQuestion());
  } else {
    console.log("hasan");
    showResult(correctCounter, questions.length);
    document.querySelector(".result-card").classList.add("show");
    document.querySelector(".result-card").classList.remove("d-none");
    document.querySelector(".start").classList.add("d-none");
    document.querySelector(".quiz-card").classList.add("d-none");
  }
});

function showQuestion(question) {
  let questiontxt = `<span>${question.questionText}</span>`;
  let questionOpts = "";
  for (let answer in question.questionOptions)
    questionOpts += `
  
          <div class="options" onclick="checkAnswer(this), stopInterval()">
            <span><b>${answer}</b>: ${question.questionOptions[answer]} </span>
            
          </div>
  
  `;
  document.querySelector(".option-list").innerHTML = questionOpts;
  document.querySelector(".question-text").innerHTML = questiontxt;
}

let answerOfQuestion = quiz.questions[quiz.questionIndex].correctAnswer;

function checkAnswer(answer) {
  let checkingAnswer = answer.querySelector("span b").textContent;
  showNextBtn();
  console.log(quiz.questionIndex);
  if (questions.length - 1 > quiz.questionIndex) {
    document.querySelector(".btn-next").textContent = "Next Question";
  } else {
    document.querySelector(".btn-next").textContent = "Finish Quiz";
  }
  clearInterval(timerInterval);
  if (quiz.questions[quiz.questionIndex].correctAnswer == checkingAnswer) {
    correctCounter += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", correctIcon);
  } else {
    answer.classList.add("wrong");
    answer.insertAdjacentHTML("beforeend", incorrectIcon);
  }
  for (let i = 0; i < options.children.length; i++) {
    options.children[i].classList.add("disabled");
  }
}

function showNextBtn() {
  document.querySelector(".btn-next").classList.add("show");
}

function hideNextBtn() {
  document.querySelector(".btn-next").classList.remove("show");
}

function showQuestionNumber(onQuestion, totalQuestion) {
  let tag = `<span class="badge bg-info">${onQuestion} / ${totalQuestion}</span>`;
  document.querySelector(".card-footer .question-index").innerHTML = tag;
}

function showResult(correctCount, totalQuestion) {
  document
    .querySelector(".buttons")
    .insertAdjacentHTML(
      "beforebegin",
      `<span class="mt-2 mb-3">${totalQuestion} sorudan ${correctCount} tanesini doğru yaptınız.</span>`
    );
}

document.querySelector(".btn-tryagain").addEventListener("click", function () {
  quiz.questionIndex = 0;
  document.querySelector(".card-header .timer .timer-time").textContent = 10;
  correctCounter = 0;
  document.querySelector(".result-card span").remove();
  document.querySelector(".result-card").classList.add("d-none");
  document.querySelector(".start").classList.remove("d-none");
  document.querySelector(".quiz-card").classList.remove("d-none");
  document.querySelector(".btn-start").click();
});

document.querySelector(".btn-quit").addEventListener("click", function () {
  window.location.reload();
});

function startTimer(time) {
  timerInterval = setInterval(timer, 1000);
  function timer() {
    document.querySelector(".card-header .timer .timer-time").textContent =
      time;
    time -= 1;
    if (time < 0) {
      clearInterval(timerInterval);
      if (questions.length - 1 > quiz.questionIndex) {
        document.querySelector(".btn-next").textContent = "Next Question";
      } else {
        document.querySelector(".btn-next").textContent = "Finish Quiz";
      }
      showNextBtn();
      let answer = quiz.bringQuestion().correctAnswer;
      for (let option of options.children) {
        if (option.querySelector("span b").textContent == answer) {
          option.classList.add("correct");
          console.log("hasan");
          option.insertAdjacentHTML("beforeend", correctIcon);
        }
      }
      for (let i = 0; i < options.children.length; i++) {
        options.children[i].classList.add("disabled");
      }
    }
  }
}

function startTimerLine() {
  timeLineInterval = setInterval(timerLine, 10);
  let width = 550;
  function timerLine() {
    widthValue = width + "px";
    width -= 0.55;
    document.querySelector(".card-header .timer-line").style.width = widthValue;
    if (width < 0.55) {
      width = 0;
      widthValue = width + "px";
      document.querySelector(".card-header .timer-line").style.width =
        widthValue;
      clearInterval(timeLineInterval);
    }
  }
}

function stopInterval() {
  clearInterval(timeLineInterval);
}
