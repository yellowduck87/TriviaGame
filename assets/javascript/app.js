//create a jQuery element that loads the question and options with a timer
//when timer is up, the correct answer is diplayed and the program moves to the next question
//when a selection is picked, the timer stops and goes toward answer screen--noting wether the choice was right or wrong.


$(document).ready(function () {

    var questions = {
        q1: {
            qu: "triva question 1",
            an: {
                a: ": one",
                b: ": correct",
                c: ": three",
                d: ": four",
            },
            cor: 1,
            im: "#",
            sou: "#",
        },
        q2: {
            qu: "trivia question 2",
            an: {
                a: ": correct",
                b: ": 2two",
                c: ": 2three",
                d: ": 2four",
            },
            cor: 0,
            im: "#",
            sou: "#",
        },
        q3: {
            qu: "trivia question 3",
            an: {
                a: ": 3one",
                b: ": 3two",
                c: ": correct",
                d: ": 3four",
            },
            cor: 2,
            im: "#",
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

    var timer = {
        timerCount: 2,
        reset: function () {
            clearInterval(intervalID);
            timer.timerCount = 2
            $("#timer").text(this.timerCount + " seconds")
        },
        start: function () {
            intervalID = setInterval(timer.count, 1000);

        },
        stop: function () {
            clearInterval(intervalId);
        },
        count: function () {
            currentTime = timer.timerCount
        
            if (currentTime == -1) {
                if (counter < quest.length){
                    $("#sub-head").empty();
                    $("#question-box").html("game over")
                    
                }
                alert("times's up!");
                wrong++;
                answerChosen = true;
                timer.reset();
                nextQuestion();
            }

            if (currentTime != -1) {
                timer.timerCount--;
                $("#timer").text(currentTime + " seconds");
                console.log(currentTime)
            }
        },
    }
  

    function loadInstructions() {
        $("#sub-head").html("'Choose the correct answer in the time allowed, or else...'<br>")
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
        timerDiv.addClass("col-sm-12");
        timerDiv.attr("id", "timer")
        timerDiv.text(3 + " seconds");
        timerDiv.append(timer);
        $("#sub-head").html(timerDiv);
        // timer.reset();
        // timer.start();
    }

    function clickStart() {
        $("#start-button").on("click", function () {
            popQuiz();
            makeTimer();
            // timer.start();

        });
    }



    startButton();
    clickStart();


    function calculateScore() {
        var totalScore = (right / (quest.length)) * 100
        var disScore = ("You answered", totalScore + "%", "of the questions correctly")
    }

    function displayQuestion() {
        timer.start();
        var correct = questions[quest[counter]].cor;


        var questionDiv = $("<div>");
        questionDiv.addClass("h1").attr("id", "ask-question");
        questionDiv.append(questions[quest[counter]].qu);

        var optionsDiv = $("<div>");
        optionsDiv.attr("id", "options-list");
        var questAnswer = questionDiv.append(optionsDiv)
        console.log(questions[quest[counter]].qu)
        console.log(questionDiv)

        $("#question-box").html(questAnswer);

        var options = Object.keys(questions[quest[counter]].an);
        var values = Object.values(questions[quest[counter]].an);


        for (var i = 0; i < 4; i++) {
            var opt = $("<button>");
            var optConcat = (options[i] + values[i]);
            opt.addClass("btn btn-secondary").attr("id", [i]);
            opt.append(optConcat);
            $("#options-list").append(opt).append("<br>");
            console.log(optConcat)
        }
        console.log(currentTime)
        if (parseInt(currentTime) == 0) {
            alert("Too late");
            wrong++;
            answerChosen = true;
            nextQuestion();
        } else if (parseInt(currentTime) == 0 && counter < quest.length) {
            alert("too late");
        }

        $(".btn-secondary").on("click", function (event) {
            // console.log(answerChosen);
            var chosen = event.target.id;
            console.log(chosen);
            console.log(correct);
            cosnole.log(timer.timerCount)

            if (chosen != correct && counter < quest.length - 1) {
                alert("boo, you chose incorrectly")
                wrong++
                answerChosen = true;
                nextQuestion();

            } else if (chosen == correct && counter < quest.length - 1) {
                alert("yay, you chose correctly")
                right++
                answerChosen = true
                nextQuestion();

            } else if (chosen == correct && counter < quest.length) {
                alert("yay, you chose correctly");
                right++;
                $("#sub-head").empty();
                $("#question-box").html("game over")

            } else if (chosen != correct && counter < quest.length) {
                alert("boo, you chose incorrectly")
                wrong++
                $("#sub-head").empty();
                $("#question-box").html("game over")


            }

        });

    }


    function nextQuestion() {
        makeTimer();
        counter++;
        answerChosen = false;
        console.log(counter)
        displayQuestion();
    }


    function popQuiz() {
        $("#sub-head").html("<h1>Good Luck!</h1><br>");
        if (answerChosen === false) {
            displayQuestion();
            console.log(answerChosen);
        }
    }

});