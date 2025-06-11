<template>
  <v-container>
    <v-row justify="center" align="start">
  <v-col cols="12" sm="6" md="3" v-for="product in products" :key="product.id">
    <ProductCard :product="product" />
  </v-col>
</v-row>
  </v-container>
</template>

<script setup>
import ProductCard from '@/components/ProductCard.vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

// Lista de productos
import { useProductoStore } from '@/stores/productos'
const productoStore = useProductoStore()
const products = productoStore.getProductos
</script>

<style>
.img {
  width: 100%;
  height: auto;
}
</style>
