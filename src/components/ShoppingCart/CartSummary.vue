<script setup lang="ts">
import { showCurrency, sumTotalPrice, getFinalPrice, sumAmountOfProducts } from '@/helpers'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import ModalMessage from './ModalMessage.vue'
import { ref } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { makeSell } from '../../API/Sells'
import type { Sell } from '@/types'

const openOnBuy = ref<boolean>(false)
const loading = ref<boolean>(false)

const useAuthUser = useAuthUserStore()
const useShoppingCart = useShoppingCartStore()

const handleBuyCart = () => {
  const sell: Sell = {
    user_id: useAuthUser.authUser?.id as number,
    status: 'pending',
    total_price: getFinalPrice(sumTotalPrice(useShoppingCart.cartProducts))
  }

  loading.value = true
  makeSell(sell)
    .then(() => {
      useShoppingCart.setCartProducts([])
    })
    .finally(() => {
      loading.value = false
      openOnBuy.value = true
    })
}
</script>

<template>
  <section class="col-span-1">
    <ModalMessage :open="openOnBuy" @close="openOnBuy = false" />
    <div class="border-2 px-5 py-3 bg-gray-50 rounded-lg">
      <details class="hover:cursor-pointer py-1 duration-700">
        <summary class="flex justify-between bg-inherit text-lg">
          <span class="font-light">
            {{ `Artículos comprados: ${sumAmountOfProducts(useShoppingCart.cartProducts)}` }}
          </span>
          <span class="font-semibold text-color3">
            {{ `${showCurrency(sumTotalPrice(useShoppingCart.cartProducts))} COP` }}
          </span>
        </summary>
        <section class="mx-[5%]">
          <ul class="divide-y-2 divide-gray-200 py-1">
            <li
              v-for="product in useShoppingCart.cartProducts"
              :key="product.id"
              class="flex flex-row justify-between py-0.5"
            >
              <span class="font-light text-md">
                {{ product.name + ` (${product.pivot.orderedQuantity})` }}
              </span>
              <span class="font-semibold text-sm text-color4">
                {{ `${showCurrency(product.pivot.orderedQuantity * product.price)} COP` }}
              </span>
            </li>
            <li class="flex flex-row justify-between py-0.5">
              <span class="font-semibold text-md">
                {{ 'Total' }}
              </span>
              <span class="font-semibold text-sm text-orange-500">
                {{ `${showCurrency(sumTotalPrice(useShoppingCart.cartProducts))} COP` }}
              </span>
            </li>
          </ul>
        </section>
      </details>
      <div class="flex justify-between text-lg py-1">
        <span class="font-light">Coste de envio</span>
        <span class="font-semibold text-color3">
          {{ showCurrency(sumTotalPrice(useShoppingCart.cartProducts) * 0.07) + ' COP' }}
        </span>
      </div>
      <div class="flex justify-between text-lg py-1">
        <span class="font-light">
          {{ `Impuestos (IVA)` }}
        </span>
        <span class="font-semibold text-color3">
          {{ showCurrency(sumTotalPrice(useShoppingCart.cartProducts) * 0.19) + ' COP' }}
        </span>
      </div>
      <div class="flex justify-between text-lg py-1 border-t-2 border-gray-100">
        <span class="font-light">Subtotal</span>
        <span class="font-semibold text-orange-500">
          {{ showCurrency(getFinalPrice(sumTotalPrice(useShoppingCart.cartProducts))) + ' COP' }}
        </span>
      </div>
      <button
        class="w-full flex items-center gap-2 justify-center text-md font-semibold text-white bg-[--primary] hover:bg-[--secondary] rounded-3xl py-2 mt-5"
        @click="handleBuyCart"
      >
        <!-- <ShoppingCartIcon sx={{ fontSize: 20 }} /> -->
        Realizar pedido
      </button>
    </div>
  </section>
</template>
