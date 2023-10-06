async function game() {
  //get the data from the api
  let apiFetch = await fetch("./words.json");
  let apiResult = await apiFetch.json();
  // insert the categories in the select box
  let categories = Object.keys(apiResult);
  for (let i = 0; i < categories.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", categories[i]);
    option.textContent = categories[i];
    let selectBox = document.getElementById("subject");
    selectBox.append(option);
  }
  let selectBox = document.getElementById("subject");
  selectBox.addEventListener("change", startGame);
  function startGame() {
    addLetters();
    let selectBox = document.getElementById("subject");
    let hint = document.querySelector(".hint");
    let footer = document.querySelector(".footer");
    let main = document.querySelector(".main");
    // reset to the spans inside the word container
    document.querySelector(".footer > .word-container").innerHTML = "";
    // go to the begging of the main section
    // ???????????????
    // make the hint and footer sections appear
    hint.style.display = "block";
    footer.style.display = "block";
    // get the random word and its value
    let = category = selectBox.value;
    if (category !== "") {
      let keysOfCategory = Object.keys(apiResult[category]);
      let randomNumber = Math.trunc(Math.random() * keysOfCategory.length);
      let randomWord = keysOfCategory[randomNumber];
      let valueOfRandomWord = apiResult[category][randomWord];
      // insert empty spans inside the footer
      let arrOfRandomWord = Array.from(randomWord);
      for (let i = 0; i < arrOfRandomWord.length; i++) {
        let letter = arrOfRandomWord[i];
        let span = document.createElement("span");
        span.className = "letter";
        let wordContainer = document.querySelector(".word-container");
        if (letter === " ") {
          span.textContent = "-";
        }
        wordContainer.append(span);
        footer.append(wordContainer);
      }
      // insert the hint for the random word
      let hint = document.getElementById("hint");
      hint.textContent = valueOfRandomWord;
      // set the wront attempts
      let wrongAnswers = 0;
      //clicking on the letters
      document
        .querySelector(".letters > .letters-box")
        .addEventListener("click", (e) => {
          if (e.target.classList.contains("letter")) {
            e.target.classList.add("clicked");
            // if the clicked letter is wrong
            let status = false;
            //check if the letter i clicked equals any letter of the chosen word
            let clickedLetter = e.target.textContent.toLowerCase();
            [...randomWord].forEach((letter, letterIndex) => {
              if (letter.toLowerCase() == clickedLetter) {
                status = true;
                let spans = document.querySelectorAll(
                  ".footer > .word-container > span"
                );
                // add the letter to the word container
                spans[letterIndex].textContent = letter;
              }
            });
            // chechk the status
            if (status !== true) {
              // play wrong sound
              let wrongSound = document.getElementById("fail");
              wrongSound.play();
              wrongAnswers++;
              // add the mistake class to the human draw
              let human = document.querySelector(".main .human");
              human.classList.add(`mistake-${wrongAnswers}`);
              // Game Over
              if (human.classList.contains("mistake-6")) {
                // add lose sound
                document.getElementById("lose").play();
                let gameOverContainer = document.createElement("div");
                gameOverContainer.className = "game-over";
                let text = document.createElement("span");
                text.className = "text";
                text.textContent = "Game Over";
                let button = document.createElement("button");
                button.className = "play-again";
                button.textContent = "Play Again";
                let paragraph = document.createElement("p");
                paragraph.textContent = "The Word Is ";
                let word = document.createElement("span");
                paragraph.appendChild(word);
                word.textContent = randomWord;
                gameOverContainer.append(text, paragraph, button);
                gameOverContainer.style.display = "flex";
                document.body.appendChild(gameOverContainer);
              }
            } else {
              let success = document.getElementById("success");
              success.play();
            }
            // check if the user wins
            let spans = document.querySelectorAll(".word-container > .letter");
            let result = [...spans].every((span) => span.textContent !== "");
            // check if all the spans contains letter

            if (result) {
              // play won sound
              document.getElementById("won").play();
              let winsContainer = document.createElement("div");
              winsContainer.className = "win";
              let text = document.createElement("span");
              text.className = "text";
              text.textContent = "You Won!";
              let button = document.createElement("button");
              button.className = "play-again";
              button.textContent = "Play Again";
              winsContainer.append(text, button);
              winsContainer.style.display = "flex";
              document.body.appendChild(winsContainer);
            }
          }
        });
    } else {
      hint.style.display = "none";
      footer.style.display = "none";
    }
  }
}
game();

// when i click play again button
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("play-again")) {
    // reload the page
    location.reload();
  }
});

function addLetters() {
  let lettersContainer = document.querySelector(".letters-box");
  lettersContainer.innerHTML = "";
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  for (let i = 0; i < alphabet.length; i++) {
    let span = document.createElement("span");
    span.classList.add("letter");
    span.textContent = alphabet[i];
    lettersContainer.append(span);
  }
}
addLetters();
