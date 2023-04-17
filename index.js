import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

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

const orderSection = document.getElementById('order-container');
let orderItems = [];

// handle the clicked item based on it's id;
document.addEventListener("click", function (e) {
  if (e.target.dataset.pizza) {
    handleAddMenuItem(e.target.dataset.pizza);
  } else if (e.target.dataset.hamburger) {
    handleAddMenuItem(e.target.dataset.hamburger);
  } else if (e.target.dataset.beer) {
    handleAddMenuItem(e.target.dataset.beer);
  } else if (e.target.dataset.uuid) {
    handleRemoveMenuItem(e.target.dataset.uuid);
  }
})

function handleAddMenuItem(itemId) {
  const targetMenuItem = menuArray.filter(function (item) {
    return +itemId === item.id;
  })[0];

  orderItems.push({ ...targetMenuItem, uuid: uuidv4() });
  renderOrder(orderItems);
}

function handleRemoveMenuItem(itemUUID) {
  console.log(1, itemUUID);
  console.log(1.5, orderItems);
  const targetOrderItems = orderItems.filter(function (item) {
    return item.uuid !== itemUUID;
  })
  console.log(2, targetOrderItems);

  orderItems = targetOrderItems;
  renderOrder(orderItems);
}

function showOrder() {
  if (orderSection.classList.contains('hidden')) {
    orderSection.classList.remove('hidden');
  }
}

function renderOrder(orderItems) {
  let completeOrder = ``;
  let orderTotal = 0
  showOrder();

  orderItems.forEach(function (item) {
    completeOrder += `
            <div class="order-items-row">
                <div class="order-item">
                    <h2>${item.name}</h2>
                    <button class="remove-item-btn" data-uuid="${item.uuid}">remove</button>
                </div>
                <h4>$ ${item.price}</h4>
            </div>
        `;
    orderTotal += +item.price;
  })

  document.getElementById("order-items").innerHTML = completeOrder;
  document.getElementById("order-total").innerHTML = `
    <div class="order-items-row">
        <div class="order-item">
            <h2>Total Price:</h2>
        </div>
        <h4>$ ${orderTotal}</h4>
    </div>
  `
}