

function checkAnswers() {
    var score = 0;
    var totalQuestions = 3;

    // Pergunta 1
    var q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.value === "b") score++;

    // Pergunta 2
    var q2 = document.querySelector('input[name="q2"]:checked');
    if (q2 && q2.value === "a") score++;

    // Pergunta 3
    var q3 = document.querySelector('input[name="q3"]:checked');
    if (q3 && q3.value === "b") score++;

    // Exibindo o resultado
    var resultDiv = document.getElementById("result");
    var scoreText = document.getElementById("score");
    scoreText.innerHTML = "Você acertou " + score + " de " + totalQuestions + " questões.";
    resultDiv.style.display = "block";
}

function resetQuiz() {
    // Resetando as respostas
    var radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(function (radio) {
        radio.checked = false;
    });

    // Ocultando o resultado
    var resultDiv = document.getElementById("result");
    resultDiv.style.display = "none";
}
