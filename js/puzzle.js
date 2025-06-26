const grid = document.getElementById("puzzle-grid");
const stepCount = document.getElementById("stepCount");
const totalTiles = 9;
let steps = 0;

// Image setup
const imageSrc = "images/taj-mahal.jpg";

// Generate tiles
function generateTiles() {
  let indexes = [...Array(totalTiles).keys()];
  shuffle(indexes);

  indexes.forEach((i) => {
    const tile = document.createElement("li");
    tile.setAttribute("data-position", i);
    tile.style.backgroundImage = `url(${imageSrc})`;
    tile.style.backgroundPosition = `-${(i % 3) * 100}px -${
      Math.floor(i / 3) * 100
    }px`;
    grid.appendChild(tile);
  });

  $("#puzzle-grid").sortable({
    update: () => {
      steps++;
      stepCount.innerText = steps;
      checkWin();
    },
  });
}

// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Win check
function checkWin() {
  const tiles = $("#puzzle-grid li");
  let correct = true;
  tiles.each(function (index) {
    if (parseInt($(this).attr("data-position")) !== index) {
      correct = false;
      return false;
    }
  });

  if (correct) {
    setTimeout(() => {
      alert(`🎉 Congrats! You solved it in ${steps} steps.`);
    }, 200);
  }
}

generateTiles();

// Timer
let seconds = 0;
setInterval(() => {
  seconds++;
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `${min}:${sec}`;
}, 1000);
