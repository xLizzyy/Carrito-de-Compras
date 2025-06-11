<template>
  <v-app class="app-background">
    <HeaderCard
      :cartItems="cart.cartItems"
      :vaciarCarrito="cart.vaciarCarrito"
      @abrirCarrito="cart.abrirCarrito"
    />
    <ProduCongelados
      :cartItems="cart.cartItems"
      :agregarAlCarrito="cart.agregarAlCarrito"
    />
  </v-app>
</template>

<script setup lang="ts">
import HeaderCard from '@/components/HeaderCard.vue'
import ProduCongelados from '@/components/ProduCongelados.vue'
import { useCartStore } from '@/stores/cart'

// Usar la tienda del carrito
const cart = useCartStore()
</script>

<style>
.app-background {
  background-color: beige;  /* Cambia por tu color preferido */
  min-height: 100vh;
}
</style>