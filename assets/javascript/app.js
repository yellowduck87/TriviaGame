
$(document).ready(function () {

    var questions = {
        q1: {
            qu: "How many different sounds does a chicken make to communicate?",
            an: {
                a: ": cluck, cluck",
                b: ": More than 200 distinct cheeps and chirps.",
                c: ": Almost 500 crazy chicken sounds!",
                d: ": 27 sounds",
            },
            cor: 1,
            corStr: "more than 200 distinct cheeps and chirps.",
            im: "assets/images/chicken.jpg",
            sou: "#",
        },
        q2: {
            qu: "Which bird is the smartest?",
            an: {
                a: ": the crow",
                b: ": the dodo",
                c: ": the mockingjay ",
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
                c: ": the size of a pea",
                d: ": 'this big'",
            },
            cor: 2,
            corStr: "the size of a pea",
            im: "assets/images/hummingbird.png",
            sou: "#",
        },
        q4: {
            qu: "Cardinals like to cover themselves in what thing? ",
            an: {
                a: ": Snow",
                b: ": Pollen",
                c: ": Ants",
                d: ": Honey",
            },
            cor: 2,
            corStr: "Ants",
            im: "assets/images/crazy.jpg",
            sou: "#",
        },
        q5: {
            qu: "What about the ostrich is the biggest, relativeley, out of any any animal?",
            an: {
                a: ": It's eyes",
                b: ": It's personality",
                c: ": It's legs",
                d: ": It's feathers",
            },
            cor: 0,
            corStr: "It's eyes",
            im: "assets/images/ostrich.jpg",
            sou: "#",
        },
        q6: {
            qu: "Which bird is paranoid enough to sleep with its eyes open?",
            an: {
                a: ": penguins",
                b: ": Big Bird",
                c: ": ducks",
                d: ": eagles",
            },
            cor: 2,
            corStr: "ducks",
            im: "assets/images/duck.jpg",
            sou: "#",
        },
        q7: {
            qu: "Kiwis have a few unusual features for birds, including:",
            an: {
                a: ": adept accounting skills",
                b: ": nostrils at the point of the beak",
                c: ": an extra 6 bones",
                d: ": fireproof feathers",
            },
            cor: 1,
            corStr: "nostrils at the point of the beak",
            im: "assets/images/kiwi.jpg",
            sou: "#",
        },
        q8: {
            qu: "What parrot is known to have the largest human language vocabulary?",
            an: {
                a: ": the african gray parrot",
                b: ": the macaw",
                c: ": the cockatoo",
                d: ": the night parrot",
            },
            cor: 0,
            corStr: "the african gray parrot",
            im: "assets/images/parrot.jpg",
            sou: "#",
        },
        q9: {
            qu: "In China, what strange bird product is a delicacy?",
            an: {
                a: ": poo",
                b: ": toes",
                c: ": feathers",
                d: ": nests",
            },
            cor: 3,
            corStr: "nests",
            im: "assets/images/nest.jpg",
            sou: "#",
        },
        q10: {
            qu: "THe Bassian Thrusher sometimes flushes prey by:",
            an: {
                a: ": karate",
                b: ": yodeling",
                c: ": yelling",
                d: ": farting",
            },
            cor: 3,
            corStr: "farting",
            im: "assets/images/argument.jpg",
            sou: "#",
        },
        q11: {
            qu: "What it is that a woodpecker pecks for?",
            an: {
                a: ": acorn storage",
                b: ": mating calls",
                c: ": bugs",
                d: ": morse code",
            },
            cor: 0,
            corStr: "acorn storage",
            im: "assets/images/woodpecker.png",
            sou: "#",
        },
        q12: {
            qu: "Yawn sympathy isn't only for humans and thier dogs. What bird can catch yawns?",
            an: {
                a: ": penguins",
                b: ": storks",
                c: ": budgies",
                d: ": flamingos",
            },
            cor: 2,
            corStr: "budgies",
            im: "assets/images/yawn.jpg",
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

    function playAgain() {
        var again = $("<button>");
        again.attr("id", "play-again").addClass("btn btn-danger");
        again.text("Play Again?")
        $("#sub-head").append(again);
        counter = 0;
        answerChosen = false;
        wrong = 0;
        right = 0;
        $("#play-again").on("click", function (){
            popQuiz();
            makeTimer();
        })
    }
 

    function gameOver() {
        console.log("game over");
        $("#sub-head").empty();
        $("#question-box").html("<h1>Game Over</h1>");
        calculateScore();
        timer.stop();
        playAgain();
    }
    

});