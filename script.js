import { wordsFiveLetters as WORDS_GAME } from "./words.js";

const $box = document.querySelectorAll(".box");

function randomWord() {
  const word = WORDS_GAME[Math.floor(Math.random() * WORDS_GAME.length)];
  return word;
}

let round = 1;
let roundPosition = 0;
let word = "money";

let currentPosition = 0;
let letras = word.split("");
let statusWord = [];

function compare() {
  for (let i = roundPosition; i < 5 * round; i++) {
    $box[i].classList.remove("bg-rojo", "bg-verde");
    $box[i].textContent.trim() == letras[i - roundPosition]
      ? $box[i].classList.add("bg-verde", "text-blanco")
      : $box[i].classList.add("bg-rojo", "text-blanco");

    statusWord.push($box[i].textContent.trim() == letras[i - roundPosition]);
  }
}

function writeWord(letter) {
  if (currentPosition < 5 * round) {
    const currentLetter = ($box[currentPosition].innerHTML = letter);
    currentPosition++;
  }
}

function deleteLetter(i) {
  if (currentPosition > roundPosition) {
    $box[i].innerHTML = "";
    $box[i].classList.remove("bg-rojo", "bg-verde");
    currentPosition--;
  }
}

function clearAll() {
  for (let i = 0; i < 5 * round; i++) {
    $box[i].innerHTML = "";
    $box[i].classList.remove("bg-rojo", "bg-verde");
  }
  round = 1;
  roundPosition = 0;
  currentPosition = 0;
}

document.addEventListener("keydown", (e) => {
  if (currentPosition == 5 * round && e.key == "Enter") {
    compare();
    roundPosition = roundPosition + 5;
    round++;
    if (!statusWord.includes(false)) {
      alert(`Palabra encontrada: ${word}`);
      setTimeout(() => {
        clearAll();
      }, 1000);
    }
    statusWord = [];
  } else if (e.key == e.key.match(/[a-z]/i)) {
    writeWord(e.key);
  } else if (e.key == "Backspace") {
    deleteLetter(currentPosition - 1);
  }
});
