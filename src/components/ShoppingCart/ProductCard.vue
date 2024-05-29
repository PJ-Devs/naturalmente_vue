<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { CartProduct } from '../../types'
import type { PropType } from 'vue'
import { showCurrency } from '../../helpers'
import { ref } from 'vue'
import ModalDettachProduct from '../ShoppingCart/ModalDettachProduct.vue'
import IncrementalButton from './Incrementalbutton.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiTrashFill } from 'oh-vue-icons/icons'

addIcons(BiTrashFill)

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
  <section class="grid grid-cols-4 py-3 px-2 bg-gray-50 shadow-sm">
    <!-- Imagen -->
    <div class=""></div>

    <div class="flex flex-col">
      <span
        class="text-left w-fit text-lg hover:text-[--primary] hover:cursor-pointer transition-all py-1"
        @click="router.push(`/productos/${props.product.id}`)"
      >
        {{ props.product.name }}
      </span>
      <span class="text-sm text-orange-500">
        {{ showCurrency(props.product.price) + ' COP' }}
      </span>
    </div>

    <div class="flex flex-row justify-between col-span-2 px-3">
      <div class="flex flex-row items-center justify-center gap-5">
        <IncrementalButton
          :product="product"
          :initialQuantity="product.pivot.orderedQuantity"
          :onUpdateQuantity="onUpdateQuantity"
        />
        <span class="text-lg text-center font-semibold text-orange-500">
          {{ showCurrency(props.product.price * quantity) + ' COP' }}
        </span>
      </div>

      <div class="flex items-center justify-end">
        <ModalDettachProduct :product="props.product">
          <template #button="{ openModal }">
            <button class="hover:text-red-600 transition-colors duration-300" @click="openModal">
              <OhVueIcon name="bi-trash-fill" :scale="2" />
            </button>
          </template>
        </ModalDettachProduct>
      </div>
    </div>
  </section>
</template>
