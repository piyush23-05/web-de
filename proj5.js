const questions = [
{
    question: "HTML ka full form kya hai?",
    answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "High Text Machine Language", correct: false },
        { text: "Hyper Tool Markup Language", correct: false },
        { text: "Home Text Markup Language", correct: false }
    ]
},
{
    question: "CSS ka use kis liye hota hai?",
    answers: [
        { text: "Website Styling", correct: true },
        { text: "Database", correct: false },
        { text: "Programming", correct: false },
        { text: "Networking", correct: false }
    ]
},
{
    question: "JavaScript kis type ki language hai?",
    answers: [
        { text: "Programming Language", correct: true },
        { text: "Database", correct: false },
        { text: "Operating System", correct: false },
        { text: "Browser", correct: false }
    ]
},
{
    question: "CPU ka full form kya hai?",
    answers: [
        { text: "Central Processing Unit", correct: true },
        { text: "Computer Processing Unit", correct: false },
        { text: "Central Program Unit", correct: false },
        { text: "Control Processing Unit", correct: false }
    ]
},
{
    question: "RAM ka full form kya hai?",
    answers: [
        { text: "Random Access Memory", correct: true },
        { text: "Read Access Memory", correct: false },
        { text: "Random Available Memory", correct: false },
        { text: "Read Available Module", correct: false }
    ]
},
{
    question: "Operating System ka example kaunsa hai?",
    answers: [
        { text: "Windows", correct: true },
        { text: "Python", correct: false },
        { text: "HTML", correct: false },
        { text: "SQL", correct: false }
    ]
},
{
    question: "Database query ke liye kaunsi language use hoti hai?",
    answers: [
        { text: "SQL", correct: true },
        { text: "CSS", correct: false },
        { text: "Java", correct: false },
        { text: "C", correct: false }
    ]
},
{
    question: "GitHub kis liye use hota hai?",
    answers: [
        { text: "Code Hosting", correct: true },
        { text: "Video Editing", correct: false },
        { text: "Game Playing", correct: false },
        { text: "Photo Editing", correct: false }
    ]
},
{
     question: "HTML me hyperlink banane ke liye kaunsa tag use hota hai?",
    answers: [
        { text: "&lt;a&gt;", correct: true },
        { text: "&lt;link&gt;", correct: false },
        { text: "&lt;href&gt;", correct: false },
        { text: "&lt;url&gt;", correct: false }
    ]
},
{
    question: "JavaScript me console output ke liye kya use hota hai?",
    answers: [
        { text: "console.log()", correct: true },
        { text: "print()", correct: false },
        { text: "echo()", correct: false },
        { text: "printf()", correct: false }
    ]
}
];

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");

let current = 0;
let score = 0;

function startQuiz() {
    current = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    result.innerHTML = "";
    showQuestion();
}

function showQuestion() {
    reset();

    let q = questions[current];

    question.innerHTML = `Question ${current + 1} / ${questions.length}<br><br>${q.question}`;

   const shuffledAnswers = [...q.answers].sort(() => Math.random() - 0.5);

shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            if (answer.correct) {
                button.classList.add("correct");
                score++;
            } else {
                button.classList.add("wrong");
            }

            Array.from(answers.children).forEach(btn => btn.disabled = true);

            nextBtn.style.display = "block";
        });

        answers.appendChild(button);
    });
}

function reset() {
    answers.innerHTML = "";
    nextBtn.style.display = "none";
}

nextBtn.addEventListener("click", () => {
    current++;

    if (current < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {

    reset();

    const percentage = (score / questions.length) * 100;

    question.innerHTML = "🎯 Quiz Completed";

    if (percentage >= 75) {

        result.innerHTML = `
        <h2 class="pass">🎉 Congratulations!</h2>
        <p>Your Score: <b>${score} / ${questions.length}</b></p>
        <p>Percentage: <b>${percentage}%</b></p>
        <h3 class="pass">✅ You Passed & Qualified!</h3>
        `;

    } else {

        result.innerHTML = `
        <h2 class="fail">❌ Better Luck Next Time!</h2>
        <p>Your Score: <b>${score} / ${questions.length}</b></p>
        <p>Percentage: <b>${percentage}%</b></p>
        <h3 class="fail">You Did Not Qualify.</h3>
        `;
    }

    nextBtn.style.display = "block";
    nextBtn.innerHTML = "Restart Quiz";

    nextBtn.onclick = startQuiz;
}

startQuiz();