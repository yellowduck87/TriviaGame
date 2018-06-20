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
            qu: "triva question",
            an: {
                a: ": one",
                b: ": two",
                c: ": three",
                d: ": four",
            },
            cor: "b",
            im: "#",
            sou: "#",
        },
        q2: {
            qu: "question",
            an: {
                a: ": one",
                b: ": two",
                c: ": three",
                d: ": four",
            },
            cor: "b",
            im: "#",
            sou: "#",
        },
        q3: {
            qu: "question",
            an: {
                a: ": one",
                b: ": two",
                c: ": three",
                d: ": four",
            },
            cor: "b",
            im: "#",
            sou: "#",
        }
    }
    var quest = Object.keys(questions);
    var counter = 0;
    var answerChosen = false;
    console.log(quest);




    function loadInstructions() {
        $("#sub-head").text("Choose the correct answer in the time allowed, or else...")
    }
    loadInstructions();

    function start() {
        var startBtn = $("<button>");
        startBtn.addClass("btn btn-danger").attr("id", "start-button");
        startBtn.text("Start");
        $("#sub-head").append(startBtn);
    }

    start();

    function makeTimer() {
        var timer = ("<div>");
        timer.addClass("timer");
        timer.attr("id", "begin");
    }

    // console.log(questions[quest[counter]].an[0])

    function popQuiz() {


        var questionDiv = $("<div>");
        questionDiv.addClass("h1").attr("id", "ask-question");
        questionDiv.append(questions[quest[counter]].qu);

        var optionsDiv = $("<div>");
        optionsDiv.attr("id", "options-list");

    
        $("#question-box").append(questionDiv).append(optionsDiv);

        var options = Object.keys(questions[quest[counter]].an);
        var values = Object.values(questions[quest[counter]].an);

        for (var i = 0; i < 4; i++) {
            var opt = $("<button>");
            var optConcat = (options[i] + values[i]);
            opt.addClass("btn btn-secondary").attr("id", [i]);
            opt.append(optConcat);
            $("#options-list").append(opt);
            console.log(optConcat)
        }





    }
    popQuiz();
    // console.log(onDeck);



    function beginGame() {
        $("#start-button").on("click", function () {
            $("#start-button").remove();
            $("#timer").append(timer);
            $("#question-box").append(quiz)
        })
    }
})

// for (var i = 0; i < quest.length; i++) {
//     var onDeck = questions[quest[i]];
//     var ask = questions[quest[i]].qu;
//     // var options = questions[quest[i]].an;
//     var correct = questions[quest[i]].cor;
//     var image = questions[quest[i]].im;
//     var sound = questions[quest[i]].sou;
// }
//     if (answerChosen === false) {
//         options.forEach( function (){
//             var questList = $("<button>");
//             questList.text(options[i]).addClass("what");
//             $("#question-box").append(questList);
//         })
//         }



// console.log(ask);
// console.log(options);
// console.log("first option", options[0]);
// console.log(correct);