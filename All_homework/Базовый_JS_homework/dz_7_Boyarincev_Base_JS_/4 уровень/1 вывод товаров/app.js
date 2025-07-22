"use strict";

const products = {
    phones: [
        {
            id: 1,
            name: "Смартфон 1",
            price: "23,99 р.",
            imageUrl: "https://picsum.photos/seed/1/200",
        },
        {
            id: 2,
            name: "Смартфон 2",
            price: "11,99 р.",
            imageUrl: "https://picsum.photos/seed/2/200",
        },
        {
            id: 3,
            name: "Смартфон 3",
            price: "22,99 р.",
            imageUrl: "https://picsum.photos/seed/3/200",
        },
    ],

    tablets: [
        {
            id: 4,
            name: "Планшет 4",
            price: "99,99 р.",
            imageUrl: "https://picsum.photos/seed/4/200",
        },
        {
            id: 5,
            name: "Планшет 5",
            price: "44,99 р.",
            imageUrl: "https://picsum.photos/seed/5/200",
        },
    ],

    tv: [
        {
            id: 6,
            name: "Телевизор 6",
            price: "199,99 р.",
            imageUrl: "https://picsum.photos/seed/6/200",
        },
        {
            id: 7,
            name: "Телевизор 7",
            price: "244,99 р.",
            imageUrl: "https://picsum.photos/seed/7/200",
        },
        {
            id: 8,
            name: "Телевизор 8",
            price: "399,99 р.",
            imageUrl: "https://picsum.photos/seed/8/200",
        },
        {
            id: 9,
            name: "Телевизор 9",
            price: "444,99 р.",
            imageUrl: "https://picsum.photos/seed/9/200",
        },
    ],
};

function clickHandler(event) {
    // Очищаем содержимое .products
    document.querySelector('.products').innerHTML = '';
    
    // Получаем тип категории из атрибута data-type кнопки
    const category = event.target.getAttribute('data-type');
    
    // Показываем товары выбранной категории
    showCategory(category);
}

function showCategory(category) {
    // Получаем контейнер для товаров
    const productsContainer = document.querySelector('.products');
    
    // Получаем массив товаров для выбранной категории
    const categoryProducts = products[category];
    
    // Для каждого товара создаем разметку и добавляем в контейнер
    categoryProducts.forEach(product => {
        const productMarkup = getProductMarkup(product);
        productsContainer.insertAdjacentHTML('beforeend', productMarkup);
    });
}

function getProductMarkup(product) {
    // Генерируем HTML-разметку для одного товара
    return `
        <div class="product">
            <div>${product.name}</div>
            <img src="${product.imageUrl}" alt="${product.name}">
            <div>${product.price}</div>
            <a href="https://example.com/producs/${product.id}">Подробнее</a>
        </div>
    `;
}

// Добавляем обработчики клика на все кнопки
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', clickHandler);
});