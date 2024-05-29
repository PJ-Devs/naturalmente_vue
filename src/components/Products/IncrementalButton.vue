<template>
  <div class="flex items-center gap-4">
    <button
      class="px-4 py-2 bg-[#76a55f] rounded-l-md focus:outline-none hover:bg-[#163904]"
      @click="decrement"
    >
      -
    </button>
    <span :v-model="quantity" for="quantity" class="text-xl">{{ quantity }}</span>
    <button
      class="px-4 py-2 bg-[#76a55f] rounded-r-md focus:outline-none hover:bg-[#163904]"
      @click="increment"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue'

const emits = defineEmits(['updateQuantity'])
const quantity = ref(1)

const updateQuantity = () => {
  emits('updateQuantity', quantity.value)
}

const increment = () => {
  quantity.value++
  updateQuantity()
}

const decrement = () => {
  if (quantity.value > 1) {
    quantity.value--
    updateQuantity()
  }
}

watch(quantity, (newQuantity) => {
  if (newQuantity < 1) {
    quantity.value = 1
  }
  updateQuantity()
})
</script>

<style scoped></style>
