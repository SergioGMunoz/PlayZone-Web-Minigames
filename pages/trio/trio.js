// Configuración del temporizador (Uso de funciones de timer.js)
setTimeElement(document.getElementById("tiempo"));
setTime(80); 
startTimer();

// Estructura cartas
const chosenCards = [];
const cards = [
    { id: 0 }, { id: 0 }, { id: 0 },
    { id: 1 }, { id: 1 }, { id: 1 },
    { id: 2 }, { id: 2 }, { id: 2 },
    { id: 3 }, { id: 3 }, { id: 3 },
    { id: 4 }, { id: 4 }, { id: 4 },
    { id: 5 }, { id: 5 }, { id: 5 }
];
const subtractTime = -3;
const addTime = 15;

let maxCardsChosen = false;

shuffleCards();

// Bucle que pone una imagen por defecto a las cartas (simulando la parte trasera) y guarda el id en una clase.
let divCards = document.getElementById("cards")
for (let i = 0; i < cards.length; i++) {
  let img = document.createElement("img");
  img.src = "img/Card-Back.png";
  img.classList = "trioCard " + cards[i].id;
  img.alt = "Mysterious Card";
  img.addEventListener("click", function() {
    chooseCard(this);
  });
  divCards.appendChild(img);
}


// Método que mezcla las cartas al azar
function shuffleCards() {
  for (let i = 0; i < cards.length - 1; ++i) {
    const j = Math.floor(Math.random() * (cards.length - i)) + i; //Num entre 0 y el maximo
    const change = cards[i]; //Guardar carta i
    cards[i] = cards[j]; //J se queda en la posición de i
    cards[j] = change; // I se queda en la posición de j
  }
}


// Al elegir una carta
function chooseCard(card) {

  // Si es una carta que ya esta dada la vuelta o se encontró, la ignoro
  if (card.classList.contains("chosen") || maxCardsChosen) return;

  card.classList.add("chosen");
  const cardId = card.classList[1];
  card.src = `img/Card${cardId}.png`;
  chosenCards.push(card);

  // Al haber chosen 3 cartas
  if (chosenCards.length == 3) {
    let cartasIguales = true;
    for (let card of chosenCards) {

      // Al encontrar cartas diferentes
      if (chosenCards[0].classList.value != card.classList.value) {
        cartasIguales = false;
        maxCardsChosen = true;

        // (Esta operacion asegura que el resultado minimo sea 0)
        time = Math.max(0, time + subtractTime);
        updateTimer();
        modifyTime(subtractTime);
        setTimeout(girarCartas, 1000);
        break;
      }
    }

    // Si son todas iguales, las marca como encontradas
    if (cartasIguales) {

      for (let card of chosenCards) {
        card.classList.add("found");
      }

      if (document.querySelectorAll(".found").length == cards.length) {
        victory();
      }

      time += addTime;
      updateTimer();
      modifyTime(addTime); // Suma de 15 segundos
      chosenCards.length = 0;
    }
  }
}


// Gira las cartas elegidas al no ser iguales
function girarCartas() {
  for (let card of chosenCards) {
    card.src = "img/Card-Back.png";
    card.classList.remove("chosen");
  }
  
  chosenCards.length = 0;  
  maxCardsChosen = false;
}


// Modificar el tiempo (html) al fallar o acertar
function modifyTime(time) {
  const penalizationElement = document.getElementById("penalization");

  // Cambiar el texto según sea penalización o suma
  if (time < 0) {
    penalizationElement.textContent = `${time}s`;
    penalizationElement.style.color = "red"; 

  } else {
    penalizationElement.textContent = `+${time}s`;
    penalizationElement.style.color = "green"; 
  }

  // Mostrar el mensaje de modificación del tiempo
  penalizationElement.style.opacity = "1";

  // Esconde el mensaje después de 1 segundo
  function hideMessage() {
    penalizationElement.style.opacity = "0";
  }

  setTimeout(hideMessage, 1000);
}


end = function () {
  gameOver();
};


// Al acabarse el tiempo (¡ESTO SERA REMPLAZADO POR CAMBIAR EL IFRAME A LA VENTANA DE GAME OVER!)
function gameOver() {
  const iframe = parent.document.getElementById("game-iframe");
  if (iframe) {
    iframe.src = "pages/trio/trio-lose.html";

  } else {
    console.error("The iframe to switch to the defeat screen was not found..");
  }
}


// Al elegir todas las cartas (¡ESTO SERA REMPLAZADO POR CAMBIAR EL IFRAME A LA VENTANA DE VICTORIA!)
function victory() {
  const iframe = parent.document.getElementById("game-iframe");
  if (iframe) {
    iframe.src = "pages/trio/trio-win.html";
    
  } else {
    console.error("The iframe to switch to the victory screen was not found..");
  }
}