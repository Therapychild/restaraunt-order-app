import { menuArray } from "./data.js";

/* MENU SECTION */

// Create the basic menu items.
let menuItems = '';
menuArray.map(menuItem => {
  menuItems +=
    `
        <div class="item">
            <div class="emoji">${menuItem.emoji}</div>
            <div>
                <div class="item-inner">
                    <h2>${menuItem.name}</h2>
                    <subtitle>${menuItem.ingredients}</subtitle>
                    <h4>$ ${menuItem.price}</h4>
                </div>
            </div>
            <button class="add-btn" data-${menuItem.name}="${menuItem.id}">
            +
            </button>
        </div>
    `
});

document.getElementById('content').innerHTML = menuItems;

/* ORDER SECTION */

const orderSection = document.getElementById('order');
let orderItems = [];

// handle the clicked item based on it's id;
document.addEventListener("click", function (e) {
  if (e.target.dataset.pizza) {
    handleAddMenuItem(e.target.dataset.pizza);
  } else if (e.target.dataset.hamburger) {
    handleAddMenuItem(e.target.dataset.hamburger);
  } else if (e.target.dataset.beer) {
    handleAddMenuItem(e.target.dataset.beer);
  }
})

function handleAddMenuItem(itemId) {
  const targetMenuItem = menuArray.filter(function (item) {
    return +itemId === item.id;
  })[0];

  orderItems.push(targetMenuItem);
  renderOrder(orderItems);
}

function showOrder() {
  if (orderSection.classList.contains('hidden')) {
    orderSection.classList.remove('hidden');
  }
}



// function removeItem(item) {

// }

// function renderItems() {

// }

function renderOrder(orderItems) {
  let completeOrder = ``;
  showOrder();

  console.log(orderItems);
  orderItems.forEach(function (item) {
    completeOrder += `
            <div class="order-row">
                <div class="order-item">
                    <h2>${item.name}</h2>
                    <button class="remove-item-btn">remove</button>
                </div>
                <h4>$ ${item.price}</h4>
            </div>
        `
  })

  document.getElementById("order").innerHTML = completeOrder;
}