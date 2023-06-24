// Simple game for learning DOM. The goal is to do burger like on the left side by clicking components from the right.

const components = ["ham", "cheese", "lettuce", "tomato", "onion", "fish"];

let interval = 5000;
let score = 0;
let scorePaded = "0000";
let ordersNum = 0;
let progressBar = document.getElementById("progress");

let container = document.getElementById("container");

interval == 5000;

// function - simple random number
function getRandom(n) {
  return Math.floor(Math.random() * n);
}

// function - adding 0 on the left for the score
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function updateScore() {
  scorePaded = pad(score, 4);
  document.getElementById("score0").innerHTML = scorePaded[0];
  document.getElementById("score1").innerHTML = scorePaded[1];
  document.getElementById("score2").innerHTML = scorePaded[2];
  document.getElementById("score3").innerHTML = scorePaded[3];
}

function newOrder() {
  ordersNum++;

  let newOrderDiv = document.createElement("div");
  newOrderDiv.className = "order";
  newOrderDiv.innerHTML = `
  <div class="burger">
  <div class="bread-top"></div>
  <div class="${components[getRandom(components.length)]}"></div>
  <div class="${components[getRandom(components.length)]}"></div>
  <div class="bread-bottom"></div>
  </div>
  <div class="player"></div>
  <div class="components">
  <div class="component bread-top"></div>
  <div class="component ham"></div>
  <div class="component cheese"></div>
  <div class="component lettuce"></div>
  <div class="component tomato"></div>
  <div class="component onion"></div>
  <div class="component fish"></div>
  <div class="component bread-bottom"></div>
  </div>`;

  container.appendChild(newOrderDiv);
  barMove();
}

//Making a burger - click event on components

document.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("component")) {
    let selectedOrder = target.parentElement.parentElement;

    let playerComponent = document.createElement("div");
    playerComponent.className = target.classList[1];

    selectedOrder.children[1].appendChild(playerComponent);

    //Removing made burger
    if (selectedOrder.children[1].children[3] != null) {
      selectedOrder.classList.add("removed");

      selectedOrder.addEventListener("transitionend", () => {
        selectedOrder.remove();
      });
      ordersNum--;
      if (ordersNum == 3) {
        progressBar.style.backgroundColor = "var(--clr-cheese)";
      }
      //Add points - it's not working because difrent classes of childrens
      if (
        selectedOrder.children[0].children[0].className ==
          selectedOrder.children[1].children[0].className &&
        selectedOrder.children[0].children[1].className ==
          selectedOrder.children[1].children[1].className &&
        selectedOrder.children[0].children[2].className ==
          selectedOrder.children[1].children[2].className &&
        selectedOrder.children[0].children[3].className ==
          selectedOrder.children[1].children[3].className
      ) {
        score++;
        updateScore();
      } else if (score == 0) {
        score = 0;
        updateScore();
      } else {
        score--;
        updateScore();
      }
    }
  }
});

// Progress bar move function
function barMove() {
  let width = 0;
  let id = setInterval(frame, interval / 100);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}

//start game with setInterval
newOrder();
let gameStart = setInterval(function () {
  if (ordersNum < 3) {
    newOrder();
  } else if (ordersNum == 3) {
    newOrder();
    progressBar.style.backgroundColor = "var(--clr-tomato)";
  } else {
    clearInterval(gameStart);
    setTimeout(alert("You lose."), interval); // I want make there popup with ten best scores and button "play again".
  }
}, interval);
