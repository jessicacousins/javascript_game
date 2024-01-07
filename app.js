document.addEventListener("DOMContentLoaded", (event) => {
  const holes = document.querySelectorAll(".hole");
  const scoreBoard = document.getElementById("score");
  let lastHole;
  let timeUp = false;
  let score = 0;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }

  function peep() {
    const time = randomTime(500, 3000);
    const hole = randomHole(holes);
    const mole = hole.querySelector(".mole");
    mole.style.visibility = "visible";
    setTimeout(() => {
      mole.style.visibility = "hidden";
      if (!timeUp) peep();
    }, time);
  }

  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();

    let timeLeft = 30;
    const timerId = setInterval(() => {
      timeLeft--;
      document.getElementById("timeLeft").textContent = timeLeft;

      if (timeLeft <= 0 || timeUp) {
        clearInterval(timerId);
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    timeUp = true;
    alert("Game Over! Your score: " + score);
  }

  function bonk(e) {
    if (!e.isTrusted) return;
    score++;
    this.style.visibility = "hidden";
    scoreBoard.textContent = score;
  }

  holes.forEach((hole) => {
    const mole = hole.querySelector(".mole");
    if (mole) {
      mole.addEventListener("click", bonk);
    }
  });

  document.getElementById("startButton").addEventListener("click", startGame);
});
