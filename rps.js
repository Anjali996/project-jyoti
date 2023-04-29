// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

const CHOICES = [
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissors",
      beats: "paper",
    },
    {
      name: "rock",
      beats: "scissors",
    },
  ];
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const gameDiv = document.querySelector(".game");
  const resultsDiv = document.querySelector(".results");
  const resultDivs = document.querySelectorAll(".results__result");
  
  const resultWinner = document.querySelector(".results__winner");
  const resultText = document.querySelector(".results__text");
  
  const playAgainBtn = document.querySelector(".play-again");
  
  const playerscore = document.querySelector(".player-score p");
  const computerscore = document.querySelector(".computer-score p");
  let pscore = 0;
  let cscore=0;
  
  // Game Logic
  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choiceName = button.dataset.choice;
      const choice = CHOICES.find((choice) => choice.name === choiceName);
      choose(choice);
    });
  });
  
  function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
  }
  
  function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
  }
  
  function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="icon-${results[idx].name}.png" alt="${results[idx].name}" />
          </div>
        `;
      }, idx * 1000);
    });
  
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  }
  
  function displayWinner(results) {
    setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isWinner(results.reverse());
  
      if (userWins) {
        resultText.innerText = "you win Against pc" ;
        resultDivs[0].classList.toggle("winner");
        pscore++;
        updateScore()
      } else if (aiWins) {
        resultText.innerText = "Pc win Against you";
        resultDivs[1].classList.toggle("winner");
        cscore++;
        updateScore()
      } else {
        resultText.innerText = "Tie Up";
      }
      resultWinner.classList.toggle("hidden");
      resultsDiv.classList.toggle("show-winner");
    }, 1000);
  }
  
  function isWinner(results) {
    return results[0].beats === results[1].name;
  }
  
  function updateScore() {
    playerscore.textContent=pscore
    computerscore.textContent=cscore
  }
  
  // Play Again
  playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
  
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  });






  



  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }