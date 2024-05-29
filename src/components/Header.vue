<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthUserStore } from '../stores/authUser'
import { useShoppingCartStore } from '../stores/shoppingCart'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiShop, HiShoppingBag, FaUserCircle } from 'oh-vue-icons/icons'

addIcons(BiShop, HiShoppingBag, FaUserCircle)

const useAuthUser = useAuthUserStore()
console.log(useAuthUser.getUser)
const useShoppingCart = useShoppingCartStore()
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-10 bg-[#FFF] bg-opacity-90 flex justify-between items-center shadow-md mx-[10dvw] mt-5 rounded-[50px] px-[2rem] py-[0.4rem] text-[1rem] text-[--text]"
  >
    <div
      class="w-fit flex gap-0 text-[1.5rem] hover:cursor-pointer bg-gradient-to-r from-[--accent] to-[--primary] text-transparent bg-clip-text"
      @click="
        () => {
          $router.push('/')
        }
      "
    >
      <span class=""> Natural </span>
      <span class="">mente</span>
    </div>
    <div>
      <ul class="flex justify-center items-center gap-[1rem]">
        <li v-if="!useAuthUser.isLoggedIn.value" class="separator flex items-center">
          <RouterLink
            to="/login"
            class="hover:cursor-pointer hover:text-[--primary] transition-all duration-150"
          >
            Inicio de sesión
          </RouterLink>
        </li>
        <li class="separator">
          <RouterLink to="/productos">
            <div
              class="flex gap-3 justify-center items-center hover:text-[--primary] transition-all duration-100"
            >
              <OhVueIcon name="bi-shop" scale="2" />
              <span>Productos</span>
            </div>
          </RouterLink>
        </li>
        <li v-if="useAuthUser.isLoggedIn.value" class="separator">
          <RouterLink to="/carrito">
            <div
              class="flex gap-3 justify-center items-center hover:text-[--primary] transition-all duration-100 cursor-pointer"
            >
              <div class="flex">
                <OhVueIcon name="hi-shopping-bag" scale="2" />
                <div
                  class="flex items-center justify-center bg-[--secondary] w-[1.6rem] h-[1.6rem] rounded-full relative"
                >
                  <span class="text-[--text]">
                    {{ useShoppingCart.cartProducts.length }}
                  </span>
                </div>
              </div>
              <span>Tu carrito</span>
            </div>
          </RouterLink>
        </li>
        <li v-if="useAuthUser.isLoggedIn.value" class="separator">
          <RouterLink to="/profile">
            <div
              class="flex gap-3 justify-center items-center hover:text-[--primary] transition-all duration-100 cursor-pointer"
            >
              <OhVueIcon name="fa-user-circle" scale="2" />
              <span>Perfil</span>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.separator:not(:last-child) {
  content: '';
  border-right: 1px solid black;
  padding-right: 1rem;
  height: 2rem;
}
</style>
