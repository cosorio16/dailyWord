const $boxes = document.querySelectorAll(".box");

let word = "polvo";
let letters = word.split("");

let position = 0;
let round = 1;
const limit = letters.length;

function writeLetter(letter) {
  if (position < limit * round) {
    $boxes[position].textContent = letter.toLowerCase();
  }
  position < limit * round - 1 && position++;
}

function deleteWord() {
  $boxes[position].textContent = "";
  if (position > limit * (round - 1) && position < limit * round) {
    position--;
  }
}

function compare() {
  let guessLetter = [];

  for (let i = limit * (round - 1); i < limit * round; i++) {
    if ($boxes[i].textContent == letters[i - limit * (round - 1)]) {
      $boxes[i].classList.add("correct");
      guessLetter.push($boxes[i].textContent);
    } else {
      $boxes[i].classList.add("incorrect");
    }
  }

  for (let i = limit * (round - 1); i < limit * round; i++) {
    if (
      letters.includes($boxes[i].textContent) &&
      guessLetter.filter((l) => l == $boxes[i].textContent).length <
        letters.filter((l) => l == $boxes[i].textContent).length
    ) {
      $boxes[i].classList.replace("incorrect", "unknown");

      guessLetter.push($boxes[i].textContent);
    }
  }

  console.log(guessLetter);
}

function resetGame() {
  position = 0;
  round = 1;
  $boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("correct", "incorrect", "unknown");
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key == e.key.match(/[a-z]/i)) {
    writeLetter(e.key);
  } else if (e.key == "Backspace") {
    deleteWord();
  } else if (
    e.key == "Enter" &&
    position == limit * round - 1 &&
    $boxes[limit * round - 1].textContent != ""
  ) {
    compare();
    round++;
    position = word.length * (round - 1);
  } else {
    console.log(e.key);
  }

  $boxes.forEach((box, index) => {
    if (index == position) {
      box.classList.add("active");
    } else {
      box.classList.remove("active");
    }
  });
});
