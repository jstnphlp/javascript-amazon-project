import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage} from '../../data/cart.js';

describe('Test Suite: renderOrderSummary', () => {
    it('Displays the cart', () => {
    document.querySelector('.js-test-container').innerHTML = `
        <div class = "js-order-summary"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'id1',
                quantity: 1,
                deliveryOptionId: '1'
            },
            {
                productId: 'id2',
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
        
    loadFromStorage();
    renderOrderSummary();
    });
});