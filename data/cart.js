export const cart = [];

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

}
