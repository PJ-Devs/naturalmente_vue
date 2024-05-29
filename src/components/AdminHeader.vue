<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goRoute = (route) => {
  switch (route) {
    case 1:
      router.push('/admin/products')
      break
    case 2:
      router.push('/admin/orders')
      break
    case 3:
      router.push('/admin/clients')
      break
    default:
      break
  }
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
            class="hover:cursor-pointer hover:text-[--primary] transition-all duration-150 items-center"
          >
            Productos
          </RouterLink>
        </li>
        <li class="separator flex">
          <RouterLink
            to="/admin/clients"
            class="hover:cursor-pointer hover:text-[--primary] transition-all duration-150"
          >
            Clientes
          </RouterLink>
        </li>
        <li class="separator flex">
          <RouterLink
            to="/admin/orders"
            class="hover:cursor-pointer hover:text-[--primary] transition-all duration-150"
          >
            Pedidos
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
