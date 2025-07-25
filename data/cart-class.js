class Cart{
    cartItems ;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }


    #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

      if(!this.cartItems){
        this.cartItems = [{
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
    saveToStorage(){
  localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
}

    addToCart(productId){
  let matchingItem;
        
        console.log(productId);
        
        this.cartItems.forEach((cartItem) =>{
          if(cartItem.productId === productId){
            matchingItem = cartItem;
          }
        });

        if(matchingItem){
          matchingItem.quantity += 1;
        }else{
        this.cartItems.push({
          quantity: 1,
          productId: productId,
          deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
}

    removeFromCart(productId){
  const newCart = [];

  this.cartItems.forEach((cartItem)=>{
    if(productId !== cartItem.productId)
    {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  this.saveToStorage();
}

updateDeliveyOption(productId, deliveryOptionId) {
  let matchingItem;

  this.cartItems.forEach((cartItem) =>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  
  matchingItem.deliveryOptionId = deliveryOptionId;
  
  this.saveToStorage();
}

    updateCartQuantity (){
    let cartItemsCount = 0;
this.cartItems.forEach((cartItem) =>{
    cartItemsCount += cartItem.quantity;
});

//console.log(cartItemsCount);
  return cartItemsCount;
}

    updateQuantity (productId, newQuantity){
  console.log(productId);
  
  let matchingItem;
  this.cartItems.forEach((cartItem) =>{
    if(cartItem.productId === productId ){
      matchingItem = cartItem;      
    }
  })
  console.log(typeof newQuantity);
  
  
  matchingItem.quantity += newQuantity;
  
  
  this.saveToStorage();
  
  this.updateCartQuantity();

  console.log(matchingItem.quantity);
  }



}




const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);


console.log(businessCart instanceof Cart);
















































