<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'
import { useCompraStore } from '@/stores/compra'

const cart = useCartStore()
const compra = useCompraStore()
const showModal = ref(false)
const lastPurchase = ref<any[]>([])
const mostrarHistorial = ref(false)


function aumentarCantidad(item: any) {
  item.cantidad = (item.cantidad || 1) + 1
}

function disminuirCantidad(item: any) {
  if ((item.cantidad || 1) > 1) {
    item.cantidad -= 1
  }
}

function calcularPrecioConDescuento(item: any) {
  if (item.discount) {
    return (item.price - (item.price * item.discount) / 100).toFixed(2)
  }
  return item.price.toFixed(2)
}

import { computed } from 'vue'

const totalGeneral = computed(() => {
  return cart.cartItems.reduce((acum, item) => {
    const precio = parseFloat(calcularPrecioConDescuento(item))
    return acum + precio * item.cantidad
  }, 0).toFixed(2)
})

function finalizarCompra() {
  if (cart.cartItems.length === 0) return

  lastPurchase.value = [...cart.cartItems]
  compra.addToHistory(cart.cartItems) // Guardamos en historial
  cart.vaciarCarrito()
  showModal.value = true
}


compra.$subscribe((mutation, state) => {
  if (state.ultimaCompra.length > 0) {
    showModal.value = true
  }
})
</script>

<template>
  <v-btn class="mt-4" @click="mostrarHistorial = true">Ver Historial</v-btn>

    <div class="d-flex justify-end">
      <v-btn icon @click="cart.carritoVisible = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  <div v-if="cart.cartItems.length > 0">
    <v-table>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Precio con Descuento</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.cartItems" :key="item.id">
          <td>
            <v-img :src="item.image" max-width="80" aspect-ratio="1" contain></v-img>
          </td>
          <td>{{ item.name }}</td>
          <td>${{ calcularPrecioConDescuento(item) }}</td>
          <td>
            <v-btn icon @click="disminuirCantidad(item)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span class="mx-2">{{ item.cantidad }}</span>
            <v-btn icon @click="aumentarCantidad(item)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </td>
          <td>${{ (calcularPrecioConDescuento(item) * item.cantidad).toFixed(2) }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-btn color="error" class="mt-4" @click="cart.vaciarCarrito()">Vaciar carrito</v-btn>
    <v-btn color="success" class="mt-4" @click="finalizarCompra">Finalizar Compra</v-btn>
  </div>
  <div v-else>
    <v-alert type="info" variant="outlined" class="mt-4">
      El carrito está vacío
    </v-alert>
  </div>

  <div class="text-right mt-4">
  <strong>Total general: ${{ totalGeneral }}</strong>
</div>

<v-dialog v-model="mostrarHistorial" max-width="800">
  <v-card>
    <v-card-title class="text-h6">
      Historial de Compras
    </v-card-title>

    <v-card-text>
      <div v-if="compra.historial.length > 0">
        <div
          v-for="(compraItem, index) in compra.historial"
          :key="index"
          class="mb-6"
        >
          <strong>Fecha: {{ compraItem.fecha }}</strong>
          <v-divider class="my-2" />

          <v-row
            v-for="producto in compraItem.productos"
            :key="producto.id"
            class="mb-3"
          >
            <v-col cols="3">
              <v-img :src="producto.image" max-width="80" aspect-ratio="1" />
            </v-col>

            <v-col cols="9">
              <p><strong>Nombre:</strong> {{ producto.name }}</p>
              <p><strong>Cantidad:</strong> {{ producto.cantidad }}</p>
              <p><strong>Precio Unitario:</strong> ${{ producto.precioUnitario }}</p>
              <p><strong>Total:</strong> ${{ producto.total }}</p>
            </v-col>
          </v-row>
        </div>
      </div>

      <div v-else>
        <p>No hay historial de compras.</p>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="mostrarHistorial = false">
        Cerrar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


</template>





