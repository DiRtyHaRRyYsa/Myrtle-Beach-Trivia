let currentQuestionIndex = 0;
let score = 0;
let coins = 0;
let questions = [];

fetch('Myrtle-Beach-Trivia/data/questions.json')
    .then(res => res.json())
    .then(data => {
        questions = data;
        showQuestion();
    });

document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert("Game over! Final Score: " + score + ", Coins: " + coins);
    }
});

function showQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionData.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    questionData.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.innerText = answer;
        btn.onclick = () => selectAnswer(index === questionData.correctIndex);
        answersDiv.appendChild(btn);
    });
}

function selectAnswer(isCorrect) {
    if (isCorrect) {
        score += 10;
        coins += 5;
    } else {
        score -= 5;
    }
    document.getElementById('score').innerText = score;
    document.getElementById('coins').innerText = coins;
}
