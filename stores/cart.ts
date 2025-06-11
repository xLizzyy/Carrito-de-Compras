// stores/cart.ts
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as any[],
    carritoVisible: false
  }),
  actions: {
  agregarAlCarrito(producto: any) {
  const existente = this.cartItems.find(item => item.id === producto.id)
  if (existente) {
    existente.cantidad += 1
  } else {
    this.cartItems.push({ ...producto, cantidad: 1 })
  }
},
    vaciarCarrito() {
      this.cartItems = []
    },
    abrirCarrito() {
      this.carritoVisible = !this.carritoVisible
    }
  }
})
