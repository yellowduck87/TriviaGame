//create obects that contain:
//identifier
//--question string
//--multipile choice string
//-----a
//-----b
//-----c
//-----d
//--correct answer
//--image src
//--sound src

//create a jQuery element that loads the question and options with a timer
//when timer is up, the correct answer is diplayed and the program moves to the next question
//when a selection is picked, the timer stops and goes toward answer screen--noting wether the choice was right or wrong.
//next question button
//if answerPicked is true----move to another jQuery element that compares the answer picked and the correct answer

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

    function loadInstructions() {
        $("#sub-head").html("'Choose the correct answer in the time allowed, or else...'<br>")
    }
    loadInstructions();

    function start() {
        var startBtn = $("<button>");
        startBtn.addClass("btn btn-danger").attr("id", "start-button");
        startBtn.text("Start");
        $("#sub-head").append(startBtn);
    }

    function clickStart() {
        $("#start-button").on("click", function () {
            //    while(counter < quest.length){
            popQuiz();

        });
    }



    start();
    clickStart();

    function makeTimer() {
        var timer = ("<div>");
        timer.addClass("timer");
        timer.attr("id", "begin");
    }

    function displayQuestion() {
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

        $(".btn-secondary").on("click", function (event) {
            // console.log(answerChosen);
            var chosen = event.target.id;
            console.log(chosen);
            console.log(correct);

            if (chosen == correct && counter < quest.length - 1) {
                alert("yay, you chose correctly")
                right++
                answerChosen = true
                nextQuestion();
            } else if (chosen != correct && counter < quest.length - 1) {
                alert("boo, you chose incorrectly")
                wrong++
                answerChosen = true;
                nextQuestion();
            } else if (chosen == correct && counter < quest.length) {
                alert("yay, you chose correctly");
                right++;
                $("#question-box").html("game over")
            } else if (chosen != correct && counter < quest.length) {
                alert("boo, you chose incorrectly")
                wrong++
                $("#question-box").html("game over")

            }

        });

    }


    function nextQuestion() {
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
