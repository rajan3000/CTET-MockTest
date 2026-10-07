const questions = [

    {
        question: "भारत के संविधान का निर्माण किस संस्था ने किया था?",
        options: [
            "संसद",
            "संविधान सभा",
            "सर्वोच्च न्यायालय",
            "मंत्रिमंडल"
        ],
        answer: 1
    },

    {
        question: "बाल विकास में सबसे महत्वपूर्ण भूमिका किसकी होती है?",
        options: [
            "केवल विद्यालय की",
            "केवल शिक्षक की",
            "परिवार और वातावरण की",
            "केवल समाज की"
        ],
        answer: 2
    },

    {
        question: "पियाजे के अनुसार संज्ञानात्मक विकास की पहली अवस्था कौन-सी है?",
        options: [
            "औपचारिक संक्रियात्मक अवस्था",
            "संवेदी-गामक अवस्था",
            "मूर्त संक्रियात्मक अवस्था",
            "पूर्व-संक्रियात्मक अवस्था"
        ],
        answer: 1
    },

    {
        question: "शिक्षण का मुख्य उद्देश्य क्या होना चाहिए?",
        options: [
            "केवल परीक्षा पास करवाना",
            "केवल पाठ्यक्रम पूरा करना",
            "विद्यार्थी का सर्वांगीण विकास",
            "केवल अंक बढ़ाना"
        ],
        answer: 2
    },

    {
        question: "भारत की राजधानी क्या है?",
        options: [
            "मुंबई",
            "नई दिल्ली",
            "कोलकाता",
            "चेन्नई"
        ],
        answer: 1
    },

    {
        question: "बाल विकास की प्रक्रिया कैसी होती है?",
        options: [
            "मुंअचानक होने वाली",
            "निरंतर होने वाली",
            "केवल विद्यालय में होने वाली",
            "केवल शारीरिक होने वाली"
        ],
        answer: 2
    }

    // इसी प्रकार कुल 150 प्रश्न रखें
];


let currentQuestion = 0;

let userAnswers = new Array(questions.length).fill(null);

let timeLeft = 30 * 60;

let testSubmitted = false;


/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {

    const q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        currentQuestion + 1;

    document.getElementById("questionText").textContent =
        q.question;

    const optionsDiv =
        document.getElementById("options");

    optionsDiv.innerHTML = "";

    q.options.forEach((option, index) => {

        const label = document.createElement("label");

        label.className = "option";

        if (userAnswers[currentQuestion] === index) {
            label.classList.add("selected");
        }

        label.innerHTML = `
            <input
                type="radio"
                name="answer"
                value="${index}"
                ${userAnswers[currentQuestion] === index ? "checked" : ""}
            >
            ${String.fromCharCode(65 + index)}. ${option}
        `;

        label.onclick = function () {

            userAnswers[currentQuestion] = index;

            loadQuestion();
            updatePalette();

        };

        optionsDiv.appendChild(label);

    });

    document.getElementById("previousBtn").disabled =
        currentQuestion === 0;

    document.getElementById("nextBtn").disabled =
        currentQuestion === questions.length - 1;

    updatePalette();
}


/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* =========================
   PREVIOUS QUESTION
========================= */

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* =========================
   QUESTION PALETTE
========================= */

function createPalette() {

    const palette =
        document.getElementById("questionPalette");

    palette.innerHTML = "";

    questions.forEach((q, index) => {

        const button =
            document.createElement("button");

        button.className = "palette-btn";

        button.textContent = index + 1;

        button.onclick = function () {

            currentQuestion = index;

            loadQuestion();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        };

        palette.appendChild(button);

    });
}


function updatePalette() {

    const buttons =
        document.querySelectorAll(".palette-btn");

    buttons.forEach((button, index) => {

        button.classList.remove("answered");
        button.classList.remove("current");

        if (userAnswers[index] !== null) {
            button.classList.add("answered");
        }

        if (index === currentQuestion) {
            button.classList.add("current");
        }

    });
}


/* =========================
   TIMER
========================= */

function startTimer() {

    const timer =
        document.getElementById("timer");

    const interval =
        setInterval(function () {

            if (timeLeft <= 0) {

                clearInterval(interval);

                submitTest();

                return;
            }

            const minutes =
                Math.floor(timeLeft / 60);

            const seconds =
                timeLeft % 60;

            timer.textContent =
                String(minutes).padStart(2, "0")
                + ":"
                +
                String(seconds).padStart(2, "0");

            timeLeft--;

        }, 1000);
}


/* =========================
   SUBMIT TEST
========================= */

function submitTest() {

    if (testSubmitted) {
        return;
    }

    const unanswered =
        userAnswers.filter(
            answer => answer === null
        ).length;

    const confirmSubmit =
        confirm(
            `क्या आप टेस्ट समाप्त करना चाहते हैं?\n\n` +
            `बिना उत्तर दिए प्रश्न: ${unanswered}`
        );

    if (!confirmSubmit) {
        return;
    }

    testSubmitted = true;

    let correct = 0;

    let wrong = 0;

    questions.forEach((question, index) => {

        if (userAnswers[index] === null) {
            return;
        }

        if (userAnswers[index] === question.answer) {
            correct++;
        } else {
            wrong++;
        }

    });

    const score = correct;

    const percentage =
        ((score / questions.length) * 100).toFixed(2);

    document.getElementById("score").textContent =
        score;

    document.getElementById("percentage").textContent =
        percentage;

    document.getElementById("correct").textContent =
        correct;

    document.getElementById("wrong").textContent =
        wrong;

    document.getElementById("unanswered").textContent =
        unanswered;

    const status =
        document.getElementById("resultStatus");

    if (percentage >= 60) {

        status.textContent =
            "🎉 बहुत अच्छा! आप सफल हुए।";

    } else {

        status.textContent =
            "📚 अधिक अभ्यास की आवश्यकता है।";

    }

    document.getElementById("testArea")
        .classList.add("hidden");

    document.querySelector(".palette-container")
        .classList.add("hidden");

    document.querySelector(".submit-btn")
        .classList.add("hidden");

    document.getElementById("result")
        .classList.remove("hidden");

}


/* =========================
   RESTART
========================= */

function restartTest() {

    location.reload();

}


/* =========================
   START
========================= */

createPalette();

loadQuestion();

startTimer();