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
  <header class="header-container">
    <div class="links-container">
      <span @click="goRoute(1)" class="link">Productos</span>
      <span @click="goRoute(2)" class="link">Pedidos</span>
      <span @click="goRoute(3)" class="link">Clientes</span>
    </div>
    <div class="burguer-menu"><span>|||||||</span></div>
  </header>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  box-shadow: 0 0 1rem 0.2rem rgba(0, 0, 0, 0.1);
}

.links-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 80%;
  gap: 1rem;
  text-align: center;
}

.link {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary);
  cursor: pointer;
  transition: 0.3s;
  width: fit-content;
}

.link:hover {
  color: var(--accent);
}
</style>
