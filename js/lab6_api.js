fetch('https://dummyjson.com/products?limit=200')
    .then(response => response.json())
    .then(result => {
        console.log(result);
        // обрезка данных под себя
        let products_for_var = result.products.slice(164, 194);
        console.log(products_for_var);

        let container = document.getElementById('product-container');
        for (let i = 0; i < 30; i++) {
            var products_elem = document.createElement('div');
            products_elem.classList.add('product');
            products_elem.innerHTML = `
                <img src="${products_for_var[i].thumbnail}" alt="${products_for_var[i].title}">
                <h3>${products_for_var[i].title}</h3>
                <p>${products_for_var[i].description}</p>
                <div class="price">$${products_for_var[i].price}</div>`;
            container.appendChild(products_elem);
        }

        // Элемент input для ввода текста поиска
        let search = document.getElementById('search');

        let list_search = result.products;
        // console.log(list_search);
        // Функция для фильтрации списка
        search.addEventListener('input', function (event) {
            var searchText = event.target.value.toLowerCase();
            container.innerHTML = '';
            var filter_search = list_search.filter(item => item.description.includes(searchText) || item.title.includes(searchText));
            console.log(filter_search.length);
            if (filter_search.lenght == 0) {
                console.log("Такого товара нет");
                products_elem = document.createElement('div');
                products_elem.classList.add('product');
                products_elem.innerHTML = `<p>Такого товара нет</p>`;
                container.appendChild(products_elem);
            } else {
                filter_search.forEach(elem => {
                    products_elem = document.createElement('div');
                    products_elem.classList.add('product');
                    products_elem.innerHTML = `
                            <img src="${elem.thumbnail}" alt="${elem.title}">
                            <h3>${elem.title}</h3>
                            <p>${elem.description}</p>
                            <div class="price">$${elem.price}</div>`;
                    container.appendChild(products_elem);
                });
            }


            //     // else {
            //     //     container.innerHTML= "<p>Такого товара нет</p>";
            //     // }
        }

            // if (container === '') {

            // }
        );


    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
        let container = document.getElementById('product-container');
        container.appendChild("<p>Ошибка при загрузке данных</p>");
    });


