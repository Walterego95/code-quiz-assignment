// creates a const connecting to the list for high scores
const highScoresList = document.getElementById('highScoresList');
// parse with json any local storage memory (if any)...
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// high scores list inner html integration with jQuery...
highScoresList.innerHTML = highScores.map(score => {
  return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
  .join("");

// clears localstorage and resets highScoreList.innerHTML...
clearHighScore = (event) => {
  localStorage.clear(event); 
  highScoresList.innerHTML = "";
}