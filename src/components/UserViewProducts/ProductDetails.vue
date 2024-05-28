<template>
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
          <span class="text-green-700 font-bold">$</span>{{ formattedTotalPrice }}
        </span>
        <IncrementalButton @updateQuantity="updateQuantity" />
      </div>
      <div class="py-5 text-xl">
        <span>{{ product.description }}</span>
      </div>
      <div class="flex flex-row gap-3 py-5">
        <button class="primaryBtn w-full">Agregar al carrito</button>
        <button class="primaryBtn bg-orange-300 hover:bg-orange-400 w-full">Comprar</button>
      </div>
    </section>
  </section>
  <div v-else class="flex justify-center items-center h-screen">
    <div
      class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 my-auto border-[--accent]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '../../types'
import IncrementalButton from './IncrementalButton.vue'
import fetchGlobal from '../../helpers/gloabalFetch'

const route = useRoute()
const productId = route.params.id
const product = ref<Product | null>(null)
const quantity = ref(1)

const fetchProduct = async () => {
  try {
    const response = await fetchGlobal<{ data: Product }>(`/products/${productId}`)
    product.value = response.data
  } catch (error) {
    console.error('Error fetching product details:', error)
  }
}

onMounted(fetchProduct)

const updateQuantity = (newQuantity: number) => {
  quantity.value = newQuantity
}

const formattedTotalPrice = computed(() => {
  return product.value && product.value.price
    ? (product.value.price * quantity.value).toLocaleString('es-CO', { currency: 'COP' })
    : 'N/A'
})
</script>

<style scoped></style>
