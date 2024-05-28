<script setup lang="ts">
import { showCurrency, sumTotalPrice, getFinalPrice, sumAmountOfProducts } from '@/helpers'
import { useShoppingCartStore } from '@/stores/shoppingCart'

const useShoppingCart = useShoppingCartStore()
</script>

<template>
  <section className="col-span-1">
    <!-- <ModalMessage isOpen="{open}" closeModal="{closeModal}" message="Pedido realizado con éxito!" /> -->
    <div className="border-2 px-5 py-3 bg-gray-50 rounded-lg">
      <details className="hover:cursor-pointer py-1 duration-700">
        <summary className="flex justify-between bg-inherit text-lg">
          <span className="font-light">
            {{ `Artículos comprados: ${sumAmountOfProducts(useShoppingCart.cartProducts)}` }}
          </span>
          <span className="font-semibold text-color3">
            {{ `${showCurrency(sumTotalPrice(useShoppingCart.cartProducts))} COP` }}
          </span>
        </summary>
        <section className="mx-[5%]">
          <ul className="divide-y-2 divide-gray-200 py-1">
            <li
              v-for="product in useShoppingCart.cartProducts"
              :key="product.id"
              className="flex flex-row justify-between py-0.5"
            >
              <span className="font-light text-md">
                {{ product.name + ` (${product.pivot.orderedQuantity})` }}
              </span>
              <span className="font-semibold text-sm text-color4">
                {{ `${showCurrency(product.pivot.orderedQuantity * product.price)} COP` }}
              </span>
            </li>
            <li className="flex flex-row justify-between py-0.5">
              <span className="font-semibold text-md">
                {{ 'Total' }}
              </span>
              <span className="font-semibold text-sm text-orange-500">
                {{ `${showCurrency(sumTotalPrice(useShoppingCart.cartProducts))} COP` }}
              </span>
            </li>
          </ul>
        </section>
      </details>
      <div className="flex justify-between text-lg py-1">
        <span className="font-light">Coste de envio</span>
        <span className="font-semibold text-color3">
          {{ showCurrency(sumTotalPrice(useShoppingCart.cartProducts) * 0.07) + ' COP' }}
        </span>
      </div>
      <div className="flex justify-between text-lg py-1">
        <span className="font-light">
          {{ `Impuestos (IVA)` }}
        </span>
        <span className="font-semibold text-color3">
          {{ showCurrency(sumTotalPrice(useShoppingCart.cartProducts) * 0.19) + ' COP' }}
        </span>
      </div>
      <div className="flex justify-between text-lg py-1 border-t-2 border-gray-100">
        <span className="font-light">Subtotal</span>
        <span className="font-semibold text-orange-500">
          {{ showCurrency(getFinalPrice(sumTotalPrice(useShoppingCart.cartProducts))) + ' COP' }}
        </span>
      </div>
      <button
        className="w-full flex items-center gap-2 justify-center text-md font-semibold text-white bg-[--primary] hover:bg-[--secondary] rounded-3xl py-2 mt-5"
      >
        <!-- <ShoppingCartIcon sx={{ fontSize: 20 }} /> -->
        Realizar pedido
      </button>
    </div>
  </section>
</template>
