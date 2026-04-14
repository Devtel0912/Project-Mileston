function GetQuestions() {
    var Questions = [
        {
            Question:
                "Cloud computing allows users to access data and applications over the __________ instead of only on local devices.",

            Answer: "internet",

            Optiontype: "textbox",
        },

        {
            Question: "What is ethical hacking mainly used for?",

            Options: [
                "To damage computer systems",

                "To test systems for security weaknesses",

                "To steal private information",

                "To disable websites",
            ],

            Answer: "To test systems for security weaknesses",

            Optiontype: "radio",
        },

        {
            Question:
                "Which of the following is an example of a cyber attack that tricks users into giving sensitive information?",

            Options: ["Firewall", "Encryption", "Phishing", "Authentication"],

            Answer: "Phishing",

            Optiontype: "radio",
        },

        {
            Question:
                "Which cloud service model gives users access to software over the internet?",

            Options: ["IaaS", "PaaS", "SaaS", "VPN"],

            Answer: "SaaS",

            Optiontype: "radio",
        },

        {
            Question:
                "Which of the following are benefits of cloud computing? Select all that apply.",

            Options: [
                "Scalability",

                "Cost-effectiveness",

                "Collaboration",

                "Physical theft prevention by default",

                "Accessibility from many locations",
            ],

            Answer: [
                "Scalability",
                "Cost-effectiveness",
                "Collaboration",
                "Accessibility from many locations",
            ],

            Optiontype: "checkbox",
        },
    ];

    return Questions;
}

function LoadQuestions() {
    var Questions = GetQuestions();

    var html = "";

    for (var i = 0; i < Questions.length; i++) {
        html += "<div class='question-block'>";

        html +=
            "<div class='question-title'>" +
            (i + 1) +
            ". " +
            Questions[i].Question +
            "</div>";

        // RADIO / CHECKBOX

        if (
            Questions[i].Optiontype == "radio" ||
            Questions[i].Optiontype == "checkbox"
        ) {
            for (var j = 0; j < Questions[i].Options.length; j++) {
                var option = Questions[i].Options[j];

                html += "<div class='option'>";

                html += "<label>";

                html +=
                    "<input type='" +
                    Questions[i].Optiontype +
                    "' name='question_" +
                    i +
                    "' value='" +
                    option +
                    "'> " +
                    option;

                html += "</label>";

                html += "</div>";
            }
        }

        // TEXTBOX

        if (Questions[i].Optiontype == "textbox") {
            html +=
                "<input type='text' id='question_" +
                i +
                "' placeholder='Enter answer'>";
        }

        html += "</div>";
    }

    document.getElementById("quiz").innerHTML = html;

    document.getElementById("result").innerHTML = "";

    document.getElementById("details").innerHTML = "";
}

function SubmitQuiz() {
    var Questions = GetQuestions();
    var score = 0;
    var details = "";
    for (var i = 0; i < Questions.length; i++) {
        var questionScore = 0;
        var isCorrect = false;
        var correctAnswerText = "";
        var userAnswerText = "";
        // RADIO
        if (Questions[i].Optiontype == "radio") {
            var selected = document.querySelector(
                "input[name='question_" + i + "']:checked",
            );
            var userAnswer = selected ? selected.value : "No answer selected";
            userAnswerText = userAnswer;
            correctAnswerText = Questions[i].Answer;
            if (userAnswer == Questions[i].Answer) {
                score++;
                questionScore = 1;
                isCorrect = true;
            }
        }
        // CHECKBOX
        if (Questions[i].Optiontype == "checkbox") {
            var checked = document.querySelectorAll(
                "input[name='question_" + i + "']:checked",
            );
            var userAnswers = [];
            for (var x = 0; x < checked.length; x++) {
                userAnswers.push(checked[x].value);
            }
            var sortedUserAnswers = userAnswers.slice().sort();
            var correctAnswers = Questions[i].Answer.slice().sort();
            userAnswerText =
                userAnswers.length > 0 ? userAnswers.join(", ") : "No answer selected";
            correctAnswerText = correctAnswers.join(", ");
            if (JSON.stringify(sortedUserAnswers) == JSON.stringify(correctAnswers)) {
                score++;
                questionScore = 1;
                isCorrect = true;
            }
        }
        // TEXTBOX
        if (Questions[i].Optiontype == "textbox") {
            var textValue = document.getElementById("question_" + i).value.trim();
            userAnswerText = textValue !== "" ? textValue : "No answer entered";
            correctAnswerText = Questions[i].Answer;
            if (textValue.toLowerCase() == Questions[i].Answer.toLowerCase()) {
                score++;
                questionScore = 1;
                isCorrect = true;
            }
        }
        details += "<div class='answer-review'>";
        details +=
            "<p><strong>Question " +
            (i + 1) +
            ":</strong> " +
            Questions[i].Question +
            "</p>";
        details += "<p><strong>Score:</strong> " + questionScore + "/1</p>";
        if (isCorrect) {
            details += "<p class='correct'><strong>Result:</strong> Correct</p>";
        } else {
            details += "<p class='incorrect'><strong>Result:</strong> Incorrect</p>";
        }
        details += "<p><strong>Your Answer:</strong> " + userAnswerText + "</p>";
        details +=
            "<p><strong>Correct Answer:</strong> " + correctAnswerText + "</p>";
        details += "</div>";
    }
    var passFail = score >= Math.ceil(Questions.length / 2) ? "PASS" : "FAIL";
    var passFailClass = passFail == "PASS" ? "pass" : "fail";
    var resultHtml = "";
    resultHtml +=
        "<h3 class='" + passFailClass + "'>Overall Result: " + passFail + "</h3>";
    resultHtml +=
        "<h3>Total Score: <span class='score-highlight'>" +
        score +
        "/" +
        Questions.length +
        "</span></h3>";
    document.getElementById("result").innerHTML = resultHtml;
    document.getElementById("details").innerHTML = details;
}
