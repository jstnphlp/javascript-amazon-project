class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)); 

        if (!this.cartItems) {
            this.cartItems = [{
                productId: 'id1',
                quantity: 1,
                deliveryOptionId: '1'
            },
            {
                productId: 'id2',
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;

        let selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
        let numSelectedQuantity = 1;
        if(selectedQuantity) {
            numSelectedQuantity = Number(selectedQuantity.value);
        }

        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if(matchingItem) {
            matchingItem.quantity += numSelectedQuantity;
        } else {
            this.cartItems.push({
            productId,
            quantity: numSelectedQuantity,
            deliveryOptionId: '1'
        });
        }
    
       this.saveToStorage();
    }

     removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;

        this.saveToStorage();
    }

    updateCartQuantity(cart) {
        let cartQuantity = 0;

        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        return cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
        if(cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.quantity = newQuantity;
    this.saveToStorage();
    
    return matchingItem.quantity;
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }



}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);






