<template>
    <div class="flex items-center">
        <button class="px-4 py-2 bg-gray-200 rounded-l-md focus:outline-none hover:bg-gray-300" @click="decrement">
            -
        </button>
        <input type="number" class="w-12 text-center border-t border-b border-gray-200 focus:outline-none"
            v-model="quantity" @input="updateQuantity" />
        <button class="px-4 py-2 bg-gray-200 rounded-r-md focus:outline-none hover:bg-gray-300" @click="increment">
            +
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';

const emits = defineEmits(['updateQuantity']);
const quantity = ref(1);

const updateQuantity = () => {
    emits('updateQuantity', quantity.value);
};

const increment = () => {
    quantity.value++;
    updateQuantity();
};

const decrement = () => {
    if (quantity.value > 1) {
        quantity.value--;
        updateQuantity();
    }
};

watch(quantity, (newQuantity) => {
    if (newQuantity < 1) {
        quantity.value = 1;
    }
    updateQuantity();
});
</script>

<style scoped></style>