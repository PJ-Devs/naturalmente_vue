<script setup>
import { onMounted, ref } from 'vue'
import OrderCard from '@/components/OrderCard.vue'
import { API_BASE_URL } from '@/config/constants.js'

const orders = ref(null)

const fetchOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/sells`)
  const data = await response.json()
  orders.value = data.data
}

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <section class="main-content">
    <div class="orders-container">
      <div class="title-container">
        <h1 class="title">Pedidos</h1>
      </div>
      <div class="orders">
        <OrderCard
          v-for="order in orders"
          :sell="order"
          v-bind:key="order.id"
          @emitRefreshOrders="fetchOrders"
        />
      </div>
      <div v-if="!orders">
        <span>CARGANDO</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-content {
  gap: 2rem;
  padding: 2rem;
  background-color: whitesmoke;
  height: 100vh;
}

.title-container {
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: center;
  border-bottom: 0.3rem solid var(--primary);
}

.title {
  font-size: 3rem;
  font-weight: 900;
  color: var(--primary);
}

.orders-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 2rem;
  padding: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  background-color: white;
  height: 100%;
}

.orders {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1rem;
  height: 90%;
}
</style>
