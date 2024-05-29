<script setup lang="ts">
import { type PropType, ref } from 'vue'
import type { CartProduct } from '../../types'
import { detachProductFromCart } from '../../API/shoppingCart'
import { useAuthUserStore } from '@/stores/authUser'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import LoadingSpinner from '../LoadingSpinner.vue'

const props = defineProps({
  product: {
    type: Object as PropType<CartProduct>,
    required: true
  }
})

const useAuthUser = useAuthUserStore()
const useShoppingCart = useShoppingCartStore()
const loading = ref<boolean>(false)
const open = ref<boolean>(false)

const openModal = () => {
  open.value = true
}

const closeModal = () => {
  open.value = false
}

const handleDeleteProduct = () => {
  loading.value = true
  detachProductFromCart(useAuthUser.authUser?.id as number, props.product.id as number).then(
    (data) => {
      useShoppingCart.setCartProducts(data)
      loading.value = false
      closeModal()
    }
  )
}
</script>

<template>
  <section>
    <LoadingSpinner v-if="loading" />
    <slot name="button" :openModal="openModal"></slot>
    <div
      class="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-20 flex justify-center items-center z-20"
      v-if="open"
      @click.self="closeModal"
    >
      <section
        class="bg-white rounded-lg w-fit max-w-[30%] h-fit flex flex-col justify-center items-center text-xl text-center p-6"
      >
        <section>
          <span>
            {{
              `¿Estás seguro de que quieres eliminar ${props.product.name} de tu carrito de compras?`
            }}
          </span>
          <div class="flex justify-center gap-4 mt-10 text-xl">
            <button
              class="w-[35%] px-4 py-2 bg-red-500 rounded-full hover:shadow-md text-gray-50"
              @click="handleDeleteProduct"
            >
              Estoy seguro!
            </button>
            <button
              class="w-[35%] px-4 py-2 bg-[#CCC] text-white hover:bg-[--primary] hover:shadow-md transition-all duration-100 rounded-full"
              @click="closeModal"
            >
              Cancelar acción
            </button>
          </div>
        </section>
      </section>
    </div>
  </section>
</template>
