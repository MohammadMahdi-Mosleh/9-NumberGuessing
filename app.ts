// ===== SELECT ELEMENTS =====
const guessInput = document.querySelector(".guess-input") as HTMLInputElement;
const guessBtn = document.querySelector(".guess-btn") as HTMLButtonElement;
const lastGuessLabel = document.querySelector(".last-guess-label") as HTMLElement;
const guessStatus = document.querySelector(".guess-status") as HTMLElement;
const guessHint = document.querySelector(".guess-hint") as HTMLElement;
const restartBtn = document.querySelector(".restart-btn") as HTMLButtonElement;

// ===== INITIALIZE GAME STATE =====
const randomNum: number = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
let guessesNum: number[] = []; // Array to store user guesses

// ===== EVENT LISTENERS =====
guessBtn.addEventListener("click", submitGuess);
restartBtn.addEventListener("click", () => location.reload());

// ===== FUNCTIONS =====
function submitGuess() {
  const guessInputValue = Number(guessInput.value);

  // Validate input: must be a number between 1 and 100
  if (guessInputValue < 1 || guessInputValue > 100) {
    alert("Please enter a valid number between 1 and 100");
    return;
  }

  // Add the guess to the array
  guessesNum.push(guessInputValue);

  // Check the guess and update the game status
  if (guessInputValue === randomNum) {
    // Correct guess
    guessStatus.textContent = "Congratulations! You got it right!";
    guessStatus.style.backgroundColor = "mediumseagreen";
    guessHint.style.display = "none";

    // Disable input and button after correct guess
    guessBtn.disabled = true;
    guessInput.disabled = true;

    // Show the restart button
    restartBtn.style.display = "block";
  } else {
    // Incorrect guess
    guessStatus.textContent = "Wrong";
    guessStatus.style.backgroundColor = "crimson";

    // Provide a hint if guess is too high or too low
    if (guessInputValue > randomNum) {
      guessHint.textContent = "Last guess was too high!";
    } else {
      guessHint.textContent = "Last guess was too low!";
    }
  }

  // Display previous guesses separated by "/"
  lastGuessLabel.innerHTML = `<b>Previous Numbers: </b>`;

for (let i = 0; i < guessesNum.length; i++) {
  lastGuessLabel.innerHTML += `<span>${guessesNum[i]}${i < guessesNum.length - 1 ? " / " : ""}</span>`;
}

  // Check if user reached maximum number of guesses (10)
  if (guessesNum.length === 10 && guessInputValue !== randomNum) {
    guessStatus.textContent = `GAME OVER!! The answer was ${randomNum}`;
    guessStatus.style.backgroundColor = "crimson";
    guessHint.style.display = "none";

    // Disable input and button after game over
    guessBtn.disabled = true;
    guessInput.disabled = true;

    // Show the restart button
    restartBtn.style.display = "block";

    return;
  }
}
