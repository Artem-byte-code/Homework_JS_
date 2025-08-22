<template>
  <div class="product-item">
    <img :src="product.image" :alt="product.name">
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p><strong>Цена: {{ product.price }} ₽</strong></p>
    <button @click="$emit('add-to-cart', product)">
      {{ isLoading ? 'Добавляем...' : 'В корзину' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    isLoading: Boolean
  }
}
</script>

<style scoped>
.product-item {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
</style>