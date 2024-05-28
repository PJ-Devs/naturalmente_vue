<script setup lang="ts">
import type { PropType } from 'vue'
import type { CartProduct } from '../../types'
import { ref } from 'vue'
import { updateProductQuantity } from '../../API/shoppingCart'
import { useAuthUserStore } from '../../stores/authUser'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { CoPlus, CoMinus } from 'oh-vue-icons/icons'
import { useShoppingCartStore } from '@/stores/shoppingCart'

addIcons(CoPlus, CoMinus)

const props = defineProps({
  product: {
    type: Object as PropType<CartProduct>,
    required: true
  },
  initialQuantity: {
    type: Number,
    required: true
  },
  onUpdateQuantity: {
    type: Function,
    required: true
  }
})

const quantity = ref<number>(props.initialQuantity)
const useAuthUser = useAuthUserStore()
const useShoppingCart = useShoppingCartStore()

const handleChangeQuantity = (event: Event) => {
  const { name } = event.currentTarget as HTMLInputElement
  if (name === 'increment') {
    quantity.value += 1
  } else if (name === 'decrement') {
    if (quantity.value > 1) {
      quantity.value -= 1
    }
  }

  props.onUpdateQuantity(quantity.value)

  updateProductQuantity(
    useAuthUser.authUser?.id as number,
    props.product.id as number,
    quantity.value
  ).then((data) => {
    useShoppingCart.setCartProducts(data)
  })
}
</script>

<template>
  <section
    className="flex flex-row py-1 rounde-full bg-gray-100 border-2 border-gray-300 items-center rounded-full"
  >
    <button className="text-lg pl-2" name="decrement" @click="handleChangeQuantity">
      <OhVueIcon class="hover:text-[--primary]" name="co-minus" scale="1.5" />
    </button>
    <span className="text-md font-semibold align-middle px-4">
      {{ quantity }}
    </span>
    <button className="text-lg pr-2" name="increment" @click="handleChangeQuantity">
      <OhVueIcon class="hover:text-[--primary]" name="co-plus" scale="1.5" />
    </button>
  </section>
</template>
