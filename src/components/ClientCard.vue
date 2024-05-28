<script setup>
const props = defineProps({
  name: String,
  address: String,
  email: String,
  phone_number: String,
  status: String
})
</script>

<template>
  <div class="client-container">
    <div class="img-container">
      <img src="../assets/icons/user.png" alt="cliente" class="icon" />
    </div>
    <div class="client-info">
      <span class="text-desc"
        ><b>{{ props.name }}</b></span
      >
      <span class="text-desc"> {{ props.address }} </span>
      <span class="text-desc"> {{ props.phone_number }}</span>
    </div>
  </div>
</template>

<style scoped>
.client-container {
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
}

.client-container:hover {
  transform: scale(1.05);
}

.img-container {
  display: flex;
  justify-content: center;
}

.client-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.text-desc {
  font-size: 0.8rem;
}

.icon {
  width: 5rem;
  height: 5rem;
}
</style>
delete-icon
