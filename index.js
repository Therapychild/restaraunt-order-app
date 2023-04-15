import { menuArray } from "./data.js";

const orderSection = document.getElementById('order');

document.addEventListener("click", function (e) {
  // handle the clicked item based on it's id;
  if (e.target.dataset.pizza) {
    handlePizzaClick(e.target.dataset.pizza);
  }
})

function handlePizzaClick(itemId) {
  // Find the Pizza item in the menu array.
  const targetMenuItem = menuArray.filter(function (item) {
    return item.id === itemId;
  })[0];

  // If the order section is hidden, show it.
  showOrder();

}


function showOrder() {
  if (orderSection.classList.contains('hidden')) {
    orderSection.classList.remove('hidden');
  }
}

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

// function addItem(item) {

// } 

// function removeItem(item) {

// }

// function renderItems() {

// }

// const order = `
//     <h2 class="order-title">Your Order</h2>
// `
// const orderItem = `
//     <div class="order-row">
//         <div class="order-item">
//             <h2>${menuItem.name}</h2>
//             <button class="remove-item-btn">remove</button>
//         </div>
//         <h4>$ ${menuItem.price}</h4>
//     </div>
// `

// document.getElementById("order").innerHTML = order;

function renderOrder() {

}