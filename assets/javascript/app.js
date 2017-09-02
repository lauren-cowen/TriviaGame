window.onload = function() {

    $("#startGame").on("click", countdown.start);

    $(document).on("click", "button.buttonChoice", countdown.compare);


    //calls function that runs countdown

};


var intervalid;
var timeOutID;
var displayedQuestion;
var wins = 0;
var losses = 0;
var listOfQuestions = [{ question: "What do you use to destroy a Horcrux?", answerChoices: ["Basilisk Tears", "Dobby's sock", "Draught of Living Death", "Basilisk venom"], correctAnswer: 4 },
    { question: "Who is Harry Potter's godfather?", answerChoices: ["Sirius Black", "Arthur Weasley", "Dumbledore", "Snape"], correctAnswer: 1 },
    { question: "What is ron's greatest fear?", answerChoices: ["Dementors", "Centaurs", "Spiders", "Ghouls"], correctAnswer: 3 },
    { question: "What breed is Hagrid's pet Dragon?", answerChoices: ["Romanian Longhorn", "Antipodean Opaleye", "Hebridean Black", "Norwegian Ridgeback"], correctAnswer: 4 },
    { question: "What form does Snape's Patronus resemble?", answerChoices: ["Otter", "Doe", "Snake", "Centaur"], correctAnswer: 2 },
    { question: "What is the newspaper Hermione subscribes to?", answerChoices: ["The Daily Prophet", "The Quibbler", "The New York Times", "The Wizarding World"], correctAnswer: 1 },
    { question: "In which London train station can you catch the Hogwart's express?", answerChoices: ["Paddington Station", "Barnehurst", "King's Cross", "Belmont"], correctAnswer: 3 },
    { question: "What is the name of Hagrid's large pet dog?", answerChoices: ["Norbert", "Fang", "Buckbeak", "Aragog"], correctAnswer: 2 },
    { question: "Who teaches flying at Hogwarts?", answerChoices: ["Argus Filch", "Gilderoy Lockhart", "Pomona Sprout", "Rolanda Hooch"], correctAnswer: 4 },
    { question: "What is the name of the book Hermione gives to Harry before his first ever Quidditch match?", answerChoices: ["Hogwarts: A History", "Quidditch through the Ages", "A History of Magic", "Magical Drafts and Potions"], correctAnswer: 2 }

];


var countdown = {
    time: 16,

    //starts the countdown and picks a random question
    start: function() {
        countdown.pickQuestion();
        intervalId = setInterval(countdown.count, 1000);

    },

    //resets all values 
    reset: function() {

        if (listOfQuestions.length > 0) {
            clearInterval(intervalId);
            countdown.time = 16;
            listOfQuestions.splice(displayedQuestion, 1);
            $("#answers").empty();
            clearInterval(intervalId);
            countdown.start();


        } else {
            countdown.gameOver();
        }


    },

    //coundown timer will stop when it reaches zero or the array is empty
    count: function() {
        if (countdown.time > 0 && listOfQuestions.length > 0) {
            countdown.time--;
            $("#countdownLeft").text(countdown.time);

        } else {
            clearInterval(intervalId);
            countdown.timesOut();

        }

    },

    //picks a random question object from the array and populates the answer choices
    pickQuestion: function() {
        var randomQuestion = Math.floor(Math.random() * listOfQuestions.length);
        displayedQuestion = randomQuestion;
        $("#currentQuestion").html("<h2 class = 'text-center'>" + listOfQuestions[randomQuestion].question + "</h2>")


        for (i = 0; i < 4; i++) {

            $("<button type='button' class='btn btn-default buttonChoice' value = " + i + ">" + listOfQuestions[randomQuestion].answerChoices[i] + "</button>").appendTo(answers);

        }


    },

    //compares the user choice with the value stored in correct answer
    compare: function() {
        var userChoice = parseInt($(this).val());
        var rightAnswer = listOfQuestions[displayedQuestion].correctAnswer - 1;
        if (userChoice === rightAnswer) {
            countdown.win();
        } else {
            countdown.lose();

        }

    },

    win: function() {
        $("#answers").html("<h2 class = 'text-center result'> Correct! </h2>");
        timeOutID = window.setTimeout(countdown.reset, 1000);
        wins++
    },

    //when wrong answer is selected
    lose: function() {
        var rightAnswer = listOfQuestions[displayedQuestion].correctAnswer - 1;
        $("#answers").html("<h2 class = 'text-center result'> Wrong!</h2> <h3 class = 'text-center result'>The correct answer was: " + listOfQuestions[displayedQuestion].answerChoices[rightAnswer] + "</h3>");

        losses++;
        timeOutID = window.setTimeout(countdown.reset, 1000);
    },

    //when time runs out
    timesOut: function() {
    	var rightAnswer = listOfQuestions[displayedQuestion].correctAnswer - 1;
        $("#answers").html("<h2 class = 'text-center result'> Time's Up!</h2> <h3 class = 'text-center result'>The correct answer was: " + listOfQuestions[displayedQuestion].answerChoices[rightAnswer] + "</h3>");

        losses++;
        timeOutID = window.setTimeout(countdown.reset, 1000);

    },

    //Prints the score
    gameOver: function() {
        $("#timeRemaining").empty();
        $("#answers").empty();
        $("#currentQuestion").html("<h2 class = 'text-center timer'> Game Over </h2> <h3 class = 'text-center result'>Right Answers: " + wins + "</h3>" + "<h3 class = 'text-center result'>Wrong Answers: " + losses + "</h3>");
    }

}