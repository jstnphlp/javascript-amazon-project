function Cart(localStorageKey) {
    const cart = {
    cartItems: undefined,
    loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)); 

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
    },

    saveToStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
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
    },

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;

        this.saveToStorage();
    }, 

    updateCartQuantity(cart) {
        let cartQuantity = 0;

        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        return cartQuantity;
    },

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
},

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
    };
    
    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);








