'use strict';
let buttons = document.querySelectorAll('button');
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        basket.addToBasket(button.parentNode);
        fullCartTable();
    });

});

let basket = {
    goods: [],

    getTotal() {
        let total = 0;
        this.goods.forEach(function (good) {
            total += good.price * good.qty;
        });
        return total;
    },

    addToBasket(product) {
        if (this.isProductInBasket(product.id) == true) {
            this.setQty(product.id);
        } else {
            let productObject = {
                id: product.id,
                name: product.querySelector('.productName').innerText,
                price: product.querySelector('.productPrice').innerText,
                qty: 1,
            };
            this.goods.push(productObject);
        }
    },

    isProductInBasket(id) {
        // Если корзина пустая
        if (this.goods.length === 0) {
            return false;
        }
        // true, если добавляемый товар уже есть в корзине
        return this.goods.some(function (good) {
            return good.id == id;
        });
    },

    setQty(id) {
        this.goods.forEach(function (good) {
            if (good.id == id) {
                good.qty++;
            }
        });
    },

};

function fullCartTable() {
    let tbody = document.querySelector('.cart_body');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    let innerHTML = '';
    basket.goods.forEach(function (good) {
        innerHTML += `<tr>
<td>${good.id}</td>
<td>${good.name}</td>
<td>${good.price}</td>
<td>${good.qty}</td>
<td>${good.qty * good.price}</td>
</tr>\n`;

    });
    tbody.insertAdjacentHTML('afterbegin', innerHTML);


    let totalSpan = document.querySelector('.total');
    totalSpan.innerText = basket.getTotal();

};




