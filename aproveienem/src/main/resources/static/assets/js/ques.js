

const questions = [
  {
    question: "(Enem 2019) As redes de alta tensão para transmissão de energia elétrica geram campo magnético variável o suficiente para induzir corrente elétrica no arame das cercas. Tanto os animais quanto os funcionários das propriedades rurais ou das concessionárias de energia devem ter muito cuidado ao se aproximarem de uma cerca quando esta estiver próxima a uma rede de alta tensão, pois, se tocarem no arame da cerca, poderão sofrer choque elétrico. Para minimizar este tipo de problema, deve-se:",
    answers: [
      { text: "Fazer o aterramento dos arames da cerca.", correct: true },
      { text: "Acrescentar fusível de segurança na cerca.", correct: false },
      { text: "Realizar o aterramento da rede de alta tensão.", correct: false },
      { text: "Instalar fusível de segurança na rede de alta tensão.", correct: false },
      { text: "Utilizar fios encapados com isolante na rede de alta tensão.", correct: false }
    ]
  },

  {
    question: "(Enem 2018) Com o avanço das multifunções dos dispositivos eletrônicos portáteis, como os smartphones, o gerenciamento da duração da bateria desses equipamentos torna-se cada vez mais crítico. O manual de um telefone celular diz que a quantidade de carga fornecida pela sua bateria é de 1500 mAh. A quantidade de carga fornecida por essa bateria, em coulomb, é de:",
    answers: [
      { text: "90.", correct: false },
      { text: "1500.", correct: false },
      { text: "5400.", correct: true },
      { text: "90.000.", correct: false },
      { text: "5.400.000.", correct: false }
    ]
  },
  {
    question: "(Unicamp 2021) Lâmpadas de luz ultravioleta (UV) são indicadas para higienização e esterilização de objetos e ambientes em razão do seu potencial germicida. Considere uma lâmpada UV de potência P = 100 W que funcione por 15 minutos durante o processo de esterilização de um objeto. A energia elétrica consumida pela lâmpada nesse processo é igual a:",
    answers: [
      { text: "0,0066 kWh.", correct: false },
      { text: "0,015 kWh.", correct: false },
      { text: "0,025 kWh.", correct: true },
      { text: "1,5 kWh.", correct: false },
      { text: "0,010 kWh.", correct: false }
    ]
  },
  {
    question: "(Unicamp 2021) Lâmpadas de luz ultravioleta (UV) são indicadas para higienização e esterilização de objetos e ambientes em razão do seu potencial germicida. Em outro processo de esterilização, uma lâmpada UV de potência P = 60 W funciona sob uma diferença de potencial elétrico U = 100 V. A potência elétrica pode ser expressa também em kVA, sendo 1 kVA = 1000 V x 1 A = 1000 W. A corrente elétrica i do circuito que alimenta a lâmpada é igual a:",
    answers: [
      { text: "0,36 A.", correct: false },
      { text: "0,60 A.", correct: true },
      { text: "1,6 A.", correct: false },
      { text: "3,6 A.", correct: false },
      { text: "0,70 A.", correct: false }
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

