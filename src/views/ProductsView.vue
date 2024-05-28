<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getProducts } from '../API/products'
import ProductCard from '../components/Products/ProductCard.vue'
import ProductSidebar from '../components/Products/Product-sidebar.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import type { Product } from '@/types'
import { useShoppingCartStore } from '@/stores/shoppingCart'

const products = ref<Product[]>([])
const loading = ref<boolean>(true)
const useCartProducts = useShoppingCartStore()

const onChangeProducts = (toSetProducts: Product[]) => {
  products.value = toSetProducts
}

/**
 * Validates if a certain product is in the cart
 * @param product The product to check if it is in the cart
 */
const isInCart = (product: Product) => {
  if (useCartProducts.cartProducts.length > 0) {
    return useCartProducts.cartProducts.some((cartProduct) => cartProduct.id === product.id)
  } else {
    return false
  }
}

onMounted(() => {
  getProducts(loading, products)
})
</script>

<template>
  <section className="min-h-screen max-h-fit pt-[7dvh] mx-[10dvw]">
    <LoadingSpinner v-if="loading" />
    <section v-if="loading === false" className="grid grid-cols-4 my-5">
      <ProductSidebar />
      <ul className="col-span-3 flex flex-col divide-y-2 gap-3 divide-solid ml-[1%]">
        <li v-for="(product, index) in products" v-bind:key="index">
          <ProductCard :product="product" :isInCart="isInCart(product)" />
        </li>
      </ul>
    </section>
    <section v-else></section>
  </section>
</template>
