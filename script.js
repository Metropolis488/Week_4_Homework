    var startButton = document.getElementById("controls");
    var questionDisplay = document.getElementById("question");
    var answerBtns = document.getElementById("answer-buttons");
    var secondsDisplay = document.querySelector("#seconds");
    var questionContainer = document.getElementById("question-container");
    var response = document.getElementById("response");
    var displayScore = document.getElementById("score");

    var questionIteration = 0;
    var totalSeconds = 30;
    var score = 0;
    var intervalId;

    var questionLists = [
        {
            question: "Is jQuery obsolete?",
            answer: ["Totally", "Not really", "Defintely not if you are building WordPress sites", "All of the above"],
            correct: "All of the above"
        },
        {
            question: "Should you learn Javascript? (this is a gimme)",
            answer: ["Obviously", "Yes"],
            correct: "Obviously"
        },
        {
            question: "What is your favorite color?",
            answer: ["Orange", "Green"],
            correct: "Green"
        },
        {
            question: "Is HTML 'Code' or a 'Markup'",
            answer: ["Code", "Markup"],
            correct: "Markup"
        },
        {
            question: "Will we learn about React",
            answer: ["Probably", "Not"],
            correct: "Probably"
        },
        {
            question: "Dewey Cox is the greatest solo artist ever",
            answer: ["Obviously", "Maybe not"],
            correct: "Obviously"
        }
    ]

    startButton.addEventListener("click", startGame);

    function startGame() {
        startButton.classList.add("hide");
        questionContainer.classList.remove("hide");
        
        startTimer();
        setQuestion();
    }

    function startTimer() {
        intervalId = setInterval(function () {
            totalSeconds--;
            secondsDisplay.textContent = totalSeconds
            if (totalSeconds <= 0) {
                clearInterval(intervalId);
            } else if (questionIteration === questionLists.length) {
                clearInterval(intervalId);
            }
            console.log(totalSeconds);            
        }, 1000);
        
    }

    function setQuestion() {
        var currentQ = questionLists[questionIteration];
        questionDisplay.textContent = currentQ.question;

        answerBtns.innerHTML = "";
        for (var i = 0; i < currentQ.answer.length; i++) {
            var btn = document.createElement('button')
            btn.textContent = currentQ.answer[i];
            btn.classList.add("btn")
            btn.addEventListener("click", selectAnswer)

            answerBtns.appendChild(btn)
        }
    }

    function selectAnswer() {
        var selected = this.textContent;
        var correct = questionLists[questionIteration].correct        
        var displayResponse;

        if (selected === correct) {
            console.log("YES!")
            scoreTracker();
            displayResponse = true;            
        } else {
            console.log("nope");
            displayResponse = false;
        }

        questionIteration++;

        if (questionIteration < questionLists.length) {
            setQuestion();
        } else {
            questionContainer.classList.add("hide");
            console.log("Show results")
            console.log(score);            
        }
        
        if (displayResponse === true) {
            response.textContent = "Correct";
            response.classList.remove("hide");
        } 
        if (displayResponse !== true && questionIteration !== 3) {
            response.textContent = "Nope";
            response.classList.remove("hide");
            totalSeconds = totalSeconds - 5;
        }            
        if (displayResponse !== true && questionIteration === 3) {
            response.textContent = "Nope, Green is your favorite color";
            response.classList.remove("hide");
            totalSeconds = totalSeconds - 5;
        }
    }
    
    function scoreTracker() {
        score++
        displayScore.textContent = score;
    }

    function userLog() {
        //function to log high scores and users - store in local storage
    }