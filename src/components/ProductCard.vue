<script setup lang="ts">
import type { PropType } from 'vue'
import type { Product } from '../types'
import { showCurrency } from '../helpers'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  },
  isInCart: {
    type: Boolean,
    required: true,
    default: false
  }
})
</script>

<template>
  <section
    className="grid grid-cols-4 rounded-lg shadow-md bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
  >
    <section className="flex col-span-1 justify-center items-center">
      <img src="" alt="Imagen de producto" />
    </section>

    <section className="p-5 col-span-3">
      <div className="flex flex-row justify-between items-center pb-4">
        <h2 className="text-xl font-semibold">
          {{ props.product.name }}
        </h2>
        <section className="py-1.5 px-3 bg-[--primary] rounded-xl">
          <span className="px-2 text-white "> Guardado! </span>
        </section>
      </div>

      <div className="flex flex-col">
        <span className="text-md font-light">
          {{ product.description }}
        </span>
        <span className="text-lg font-medium">
          {{ showCurrency(props.product.price) }}
        </span>
      </div>
    </section>
  </section>
</template>
