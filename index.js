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
            <button id="add-${menuItem.name}-btn" class="add-btn" data-${menuItem.name}="${menuItem.id}">
            +
            </button>
        </div>
    `
});

document.getElementById('content').innerHTML = menuItems;

/* ORDER SECTION */
const orderSection = document.getElementById('order-container');
const addPizzaBtn = document.getElementById('add-Pizza-btn');
const addHamburgerBtn = document.getElementById('add-Hamburger-btn');
const addBeerBtn = document.getElementById('add-Beer-btn');

function resetOrder() {
  orderSection.innerHTML = ``;
  addPizzaBtn.removeAttribute('disabled');
  addHamburgerBtn.removeAttribute('disabled');
  addBeerBtn.removeAttribute('disabled');
}

let orderItems = [];

// handle the clicked item based on it's id or dataset.
document.addEventListener("click", function (e) {
  if (!document.getElementById("order-title")) {
    orderSection.innerHTML = `
        <h2 id="order-title">Your Order</h2>
        <div id="order-items"></div>
        <hr />
        <div id="order-total" class="order-items-row"></div>
        <button id="place-order" class="submit-btn">Complete Order</button>
    `;
  }
  if (e.target.dataset.pizza) {
    handleAddMenuItem(e.target.dataset.pizza);
  } else if (e.target.dataset.hamburger) {
    handleAddMenuItem(e.target.dataset.hamburger);
  } else if (e.target.dataset.beer) {
    handleAddMenuItem(e.target.dataset.beer);
  } else if (e.target.dataset.uuid) {
    handleRemoveMenuItem(e.target.dataset.uuid);
  } else if (e.target.id === "place-order") {
    renderOrderForm();
    document.getElementById('order-form').addEventListener('submit', (e) => {
      processOrder();
      e.preventDefault();
    })
  }
  else if (e.target.id === "reset-order-btn") {
    resetOrder();
  }
})

// Add items to the order.
function handleAddMenuItem(itemId) {
  const targetMenuItem = menuArray.filter(function (item) {
    return +itemId === item.id;
  })[0];

  orderItems.push({ ...targetMenuItem, uuid: uuidv4() });
  renderOrder(orderItems);
}

// Remove items from the order.
function handleRemoveMenuItem(itemUUID) {
  const targetOrderItems = orderItems.filter(function (item) {
    return item.uuid !== itemUUID;
  })

  orderItems = targetOrderItems;
  renderOrder(orderItems);
}

// Hide/Show the order section based on if there are items ordered.
function toggleOrder() {
  if (orderSection.classList.contains('hidden')) {
    orderSection.classList.remove('hidden');
  } else if (!orderSection.classList.contains('hidden') && orderItems.length === 0) {
    orderSection.classList.add('hidden');
  }
}

// Render the ordered items to the screen
function renderOrder(orderItems) {
  let completeOrder = ``;
  let orderTotal = 0
  toggleOrder();

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

// Produce an order form in a Dialog.
const orderDialog = document.getElementById('order-dialog');
let customerName = "";

function renderOrderForm() {
  orderDialog.classList.remove('hidden');
  orderDialog.innerHTML = `
      <div id="order-dialog-title">Enter Card Details</div>
      <form id="order-form">
          <input id="name-input" required type="text" class="order-input" placeholder="Enter your name" />
          <input id="card-input" required type="number" class="order-input" placeholder="Enter card number"/>
          <span id="card-error" class="error" hidden>Please enter a 16 digit card number.</span> 
          <input id="cvv-input" required type="number" class="order-input" placeholder="Enter CVV" />
          <span id="cvv-error" class="error" hidden>Please enter a 3 digit card number.</span> 
          <button id="pay-btn" type="submit" class="submit-btn">Pay</button>
      </form>
    `
}

function processOrder() {
  const cardInput = document.getElementById('card-input');
  const cardError = document.getElementById("card-error");
  const cvvInput = document.getElementById('cvv-input');
  const cvvError = document.getElementById("cvv-error");

  // Validations
  if (cardInput.value.length !== 16) {
    cardError.hidden = false;
    cardInput.addEventListener('input', e => {
      if (cardError.hidden === false && cardInput.value.length === 16) {
        cardError.hidden = true;
      }
    });

    return;
  }

  if (cvvInput.value.length !== 3) {
    cvvError.hidden = false;
    cvvInput.addEventListener('input', e => {
      if (cvvError.hidden === false && cvvInput.value.length === 3) {
        cvvError.hidden = true;
      }
    });

    return;
  }

  // Submit data here
  customerName = document.getElementById('name-input').value;
  orderItems = [];

  addPizzaBtn.setAttribute('disabled', true);
  addHamburgerBtn.setAttribute('disabled', true);
  addBeerBtn.setAttribute('disabled', true);

  // Close dialog, show thank you banner and reset the form.
  orderDialog.classList.add('hidden');
  orderSection.innerHTML = `
        <div id="banner">Thanks, ${customerName}! Your order is on its way!</div>
        <button id="reset-order-btn" class="submit-btn">Reset</button>
    `;
}