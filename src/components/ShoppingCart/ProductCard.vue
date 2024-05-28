<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { CartProduct } from '../../types'
import type { PropType } from 'vue'
import { showCurrency } from '../../helpers'
import { ref } from 'vue'
import ModalDettachProduct from '../ShoppingCart/ModalDettachProduct.vue'
import IncrementalButton from './Incrementalbutton.vue'

const props = defineProps({
  product: {
    type: Object as PropType<CartProduct>,
    required: true
  }
})

const quantity = ref<number>(props.product.pivot.orderedQuantity)
const router = useRouter()

const onUpdateQuantity = (q: number) => {
  quantity.value = q
}
</script>

<template>
  <section className="grid grid-cols-4 py-3 px-2 bg-gray-50 shadow-sm">
    <!-- {/* Imagen */} -->
    <div className=""></div>

    <div className="flex flex-col">
      <span
        className="text-left w-fit text-lg hover:text-[--primary] hover:cursor-pointer transition-all py-1"
        @click="router.push(`/productos/${props.product.id}`)"
      >
        {{ props.product.name }}
      </span>
      <span className="text-sm text-orange-500">
        {{ showCurrency(props.product.price) + ' COP' }}
      </span>
    </div>

    <div className="flex flex-row justify-between col-span-2 px-3">
      <div className="flex flex-row items-center justify-center gap-5">
        <IncrementalButton
          :product="product"
          :initialQuantity="product.pivot.orderedQuantity"
          :onUpdateQuantity="onUpdateQuantity"
        />
        <span className="text-lg text-center font-semibold text-orange-500">
          {{ showCurrency(props.product.price * quantity) + ' COP' }}
        </span>
      </div>

      <div className="flex items-center justify-end">
        <ModalDettachProduct :product="props.product" />
      </div>
    </div>
  </section>
</template>
