export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')); 

        if (!cart) {
            cart = [{
                productId: 'id1',
                quantity: 1,
                deliveryOptionId: '1'
            },
            {
            productId: 'id2',
            quantity: 1,
            deliveryOptionId: '2'
        }]
}
}


function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
   let matchingItem;

        let selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
        let numSelectedQuantity = 1;
        if(selectedQuantity) {
            numSelectedQuantity = Number(selectedQuantity.value);
        }

        cart.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if(matchingItem) {
            matchingItem.quantity += numSelectedQuantity;
        } else {
            cart.push({
            productId,
            quantity: numSelectedQuantity,
            deliveryOptionId: '1'
        });
        }
    
        saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
}

export function updateCartQuantity(cart) {
        let cartQuantity = 0;

        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        return cartQuantity;
    }

export function updateQuantity(productId, newQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if(cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.quantity = newQuantity;
    saveToStorage();
    
    return matchingItem.quantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}
