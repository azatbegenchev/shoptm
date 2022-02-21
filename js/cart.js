var car = {};//Корзина

$.getJSON('goods.json', function (data) {
    var goods = data;
    // console.log(data);
    checkCart();
    // console.log(cart);
    showCart();//вывожу товары на страницу
    function showCart() {
        var out = '';
        for (var key in cart) {
            out += '<button class="delete" data-art="' + key + '">x</button>';
            out += '<img src="' + goods[key].image + '" width="48"> ';
            out += goods[key].name;
            out += '<button class="minus" data-art="' + key + '">-</button>';
            out += cart[key];
            out += '<button class="plus" data-art="' + key + '">+</button>';
            out += cart[key] * goods[key].cost;
            out += '<br>';
        }
        $('.my-cart').html(out);
        $('.plus').on('click', plusGoods);
        $('.minus').on('click', minusGoods);
        $('.delete').on('click', deleteGoods);
    }
    function plusGoods() {
        //добавления товаров в корзину
        var articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLS(); //сохроняем корзину в LocalStorage
        showCart();
    }

    function minusGoods() {
        //удаление товаров из корзины
        var articul = $(this).attr('data-art');
        if (cart[articul] > 1) {
            cart[articul]--
        }
        else {
            delete cart[articul];
        }
        saveCartToLS();//сохроняем корзину в LocalStorage
        showCart();
    }


    function deleteGoods() {
        //удаление товаров из корзины
        var articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS();//сохроняем корзину в LocalStorage
        showCart();
    }

});

function checkCart() {
    //проверка наличии корзины в locaStorage
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
