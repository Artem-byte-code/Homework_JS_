// Константы для гамбургеров
const HAMBURGER_SIZES = {
  small: { name: "Маленький", price: 50, calories: 20 },
  large: { name: "Большой", price: 100, calories: 40 }
};

const STUFFINGS = {
  cheese: { name: "С сыром", price: 10, calories: 20 },
  salad: { name: "С салатом", price: 20, calories: 5 },
  potato: { name: "С картофелем", price: 15, calories: 10 }
};

const TOPPINGS = {
  spice: { name: "Приправа", price: 15, calories: 0 },
  mayo: { name: "Майонез", price: 20, calories: 5 }
};

// 1. Функция makeGETRequest с использованием промисов
function makeGETRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`Ошибка: ${xhr.status}`));
      }
    };
    xhr.onerror = () => reject(new Error('Ошибка сети'));
    xhr.send();
  });
}

// Класс GoodsList с использованием промисов
class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    return new Promise((resolve, reject) => {
      // В реальном приложении здесь был бы запрос к серверу
      // Для примера используем setTimeout для имитации асинхронности
      setTimeout(() => {
        this.goods = [
          { id: 1, title: 'Гамбургер', price: 50 },
          { id: 2, title: 'Чизбургер', price: 70 },
          { id: 3, title: 'Картофель фри', price: 30 }
        ];
        resolve(this.goods);
      }, 1000);
    });
  }

  render() {
    const goodsList = document.createElement('ul');
    this.goods.forEach(good => {
      const goodItem = document.createElement('li');
      goodItem.textContent = `${good.title} - ${good.price} руб.`;
      goodsList.appendChild(goodItem);
    });
    document.body.appendChild(goodsList);
  }
}

// Класс Гамбургера с методами для корзины
class Hamburger {
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];
    this.id = Date.now(); // Уникальный ID для идентификации в корзине
  }

  // Методы добавления/удаления топпингов
  addTopping(topping) {
    if (!this.toppings.includes(topping)) {
      this.toppings.push(topping);
    }
  }

  removeTopping(topping) {
    this.toppings = this.toppings.filter(t => t !== topping);
  }

  // Методы для работы с корзиной
  addToCart(cart, quantity = 1) {
    cart.addItem(this, quantity);
  }

  removeFromCart(cart) {
    cart.removeItem(this);
  }

  // Вспомогательные методы
  getToppings() {
    return [...this.toppings];
  }

  getSize() {
    return this.size;
  }

  getStuffing() {
    return this.stuffing;
  }

  calculatePrice() {
    const basePrice = this.size.price + this.stuffing.price;
    const toppingsPrice = this.toppings.reduce((sum, topping) => sum + topping.price, 0);
    return basePrice + toppingsPrice;
  }

  calculateCalories() {
    const baseCalories = this.size.calories + this.stuffing.calories;
    const toppingsCalories = this.toppings.reduce((sum, topping) => sum + topping.calories, 0);
    return baseCalories + toppingsCalories;
  }

  getDescription() {
    let description = `${this.size.name} гамбургер ${this.stuffing.name}`;
    if (this.toppings.length > 0) {
      description += ` с ${this.toppings.map(t => t.name.toLowerCase()).join(', ')}`;
    }
    return description;
  }
}

// Класс элемента корзины
class CartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  increaseQuantity(amount = 1) {
    this.quantity += amount;
  }

  decreaseQuantity(amount = 1) {
    this.quantity = Math.max(0, this.quantity - amount);
  }

  getTotalPrice() {
    return this.product.calculatePrice() * this.quantity;
  }

  getDescription() {
    return `${this.product.getDescription()} (${this.quantity} шт.) - ${this.getTotalPrice()} руб.`;
  }
}

// Класс корзины с расширенными методами
class Cart {
  constructor() {
    this.items = [];
  }

  // Добавление товара в корзину
  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.increaseQuantity(quantity);
    } else {
      this.items.push(new CartItem(product, quantity));
    }
    this.updateUI();
  }

  // Удаление товара из корзины
  removeItem(product) {
    this.items = this.items.filter(item => item.product.id !== product.id);
    this.updateUI();
  }

  // Получение списка товаров в корзине
  getItems() {
    return [...this.items];
  }

  // Очистка корзины
  clear() {
    this.items = [];
    this.updateUI();
  }

  // Обновление UI корзины
  updateUI() {
    if (cartItemsDiv) {
      cartItemsDiv.innerHTML = '';
      
      if (this.items.length === 0) {
        cartItemsDiv.innerHTML = '<p>Корзина пуста</p>';
      } else {
        this.items.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'item';
          itemDiv.textContent = item.getDescription();
          cartItemsDiv.appendChild(itemDiv);
        });
      }
      
      if (cartCountSpan) cartCountSpan.textContent = this.items.length;
      if (cartQuantitySpan) cartQuantitySpan.textContent = this.getTotalQuantity();
      if (cartTotalSpan) cartTotalSpan.textContent = this.getTotalPrice();
    }
  }

  // Вспомогательные методы
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  getItemsCount() {
    return this.items.length;
  }

  getTotalQuantity() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getItemsDescriptions() {
    return this.items.map(item => item.getDescription());
  }
}

// Инициализация приложения
const cart = new Cart();
const goodsList = new GoodsList();

// DOM элементы
const hamburgerSizeSelect = document.getElementById('hamburger-size');
const hamburgerStuffingSelect = document.getElementById('hamburger-stuffing');
const toppingSpiceCheckbox = document.getElementById('topping-spice');
const toppingMayoCheckbox = document.getElementById('topping-mayo');
const calculateHamburgerBtn = document.getElementById('calculate-hamburger');
const addToCartBtn = document.getElementById('add-to-cart');
const hamburgerOutput = document.getElementById('hamburger-output');
const cartItemsDiv = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const cartQuantitySpan = document.getElementById('cart-quantity');
const cartTotalSpan = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');

// Функция для создания гамбургера из выбранных опций
function createHamburgerFromUI() {
  const sizeKey = hamburgerSizeSelect.value;
  const stuffingKey = hamburgerStuffingSelect.value;
  
  const hamburger = new Hamburger(
    HAMBURGER_SIZES[sizeKey],
    STUFFINGS[stuffingKey]
  );

  if (toppingSpiceCheckbox.checked) {
    hamburger.addTopping(TOPPINGS.spice);
  }
  if (toppingMayoCheckbox.checked) {
    hamburger.addTopping(TOPPINGS.mayo);
  }

  return hamburger;
}

// Обработчики событий
calculateHamburgerBtn.addEventListener('click', () => {
  const hamburger = createHamburgerFromUI();
  hamburgerOutput.innerHTML = `
    <p><strong>${hamburger.getDescription()}</strong></p>
    <p>Цена: ${hamburger.calculatePrice()} руб.</p>
    <p>Калории: ${hamburger.calculateCalories()} кал.</p>
  `;
});

addToCartBtn.addEventListener('click', () => {
  const hamburger = createHamburgerFromUI();
  hamburger.addToCart(cart);
  hamburgerOutput.innerHTML += `<p>Добавлено в корзину: ${hamburger.getDescription()}</p>`;
});

clearCartBtn.addEventListener('click', () => {
  cart.clear();
});

// 3. Использование fetchGoods с промисами
goodsList.fetchGoods()
  .then(goods => {
    console.log('Товары загружены:', goods);
    goodsList.render();
  })
  .catch(error => {
    console.error('Ошибка загрузки товаров:', error);
  });

// Инициализация UI корзины
cart.updateUI();