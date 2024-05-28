<script setup lang="ts">
import { type PropType, ref } from 'vue'
import type { CartProduct } from '../../types'

const props = defineProps({
  product: {
    type: Object as PropType<CartProduct>,
    required: true
  }
})

const open = ref<boolean>(false)
</script>

<template>
  <section>
    <button className="hover:text-red-600 transition-colors duration-300" @click="open = true">
      Borrar
    </button>
    <section
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
      v-if="open"
    >
      <section
        className="bg-white rounded-lg w-[30%] h-[25%] flex flex-col justify-center items-center text-3xl text-center"
      >
        <section className="mx-[5%]">
          <span>
            {{
              `¿Estás seguro de que quieres eliminar ${props.product.name} de tu carrito de compras?`
            }}
          </span>
          <div className="flex justify-center gap-4 mt-10">
            <button
              className="min-w-[45%] px-2 py-1 bg-red-500 rounded-full text-2xl text-gray-50"
              onClick="{handleDeleteProduct}"
            >
              Estoy seguro
            </button>
            <button className="min-w-[45%] px-2 py-2 bg-color3 rounded-full text-2xl text-gray-50">
              Cancelar acción
            </button>
          </div>
        </section>
      </section>
    </section>
  </section>
</template>
