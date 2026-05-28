

const questions = [
  {
    question: "(Enem 2017) Um estudante comprou um caderno por R$ 25,00 e recebeu 10% de desconto no pagamento à vista. O valor pago pelo estudante foi de:",

    answers: [
      { text: "R$ 20,00", correct: false },
      { text: "R$ 22,50", correct: true },
      { text: "R$ 23,00", correct: false },
      { text: "R$ 24,00", correct: false },
      { text: "R$ 25,00", correct: false }
    ]
  },

  {
    question: "(Enem 2019) Uma caixa d’água possui capacidade para 2.000 litros. Se ela está com apenas 35% de sua capacidade preenchida, a quantidade de água presente é:",

    answers: [
      { text: "350 litros", correct: false },
      { text: "500 litros", correct: false },
      { text: "700 litros", correct: true },
      { text: "900 litros", correct: false },
      { text: "1.000 litros", correct: false }
    ]
  },

  {
    question: "(Enem 2021) Um carro percorre 180 km consumindo 15 litros de combustível. Mantendo o mesmo consumo médio, quantos litros serão necessários para percorrer 300 km?",

    answers: [
      { text: "20 litros", correct: false },
      { text: "22 litros", correct: false },
      { text: "25 litros", correct: true },
      { text: "28 litros", correct: false },
      { text: "30 litros", correct: false }
    ]
  }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próximo";
  showQuestion();

}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ".  " + currentQuestion.
    question;

  currentQuestion.answers.forEach(answers => {
    const button = document.createElement("button");
    button.innerHTML = answers.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", selectAnswer);

  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorret = selectedBtn.dataset.correct === "true";
  if (isCorret) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;

  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Você acertou ${score} de ${questions.length} questões!`;
  nextButton.innerHTML = "Responder Novamente";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }

});

startQuiz();

