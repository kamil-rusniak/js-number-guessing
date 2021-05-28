const game = document.getElementById("game");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const message = document.getElementById("message");
const minNumInput = document.getElementById("min-num");
const maxNumInput = document.getElementById("max-num");
const guessInput = document.getElementById("guess-input");
let winningNumber = "";
let guessesNumber = 3;
updateGuesses();

submitBtn.addEventListener("click", guess);
resetBtn.addEventListener("click", reset);

function guess(e) {
  // Getting values from input fields and converting them to integers
  const minNum = parseInt(minNumInput.value);
  const maxNum = parseInt(maxNumInput.value);
  const guess = parseInt(guessInput.value);

  // Validation
  if (isNaN(minNum) || isNaN(maxNum)) {
    showMessage("Enter min and max numbers", "red");
  } else if (isNaN(guess) || guess < minNum || guess > maxNum) {
    minNumInput.disabled = true;
    maxNumInput.disabled = true;
    showMessage(`Enter a number between ${minNum} and ${maxNum}`, "red");
  } else {
    minNumInput.disabled = true;
    maxNumInput.disabled = true;

    if (winningNumber == "") {
      winningNumber = getRandomNumber(minNum, maxNum);
      console.log(`Psst ${winningNumber} is the correct answer`);
    }

    if (guess == winningNumber) {
      gameOver("win", `You win!!! ${winningNumber} is a correct number`);
    } else {
      guessesNumber -= 1;
      updateGuesses();
      if (guessesNumber === 0) {
        gameOver("loss", `Game over, the correct number was ${winningNumber}`);
      } else {
        gameOver("loss", `Incorrect`);
        submitBtn.disabled = false;
        guessInput.disabled = false;
        guessInput.value = "";
      }
    }
  }

  e.preventDefault();
}

function reset(e) {
  minNumInput.disabled = false;
  maxNumInput.disabled = false;
  guessInput.disabled = false;
  submitBtn.disabled = false;
  minNumInput.value = "";
  maxNumInput.value = "";
  guessInput.value = "";
  message.textContent = "";
  winningNumber = "";
  guessesNumber = 3;
  updateGuesses();

  e.preventDefault();
}

function gameOver(status, msg) {
  let color;
  guessInput.style.border = `2px solid ${color}`;
  guessInput.disabled = true;
  submitBtn.disabled = true;

  if (status === "win") {
    color = "green";
    showMessage(msg, color);
  } else if (status === "loss") {
    color = "red";
    showMessage(msg, color);
  }
}

function updateGuesses() {
  const guessesInfo = document.getElementById("guesses");
  if (guessesNumber === 1) {
    guessesInfo.textContent = `You have ${guessesNumber} guess left`;
  } else {
    guessesInfo.textContent = `You have ${guessesNumber} guesses left`;
  }
}

function showMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
