<script setup lang="ts">
import { ref } from 'vue'
import { getProducts } from '../API/products'

const products = ref([])
const loading = ref(false)
getProducts(loading, products)
</script>

<template>
  <section class="h-[100dvh] mx-[10dvw] mt-[2dvh] flex items-center relative">
    <div class="w-[50%]">
      <div class="font-extrabold text-[--text] text-[2rem] mb-4 flex gap-2">
        <h1 class="">Nature's Remedy,</h1>
        <h1 class="text-[--primary]">Naturally Yours.</h1>
      </div>
      <span class="text-[--text] opacity-70 text-[1rem]">
        Naturalmente: Your hub for holistic wellness, offering curated natural remedies and organic
        products for vibrant living.
      </span>
      <ul class="flex flex-col gap-[0.5rem] mt-10 text-[1.3rem]">
        <li
          class="text-[--text] bg-gradient-to-r from-[--secondary] from-65% px-[1rem] py-[0.5rem] rounded-md"
        >
          <span class="text-[--accent]">✔</span> 100% natural ingredients
        </li>
        <li
          class="text-[--text] bg-gradient-to-r from-white to-[--secondary] to-35% px-[1rem] py-[0.5rem] rounded-md text-end"
        >
          <span class="text-[--accent]">✔</span> Organic and ethically sourced
        </li>
        <li
          class="text-[--text] bg-gradient-to-r from-[--secondary] from-65% px-[1rem] py-[0.5rem] rounded-md"
        >
          <span class="text-[--accent]">✔</span> Handcrafted with love
        </li>
      </ul>
    </div>
    <div class="w-[50%]">
      <img class="w-full z" src="../assets/images/hero.png" alt="" />
    </div>
  </section>
  <section class="h-screen"></section>
</template>

<style scoped></style>
