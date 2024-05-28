import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { CartProduct } from '@/types'

export const useShoppingCartStore = defineStore('shoppingCart', {
  state: () => ({
    cartProducts: ref<CartProduct[]>(JSON.parse(localStorage.getItem('cartProducts') || '[]')),
  }),
  getters: {
    getCartProducts: (state) => state.cartProducts,
    getTotalProducts: (state) => computed(() => {
      return state.cartProducts.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0)
    }),
  },
  actions: {
    setCartProducts(cartProducts: CartProduct[]) {
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
      this.cartProducts = cartProducts
    },
  }
})