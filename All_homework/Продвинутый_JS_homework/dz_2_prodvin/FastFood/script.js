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

// Класс Гамбургера
class Hamburger {
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];
  }

  addTopping(topping) {
    if (!this.toppings.includes(topping)) {
      this.toppings.push(topping);
    }
  }

  removeTopping(topping) {
    this.toppings = this.toppings.filter(t => t !== topping);
  }

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

// Класс корзины
class Cart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => 
      item.product.getDescription() === product.getDescription()
    );
    
    if (existingItem) {
      existingItem.increaseQuantity(quantity);
    } else {
      this.items.push(new CartItem(product, quantity));
    }
  }

  removeItem(product) {
    this.items = this.items.filter(item => item.product !== product);
  }

  clear() {
    this.items = [];
  }

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

// Создаем корзину
const cart = new Cart();

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

// Функция для обновления отображения корзины
function updateCartUI() {
  cartItemsDiv.innerHTML = '';
  
  if (cart.getItemsCount() === 0) {
    cartItemsDiv.innerHTML = '<p>Корзина пуста</p>';
  } else {
    cart.getItemsDescriptions().forEach(desc => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';
      itemDiv.textContent = desc;
      cartItemsDiv.appendChild(itemDiv);
    });
  }
  
  cartCountSpan.textContent = cart.getItemsCount();
  cartQuantitySpan.textContent = cart.getTotalQuantity();
  cartTotalSpan.textContent = cart.getTotalPrice();
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
  cart.addItem(hamburger);
  updateCartUI();
  hamburgerOutput.innerHTML += `<p>Добавлено в корзину: ${hamburger.getDescription()}</p>`;
});

clearCartBtn.addEventListener('click', () => {
  cart.clear();
  updateCartUI();
});

// Инициализация
updateCartUI();