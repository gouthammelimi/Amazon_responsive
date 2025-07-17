import {cart, removeFromCart, updateQuantity, updateDeliveyOption} from '../data/cart.js';
import { products, getProduct,loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updateCartQuantity } from '../data/cart.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../data/deliveryOptions.js';
//import '../data/cart-class.js'
//import '../data/car.js';
//import '../data/backend-practise.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';







loadProducts(()=>{
  renderOrderSummary();
renderPaymentSummary();

updateCheckOutCartQuantity();
});




function updateCheckOutCartQuantity(){
    let cartCount = updateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = `${cartCount} items `;
  
}

export function renderOrderSummary() {
  
    let cartSummaryHTML = '';

    cart.forEach((cartItem)=>{
        const productId = cartItem.productId;
        
        const matchingProduct = getProduct(productId);

        //console.log(matchingProduct);
        

        //console.log(productId);
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(
          deliveryOption.deliveryDays, 'days'
        );

        const dateString = deliveryDate.format('dddd, MMMM D');
        

        //console.log(deliveryOption);
        
        
        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                      $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-link update-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                        Update
                      </span>
                      <input class="quantity-input is-editing-quantity update-input-${matchingProduct.id}" >
                      <span class="save-quantity-link link-primary is-editing-quantity save-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Save</span>
                      <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>                
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                  </div>
                </div>
              </div>
        
        `
        //console.log(cartSummaryHTML);
        
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

      deliveryOptions.forEach((deliveryOption) =>{
        const today = dayjs();
        const deliveryDate = today.add(
          deliveryOption.deliveryDays, 'days'
        );

        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;
        //console.log(priceString);
        
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        //console.log(isChecked);
        
        //console.log(`${deliveryOption.id}`);
        
        html +=  `     <div class="delivery-option js-delivey-option"
                  data-product-id = "${matchingProduct.id}"
                  data-delivery-option-id = "${deliveryOption.id}">
                <input type="radio"
                    ${isChecked? 'checked': ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                      ${dateString}
                  </div>
                  <div class="delivery-option-price">
                      ${priceString} shipping
                  </div>
                </div>
              </div>`
      });
      return html;
    }



    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


    document.querySelectorAll('.js-delete-link').forEach((link)=>{

        link.addEventListener('click',()=>{
            
            const productId = link.dataset.productId;
            removeFromCart(productId);
            //console.log(cart);
            
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            //console.log(container);
            container.remove();
            updateCheckOutCartQuantity();
            renderPaymentSummary();
            
        })
    })

    document.querySelectorAll('.js-delivey-option').forEach((element) =>{
      element.addEventListener('click',() => {
        const {productId, deliveryOptionId} = element.dataset;
        console.log(deliveryOptionId);
        
        updateDeliveyOption(productId, deliveryOptionId);
        renderOrderSummary();
      })
    }); 



    document.querySelectorAll('.js-update-link').forEach((link) =>{
        link.addEventListener('click', () =>{
          
          const productId = link.dataset.productId;
          const updateEle = document.querySelector(`.update-input-${productId}`);
          updateEle.classList.remove('is-editing-quantity');

          const saveEle = document.querySelector(`.save-input-${productId}`);
          saveEle.classList.remove('is-editing-quantity');
          
          const updateElee = document.querySelector(`.update-${productId}`);
          updateElee.classList.add('is-editing-quantity');

          
          
          
          
        })
    })

    document.querySelectorAll('.save-quantity-link').forEach((link) =>{
        link.addEventListener('click', () =>{
            const productId = link.dataset.productId;
            
            const updateEle = document.querySelector(`.update-input-${productId}`);
            updateEle.classList.add('is-editing-quantity');
            
            const saveEle = document.querySelector(`.save-input-${productId}`);
            saveEle.classList.add('is-editing-quantity');
            
            const updateElee = document.querySelector(`.update-${productId}`);
            updateElee.classList.remove('is-editing-quantity');

            //console.log(updateEle.value);
            updateQuantity(productId, Number(updateEle.value));
            updateCheckOutCartQuantity();
            renderOrderSummary();
            renderPaymentSummary();
        })
    })
}


