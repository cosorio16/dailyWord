document.addEventListener("DOMContentLoaded", () => {
  const $letterButtons = document.querySelectorAll(".keyLetter");
  const $deleteKeyboard = document.querySelector(".delete");
  const $enterKeyboard = document.querySelector(".enter");
  const $boxes = document.querySelectorAll(".box");
  const $keys = document.querySelectorAll(".keyLetter");
  const $alertMessage = document.querySelector(".alert");

  const winFeedBack = `<svg width="29" height="29" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M15.418 5.643a1.25 1.25 0 0 0-1.34-.555l-1.798.413a1.25 1.25 0 0 1-.56 0l-1.798-.413a1.25 1.25 0 0 0-1.34.555l-.98 1.564c-.1.16-.235.295-.395.396l-1.564.98a1.25 1.25 0 0 0-.555 1.338l.413 1.8a1.25 1.25 0 0 1 0 .559l-.413 1.799a1.25 1.25 0 0 0 .555 1.339l1.564.98c.16.1.295.235.396.395l.98 1.564c.282.451.82.674 1.339.555l1.798-.413a1.25 1.25 0 0 1 .56 0l1.799.413a1.25 1.25 0 0 0 1.339-.555l.98-1.564c.1-.16.235-.295.395-.395l1.565-.98a1.25 1.25 0 0 0 .554-1.34L18.5 12.28a1.25 1.25 0 0 1 0-.56l.413-1.799a1.25 1.25 0 0 0-.554-1.339l-1.565-.98a1.25 1.25 0 0 1-.395-.395zm-.503 4.127a.5.5 0 0 0-.86-.509l-2.615 4.426l-1.579-1.512a.5.5 0 1 0-.691.722l2.034 1.949a.5.5 0 0 0 .776-.107z"
          clip-rule="evenodd"
        />
      </svg>
      CONGRATULATIONS, YOU WIN`;

  const loseFeedBack = `<svg width="25" height="25" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m6 11l5-5l13 13L37 6l5 5l-13 13l13 13l-5 5l-13-13l-13 13l-5-5l13-13z" clip-rule="evenodd"/></svg>
    SORRY, YOU LOSE`;

  const errorFeedBack = `<svg width="29" height="29" viewBox="0 0 24 24"><path fill="currentColor" d="M11.001 10h2v5h-2zM11 16h2v2h-2z"/><path fill="currentColor" d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968zM4.661 19L12 5.137L19.344 19z"/></svg>
  ERROR`;

  function feedBack(fb, val) {
    $alertMessage.classList.remove("in", "out", "win", "lose", "unknown");
    $alertMessage.innerHTML = "";
    $alertMessage.innerHTML = fb;
    if (val == 1) {
      $alertMessage.classList.add("win", "in");
      setTimeout(() => {
        $alertMessage.classList.replace("in", "out");
      }, 1500);
    } else if (val == 2) {
      $alertMessage.classList.add("lose", "in");
      setTimeout(() => {
        $alertMessage.classList.replace("in", "out");
      }, 1500);
    } else if (val == 3) {
      $alertMessage.classList.add("unknown", "in");
      setTimeout(() => {
        $alertMessage.classList.replace("in", "out");
      }, 1500);
    }
  }

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

  let position = Number(localStorage.getItem("position")) || 0;
  let round = Number(localStorage.getItem("round")) || 1;
  const limit = letters.length;

  loadState();

  function saveState() {
    for (let i = 0; i < position; i++) {
      const state = {
        text: $boxes[i].textContent,
        classNames: $boxes[i].className,
      };

      localStorage.setItem(`box${i}`, JSON.stringify(state));
      localStorage.setItem("position", position);
      localStorage.setItem("round", round);
    }
  }

  function loadState() {
    for (let i = 0; i < position; i++) {
      const state = JSON.parse(localStorage.getItem(`box${i}`));

      if (state) {
        $boxes[i].textContent = state.text;
        $boxes[i].className = state.classNames;
        $boxes[i].classList.remove("dark", "light");
        theme === "true"
          ? $boxes[i].classList.add("dark")
          : $boxes[i].classList.add("light");
      }
    }
  }

  function deleteState() {
    for (let i = 0; i < position; i++) {
      localStorage.removeItem(`box${i}`);
      localStorage.removeItem("position");
      localStorage.removeItem("round");
    }
  }

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

    setTimeout(() => {
      saveState();
    }, 1);

    if (correctLetters.length == limit) {
      feedBack(winFeedBack, 1);
      setTimeout(() => {
        resetGame();
      }, 2000);
    } else if (position >= $boxes.length - 1) {
      feedBack(loseFeedBack, 2);
      setTimeout(() => {
        resetGame();
      }, 2000);
    }
  }

  function resetGame() {
    deleteState();
    position = 0;
    round = 1;
    $boxes.forEach((box) => {
      box.textContent = "";
      box.classList.remove("correct", "incorrect", "unknown");
    });

    $keys.forEach((key) => {
      key.classList.remove("correct", "incorrect", "unknown");
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key == e.key.match(/[a-z]/i)) {
      writeLetter(e.key);
    } else if (e.key == "Backspace") {
      deleteWord();
    } else if (e.key == "Enter" && position < limit * round - 1) {
      feedBack(errorFeedBack, 3);
    } else if (
      e.key == "Enter" &&
      position == limit * round - 1 &&
      $boxes[limit * round - 1].textContent != ""
    ) {
      compare();
      round++;
      position = word.length * (round - 1);
    }

    activeLetter();
  });
});
