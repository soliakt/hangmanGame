/*
    Alumno: Víctor Gimeno Sanz
    NIA: 10017766
    Práctica: Juego del ahorcado
*/



window.onload = function () {
    // Añadir event listener del botón inicial
    const playButton = document.getElementById('playButton');
    playButton.addEventListener('click', function(){
        generateGameContent();
        showGameContents();
        recorreIDS();
    });

    function generateGameContent() {
        // Definimos debajo de qué elemento vamos a generar la tabla (parentElement)
        const parentElement = document.getElementById('gameContent__letters__lettersThemselves');
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
        const table = document.createElement('table');
        const numRows = [5, 6, 7, 8];
        var contadorletras = 0;
    
        for (let i = 0; i < numRows.length; i++) {
            const row = document.createElement('tr');
            row.classList.add('letters');
            for (let j = 0; j < numRows[i]; j++) {
                const letter = alphabet.charAt(contadorletras);
                const cell = document.createElement('td');
                cell.innerHTML = `<button type="button" class="btn btn-warning" id="${letter.toLowerCase()}">${letter}</button>`;
                row.appendChild(cell);
                contadorletras++;
            }
            table.appendChild(row);
        }
        // Añadir la tabla al elemento padre
        parentElement.appendChild(table);
    }
    

    
    function showGameContents() {
        document.getElementById('playButton').style.display = "none";
        document.getElementById('initialContent').style.display = "none";
        document.getElementById('gameContent').style.display = "flex";
    }
    
 
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

    function recorreIDS(){
        // Recorre los IDs y agrega eventos solo si el elemento existe
        for (var i = 0; i < totalLetras; i++) {
            const elemento = document.getElementById(letras[i]);
            console.log(elemento)
            if (elemento) {
                elemento.addEventListener('click', letterClicked);
            } else {
                console.error('Elemento no encontrado para el ID:', letras[i]);
            }
        }
          // Esto recorre todos los id y en caso de que algun evento se haya producido llama a la funcion resalta
        for (var i = 0; i < totalLetras; i++) document.getElementById(letras[i]).addEventListener('click', letterClicked);
        


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

    }
  

  

    function letterClicked() {
        correctLetter = false;
        wordInDiscovery = "";
        for (var p = 0; p < wordLenght; p++) {
            if (this.id == wordToDiscover[p]) {
                correctLetter = true;
                availableLetters--;
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
        else if (availableLetters == 0) gamePassedPopUp();
        if (remainingLives < 1) gameOverPopUp();

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
/*
function resetValues(){
    remainingLives = 6;
    wordToDiscover = conjuntoDePalabras[Math.floor(Math.random() * conjuntoDePalabras.length)];
    wordLenght = wordToDiscover.length;
    availableLetters = wordToDiscover.length;
    arrayWordInProgress = [];
    correctLetter = false;

    for (var i = 0; i < totalLetras; i++) document.getElementById(letras[i]).addEventListener('click', letterClicked);

    for (var i = 0; i < wordLenght; i++) arrayWordInProgress.push("_ ");

    wordInDiscovery = arrayWordInProgress.join('');
    const wordInHTML = document.getElementById('hiddenWord');
    const livesInHTML = document.getElementById('availableLives');

    document.getElementById(remainingLives).style.display = "flex";
    livesInHTML.innerHTML = "Vidas restantes: " + remainingLives + "\n";
    wordInHTML.innerHTML = wordInDiscovery.toUpperCase();
}
*/

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


