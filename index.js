const currentScoreElement = document.getElementById("current-score");
const bestScoreElement = document.querySelectorAll("#best-score");
const question = document.querySelector(".question h2");
const optionElements = document.querySelector(".answers").children;
const startBtn = document.getElementById("start-btn");
const startPanel = document.querySelector(".start-panel");

let currentScore = 0;
let bestScore = window.localStorage.getItem("best") || 0;
bestScoreElement.forEach((score) => (score.textContent = bestScore));
const logicalOperators = ["+", "-", "*"];
let randomOperator = null;
let nums = [];
let answerOptionNums = [];
let answer = null;

// Nums Generator Functions
function numsMultiplyGenerator() {
  nums[0] = Math.floor(Math.random() * 20) + 10;
  nums[1] = Math.floor(Math.random() * 9) + 1;
  nums.sort(() => Math.random() - 0.5);
  return nums;
}

function numsGenerator() {
  nums[0] = Math.floor(Math.random() * 100) + 1;
  nums[1] = Math.floor(Math.random() * 100) + 1;
  return nums;
}

// Answers Generator Functions
function answersGenerator() {
  answer = eval(question.textContent.slice(0, -3));

  answerOptionNums[0] = answer;
  let j = 1;
  while (j < 4) {
    answerOptionNums[j] =
      Math.floor(Math.random() * 100) * 2 - Math.floor(Math.random() * 100);
    if (answerOptionNums[j] !== answer) {
      j++;
    }
  }
  answerOptionNums.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 4; i++) {
    optionElements[i].textContent = answerOptionNums[i];
  }
}

// Question Genrator
function questionGenerator() {
  randomOperator = Math.floor(Math.random() * 3);
  if (logicalOperators[randomOperator] === "*") {
    numsMultiplyGenerator();
    question.textContent = `${nums[0]} * ${nums[1]} = ?`;
  } else {
    numsGenerator();
    question.textContent = `${nums[0]} ${logicalOperators[randomOperator]} ${nums[1]} = ?`;
  }
}

questionGenerator();
answersGenerator();
window.localStorage.clear();
// Start Game
startBtn.addEventListener("click", () => { 
  startPanel.classList.add("displayNon");
});

// Check answer
for (let i = 0; i < 4; i++) {
  optionElements[i].addEventListener("click", (e) => {
    if (+e.target.textContent === answer) {
      currentScore++;
      currentScoreElement.textContent = currentScore;
      questionGenerator();
      answersGenerator();
    } else {
      if (currentScore > +bestScoreElement[0].textContent) {
        window.localStorage.setItem("best", currentScore);
        bestScoreElement.forEach((score) => (score.textContent = currentScore));
      }
          startPanel.classList.remove("displayNon");
      currentScore = 0;
      currentScoreElement.textContent = currentScore;
      questionGenerator();
      answersGenerator();
    }
  });
}
