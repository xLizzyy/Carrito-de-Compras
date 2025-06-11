<template>
  <v-app-bar color="blue" app dark class="px-3">
    <v-app-bar-title class="titulo-cabezote">
      <v-icon left>mdi-store</v-icon>
      Heladeria "El Frio"
    </v-app-bar-title>
    

    <v-spacer></v-spacer>

    <v-btn icon @click="cart.abrirCarrito" class="mr-4">
      <v-badge
        :content="cartItemsCount.toString()"
        color="success"
        v-if="cartItemsCount > 0"
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
      <v-icon v-else>mdi-cart</v-icon>
    </v-btn>

    <!-- Modal para mostrar carrito -->
    <v-dialog v-model="cart.carritoVisible" max-width="800px">
      <v-card>
        <v-card-title class="headline">Carrito de Compras</v-card-title>
        <v-card-text>
          <!-- Solo muestra el componente completo -->
          <CarritoFunc />
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<style scoped>
.titulo-cabezote {
  display: flex;
  position: absolute;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  left: 80px;
}

</style>
<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import CarritoFunc from './CarritoFunc.vue' // Asegúrate de que el path sea correcto

const cart = useCartStore()
const cartItemsCount = computed(() => cart.cartItems.length)
</script>
