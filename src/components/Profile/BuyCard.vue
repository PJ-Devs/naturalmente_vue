<script setup lang="ts">
import { type PropType } from 'vue'
import type { CartProduct, Sell } from '../../types'
import { formatDateString } from '../../helpers'
import BuySummary from './BuySummary.vue'

const props = defineProps({
  sell: {
    type: Object as PropType<Sell>,
    required: true
  }
})
</script>

<template>
  <section class="bg-gray-50 px-6 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
    <section class="flex flex-row justify-between border-b-2 pb-1.5 border-gray-300">
      <span
        :class="{
          'text-lg font-semibold': true,
          'text-yellow-500': props.sell.status.toLowerCase() === 'pending'
        }"
      >
        {{ props.sell.status.toUpperCase() }}
      </span>
      <section class="flex flex-row gap-3">
        <span class="text-lg font-light">
          {{ `${formatDateString(props.sell?.created_at as string)}` }}
        </span>
      </section>
    </section>
    <BuySummary :products="props.sell.products as CartProduct[]" :cost="props.sell.total_price" />
  </section>
</template>
