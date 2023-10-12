// Define an array of words for the game.
const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "purple",
  "guitar",
  "banana",
  "flower",
  "planet",
  "monkey",
  "window",
  "castle",
  "puzzle",
  "rabbit",
];

// Define an array of clues for the words.
const clues = [
  "A common fruit",
  "A yellow fruit",
  "A small, red fruit",
  "A sweet fruit",
  "A dark purple fruit",
  "A pear-shaped fruit",
  "A color and a fruit.",
  "A musical instrument.",
  "A fruit often found in bunches.",
  "A colorful part of a plant.",
  "Orbits the sun.",
  "A type of primate.",
  "Provides a view to the outside.",
  "A type of fortified building.",
  "A game or problem to solve.",
  "A small, hoppy mammal.",
];

const Typewords = ["Hangman", "GuessWord", "Words Game"];
const typewriter = document.getElementById("typewriter");

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let typingSpeed = 100; // Adjust the typing speed as needed.

function type() {
  const currentWord = Typewords[wordIndex];
  const text = currentWord.slice(
    0,
    isDeleting ? letterIndex - 1 : letterIndex + 1
  );
  typewriter.textContent = text;

  if (!isDeleting && text === currentWord) {
    isDeleting = true;
    typingSpeed = 300; // Erase at the same speed as typing.
  } else if (isDeleting && text === "") {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % Typewords.length;
    typingSpeed = 100; // Adjust the typing speed as needed.
  }

  letterIndex = isDeleting ? letterIndex - 1 : letterIndex + 1;

  setTimeout(type, typingSpeed);
}

type(); // Start the typewriter effect.

// Select a random word from the array.
let selectedIndex = Math.floor(Math.random() * words.length);
let selectedWord = words[selectedIndex];
let selectedClue = clues[selectedIndex];

// Initialize variables.
let guessesLeft = 6;
let guessedLetters = [];
let wordDisplay = [];

// Get elements from the HTML document.
const hangman = document.getElementById("hangman");
const wordDisplayElement = document.getElementById("wordDisplay");
const guessesLeftElement = document.getElementById("guessesLeft");
const guessedLettersElement = document.getElementById("guessedLetters");
const clueElement = document.querySelector(".clue");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");

// Display the clue in the HTML document.
clueElement.textContent = "Clue: " + selectedClue;

// Initialize the word display with underscores.
function initializeWordDisplay() {
  for (let i = 0; i < selectedWord.length; i++) {
    wordDisplay.push("_");
  }
  wordDisplayElement.textContent = wordDisplay.join(" ");
}

// Update the hangman display.
function updateHangmanDisplay() {
  hangman.textContent = "Guesses left: " + guessesLeft;
}

// Check if the player has won.
function checkWin() {
  if (wordDisplay.indexOf("_") === -1) {
    alert("You win! The word was: " + selectedWord);
    resetGame();
  }
}

// Check if the player has lost.
function checkLoss() {
  if (guessesLeft === 0) {
    alert("You lose! The word was: " + selectedWord);
    resetGame();
  }
}

// Reset the game.
function resetGame() {
  selectedIndex = Math.floor(Math.random() * words.length);
  selectedWord = words[selectedIndex];
  selectedClue = clues[selectedIndex];
  wordDisplay = [];
  guessedLetters = [];
  guessesLeft = 6;
  initializeWordDisplay();
  updateHangmanDisplay();
  guessedLettersElement.textContent = "";
  clueElement.textContent = "Clue: " + selectedClue;
}

// Initialize the game.
initializeWordDisplay();
updateHangmanDisplay();

// Event listener for the guess button.
guessButton.addEventListener("click", () => {
  const guess = guessInput.value.toLowerCase();

  // Check if the guess is a single letter.
  if (guess.length === 1 && guess.match(/[a-z]/i)) {
    // Check if the letter has been guessed before.
    if (guessedLetters.includes(guess)) {
      alert("You've already guessed that letter.");
    } else {
      guessedLetters.push(guess);

      if (selectedWord.includes(guess)) {
        for (let i = 0; i < selectedWord.length; i++) {
          if (selectedWord[i] === guess) {
            wordDisplay[i] = guess;
          }
        }
        wordDisplayElement.textContent = wordDisplay.join(" ");
        checkWin();
      } else {
        guessesLeft--;
        updateHangmanDisplay();
        checkLoss();
      }

      guessedLettersElement.textContent = guessedLetters.join(", ");
    }
  } else {
    alert("Please enter a single letter.");
  }

  guessInput.value = ""; // Clear the input field.
});

function reset() {
  location.reload();
}
