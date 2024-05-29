<script setup>
import { showCurrency } from '@/helpers'
import ModalSell from '../components/ModalSell.vue'
import { API_BASE_URL } from '@/config/constants.js'

const props = defineProps({
  sell: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['emitRefreshOrders'])

const acceptOrder = async (id) => {
  await fetch(`${API_BASE_URL}/sells/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 'accepted' })
  }).then(() => {
    emit('emitRefreshOrders')
  })
}
</script>

<template>
  <div class="order-container">
    <ModalSell :sell="props.sell" @emitAcceptOrder="acceptOrder" />
    <div class="img-container">
      <img class="icon" src="../assets/icons/order.svg" alt="order" />
    </div>
    <div class="order-info">
      <span class="text-desc">{{ props.sell.created_at }}</span>
      <span class="text-desc font-semibold"> {{ props.sell.status }}</span>
      <span class="text-desc"> {{ showCurrency(props.sell.total_price) + ' COP' }}</span>
    </div>
  </div>
</template>

<style scoped>
.order-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0 0 1rem 0.2rem rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  cursor: pointer;
  height: fit-content;
}

.img-container {
  display: flex;
  justify-content: center;
}

.order-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-desc {
  font-size: 0.8rem;
}

.icon {
  width: 5rem;
  height: 5rem;
}
</style>
