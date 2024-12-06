let products_data = [];

fetch('https://dummyjson.com/products?limit=200')
    .then(response => response.json())
    .then(result => {
        console.log(result);
        products_data = result.products;
        display_products(products_data.slice(164, 194));
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
        // console.log("Такого товара нет");
        inform_container.innerHTML = `<p>Общее колличество товаров: ${products_data.length}</p>`;
        products_elem = document.createElement('div');
        products_elem.innerHTML = `<p>Такого товара нет</p>`;
        container.appendChild(products_elem);
    } else if (products[0] == "пусто") {
        // console.log("Введена пустая строка");
        inform_container.innerHTML = `<p>Общее колличество товаров: ${products_data.length}</p>`;
        products_elem = document.createElement('div');
        products_elem.innerHTML = `<p>Ничего не введено в строку поиска</p>`;
        container.appendChild(products_elem);
    } else {
        inform_container.innerHTML = `<p>Выведено ${count_products} товаров. Общее колличество товаров: ${products_data.length}</p>`;
        for (let i = 0; i < count_products; i++) {
            var products_elem = document.createElement('div');
            products_elem.classList.add('content-shop__product');
            products_elem.innerHTML = `
            <img src="${products[i].thumbnail}" alt="${products[i].title}">
            <a href="#" class="content-shop__product_prod-title"><strong>${products[i].title}</strong></a>
            <p>${products[i].description}</p>
            <p><strong>$${products[i].price}</strong></p>`;
            container.appendChild(products_elem);
        }
    }
}

function search_product() {
    var search = document.getElementById('search');
    var search_text = search.value.toLowerCase();
    if (search_text == '') {
        var filter_products = ["пусто"];
    } else {
        var filter_products = products_data.filter(item => item.description.includes(search_text) || item.title.includes(search_text));
        // console.log(filter_products);
    }
    display_products(filter_products);
}

function clean_product() {
    var input = document.getElementById('search');
    input.value = '';
    display_products(products_data.slice(164, 194));
}