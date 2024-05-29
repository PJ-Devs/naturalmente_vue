<script setup lang="ts">
import { type PropType, ref, watch } from 'vue'
import { Sell, CartProduct } from '../types'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaLaptopHouse, FcAcceptDatabase } from 'oh-vue-icons/icons'
import { showCurrency, sumTotalPrice } from '../helpers'

addIcons(FcAcceptDatabase)

const props = defineProps({
  sell: {
    type: Object as PropType<Sell>,
    required: true
  }
})

const emit = defineEmits(['close', 'emitAcceptOrder'])
const open = ref<boolean>(false)

const closeModal = () => {
  open.value = false
  emit('emitAcceptOrder', props.sell.id)
  emit('close')
}
</script>

<template>
  <section>
    <button class="secondary-btn" @click="() => (open = true)">Revisar compra</button>
    <div
      class="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-20 flex justify-center items-center z-20"
      v-if="open"
      @click.self="closeModal"
    >
      <section
        class="bg-white rounded-lg w-fit h-fit flex gap-[1rem] justify-center items-center text-lg text-center p-6"
      >
        <OhVueIcon name="fc-accept-database" scale="4" />
        <div
          class="flex flex-col justify-center items-center gap-[0.8rem] border-l-[3px] border-black px-5"
        >
          <ul className="divide-y divide-gray-300">
            <li
              className="flex items-center justify-between py-2 gap-28"
              v-for="(product, index) in props.sell.products as CartProduct[]"
              v-bind:key="index"
            >
              <span className="text-md font-light">
                {{ `${product.name} (${product.pivot.orderedQuantity})` }}
              </span>
              <span className="font-semibold text-sm text-green-700">
                {{ `${showCurrency(product.pivot.orderedQuantity * product.price)} COP` }}
              </span>
            </li>
            <li className="flex flex-row justify-between py-0.5 gap-5 items-center">
              <span className="font-semibold text-md">Impuestos (IVA)</span>
              <span className="font-semibold text-sm text-orange-500">
                {{
                  `${showCurrency(sumTotalPrice(props.sell.products as CartProduct[]) * 0.19)} COP`
                }}
              </span>
            </li>
            <li className="flex flex-row justify-between py-0.5 items-center">
              <span className="font-semibold text-md">Costes de envío</span>
              <span className="font-semibold text-sm text-orange-500">
                {{
                  `${showCurrency(sumTotalPrice(props.sell.products as CartProduct[]) * 0.07)} COP`
                }}
              </span>
            </li>
            <li className="flex flex-row justify-between py-0.5 items-center">
              <span className="font-semibold text-md">Total</span>
              <span className="font-semibold text-sm text-orange-500">
                {{ `${showCurrency(props.sell.total_price)} COP` }}
              </span>
            </li>
          </ul>
          <button class="secondary-btn py-1 mt-4" @click="closeModal">Terminar compra</button>
        </div>
      </section>
    </div>
  </section>
</template>
