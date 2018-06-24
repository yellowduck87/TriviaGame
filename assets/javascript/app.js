//when timer is up, the correct answer is diplayed and the program moves to the next question
//when a selection is picked, the timer stops and goes toward answer screen--noting wether the choice was right or wrong.
$(document).ready(function () {

    var questions = {
        q1: {
            qu: "How many different sounds does a chicken make to communicate?",
            an: {
                a: ": cluck, cluck",
                b: ": correct More than 200 distinct cheeps and chirps.",
                c: ": Almost 500 crazy chicken sounds!",
                d: ": 27 sounds",
            },
            cor: 1,
            corStr: "More than 200 distinct cheeps and chirps.",
            im: "assets/images/chicken.jpg",
            sou: "#",
        },
        q2: {
            qu: "Which bird is the smartest?",
            an: {
                a: ": correct a crow",
                b: ": the dodo",
                c: ": a mockingjay ",
                d: ": the lyre bird",
            },
            cor: 0,
            corStr: "A crow",
            im: "assets/images/crow.jpg",
            sou: "#",
        },
        q3: {
            qu: "How big is a hummingbird's egg?",
            an: {
                a: ": as big as a thumbnail",
                b: ": the size of a grain of rice",
                c: ": correct pea size",
                d: ": 'this big'",
            },
            cor: 2,
            corStr: "pea size",
            im: "assets/images/hummingbird.png",
            sou: "#",
        }
    }
    var quest = Object.keys(questions);
    var counter = 0;
    var answerChosen = false;
    var right = 0;
    var wrong = 0;

    var intervalID;
    var currentTime;
    var movingOn;

    var timer = {
        timerCount: 14,
        reset: function () {
            clearInterval(intervalID);
            timer.timerCount = 14;
            $("#timer").html("<h2>" + this.timerCount + " seconds<h2>")
        },
        start: function () {
            intervalID = setInterval(timer.count, 1000);

        },
        stop: function () {
            clearInterval(intervalID);
        },
        count: function () {
            currentTime = timer.timerCount
            if (counter < quest.length) {
                if (currentTime == -1 && counter < quest.length) {
                    if (currentTime == -1 && counter == quest.length - 1) {
                        wrong++;
                        timer.stop();
                        $("#sub-head").empty();
                        $("#question-box").html("game over")
                        incorrectSelectionGameOver();
                        console.log("no selection game over")

                    } else {
                        wrong++;
                        answerChosen = true;
                        timer.reset();
                        incorrectSelection();
                        console.log("no-selection next question")
                    }
                }
                if (currentTime != -1) {
                    timer.timerCount--;
                    $("#timer").html("<h2>" + currentTime + " seconds</h2>");
                }
            }
        },
    }


    function loadInstructions() {
        $("#sub-head").html("<h2>Choose the correct answer in the time allowed, or else...</h2>" + "<br><br>")
    }
    loadInstructions();

    function startButton() {
        var startBtn = $("<button>");
        startBtn.addClass("btn btn-danger").attr("id", "start-button");
        startBtn.text("Start");
        $("#sub-head").append(startBtn);
    }

    function makeTimer() {
        var timerDiv = $("<div>");
        timerDiv.addClass("col-sm-12 h2");
        timerDiv.attr("id", "timer")
        timerDiv.text(15 + " seconds");
        timerDiv.append(timer);
        $("#sub-head").html(timerDiv);
    }

    function clickStart() {
        $("#start-button").on("click", function () {
            popQuiz();
            makeTimer();
        });
    }

    startButton();
    clickStart();

    function calculateScore() {
        var totalScore = Math.floor((right / (quest.length)) * 100);
        var disScore = ("<br>" + "<h2>You answered " + totalScore + "%" + " of the questions correctly</h2>");
        $("#question-box").append(disScore);
    }

    function displayQuestion() {
        timer.start();
        var correct = parseInt(questions[quest[counter]].cor);


        var questionDiv = $("<div>");
        questionDiv.addClass("h1").attr("id", "ask-question");
        questionDiv.append(questions[quest[counter]].qu);

        var optionsDiv = $("<div>");
        optionsDiv.attr("id", "options-list");
        var questAnswer = questionDiv.append(optionsDiv);

        $("#question-box").html(questAnswer);

        var options = Object.keys(questions[quest[counter]].an);
        var values = Object.values(questions[quest[counter]].an);


        for (var i = 0; i < 4; i++) {
            var opt = $("<button>");
            var optConcat = (options[i] + values[i]);
            opt.addClass("btn btn-secondary").attr("id", [i]);
            opt.append(optConcat);
            $("#options-list").append(opt).append("<br>");
        }

        $(".btn-secondary").on("click", function (event) {
            var chosen = event.target.id;


            if (chosen != correct && counter < quest.length - 1) {
                wrong++
                answerChosen = true;
                timer.reset();
                incorrectSelection();

                console.log("wrong answer next question")

            } else if (chosen == correct && counter < quest.length - 1) {
                right++
                answerChosen = true;
                timer.reset();
                correctSelection();

                console.log("right answer next question")

            } else if (chosen == correct && counter < quest.length) {
                right++;
                timer.stop();
                correctSelectionGameOver();

                console.log("right answer game over")

            } else if (chosen != correct && counter < quest.length) {
                wrong++;
                timer.stop();
                incorrectSelectionGameOver();
                console.log("wrong answer game over")
            }
        });
    }

    function nextQuestion() {
        clearInterval(nextQuestion);
        makeTimer();
        counter++;
        answerChosen = false;
        displayQuestion();

    }

    function popQuiz() {
        $("#sub-head").html("<h1>Good Luck!</h1><br>");
        if (answerChosen === false) {
            displayQuestion();
        }

    }

    // var correctRes = "<h3>Yes! the correct answer was " + questions[quest[counter]].corStr + "</h3>";
    // var incorrectRes = "<h3>Wrong, the correct answer was " + questions[quest[counter]].corStr + "<h3>";

    function makeImg() {
        var getImg = $("<img>");
        getImg.attr("src", questions[quest[counter]].im).attr("id", "info-img");
        $("#timer").append(getImg);
    }


    function correctSelection() {
        setTimeout(nextQuestion, 3000);
        $("#timer").empty();
        $("#question-box").html("<h3>Yes! the correct answer was " + questions[quest[counter]].corStr + "</h3>");
        makeImg();
        console.log(questions[quest[counter]].im)
    }

    function correctSelectionGameOver() {
        setTimeout(gameOver, 3000);
        $("#timer").empty();
        $("#question-box").html("<h3>Yes! the correct answer was " + questions[quest[counter]].corStr + "</h3>");
        makeImg()
        console.log(questions[quest[counter]].im)
    }

    function incorrectSelection() {
        setTimeout(nextQuestion, 3000);
        $("#timer").empty();
        $("#question-box").html("<h3>Wrong, the correct answer was " + questions[quest[counter]].corStr + "<h3>");
        makeImg();
        console.log(questions[quest[counter]].im)
    }

    function incorrectSelectionGameOver() {
        setTimeout(gameOver, 3000);
        $("#timer").empty();
        $("#question-box").html("<h3>Wrong, the correct answer was " + questions[quest[counter]].corStr + "<h3>");
        makeImg();
        console.log(questions[quest[counter]].im)
    }



    function gameOver() {
        console.log("game over");
        $("#sub-head").empty();
        $("#question-box").html("<h1>Game Over</h1>");
        calculateScore();
        timer.stop();
    }
    

});