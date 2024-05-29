<script setup>
import { useRouter } from 'vue-router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { useAuthUserStore } from '@/stores/authUser'
import { logoutUser } from '@/API/authUsers'
import { BiShop, FaUserCircle, CoFeaturedPlaylist, IoExitOutline } from 'oh-vue-icons/icons'

addIcons(BiShop, FaUserCircle, CoFeaturedPlaylist, IoExitOutline)

const useAuthUser = useAuthUserStore()
const router = useRouter()

const logOut = () => {
  logoutUser().then(() => {
    useAuthUser.logout()
    router.push('/')
  })
}
</script>

<template>
  <header
    class="z-10 bg-[#FFF] bg-opacity-90 flex justify-between items-center mx-[10dvw] rounded-[50px] px-[2rem] py-[0.4rem] text-[1rem] text-[--text]"
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
        <li class="separator flex">
          <RouterLink
            to="/admin/products"
            class="flex gap-3 justify-center hover:cursor-pointer hover:text-[--primary] transition-all duration-150 items-center"
          >
            <OhVueIcon name="bi-shop" scale="2" />
            Productos
          </RouterLink>
        </li>
        <li class="separator flex">
          <RouterLink
            to="/admin/clients"
            class="flex gap-3 justify-center items-center hover:cursor-pointer hover:text-[--primary] transition-all duration-150"
          >
            <OhVueIcon name="fa-user-circle" scale="2" />
            Clientes
          </RouterLink>
        </li>
        <li class="separator flex">
          <RouterLink
            to="/admin/orders"
            class="flex gap-3 justify-center items-center hover:cursor-pointer hover:text-[--primary] transition-all duration-150"
          >
            <OhVueIcon name="co-featured-playlist" scale="2" />
            Pedidos
          </RouterLink>
        </li>
        <li
          class="separator flex gap-3 justify-center items-center hover:cursor-pointer hover:text-red-500 transition-all duration-150"
          @click="logOut"
        >
          <OhVueIcon name="io-exit-outline" scale="2" />
          Cerrar sesión
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
