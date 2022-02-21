var cart = {}; //моя корзина
$('document').ready(function () {
    loadGoods();
    checkCart();
    showMiniCart();
})

function loadGoods() {
    //Загрузка товаров на страницу
    $.getJSON('goods.json', function (data) {
        // console.log(data);
        var out = '';
        for (var key in data) {
            out += '<div class="single-goods">';
            out += '<h3>' + data[key]['name'] + '</h3>';
            out += '<p>Цена: ' + data[key]['cost'] + '</p>';
            out += '<img src="' + data[key].image + '">';
            out += '<button class="add-to-cart" data-art="' + key + '">Купить</button>'
            out += '</div>';
        }
        $('.goods').html(out);
        $('button.add-to-cart').on('click', addToCart);
    });

}
function addToCart() {
    //Добавляем в корзину
    var articul = $(this).attr('data-art');
    if (cart[articul] != undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
    showMiniCart();

}

function checkCart() {
    //проверка наличии корзины в locaStorage
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function showMiniCart() {
    //показывает содержимое корзины
    var out = '';
    for (var w in cart) {
        out += w + '---' + cart[w] + '<br>';
    }
    $('.mini-cart').html(out);
}

