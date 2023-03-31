const currentScoreElement = document.getElementById("current-score");
const bestScoreElement = document.getElementById("best-score");
const question = document.querySelector(".question h2");
const optionElements = document.querySelector(".answers").children;

let currentScore = 0;
let bestScore = 0;
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
      Math.floor(Math.random() * 100) +
      Math.floor(Math.random() * 100) -
      Math.floor(Math.random() * 100);
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

// Check answer
for (let i = 0; i < 4; i++) {
  optionElements[i].addEventListener("click", (e) => {
    if (+e.target.textContent === answer) {
      currentScore++;
      currentScoreElement.textContent = currentScore;
      questionGenerator();
      answersGenerator();
    } else {
      if (currentScore > +bestScoreElement.textContent) {
        bestScoreElement.textContent = currentScore;
      }
      currentScore = 0;
      currentScoreElement.textContent = currentScore;
      questionGenerator();
      answersGenerator();
    }
  });
}
