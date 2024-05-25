<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthUserStore } from '../stores/authUser.ts'

const navRoutes = [
  {
    name: 'Catalogo',
    path: '/productos'
  },
  {
    name: 'Mi carrito',
    path: '/carrito'
  }
]

const useAuthUser = useAuthUserStore()
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
    <nav>
      <ul>
        <li
          v-for="route in navRoutes"
          :key="route.name"
          class="inline-block mx-[1rem] hover:cursor-pointer hover:text-[--primary] transition-all duration-150"
          @click="
            () => {
              $router.push(route.path)
            }
          "
        >
          {{ route.name }}
        </li>
      </ul>
    </nav>
    <div>
      <ul class="flex justify-center items-center gap-[1rem]">
        <li v-if="!useAuthUser.isLoggedIn.value" class="separator flex items-center">
          <RouterLink
            to="/login"
            class="hover:cursor-pointer hover:text-[--primary] transition-all duration-150"
          >
            Incio de sesión
          </RouterLink>
        </li>
        <li v-if="useAuthUser.isLoggedIn.value" class="separator flex">
          <img class="w-[2rem] hover:cursor-pointer" src="../assets/icons/bag.svg" alt="Bag icon" />
          <div
            class="flex items-center justify-center bg-[--secondary] w-[1.6rem] h-[1.6rem] rounded-full relative"
          >
            <span class="text-[--text]">0</span>
          </div>
        </li>
        <li v-if="useAuthUser.isLoggedIn.value" class="separator">
          <RouterLink to="/profile">
            <img
              class="w-[2rem] hover:cursor-pointer"
              src="../assets/icons/user-circle.svg"
              alt="User icon"
            />
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

/cert/id_cer/instances/id_isntance/access { ip, date, id_instance } 1. Validar si la instancia
existe ::find POST - access/ { ip, date, id_instance }
