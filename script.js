const $box = document.querySelectorAll(".box");

let word = "money";
let letters = word.split("");
let round = 1;
let position = 0;

function writeWord(letter) {
  if (position < $box.length) {
    $box[position].textContent = letter;
    $box[position].classList.add("inserted");
    $box[position].classList.contains("deleted")
      ? $box[position].classList.replace("deleted", "inserted")
      : $box[position].classList.add("inserted");
    position++;
  }
}

function deleteWord() {
  if (position > 0) {
    position--;
    $box[position].textContent = "";
    $box[position].classList.replace("inserted", "deleted");
  }
}

function compare() {
  for (var i = 0; i < 6; i++) {
    letters.includes($box[i].textContent)
      ? $box[i].classList.add("guess")
      : $box[i].classList.add("incorrect");
    if ($box[i].textContent == letters[i]) {
      $box[i].classList.remove("guess");
      $box[i].classList.add("correct");
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key == e.key.match(/[a-z]/i)) {
    writeWord(e.key);
  } else if (e.key == "Backspace") {
    deleteWord();
  } else if (e.key == "Enter") {
    compare();
  } else {
    console.log(e.key);
  }
});
