

export let cart;
loadFromStorage();
export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

      if(!cart){
        cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId: '2'
      }];
      }
}



function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(productId){
  let matchingItem;
        
        console.log(productId);
        
        cart.forEach((cartItem) =>{
          if(cartItem.productId === productId){
            matchingItem = cartItem;
          }
        });

        if(matchingItem){
          matchingItem.quantity += 1;
        }else{
        cart.push({
          quantity: 1,
          productId: productId,
          deliveryOptionId: '1'
        });
      }
      saveToStorage();
}


export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem)=>{
    if(productId !== cartItem.productId)
    {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function updateCartQuantity (){
    let cartItemsCount = 0;
cart.forEach((cartItem) =>{
    cartItemsCount += cartItem.quantity;
});

//console.log(cartItemsCount);
  return cartItemsCount;
}

export function updateQuantity (productId, newQuantity){
  console.log(productId);
  
  let matchingItem;
  cart.forEach((cartItem) =>{
    if(cartItem.productId === productId ){
      matchingItem = cartItem;      
    }
  })
  console.log(typeof newQuantity);
  
  
  matchingItem.quantity += newQuantity;
  
  
  saveToStorage();
  
  updateCartQuantity();

  console.log(matchingItem.quantity);
  
}

export function updateDeliveyOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) =>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  
  matchingItem.deliveryOptionId = deliveryOptionId;
  
  saveToStorage();
}







