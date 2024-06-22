const $keyboardRows = document.querySelectorAll(".keyboard_row");

const firstRow = "qwertyuiop";
const secondRow = "asdfghjklñ";
const thirdRow = "zxcvbnm";
const deleteIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M11.142 20c-2.227 0-3.341 0-4.27-.501c-.93-.502-1.52-1.42-2.701-3.259l-.681-1.06C2.497 13.634 2 12.86 2 12c0-.86.497-1.634 1.49-3.18l.68-1.06c1.181-1.838 1.771-2.757 2.701-3.259C7.801 4 8.915 4 11.142 4h2.637c3.875 0 5.813 0 7.017 1.172C22 6.343 22 8.229 22 12c0 3.771 0 5.657-1.204 6.828C19.592 20 17.654 20 13.78 20z"/>
      <path stroke-linecap="round" d="m15.5 9.5l-5 5m0-5l5 5"/>
    </g>
  </svg>
`;
const createButton = (content, isHTML = false, className = "") => {
  const button = document.createElement("button");
  if (className) {
    button.classList.add(className);
  }
  if (isHTML) {
    button.innerHTML = content;
  } else {
    button.textContent = content.toUpperCase();
  }
  return button;
};

firstRow.split("").forEach((l) => {
  $keyboardRows[0].appendChild(createButton(l, false, "keyLetter"));
});

secondRow.split("").forEach((l) => {
  $keyboardRows[1].appendChild(createButton(l, false, "keyLetter"));
});

const enterButton = createButton("Enter", false, "enter");
$keyboardRows[2].appendChild(enterButton);

thirdRow.split("").forEach((l) => {
  $keyboardRows[2].appendChild(createButton(l, false, "keyLetter"));
});

const deleteButton = createButton(deleteIcon, true, "delete");
$keyboardRows[2].appendChild(deleteButton);

const $keys = document.querySelectorAll(".keyLetter");
const $boxes = document.querySelectorAll(".box");

function syncKeyboard() {
  let incorrectLetters = [];
  let correctLetters = [];
  let unknownLetters = [];

  $boxes.forEach((box) => {
    if (box.classList.contains("correct")) {
      correctLetters.push(box.textContent);
    } else if (box.classList.contains("incorrect")) {
      incorrectLetters.push(box.textContent);
    } else if (box.classList.contains("unknown")) {
      unknownLetters.push(box.textContent);
    }
  });

  $keys.forEach((key) => {
    if (correctLetters.includes(key.textContent)) {
      if (key.classList.contains("unknown")) {
        key.classList.replace("unknown", "correct");
      } else if (key.classList.contains("incorrect")) {
        key.classList.replace("incorrect", "correct");
      } else {
        key.classList.add("correct");
      }
    } else if (incorrectLetters.includes(key.textContent)) {
      key.classList.add("incorrect");
    } else if (unknownLetters.includes(key.textContent)) {
      key.classList.add("unknown");
    }
  });
}

document.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    syncKeyboard();
  }
});

enterButton.addEventListener("click", () => {
  setTimeout(() => {
    syncKeyboard();
  }, 1);
});
