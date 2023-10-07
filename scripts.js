/*
    Alumno: Víctor Gimeno Sanz
    NIA: 10017766
    Práctica: Juego del ahorcado
*/



window.onload = function () {
    // Añadir event listener del botón inicial
    const playButton = document.getElementById('playButton');
    playButton.addEventListener('click', function(){
        showGameContents();
        recorreIDS();
    });

    function generateGameContent() {
        // Definimos debajo de qué elemento vamos a generar la tabla (parentElement)
        parentElement = document.getElementById('gameContent__letters__lettersThemselves');
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
        const table = document.createElement('table');
        const numRows = [5, 6, 7, 8];
        var lettersCounter = 0;
    
        for (let i = 0; i < numRows.length; i++) {
            const row = document.createElement('tr');
            row.classList.add('letters');
            for (let j = 0; j < numRows[i]; j++) {
                const letter = alphabet.charAt(lettersCounter);
                const cell = document.createElement('td');
                cell.innerHTML = `<button type="button" class="btn btn-warning" id="${letter.toLowerCase()}">${letter}</button>`;
                row.appendChild(cell);
                lettersCounter++;
            }
            table.appendChild(row);
        }
        // Añadir la tabla al elemento padre
        parentElement.appendChild(table);
    }
    

    
    function showGameContents() {
        document.getElementById('playButton').style.display = "none";
        document.getElementById('initialContent').style.display = "none";
        resetGame();
        arrayWordInProgress = [];
        document.getElementById('gameContent').style.display = "flex";
    }


    var letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var totalLetras = letras.length;
    var remainingLives;

    var wordLenght = wordToDiscover.length;


    var correctLetter = false;


    function recorreIDS(){

        // Obtener el elemento del texto (h4) que vamos a sustituir por nuestra palabra oculta y por nuestras vidas
        const wordInHTML = document.getElementById('hiddenWord');
        const livesInHTML = document.getElementById('availableLives');
        // Aqui ponemos flex al display de la foto para que aparezca
        document.getElementById(remainingLives).style.display = "flex"

        // Reemplazarlos
        //livesInHTML.innerHTML = "Vidas restantes: " + remainingLives + "\n";
        //wordInHTML.innerHTML = wordInDiscovery.toUpperCase();

    }
 
    function letterClicked(wordLength, id, availableLetters, arrayWordInProgress, wordInDiscovery) {
        correctLetter = false;
        wordInDiscovery = "";
        // Va letra a letra comprobando el string de la palabra a descubrir a ver si coincide alguna letra con la introducida
        for (var p = 0; p < wordLength; p++) {
            if (id == wordToDiscover[p]) {
                correctLetter = true;
                availableLetters--;
                // Va al array de las letras a descubrir y guarda en la posicion exacta de la palabra, la letra
                for (var m = 0; m < wordLength; m++) {
                    if (m == p) arrayWordInProgress[m] = id;
                }
            }
            // Cambia los colores de los botones
            if (correctLetter) event.target.style.backgroundColor = "green";
            else event.target.style.backgroundColor = "red";
            event.target.style.color = "white";
        }
        for (var f = 0; f < wordLengthBueno; f++) wordInDiscovery += arrayWordInProgress[f];
        // Obtener el elemento del texto (h4) que vamos a sustituir por nuestra palabra oculta
        wordInHTML = document.getElementById('hiddenWord');
        livesInHTML = document.getElementById('availableLives');
        // Reemplazarlo
        livesInHTML.innerHTML = "Vidas restantes: " + remainingLives + "\n";
        wordInHTML.innerHTML = wordInDiscovery.toUpperCase();
        if (correctLetter == false) remainingLives--;
        else if (availableLetters == 0) gamePassedPopUp();
        if (remainingLives < 1) gameOverPopUp();


        if(remainingLives > 5) document.getElementById(remainingLives).style.display = "flex";

        else {
            document.getElementById(remainingLives + 1).style.display = "none"
            document.getElementById(remainingLives).style.display = "flex"
        }
    }
    function resetGame() {
        remainingLives = 6;
        var conjuntoDePalabras = ["hamburguesa", "arenal", "meteorito"];
        wordToDiscover = conjuntoDePalabras[Math.floor(Math.random() * conjuntoDePalabras.length)];
        wordLengthBueno = wordToDiscover.length;
        var availableLetters = wordLengthBueno;

    
        var arrayWordInProgress = [];
        correctLetter = false;
        const parentElement = document.getElementById('gameContent__letters__lettersThemselves');
        parentElement.innerHTML = '';
        var wordInDiscovery = "";
    
        // Generar la interfaz del juego
        generateGameContent();
        
        // Restablecer el texto de vidas y palabra oculta
        const wordInHTML = document.getElementById('hiddenWord');
        const livesInHTML = document.getElementById('availableLives');
        livesInHTML.innerHTML = "Vidas restantes: " + remainingLives + "\n";
        // Rellenamos cada letra del array con _
        for (var i = 0; i < wordLengthBueno; i++) {
            arrayWordInProgress.push("_ ");
        }

        // Aqui creamos la palabra vacía con los _ para mostrarlo en el html
        for (var f = 0; f < wordLengthBueno; f++) wordInDiscovery += arrayWordInProgress[f];
        wordInHTML.innerHTML = wordInDiscovery.toUpperCase();


        // Hasta aqui esta bien
        // Esto recorre todos los id y en caso de que algun evento se haya producido llama a la funcion letterClicked
        for (var i = 0; i < totalLetras; i++) document.getElementById(letras[i]).addEventListener('click', function(){
            letterClicked(wordLengthBueno, this.id, availableLetters, arrayWordInProgress, wordInDiscovery)
        });
        
    }
    
    function gameOverPopUp() {
        Swal.fire({
            title: 'Has perdido amigo mío',
            text: '¿Quieres jugar otra partida?' ,
            icon: 'error', 
            confirmButtonText: 'Jugar otra partida'
        }).then((result) => {
            if (result.isConfirmed) {
                resetGame();
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
                resetGame();
            }
        });
    }
   
    
}




