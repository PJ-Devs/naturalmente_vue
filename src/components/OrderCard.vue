<script setup>
const props = defineProps({
  price: Number,
  status: String,
  order_date: String
})
</script>

<template>
  <div class="order-container">
    <div class="img-container">
      <img class="icon" src="../assets/icons/order.svg" alt="order" />
    </div>
    <div class="order-info">
      <span class="text-desc">{{ props.order_date }}</span>
      <span class="text-desc"> {{ props.status }}</span>
      <span class="text-desc"> {{ props.price }}</span>
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

.order-container:hover {
  transform: scale(1.05);
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
