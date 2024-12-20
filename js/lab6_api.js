var limit_products = 194;
var new_products = [];

fetch('https://dummyjson.com/products?limit=30&skip=160')
    .then(response => response.json())
    .then(result => {
        console.log(result);
        display_products(result.products);
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
        var container = document.getElementById('product-container');
        container.innerHTML = "<p>Ошибка при загрузке данных</p>";
    });

function display_products(products) {
    var container = document.getElementById('product-container');
    var inform_container = document.getElementById('inform-container');
    container.innerHTML = '';
    var count_products = products.length;
    if (count_products == 0) {
        inform_container.innerHTML = `<p>Общее колличество товаров: ${limit_products}</p>`;
        container.innerHTML = `<p>Такого товара нет</p>`;
    } else {
        inform_container.innerHTML = `<p>Выведено ${count_products} товаров. Общее колличество товаров: ${limit_products}</p>`;
        for (let i = 0; i < count_products; i++) {
            var products_elem = document.createElement('div');
            products_elem.classList.add('content-shop__product');
            products_elem.innerHTML = `
            <img src="${products[i].thumbnail}" alt="${products[i].title}" onclick="open_card(${products[i].id})">
            <a href="#" class="content-shop__product_prod-title" onclick="open_card(${products[i].id})"><strong>${products[i].title}</strong></a>
            <p><strong>$${products[i].price}</strong></p>`;
            container.appendChild(products_elem);
        }
    }
}

function search_product() {
    var search_text = document.getElementById('search').value.toLowerCase();
    var find_products = new_products.filter(product => product.title.includes(search_text));

    fetch(`https://dummyjson.com/products/search?q=${search_text}`)
        .then(response => response.json())
        .then(result => {
            var all_results = find_products.concat(result.products);
            display_products(all_results);
        })
        .catch(error => {
            console.error('Ошибка при поиске:', error);
            var container = document.getElementById('product-container');
            container.innerHTML = "<p>Ошибка при выполнении поиска</p>";
        });

}

function clean_product() {
    var input = document.getElementById('search');
    input.value = '';
    fetch('https://dummyjson.com/products?limit=30&skip=160')
        .then(response => response.json())
        .then(result => display_products(result.products))
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
            var container = document.getElementById('product-container');
            container.innerHTML = "<p>Ошибка при загрузке данных</p>";
        });
}

function open_card(id) {
    fetch(`https://dummyjson.com/products/${id}`)
        .then(response => response.json())
        .then(product => {
            show_card(product);
        })
        .catch(error => {
            console.error('Ошибка при загрузке товара:', error);
        });
}

function show_card(finds_prod) {
    document.body.style.overflow = 'hidden';
    var container = document.getElementById('product-container');

    var owerlay = document.createElement('div');
    owerlay.classList.add('owerlay');
    owerlay.id = 'owerlay';
    container.appendChild(owerlay);

    var product = document.createElement('div');
    // console.log(finds_prod);
    product.classList.add('card');
    product.classList.add('card_flex');
    product.id = 'card_of_product';
    product.innerHTML = `
        <div class="card__column"> <img src="${finds_prod.thumbnail}" alt="${finds_prod.title}">  </div>  
        <div class="card__column card__column-description">  
            <i class="fa-solid fa-xmark" onclick="close_card('card_of_product')"></i>
            <p class="card__title"><strong>${finds_prod.title}</strong></p>
            <p>${finds_prod.description}</p>
            <div><button class="card__tags">${finds_prod.tags[0]}</button>
                <button class="card__tags">${finds_prod.tags[1]}</button></div>
            <p><strong>$${finds_prod.price}</strong></p> 
            <button class="card__button-buy">Buy one click</button> </div>`;
    container.appendChild(product);
}

function close_card(id) {
    document.body.style.overflow = '';
    var container = document.getElementById('product-container');
    var owerlay = document.getElementById('owerlay');
    var card = document.getElementById(id);
    container.removeChild(card);
    container.removeChild(owerlay);
}

function add_product() {
    document.body.style.overflow = 'hidden';
    var container = document.getElementById('product-container');

    var owerlay = document.createElement('div');
    owerlay.classList.add('owerlay');
    owerlay.id = 'owerlay';
    container.appendChild(owerlay);

    var new_product = document.createElement('div');
    new_product.classList.add('card');
    new_product.classList.add('create_product');
    new_product.id = 'card_new_product';
    new_product.innerHTML = `
            <i class="fa-solid fa-xmark" onclick="close_card('card_new_product')"></i>
            <h1 class="create_title"><strong>Creating a new product</strong></h1>
            <div class="create_prod_input">
                <p>Enter id (> 194)</p>
                <input id="id_prod" placeholder="id">
                <p>Enter title</p>
                <input id="title_prod" placeholder="title">
                <p>Enter price</p>
                <input id="price_prod" placeholder="price">
            </div>
            <button class="card__button-create" onclick="post_product('id_prod', 'title_prod', 'price_prod')">Create product</button>`;
    container.appendChild(new_product);
}

function post_product(id, title, price) {
    var id_prod = document.getElementById(id).value;
    var title_prod = document.getElementById(title).value;
    var price_prod = document.getElementById(price).value;
    // console.log(id_prod, title_prod, price_prod);
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id_prod,
            title: title_prod,
            price: price_prod,
        })
    })
        .then(res => res.json())
        .then(data => {
            new_products.push(data);
            console.log('Updated Array:', new_products); 
        })
        .then(console.log);
    
    limit_products += 1;
}