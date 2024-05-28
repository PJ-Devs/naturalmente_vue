<template>
  <section
    class="grid grid-cols-4 rounded-lg shadow-md bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
    @click="handleClickCard"
  >
    <section class="col-span-1">
      <img
        :src="imageUrl.value"
        :alt="product.name"
        class="w-full h-full object-cover rounded-l-lg"
      />
    </section>

    <section class="p-5 col-span-3">
      <div class="flex flex-row justify-between items-center pb-4">
        <h2 class="text-xl font-semibold">{{ product?.name }}</h2>
      </div>

      <div class="flex flex-col">
        <span class="text-md font-light">{{ product?.description }}</span>
        <span class="text-lg font-medium">
          <span class="text-green-700 font-bold">$</span>{{ formattedPrice(product?.price) }}
        </span>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Product } from '../../types'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  product: Product
}
const props = defineProps<Props>()
const baseUrl = 'https://source.unsplash.com/random/'
const imageUrl = computed(() => `${baseUrl}400x300/?natural,medical,${props.product.id}`)

const formattedPrice = (price: number) => {
  return price.toLocaleString('es-CO', { currency: 'COP' })
}
const router = useRouter()
const handleClickCard = () => {
  router.push(`/product/${props.product.name.replace(/\s/g, '-')}`)
}
</script>

<style scoped></style>
