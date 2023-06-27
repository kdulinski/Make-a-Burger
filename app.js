// Simple game for learning DOM. The goal is to do burger like on the left side by clicking components from the right.

const components = ["ham", "cheese", "lettuce", "tomato", "onion", "fish"];

let interval = 5000; // time beetween orders
let score = 0;
let scorePaded = "0000";
let ordersQuantity = 0; // number of orders in preparation at the moment
let ordersNumber = 0; // the number of all previous orders

let progressBar = document.getElementById("progress");
let container = document.getElementById("container");

// function - Simple random number
function getRandom(n) {
  return Math.floor(Math.random() * n);
}

// function - Adding 0 on the left for the score
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

function intervalReduction() {
  if (ordersNumber % 5 == 0) {
    interval -= interval / 20; // it works with barMove function but doesn't work with gameStart function

    let TimeSpeedsUp = document.getElementById("time-speeds-up");
    TimeSpeedsUp.classList.add("animation-start");
    setTimeout(() => {
      TimeSpeedsUp.classList.remove("animation-start");
    }, 1000);
  }
}

// function - progress bar move
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

function newOrder() {
  ordersQuantity++;
  ordersNumber++;

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

// Making a burger - click event on components
document.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("component")) {
    let selectedOrder = target.parentElement.parentElement;

    let playerComponent = document.createElement("div");
    playerComponent.className = target.classList[1];

    selectedOrder.children[1].appendChild(playerComponent);

    // Deleting an order with 4 children
    if (selectedOrder.children[1].children[3] != null) {
      selectedOrder.classList.add("removed");

      selectedOrder.addEventListener("transitionend", () => {
        selectedOrder.remove();
      });
      ordersQuantity--;
      if (ordersQuantity == 3) {
        progressBar.style.backgroundColor = "var(--clr-cheese)";
      }
      // Adding points
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

newOrder(); // First order without setInterval

// Start game with setInterval
let gameStart = setInterval(function () {
  if (ordersQuantity < 3) {
    newOrder();
    intervalReduction();
  } else if (ordersQuantity == 3) {
    newOrder();
    intervalReduction();
    progressBar.style.backgroundColor = "var(--clr-tomato)";
  } else {
    clearInterval(gameStart);
    setTimeout(
      (document.getElementById("modal-game-over").style.display = "flex"),
      interval
    );
  }
}, interval);
