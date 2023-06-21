const components = ["ham", "cheese", "lettuce", "tomato", "onion", "fish"];

let orders = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
let player = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
let orderNumber = 0;
let time = 0;
let score = 0;
let ordersNum = 0;

function getRandom(n) {
  return Math.floor(Math.random() * n);
}

function newOrder() {
  orders[orderNumber][0] = "bread-top";
  orders[orderNumber][3] = "bread-bottom";
  ordersNum++;

  for (let n = 1; n < 3; n++) {
    orders[orderNumber][n] = components[getRandom(components.length)];
  }

  let newOrderDiv = document.createElement("div");
  newOrderDiv.className = "order";
  newOrderDiv.innerHTML = `
  <div class="burger">
    <div class="${orders[orderNumber][0]}"></div>
    <div class="${orders[orderNumber][1]}"></div>
    <div class="${orders[orderNumber][2]}"></div>
    <div class="${orders[orderNumber][3]}"></div>
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

  ordersNum++;

  let container = document.getElementById("container");
  container.appendChild(newOrderDiv);
}

//Add orders

// if (console.log(container.children[0]) == undefined) {
// }

while (ordersNum < 4) {
  setTimeout(() => {
    newOrder();
  }, time);
  time += 2000;
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
      selectedOrder.remove();
      ordersNum--;

      //Add points - it's not working because difrent classes of childrens
      if (selectedOrder.children[0] == selectedOrder.children[1]) {
        score += 10;
        document.getElementById("score").innerHTML = score;
      }
    }
  }
});
