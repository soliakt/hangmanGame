/*
    Alumno: Víctor Gimeno Sanz
    NIA: 10017766
    Práctica: Juego del ahorcado
*/


function showGameContents() {
    document.getElementById('playButton').style.display = "none";
    document.getElementById('initialContent').style.display = "none";
    document.getElementById('gameContent').style.display = "flex";
}

// Añadir event listener del botón inicial
const playButton = document.getElementById('playButton');
playButton.addEventListener('click', showGameContents)



window.onload = function () {
    var letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var totalLetras = letras.length;



    var remainingLives = 6;
    var conjuntoDePalabras = ["hamburguesa", "arenal", "meteorito"];
    for (var i = 0; i < conjuntoDePalabras.length; i++) var wordToDiscover = conjuntoDePalabras[Math.floor(Math.random() * conjuntoDePalabras.length)];
    var wordInDiscovery = "";
    var wordLenght = wordToDiscover.length;
    var availableLetters = wordToDiscover.length;
    var arrayWordInProgress = [];
    var correctLetter = false;

    // Esto recorre todos los id y en caso de que algun evento se haya producido llama a la funcion resalta
    for (var i = 0; i < totalLetras; i++) document.getElementById(letras[i]).addEventListener('click', function() {
        letterClicked(availableLetters);
    });
    


    for (var i = 0; i < wordLenght; i++) arrayWordInProgress.push("_ ");
    for (var f = 0; f < wordLenght; f++) wordInDiscovery += arrayWordInProgress[f];

    // Obtener el elemento del texto (h4) que vamos a sustituir por nuestra palabra oculta y por nuestras vidas
    const wordInHTML = document.getElementById('hiddenWord');
    const livesInHTML = document.getElementById('availableLives');
    // Aqui ponemos flex al display de la foto para que aparezca
    document.getElementById(remainingLives).style.display = "flex"

    // Reemplazarlos
    livesInHTML.innerHTML = "Vidas restantes: " + remainingLives + "\n";
    wordInHTML.innerHTML = wordInDiscovery.toUpperCase();


    function letterClicked(availableLettersFunc) {
        correctLetter = false;
        wordInDiscovery = "";
        for (var p = 0; p < wordLenght; p++) {
            if (this.id == wordToDiscover[p]) {
                correctLetter = true;
                availableLettersFunc--;
                for (var m = 0; m < wordLenght; m++) {
                    if (m == p) arrayWordInProgress[m] = event.target.id;
                }
            }
            if (correctLetter) event.target.style.backgroundColor = "green";
            else event.target.style.backgroundColor = "red";
            event.target.style.color = "white";
        }
        for (var f = 0; f < wordLenght; f++) wordInDiscovery += arrayWordInProgress[f];
        if (correctLetter == false) remainingLives--
        else if (availableLettersFunc == 0) gamePassedPopUp();
        else if (remainingLives < 1) gameOverPopUp();

        // Obtener el elemento del texto (h4) que vamos a sustituir por nuestra palabra oculta
        const wordInHTML = document.getElementById('hiddenWord');
        const livesInHTML = document.getElementById('availableLives');
        
        // Reemplazarlo
        livesInHTML.innerHTML = "Vidas restantes: " + remainingLives + "\n";
        wordInHTML.innerHTML = wordInDiscovery.toUpperCase();

        if(remainingLives > 5) document.getElementById(remainingLives).style.display = "flex";

        else {
            document.getElementById(remainingLives + 1).style.display = "none"
            document.getElementById(remainingLives).style.display = "flex"
        }
    }
}
function gameOverPopUp() {
    Swal.fire({
        title: 'Has perdido amigo mío',
        text: '¿Quieres jugar otra partida?' ,
        icon: 'error', 
        confirmButtonText: 'Jugar otra partida'
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
        }
    });
}

function gamePassedPopUp() {
    Swal.fire({
        title: '¡Has ganado!',
        text: '¿Quieres jugar otra partida?',
        icon: 'success',
        confirmButtonText: 'Jugar otra partida'
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
        }
    });
}