<script setup lang="ts">
import type { PropType } from 'vue'
import type { Product } from '@/types'
import { showCurrency } from '@/helpers'
import { useRouter } from 'vue-router'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  },
  isInCart: {
    type: Boolean,
    required: true,
    default: false
  }
})

const router = useRouter()

//router.push(`/product/${props.product.name.replace(/\s/g, '-')}`)

const handleClickCard = () => {
  props.isInCart ? router.push('/carrito') : router.push(`/productos/${props.product.id}`)
}
</script>

<template>
  <section
    className="grid grid-cols-4 rounded-lg shadow-md bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
    @click="handleClickCard"
  >
    <section className="flex col-span-1 justify-center items-center">
      <img src="" alt="Imagen de producto" />
    </section>

    <section className="p-5 col-span-3">
      <div className="flex flex-row justify-between items-center pb-4">
        <h2 className="text-xl font-semibold">
          {{ props.product.name }}
        </h2>
        <section v-if="isInCart" className="py-1.5 px-3 bg-[--primary] rounded-xl">
          <span className="px-2 text-white "> Guardado! </span>
        </section>
      </div>
      <div className="flex flex-col">
        <span className="text-md font-light">
          {{ product.description }}
        </span>
        <span className="text-lg font-medium">
          {{ showCurrency(props.product.price) + ' COP' }}
        </span>
      </div>
    </section>
  </section>
</template>
