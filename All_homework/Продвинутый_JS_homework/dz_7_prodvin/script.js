// Имитация API
const mockApi = {
    async getProducts() {
        return [
            {
                id: 1,
                name: "Ноутбук Lenovo IdeaPad",
                description: "15.6 дюймов, 8 ГБ ОЗУ, 256 ГБ SSD",
                price: 45000,
                image: "https://via.placeholder.com/150?text=Laptop"
            },
            {
                id: 2,
                name: "Смартфон Samsung Galaxy",
                description: "6.4 дюйма, 128 ГБ памяти",
                price: 25000,
                image: "https://via.placeholder.com/150?text=Phone"
            },
            {
                id: 3,
                name: "Наушники Sony WH-1000XM4",
                description: "Беспроводные, с шумоподавлением",
                price: 18000,
                image: "https://via.placeholder.com/150?text=Headphones"
            },
            {
                id: 4,
                name: "Планшет Apple iPad",
                description: "10.2 дюйма, 64 ГБ",
                price: 28000,
                image: "https://via.placeholder.com/150?text=Tablet"
            }
        ];
    }
};

// Основное приложение Vue
new Vue({
    el: '#app',
    data: {
        products: [],
        filteredProducts: [],
        cartItems: [],
        isCartVisible: false,
        isLoading: false,
        showError: false,
        errorMessage: '',
        stats: []
    },
    computed: {
        cartTotal() {
            return this.cartItems.reduce((total, item) => total + item.price, 0);
        }
    },
    async created() {
        try {
            this.products = await mockApi.getProducts();
            this.filteredProducts = [...this.products];
        } catch (error) {
            this.showError = true;
            this.errorMessage = "Ошибка загрузки товаров: " + error.message;
        }
    },
    methods: {
        toggleCart() {
            this.isCartVisible = !this.isCartVisible;
        },
        async addToCart(product) {
            this.isLoading = true;
            try {
                // Имитация задержки API
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const cartItem = {
                    ...product,
                    cartId: Date.now() // Уникальный ID для элемента корзины
                };
                
                this.cartItems.push(cartItem);
                this.saveStat('added', product.name);
            } catch (error) {
                this.showError = true;
                this.errorMessage = "Не удалось добавить товар в корзину";
            } finally {
                this.isLoading = false;
            }
        },
        async removeFromCart(item) {
            this.isLoading = true;
            try {
                // Имитация задержки API
                await new Promise(resolve => setTimeout(resolve, 300));
                
                this.cartItems = this.cartItems.filter(i => i.cartId !== item.cartId);
                this.saveStat('removed', item.name);
            } catch (error) {
                this.showError = true;
                this.errorMessage = "Не удалось удалить товар из корзины";
            } finally {
                this.isLoading = false;
            }
        },
        clearCart() {
            if (this.cartItems.length > 0) {
                this.cartItems.forEach(item => {
                    this.saveStat('removed', item.name);
                });
                this.cartItems = [];
            }
        },
        saveStat(action, productName) {
            const statEntry = {
                action,
                productName,
                timestamp: new Date().toISOString()
            };
            this.stats.push(statEntry);
        },
        downloadStats() {
            if (this.stats.length === 0) {
                this.showError = true;
                this.errorMessage = "Нет данных для сохранения";
                return;
            }
            
            const data = JSON.stringify(this.stats, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'stats.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
});
