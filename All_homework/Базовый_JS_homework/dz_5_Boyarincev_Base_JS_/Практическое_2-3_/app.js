
class Product { // конструктор класса Product
    constructor(id, name, price) { 
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

const products = [ // массив товаров
    new Product(3, "Mouse", 200),
    new Product(5, "Keyboard", 500),
    new Product(10, "USB Flash Drive", 80),
    new Product(8, "Headphones", 150),
    new Product(12, "Monitor", 1200),
    new Product(15, "Webcam", 300)
];

class Cart { // конструктор класса Cart
    constructor() {
        this.items = [];
        this.cartContainer = document.getElementById('cart-container');
        this.renderCart(); // вызов функции прогрузки/обновления корзины
    }

    addProduct(product) { // Добавление продукта
        const existingItem = this.items.find(item => item.id === product.id); // проверка на наличие этого товара в корзине
        if (existingItem) { // если да
            existingItem.quantity += 1; // +1 к кол-ву в корзине
        } else {
            const productCopy = new Product(product.id, product.name, product.price); //создаём полную копию товара 
            productCopy.quantity = 1; //
            this.items.push(productCopy);
        }
        this.renderCart(); // вызов функции прогрузки/обновления корзины
        return this.items.length; // возвращаем длину массива корзины
    }

    deleteProduct(productId) { // удаление продукта
        const productIndex = this.items.findIndex(item => item.id === productId); // переменная индексПродукта = в массиве this.items.найтиИндекс( для каждого продукта: АйдиПредмета(в корзине) должно быть равно АйдиПродукта)
        if (productIndex === -1) { // если товаров нет то задаёт индексПродукта = -1
            console.warn(`Товар с ID ${productId} не найден в корзине`); // сообщение о отсутствии продукта
            return false;
        }

        if (this.items[productIndex].quantity > 1) { // если кол-во товара больше 1
            this.items[productIndex].quantity -= 1; // то умньшаем кол-во на 1
        } else {
            this.items = this.items.filter(item => item.id !== productId); // полностью удаляем товар из корзины
        }
        
        this.renderCart(); // вызов функции прогрузки/обновления корзины
        return true;
    }

    renderCart() { // функция прогрузки корзины
        this.cartContainer.innerHTML = ''; // сначала опустошаем массив 
        
        if (this.items.length === 0) { // проверяем есть ли в корзине что-нибудь по кол-ву
            this.cartContainer.textContent = "Корзина пуста"; // вывод сообщения если корзина пуста
        } else {
            const totalCount = this.items.reduce((sum, item) => sum + item.quantity, 0); // расчёт кол-ва товаров в корзине
            const totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0); // расчёт цены всей корзины
            
            const cartTitle = document.createElement('h2'); // создаём заголовок корзины
            cartTitle.textContent = 'Ваша корзина'; // текст заголовка
            this.cartContainer.appendChild(cartTitle); // закрепляем за контейнером корзины заголовок
            
            const itemsList = document.createElement('ul'); // создаём элемент для отображения списка товаров в корзине
            this.items.forEach(item => { // Перебираем каждый товар в корзине 
                const listItem = document.createElement('li'); // Создаём элемент для текущего товара
                listItem.textContent = `${item.name} (${item.quantity} шт. × ${item.price} руб.) — ${item.quantity * item.price} руб.`; // заполняем текст элемента
                
                const removeBtn= document.createElement('button'); // создаём кнопку удаления товара из корзины
                removeBtn.textContent = 'Удалить'; // текст на кнопке
                removeBtn.className = 'remove-from-cart'; // класс кнопки
                removeBtn.onclick = () => this.deleteProduct(item.id); // функция которая будет вызываться при нажатии
                
                listItem.appendChild(removeBtn); // добавляем кнопку удаления в текущий элемент списка товаров
                itemsList.appendChild(listItem); // добавляем заполненный элемент товара в общий список
            });
            
            this.cartContainer.appendChild(itemsList); // добавляем созданный список товаров в контейнер корзины 
            
            const cartSummary = document.createElement('div'); // создаём контейнер для отображения информации корзины
            cartSummary.className = 'cart-summary'; // класс контейнера для стилей
            cartSummary.innerHTML = `<strong>Итого:</strong> ${totalCount} товаров на сумму ${totalPrice} рублей`; // заполняем HTML содержимое контейнера
            this.cartContainer.appendChild(cartSummary); // добавляем контейнер для отображения информации  в контейнер корзины
        }
    }
}

class Catalog { // конструктор класса каталога
    constructor(products, cart) { 
        this.products = products;
        this.cart = cart;
        this.catalogContainer = document.getElementById('catalog'); // назначаем контейнер каталога по id в HTML
        this.renderCatalog(); // вызываем прогрузку каталога
    }

    renderCatalog() { // функция прогрузки каталога
        this.catalogContainer.innerHTML = ''; // опустошаем каталог от элементов
        
        const catalogTitle = document.createElement('h2'); // создаём заголовок каталога
        catalogTitle.textContent = 'Каталог товаров'; // заполняем текст каталога
        this.catalogContainer.appendChild(catalogTitle); // прикрепляем заголовок каталога к контейнеру каталога
        
        this.products.forEach(product => { // перебираем все товары из массива
            const productCard = document.createElement('div'); // создаём карточку товара (основной контейнер)
            productCard.className = 'product-card'; // класс для карточки товара (основного контейнера)
            
            const nameElement = document.createElement('div'); // создаём элемент для отображения имени продукта
            nameElement.className = 'product-name'; // класс для элемента отображения имени
            nameElement.textContent = product.name; // заполняем текстом наш элемент из переменной самого продукта
            
            const priceElement = document.createElement('div'); // создаём элемент отображения цены продукта 
            priceElement.className = 'product-price'; // класс для элемента отображения цены
            priceElement.textContent = `${product.price} руб.`; // заполняем текстом наш элемент из переменной самого продукта
            
            const addButton = document.createElement('button'); // создаём кнопку добавления в корзину
            addButton.className = 'add-to-cart'; // класс кнопки добавления в корзину
            addButton.textContent = 'Добавить в корзину'; // текст кнопки
            addButton.onclick = () => { // функция вызываемая при нажатии
                this.cart.addProduct(product); // вызывает метод корзины для добавления в корзину
            };
            // добавляем все созданные элементы товара в контейнер каталога
            productCard.appendChild(nameElement); // Название закрепляем к карточке продукта
            productCard.appendChild(priceElement); // Цену закрепляем к карточке продукта
            productCard.appendChild(addButton); // Кнопку закрепляем к карточке продукта
            // добавляем заполненную карточку товара в контейнер каталога
            this.catalogContainer.appendChild(productCard);
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => { // добавляем обработчик события который срабатывает при полной прогрузке и обработке HTML
    const cart = new Cart(); // создаём новую корзину
    new Catalog(products, cart); // создаём новый каталог
});