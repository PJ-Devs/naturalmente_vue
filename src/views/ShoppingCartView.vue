<script setup lang="ts">
import CartSummary from '../components/CartSummary.vue'
</script>

<template>
  <section class="min-h-screen max-h-fit pt-[15dvh] bg-[#EEE] bg-opacity-50">
    <section className="min-h-[90dvh] mx-[10dvw] grid grid-cols-3">
      <section className="col-span-2 mx-[1%]">
        <h2
          className="text-xl font-semibold py-3 px-4 border-2 bg-opacity-80 rounded-md shadow-md bg-white"
        >
          EN TÚ CARRITO 🛒
        </h2>

        <div className="flex flex-col gap-2 my-2"></div>

        <div className="flex flex-row justify-between my-4">
          <button
            className="bg-white border-2 border-gray-300 text-md text-black rounded-md py-1 px-2"
          >
            Seguir comprando
          </button>

          <span></span>
        </div>
      </section>

      <section>
        <CartSummary />
      </section>
    </section>
  </section>
</template>

<style scoped></style>
