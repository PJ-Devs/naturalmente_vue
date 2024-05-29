<script setup lang="ts">
import CartSummary from '../components/ShoppingCart/CartSummary.vue'
import { onMounted, ref } from 'vue'
import { getProductsFromCart } from '../API/shoppingCart'
import { useAuthUserStore } from '@/stores/authUser'
import type { CartProduct } from '@/types'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ProductCard from '../components/ShoppingCart/ProductCard.vue'
import { useRouter } from 'vue-router'
import { useShoppingCartStore } from '@/stores/shoppingCart'

const authUser = useAuthUserStore()
const useShoppingCart = useShoppingCartStore()
const loading = ref<boolean>(true)
const router = useRouter()

onMounted(() => {
  getProductsFromCart(authUser.authUser?.id as number, loading).then((data: CartProduct[]) => {
    useShoppingCart.setCartProducts(data)
  })
})
</script>

<template>
  <section class="min-h-screen max-h-fit pt-[11dvh] bg-[#EEE] bg-opacity-50">
    <LoadingSpinner v-if="loading" />
    <section className="min-h-[90dvh] mx-[10dvw] grid grid-cols-3 my-5">
      <section className="col-span-2 mx-[1%]">
        <h2
          className="text-xl font-semibold py-3 px-4 border-2 bg-opacity-80 rounded-md shadow-md bg-white"
        >
          EN TÚ CARRITO 🛒
        </h2>
        <div v-if="useShoppingCart.cartProducts.length > 0" className="flex flex-col gap-2 my-2">
          <ProductCard
            v-for="product in useShoppingCart.cartProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        <section v-else className="py-[10%] bg-gray-100 shadow-md">
          <span className="flex justify-center text-2xl font-light text-center text-gray-500">
            Tu carrito aún está vacío! 😢
          </span>
        </section>
        <div className="flex flex-row justify-between my-4">
          <button className="secondary-btn" @click="router.push('/productos')">
            Seguir comprando
          </button>

          <span></span>
        </div>
      </section>

      <section>
        <CartSummary />
      </section>
    </section>
  </section>
</template>

<style scoped></style>
