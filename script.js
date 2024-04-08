const $box = document.querySelectorAll(".box");

let currentPosition = 0;
const word = "plate";
const letras = word.split("");

function compare() {
  for (let i = 0; i < 5; i++) {
    $box[i].classList.remove("bg-rojo", "bg-verde");
    $box[i].textContent.trim() == letras[i]
      ? $box[i].classList.add("bg-verde", "text-blanco")
      : $box[i].classList.add("bg-rojo", "text-blanco");
  }
}

function writeWord(letter) {
  if (currentPosition < 5) {
    const currentLetter = ($box[currentPosition].innerHTML = letter);
    currentPosition++;
  }
  console.log(currentPosition);
}

function deleteLetter(i) {
  if (currentPosition > 0) {
    $box[i].innerHTML = "";
    $box[i].classList.remove("bg-rojo", "bg-verde");
    currentPosition--;
    console.log(currentPosition);
  }
}

function clearAll() {
  for (let i = 0; i < 5; i++) {
    $box[i].innerHTML = "";
    $box[i].classList.remove("bg-rojo", "bg-verde");
  }
  currentPosition = 0;
}

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    compare();
  } else if (e.key == e.key.match(/[a-z]/i)) {
    writeWord(e.key);
  } else if (e.key == "Backspace") {
    deleteLetter(currentPosition - 1);
  } else if (e.key == "Shift") {
    clearAll();
  }

  console.log(e.key);
});
