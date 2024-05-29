<script setup>
const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['emitCloseModal', 'emitDeleteProduct'])
</script>

<template>
  <section v-if="props.show" class="modal-wrapper">
    <div class="modal-container">
      <div class="title">¿Estás seguro de que quieres eliminar este producto?</div>
      <div class="options">
        <button class="btn" @click="emit('emitDeleteProduct')">Si, eliminar</button>
        <button class="btn" @click="emit('emitCloseModal')">No eliminar</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.8);
  z-index: 9999;
}

.modal-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border: solid 0.1rem var(--naranja);
  border-radius: 0.8rem;
  width: 18rem;
  padding: 2rem;
  background-color: white;
  width: 30%;
  box-shadow: 0 0 1rem 0.2rem rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
}

.options {
  display: flex;
  justify-content: space-around;
}

.btn {
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--primary);
  margin-top: 1rem;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  background-color: var(--accent);
}
</style>
