<script setup lang="ts">
import { type PropType } from 'vue'
import { type CartProduct } from '../../types'
import { showCurrency, sumTotalPrice, countTotalProducts } from '../../helpers'

const props = defineProps({
  products: {
    type: Array as PropType<CartProduct[]>,
    required: true
  }
})
</script>

<template>
  <details className="cursor-pointer mt-3 duration-300 bg-gray-100 rounded-lg hover:shadow-md">
    <summary
      className="flex items-center justify-between bg-gray-200 text-lg px-6 py-2 cursor-pointer rounded-t-lg"
    >
      <span className="font-semibold">
        {{ `Artículos comprados: ${props.products ? countTotalProducts(props.products) : 0}` }}
      </span>
      <span className="text-xl font-semibold text-orange-500">
        {{ `${showCurrency(sumTotalPrice(props.products))}` }}
      </span>
    </summary>
    <section className="px-[3%] py-2 bg-white rounded-b-lg">
      <ul className="divide-y divide-gray-300">
        <li
          className="flex items-center justify-between py-0.5"
          v-for="(product, index) in props.products"
          v-bind:key="index"
        >
          <span className="text-md font-light">
            {{ `${product.name} (${product.pivot.orderedQuantity})` }}
          </span>
          <span className="font-semibold text-sm text-green-700">
            {{ `${showCurrency(product.pivot.orderedQuantity * product.price)} COP` }}
          </span>
        </li>
        <li className="flex flex-row justify-between py-0.5">
          <span className="font-semibold text-md">Total</span>
          <span className="font-semibold text-sm text-orange-500">
            {{ `${showCurrency(sumTotalPrice(props.products))} COP` }}
          </span>
        </li>
      </ul>
    </section>
  </details>
</template>
