// JavaScript funcionalidad de el juego quiz
let score = 0; 
let currentQuestionIndex = 0;
let hasAnswered = false;

// Elementos del DOM
const timerElement = document.getElementById('time');
const pointsElement = document.getElementById('points');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.querySelector('#end-button button');

// Inicialización del temporizador
setTimeElement(timerElement);

// Preguntas y respuestas
const questions = [
    {
        question: "¿Cuál es la capital de Francia?",
        options: ["Madrid", "París", "Roma", "Berlín"],
        correct: 1
    },
    {
        question: "¿Cuál es el resultado de (5 + 3) × 2 - 4?",
        options: ["12", "16", "10", "8"],
        correct: 0
    },
    {
        question: "¿Qué lenguaje se usa para estilizar páginas web?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        correct: 1
    },
    {
        question: "¿Quién pintó la Mona Lisa?",
        options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Miguel Ángel"],
        correct: 2
    },
    {
        question: "¿Cuál es el océano más grande del mundo?",
        options: ["Atlántico", "Índico", "Ártico", "Pacífico"],
        correct: 3
    }
];

// Mostrar una pregunta
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endTime();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = "";

    const buttonColors = ['btn-info', 'btn-danger', 'btn-warning', 'btn-success'];

    // Reiniciar temporizador
    setTime(10); 
    startTimer();

    // Asignar respuestas de la pregunta actual
    for (let i = 0; i < currentQuestion.options.length; i++) {
        const option = currentQuestion.options[i];
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('btn', buttonColors[i], 'w-100', 'answer');
        button.addEventListener('click', handleAnswerClick(i, currentQuestion.correct));
        answersElement.appendChild(button);
    }
    hasAnswered = false;
}

// Al acabar el temporizador
end = function() {
    markAnswers(null, true); 
};

// Al hacer click en una respuesta
function handleAnswerClick(index, correctIndex) {
    return function () {
        checkAnswer(index, correctIndex); 
    };
}

// Verificar respuesta
function checkAnswer(selectedIndex, correctIndex) {
    if (hasAnswered) return;
    hasAnswered = true;

    clearInterval(interval);

    const isCorrect = selectedIndex === correctIndex;

    if (isCorrect) {
        score++;
        pointsElement.textContent = score;
    }

    markAnswers(selectedIndex, false);
}


// Marcar las respuestas correctas e incorrectas
function markAnswers(selectedIndex, timeExpired = false) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;
    const buttons = document.querySelectorAll('.answer');

    for (let i = 0; i < buttons.length; i++) {
        // Si el tiempo ha expirado, marcamos todas las respuestas incorrectas
        if (timeExpired) {
            if (i == correctIndex) {
                buttons[i].textContent += " ✔️";
            } else {
                buttons[i].textContent += " ❌";
                buttons[i].style.opacity = 0.5;
            }

        } else {
            // Si no ha expirado, solo marcamos la respuesta seleccionada como incorrecta si es incorrecta
            if (i == correctIndex) {
                buttons[i].textContent += " ✔️";
            }

            if (i == selectedIndex && i !== correctIndex) {
                buttons[i].textContent += " ❌";
            }

            // Si no es la correcta ni la seleccionada, se baja la opacidad
            if (i !== correctIndex && i !== selectedIndex) {
                buttons[i].style.opacity = 0.5;
            }
        }
    }

    nextButton.classList.remove('d-none');
}


// Finalizar el juego
function endTime() {
    localStorage.setItem('quizScore', score);
    localStorage.setItem('questionsAnswered', questions.length);
    window.location.href = 'quiz-end.html';
}


// Botón de siguiente pregunta
nextButton.addEventListener('click', function () {
    nextButton.classList.add('d-none');
    currentQuestionIndex++; 
    showQuestion();
});


// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    shuffleArray(questions);
    showQuestion();
});


// mezclar preguntas al azar
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i]; array[i] = array[j];
        array[j] = temp;
    }
}
