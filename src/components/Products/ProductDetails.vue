<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showCurrency } from '@/helpers'
import type { Product } from '../../types'
import { attachProductToCart } from '@/API/shoppingCart'
import IncrementalButton from './IncrementalButton.vue'
import fetchGlobal from '../../helpers/gloabalFetch'
import LoadingSpinner from '../LoadingSpinner.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const router = useRouter()
const route = useRoute()
const product = ref<Product | null>(null)
const quantity = ref(1)
const useAuthUser = useAuthUserStore()
const useShoppingCart = useShoppingCartStore()

const fetchProduct = async () => {
  try {
    const response = await fetchGlobal<{ data: Product }>(`/products/${route.params.id}`)
    product.value = response.data
  } catch (error) {
    console.error('Error fetching product details:', error)
  }
}

const updateQuantity = (newQuantity: number) => {
  quantity.value = newQuantity
}

const handleAddToCart = () => {
  async function addToCart() {
    try {
      quantity.value > 1
        ? await attachProductToCart(
            useAuthUser.getUser?.id as number,
            product.value?.id as number,
            {
              orderedQuantity: quantity.value
            }
          ).then((data) => {
            useShoppingCart.setCartProducts(data)
          })
        : await attachProductToCart(
            useAuthUser.getUser?.id as number,
            product.value?.id as number
          ).then((data) => {
            useShoppingCart.setCartProducts(data)
            toast.success('Inicio de sesión exitoso')
          })
    } catch (error) {
      throw new Error('Error al agregar al carrito' + error)
    }
  }

  addToCart()
}

onMounted(fetchProduct)
</script>

<template>
  <LoadingSpinner v-if="!product" />
  <section v-if="product" class="min-h-screen max-h-fit grid grid-cols-2 mx-[10dvw] pt-[7dvh]">
    <section class="w-full">
      <img :src="product.img" :alt="product.name" class="w-full h-auto" />
    </section>
    <section class="flex flex-col w-[90%] mx-auto">
      <div class="font-semibold text-4xl py-6">
        <h1>{{ product.name }}</h1>
      </div>
      <div
        class="flex flex-row justify-between py-5 border-t-2 border-b-2 border-gray-200 items-center"
      >
        <span class="font-semibold text-3xl text-color4">
          {{ showCurrency(product.price) }}
        </span>
        <IncrementalButton @updateQuantity="updateQuantity" />
      </div>
      <div class="py-5 text-xl">
        <span>{{ product.description }}</span>
      </div>
      <div class="flex flex-row gap-3 py-5">
        <button
          class="primaryBtn w-full"
          @click="
            () => {
              if (!useAuthUser.isLoggedIn.value) {
                router.push('/login')
              } else {
                handleAddToCart()
              }
            }
          "
        >
          Agregar al carrito
        </button>
        <button class="primaryBtn bg-orange-300 hover:bg-orange-400 w-full">Comprar</button>
      </div>
    </section>
  </section>
</template>
