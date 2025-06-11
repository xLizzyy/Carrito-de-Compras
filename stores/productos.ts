// stores/productos.ts
import { defineStore } from 'pinia'

export const useProductoStore = defineStore('productos', {
  state: () => ({
    productos: [
      {
        id: 1,
        name: 'Helado de Vainilla',
        price: 10,
        discount: 50,
        image: 'https://www.recetasnestle.com.do/sites/default/files/srh_recipes/62099096785a3c939a1a1eefb06bf358.jpg'
      },
      {
        id: 2,
        name: 'Helado de Chocolate',
        price: 12,
        discount: 30,
        image: 'https://heladoscaseros.com/wp-content/uploads/2017/09/2225998934_47099813bf_o-2.jpg'
      }
    ]
  }),
  getters: {
    getProductos: (state) => state.productos
  }
})
