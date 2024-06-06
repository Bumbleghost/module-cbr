const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Is iemand die naast zijn motorfiets loopt een bestuurder?',
    answers: [
      { text: 'Nee', correct: true }, 
      { text: 'JA', correct: false },
    ]
  },
  {
    question: '"Wanneer valt een gehandicaptenvoertuig onder de regels van een voetganger?',
    answers: [
      { text: 'Wanneer deze zich op de stoep of voetpad bevindt', correct: true },
      { text: 'Wanneer deze zich op de weg bevindt', correct: false },
    ]
  },
  {
    question: 'De aanhanger is 3 meter lang. De ondeelbare lading is gemarkeerd met dit bord en steekt 1,20 meter uit. Mag dit?',
    answers: [
      { text: 'NEE', correct: false },
      { text: 'JA!', correct: true },
    ]
  },
  {
    question: 'Na hoeveel jaar moet een hybride auto voor het eerst APK gekeurd worden?',
    answers: [
      { text: '6 jaar', correct: false },
      { text: '2 jaar', correct: false },
      { text: '4 jaar', correct: true },
      { text: '5 jaar', correct: false },
    ]
  },
  {
    question: 'Na hoeveel jaar moet een hybride auto voor het eerst APK gekeurd worden?',
    answers: [
      { text: '6 jaar', correct: false },
      { text: '2 jaar', correct: false },
      { text: '4 jaar', correct: true },
      { text: '5 jaar', correct: false },
    ]
  }
]