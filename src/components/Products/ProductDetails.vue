<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showCurrency } from '@/helpers'
import type { CartProduct, Product } from '../../types'
import { attachProductToCart } from '@/API/shoppingCart'
import IncrementalButton from './IncrementalButton.vue'
import fetchGlobal from '../../helpers/gloabalFetch'
import LoadingSpinner from '../LoadingSpinner.vue'
import ModalDettachProduct from '../ShoppingCart/ModalDettachProduct.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const router = useRouter()
const route = useRoute()
const product = ref<Product | null>(null)
const quantity = ref(1)
// First postion is a boolean to check if the product is in the cart, second position is the product in the cart
const isProductInCart = ref<[Boolean, CartProduct | null]>([false, null])
const useAuthUser = useAuthUserStore()
const useShoppingCart = useShoppingCartStore()

const fetchProduct = async () => {
  try {
    const response = await fetchGlobal<{ data: Product }>(`/products/${route.params.id}`)
    product.value = response.data
  } catch (error) {
    console.error('Error fetching product details:', error)
  }
}

const updateQuantity = (newQuantity: number) => {
  quantity.value = newQuantity
}

const handleAddToCart = () => {
  async function addToCart() {
    try {
      quantity.value > 1
        ? await attachProductToCart(
            useAuthUser.getUser?.id as number,
            product.value?.id as number,
            {
              orderedQuantity: quantity.value
            }
          ).then((data) => {
            useShoppingCart.setCartProducts(data)
          })
        : await attachProductToCart(
            useAuthUser.getUser?.id as number,
            product.value?.id as number
          ).then((data) => {
            useShoppingCart.setCartProducts(data)
          })
    } catch (error) {
      throw new Error('Error al agregar al carrito' + error)
    }
  }

  addToCart()
}

onMounted(() => {
  fetchProduct().then(() => {
    if (useAuthUser.isLoggedIn.value) {
      const productInCart = useShoppingCart.cartProducts.find(
        (cartProduct) => cartProduct.id === product.value?.id
      )
      if (productInCart) {
        isProductInCart.value = [true, productInCart]
        console.log('Product in cart:', isProductInCart.value)
      }
    }
  })
})
</script>

<template>
  <LoadingSpinner v-if="!product" />
  <section v-if="product" class="grid grid-cols-2 mx-[10dvw] pt-[7dvh]">
    <section class="w-full flex justify-center">
      <img
        src="//artemisa.co/cdn/shop/products/vitamina-c-1000-mg-with-rose-hips-x-60-softgels-414669_large.jpg?v=1660859155"
        :alt="product.name"
        class="w-[20rem] h-[20rem]"
      />
    </section>
    <section class="flex flex-col w-[90%] mx-auto">
      <div class="font-semibold text-4xl py-6">
        <h1>{{ product.name }}</h1>
      </div>
      <div
        class="flex flex-row justify-between py-5 border-t-2 border-b-2 border-gray-200 items-center"
      >
        <span class="font-semibold text-3xl text-color4">
          {{ showCurrency(product.price) }}
        </span>
        <IncrementalButton @updateQuantity="updateQuantity" />
      </div>
      <div class="py-5 text-xl">
        <span>{{ product.description }}</span>
      </div>
      <div class="flex flex-row gap-3 py-5">
        <button
          v-if="!isProductInCart[0]"
          class="primaryBtn w-full"
          @click="
            () => {
              if (!useAuthUser.isLoggedIn.value) {
                router.push('/login')
              } else {
                handleAddToCart()
              }
            }
          "
        >
          Agregar al carrito
        </button>
        <ModalDettachProduct class="w-full" v-else :product="isProductInCart[1] as CartProduct">
          <template #button="{ openModal }">
            <button class="del-btn w-full" @click="openModal">Eliminar de mi carrito</button>
          </template>
        </ModalDettachProduct>
        <button class="primaryBtn w-full">Comprar</button>
      </div>
    </section>
  </section>
  <button
    class="btn mx-[10dvw] mt-[5dvh]"
    @click="
      () => {
        router.push('/productos')
      }
    "
  >
    Ver todos los productos!
  </button>
</template>

<style scoped>
.btn {
  background-color: rgba(0, 0, 0, 0.15);
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: solid 0.1rem rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
}

.btn:hover {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

.del-btn {
  background-color: #ff6b6b;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
}

.del-btn:hover {
  background-color: #ff4d4d;
}
</style>
