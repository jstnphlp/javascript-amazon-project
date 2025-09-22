export let cart = JSON.parse(localStorage.getItem('cart')); 

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
   let matchingItem;

        let selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
        let numSelectedQuantity = Number(selectedQuantity.value);

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
            quantity: numSelectedQuantity
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
