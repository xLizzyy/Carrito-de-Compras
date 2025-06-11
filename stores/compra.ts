import { defineStore } from 'pinia'

export const useCompraStore = defineStore('compra', {
  state: () => ({
    historial: [] as {
      fecha: string,
      productos: any[]
    }[],
    ultimaCompra: [] as any[]
  }),
  actions: {
    addToHistory(items: any[]) {
      const fecha = new Date().toLocaleString()

      const productos = items.map(producto => {
        const precioUnitario = producto.discount
          ? producto.price - (producto.price * producto.discount) / 100
          : producto.price

        return {
          id: producto.id,
          name: producto.name,
          cantidad: producto.cantidad,
          image: producto.image,
          precioUnitario: precioUnitario.toFixed(2),
          total: (precioUnitario * producto.cantidad).toFixed(2)
        }
      })

      this.ultimaCompra = [...productos]
      this.historial.push({ fecha, productos })
    }
  }
})
