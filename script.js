document.addEventListener("DOMContentLoaded", () => {
  const $letterButtons = document.querySelectorAll(".keyLetter");
  const $deleteKeyboard = document.querySelector(".delete");
  const $enterKeyboard = document.querySelector(".enter");
  const $main = document.querySelector("main");
  const $boxes = document.querySelectorAll(".box");

  $enterKeyboard.addEventListener("click", () => {
    if (
      position == limit * round - 1 &&
      $boxes[limit * round - 1].textContent != ""
    ) {
      compare();
      round++;
      position = word.length * (round - 1);
    }
  });

  $deleteKeyboard.addEventListener("click", () => {
    deleteWord();
    activeLetter();
  });

  $letterButtons.forEach((b) => {
    b.addEventListener("click", () => {
      writeLetter(b.textContent);
    });
  });

  let word = "money";
  let letters = [];

  let entryWord = word.split("");
  entryWord.map((l) => {
    letters.push(l.toUpperCase());
  });

  let position = 0;
  let round = 1;
  const limit = letters.length;

  function activeLetter() {
    $boxes.forEach((box, index) => {
      if (index == position) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });
  }

  function writeLetter(letter) {
    if (position < limit * round) {
      if ($boxes[position].textContent == "") {
        $boxes[position].textContent = letter.toUpperCase();
      }
    }
    position < limit * round - 1 && position++;
    activeLetter();
  }

  function deleteWord() {
    if (position > limit * (round - 1) && position < limit * round) {
      if ($boxes[position].textContent != "") {
        $boxes[position].textContent = "";
      } else {
        position--;
        $boxes[position].textContent = "";
      }
    }
  }

  function compare() {
    let letters = []
    let guessLetter = [];
    let correctLetters = [];

    for (let i = limit * (round - 1); i < limit * round; i++) {
      if ($boxes[i].textContent == letters[i - limit * (round - 1)]) {
        $boxes[i].classList.add("correct");
        guessLetter.push($boxes[i].textContent);
        correctLetters.push($boxes[i].textContent);
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
        if ($boxes[i].classList.contains("incorrect")) {
          $boxes[i].classList.replace("incorrect", "unknown");
          guessLetter.push($boxes[i].textContent);
        }
      }
    }

    if (correctLetters.length == limit) {
      setTimeout(() => {
        resetGame();
      }, 2000);
    } else if (position == $boxes.length - 1) {
      setTimeout(() => {
        resetGame();
      }, 2000);
    }
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

    activeLetter();
  });
});
