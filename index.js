// Import of menuArray from data.js
import {menuArray} from "./data.js";

// Grabbing the renderMenu Div for rendering the restaurant menu

const renderMenu = document.getElementById('render-menu');
// Grabbing The Checkout container
const checkoutContainer = document.getElementById('checkout-container');
// Grabbing The Payment Modal
const payModal = document.getElementById('payment-modal');
// 
let finalMessage = document.getElementById('final-message');

// Listening For Clicks
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addItem(e.target.dataset.add)
        checkoutContainer.style.display = "block";
    }
    else if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }
    else if(e.target === document.getElementById('complete-order-btn')){
      checkoutContainer.style.display = "none";  
      payModal.style.display = "block";
    }
    else if(e.target === document.getElementById('pay-btn')){
        // The code below  reffering to thank you note gives the error of 
        // "Cannot read properties of reading style none";
        // document.getElementById('thank-you-note').style.display = "block";
      
    }

})


// Function For Rendering The Menu To The renderMenu Div..
function getMenuHtml(){
    
    let menuHtml = '';
    
    menuArray.forEach(function (menu){
        
        menuHtml += `
                    <div class="menu-container">
                        <div>
                            <p class="item-pic">${menu.emoji}</p>
                        </div>
                        
                        <div class="item-detail">
                            <h2 class="item-name">${menu.name}</h2>
                            <p class="item-ingredients">${menu.ingredients}</p>
                            <h4 class="item-price">$${menu.price}</h4>
                        </div>
                        
                        <button data-add='${menu.id}'> + </button>
                    </div>
                     
                    `
    })
  return menuHtml;
}

// Function To Render Menu To The renderMenu Div
function getMenu(){
   renderMenu.innerHTML= getMenuHtml(); 
}

getMenu();

// add-btn click
let ordersArray = [];
function addItem(menuId){
    const targetMenuItem = menuArray.filter(function(menu){
        return menu.id == menuId;
    })[0]
    
    ordersArray.push(targetMenuItem);
    renderOrderSummary(menuId);   
}
// Function To Display Ordered Items
function renderOrderSummary(menuId){
    let orderHtml ='';
    
    ordersArray.forEach(function(menu){
        orderHtml+= `
                    <div class="order-item">
                    <h2>${menu.name}</h2>
                    <button class="remove-order-btn" data-remove="${menu.id}">remove</button>
                    <h4 class="align-right">$${menu.price}</h4>
                    </div>
                    `
    })
    document.getElementById('order-list').innerHTML  = orderHtml;
    getTotalPrice();
}

// Function To Calculate Total Price
function getTotalPrice(){
    let totalPrice=0;
    
    ordersArray.forEach(function(menu){
        totalPrice += menu.price
    })
    document.getElementById('total-price').textContent= `$${totalPrice}`
}

// Function To Remove An Item From Order
function removeItem(menuId){
 const removedItem = ordersArray.filter(function(menu){
     return menu.id = menuId;
 })[0]
 
   ordersArray.splice(ordersArray.indexOf(removedItem), 1);
   renderOrderSummary(menuId) ;
   if (ordersArray.length === 0) {
document.getElementById('checkout-container').style.display = "none";
    }  
}


//set e.preventDefault() to the form

payModal.addEventListener('submit', (e) => {
  const nameInput = document.querySelector('.name-input').value;
  e.preventDefault();
  let message = `
  <p class="text-message">Thanks, ${nameInput}! You order is on its way!</p>
  
  `;
   payModal.style.display = 'none';
  finalMessage.innerHTML = message;
  finalMessage.style.display = "block"
  setTimeout(function timeOut() {
    return location.reload();
  }, 50000);
});
