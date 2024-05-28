<script setup>
import DeleteModal from '@/components/DeleteModal.vue'
import EditModal from '@/components/EditModal.vue'

const props = defineProps({
  id: Number,
  name: String,
  price: Number,
  quantity: Number
})
</script>

<template>
  <div class="product-container">
    <div class="img-container">
      <img
        src="//artemisa.co/cdn/shop/products/vitamina-c-1000-mg-with-rose-hips-x-60-softgels-414669_large.jpg?v=1660859155"
        alt="Producto"
      />
    </div>
    <div class="product-info">
      <span class="product-name">{{ props.name }}</span>
      <span class="text-desc"> {{ props.price }}</span>
      <span class="text-desc"> Cantidad: {{ props.quantity }}</span>
    </div>
  </div>
</template>

<style scoped>
.product-container {
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

.img-container {
  display: flex;
  justify-content: center;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.text-desc {
  font-size: 0.8rem;
}

.product-name {
  font-size: 0.9rem;
  font-weight: 500;
}

.icon-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.icon {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
}

.icon:hover {
  transform: scale(1.1);
}

.edit-icon {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
}

.edit-icon:hover {
  transform: scale(1.1);
}
</style>
