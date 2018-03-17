$.fn.trivia = function() {
    var _t = this;
    _t.userPick = "";
    _t.answers = {
        correct: 0,
        incorrect: 0
    };
    _t.count = 30;
    _t.current = 0;
    _t.questions = [
        {
            question: "What is the most common element in the human body?",
            options: ["carbon", "nitrogen", "helium", "oxygen"],
            correct: 3
        },
        {
            question: "What is the scientific term for the production of light by living organisms?",
            options: ["photosynthesis", "bioluminescence", "cellular respiration", "RNA replication"],
            correct: 0
        },
        {
            question: "What is the basic unit of function and structure in living organisms?",
            options: ["organ", "tissue", "cell", "organ systems"],
            correct: 2
        },
        {
            question: "What are the long strands of genetic material in the nucleus called?",
            options: ["chromatin", "chromatid", "mitochondria", "cell membrane"],
            correct: 0
        },
        {
            question: "During meiosis, when does crossing over occur?",
            options: ["Prophase I", "Anaphase I", "Metaphase I", "Anaphase II"],
            correct: 0
        },
        {
            question: "Where does aerobic cellular respiration take place?",
            options: ["mitochondria", "nucleus", "centriole", "endoplasmic reticulum"],
            correct: 0
        },
        {
            question: "What organelle is the main difference between a eukaryotic cell and a prokaryotic cell?",
            options: ["cell membrane", "cytoplasm", "nucleus", "ribosomes"],
            correct: 2
        },
        {
            question: "Which kingdom lives in extreme environments?",
            options: ["Archaebacteria", "Eubacteria", "Protists", "Animalia"],
            correct: 0

        }];
    _t.ask = function() {
        if (_t.questions[_t.current]) {
            $("#timer").html("Time Remaining: " + _t.count + " secs");
            $("#question").html(_t.questions[_t.current].question);
            var choicesArr = _t.questions[_t.current].options;
            var buttonsArr;

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices').append(button);
            }
            window.triviaCounter = setInterval(_t.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    _t.questions.length - (_t.answers.correct + _t.answers.incorrect)),
                class: 'result'
            }));
            $('#start').text('Restart').appendTo('body').show();
        }
    };
    _t.timer = function() {
        _t.count--;
        if (_t.count <= 0) {
            setTimeout(function() {
                _t.nextQ();
            });

        } else {
            $("#timer").html("Time Remaining: " + _t.count + " secs");
        }
    };
    _t.nextQ = function() {
        _t.current++;
        clearInterval(window.triviaCounter);
        _t.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            _t.cleanUp();
            _t.ask();
        }, 3000)
    };
    _t.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + _t.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
    };
    _t.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        _t.answers[string]++;
        $('.' + string).html(string + ' answers: ' + _t.answers[string]);
    };
    return _t;
};

var Trivia;

$("#start").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        _t = Trivia || $(window).trivia(),
        index = _t.questions[_t.current].correct,
        correct = _t.questions[_t.current].options[index];

    if (userPick !== index) {
        $('#choices').text("Wrong! The correct answer is: " + correct);
        _t.answer(false);
    } else {
        $('#choices').text("Correct! The answer is: " + correct);
        _t.answer(true);
    }
    _t.nextQ();

});


