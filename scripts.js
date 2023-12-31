window.onload = function () {
    // Añadir event listener del botón inicial
    const playButton1 = document.getElementById('playButton1');
    playButton1.addEventListener('click', showGameContents);
    const playButton2 = document.getElementById('playButton2');
    playButton2.addEventListener('click', showGameContents);
    const infoButton = document.getElementById('infoButton');
    infoButton.addEventListener('click', showGameInstructions);

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
        document.getElementById('playButton1').style.display = "none";
        document.getElementById('playButton2').style.display = "none";
        document.getElementById('initialContent').style.display = "none";
        document.getElementById('infoContent').style.display = "none";
        resetGame();
        arrayWordInProgress = [];
        document.getElementById('gameContent').style.display = "flex";
    }

    function showGameInstructions(){
        document.getElementById('playButton1').style.display = "none";
        document.getElementById('playButton2').style.display = "flex";
        document.getElementById('initialContent').style.display = "none";
        document.getElementById('infoContent').style.display = "flex";
    }

    var remainingLives;
    let availableLetters; 

    function letterClicked(wordLength, id, arrayWordInProgress, wordInDiscovery, attemptedLetters) {
        var correctLetter = false;
        if (!attemptedLetters.includes(id)) {
            attemptedLetters.push(id);
            wordInDiscovery = "";
            // Va letra a letra comprobando el string de la palabra a descubrir a ver si coincide alguna letra con la introducida
            for (var p = 0; p < wordLength; p++) {
                if (id[0] === wordToDiscover[p]) {
                    correctLetter = true;
                    availableLetters--;
                    // Va al array de las letras a descubrir y guarda en la posicion exacta de la palabra, la letra
                    for (var m = 0; m < wordLength; m++) {
                        if (m == p) arrayWordInProgress[m] = id;
                    }
                }
                // Cambia los colores de los botones
                if (correctLetter) document.getElementById(id).style.backgroundColor = "green";
                else document.getElementById(id).style.backgroundColor = "red";
                document.getElementById(id).style.color = "white";
            }
            for (var f = 0; f < wordLength; f++) wordInDiscovery += arrayWordInProgress[f];
            if (correctLetter == false) remainingLives--;
            // Obtener el elemento del texto (h4) que vamos a sustituir por nuestra palabra oculta
            var wordInHTML = document.getElementById('hiddenWord');
            var livesInHTML = document.getElementById('availableLives');
            // Reemplazarlo
            livesInHTML.innerHTML = "Vidas restantes: " + remainingLives + "\n";
            wordInHTML.innerHTML = wordInDiscovery.toUpperCase();
            if (remainingLives < 1) gameOverPopUp(); 
            else if(remainingLives > 5) {
                document.getElementById(remainingLives).style.display = "flex";
                document.getElementById(0).style.display = "none";
            }
            else {
                document.getElementById(remainingLives + 1).style.display = "none"
                document.getElementById(remainingLives).style.display = "flex"
            }
            if (availableLetters == 0) gamePassedPopUp();
        }
    }
    function resetGame() {
        var attemptedLetters = []
        var letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        remainingLives = 6;
        document.getElementById(remainingLives).style.display = "flex";
        for (i = 0; i < 6; i++) document.getElementById(i).style.display = "none";
        var conjuntoDePalabras = ["hamburguesa", "arenal", "meteorito"];
        wordToDiscover = conjuntoDePalabras[Math.floor(Math.random() * conjuntoDePalabras.length)];
        wordLength = wordToDiscover.length;
        availableLetters = wordLength;
    
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
        for (var i = 0; i < wordLength; i++) {
            arrayWordInProgress.push("_ ");
        }

        // Aqui creamos la palabra vacía con los _ para mostrarlo en el html
        for (var f = 0; f < wordLength; f++) wordInDiscovery += arrayWordInProgress[f];
        wordInHTML.innerHTML = wordInDiscovery.toUpperCase();

        // Esto recorre todos los id y en caso de que algun evento se haya producido llama a la funcion letterClicked
        for (var i = 0; i < letras.length; i++) document.getElementById(letras[i]).addEventListener('click', function(){
            letterClicked(wordLength, this.id, arrayWordInProgress, wordInDiscovery, attemptedLetters)
        });

        window.addEventListener('keydown', function(event) {
            const key = event.key.toLowerCase();
            // Esto evita incorporar teclas que no sean letras
            if (letras.includes(key)) {
                letterClicked(wordLength, key, arrayWordInProgress, wordInDiscovery, attemptedLetters);
            }
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