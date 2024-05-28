<script setup>
import { ref } from 'vue'
import { API_BASE_URL } from '@/config/constants.js'

const props = defineProps({
  show: Boolean,
  id: Number
})

const emit = defineEmits(['emitCloseModal', 'emitEditedProduct'])
const categories = ref([])
const types = ref([])
const product = ref({})

const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`)
  const data = await response.json()
  categories.value = data.data
}

const fetchProductType = async () => {
  const response = await fetch(`${API_BASE_URL}/types`)
  const data = await response.json()
  types.value = data.data
}

const fetchProduct = async () => {
  await fetch(`${API_BASE_URL}/products/${props.id}`)
    .then((response) => response.json())
    .then((data) => {
      product.value = data.data
    })
}

const editProduct = async () => {
  const name = document.getElementById('name').value
  const price = parseInt(document.getElementById('price').value)
  const category = parseInt(document.getElementById('category').value)
  const product_type = parseInt(document.getElementById('product_type').value)
  const quantity = parseInt(document.getElementById('quantity').value)

  const data = {
    name: name,
    price: price,
    category_id: category,
    product_type_id: product_type,
    quantity: quantity
  }

  await fetch(`${API_BASE_URL}/products/${props.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(() => {
    console.log('Product edited')
    emit('emitEditedProduct')
    emit('emitCloseModal')
  })
}

fetchProduct()
fetchCategories()
fetchProductType()
</script>

<template>
  <section v-if="props.show" class="modal-wrapper">
    <div class="modal-container">
      <div class="product-form">
        <div class="form-header">
          <h1 class="title">Editar</h1>
          <img class="icons" src="../assets/icons/leaf.svg" alt="" />
          <!--Imágen del emprendimiento (hoja del login)-->
        </div>
        <input
          v-model="product.name"
          class="inputs"
          type="text"
          placeholder="Nombre del producto"
          id="name"
        />
        <input
          v-model="product.price"
          class="inputs"
          type="number"
          placeholder="Precio"
          id="price"
        />
        <div class="product-description-container">
          <label class="form-text" for="category">Categoría</label>
          <select class="inputs" name="category" id="category">
            <option value="0" selected disabled></option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="product-description-container">
          <label class="form-text" for="tipo">Tipo de producto</label>
          <select class="inputs" name="tipo" id="product_type">
            <option value="0" selected disabled></option>
            <option v-for="type in types" :key="type.id" :value="type.id">
              {{ type.name }}
            </option>
          </select>
        </div>
        <input
          v-model="product.quantity"
          class="inputs"
          type="number"
          placeholder="Cantidad"
          id="quantity"
        />
        <div class="btn-container">
          <button class="btn" @click="editProduct">Editar</button>
          <button class="btn" @click="emit('emitCloseModal')">Cancelar</button>
        </div>
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
  border: solid 0.1rem var(--naranja);
  border-radius: 0.8rem;
  width: 18rem;
  padding: 2rem;
  background-color: white;
  width: 30%;
}

.btn-container {
  display: flex;
  justify-content: space-around;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.inputs {
  padding: 0.5rem;
  border: solid 0.1rem gray;
  border-radius: 2rem;
  background: none;
}

.inputs:focus {
  outline: none;
}

.btn:hover {
  background-color: var(--accent);
}

.title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 1rem;
  text-align: center;
}

.product-description-container {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-text {
  font-size: 1rem;
  margin-left: 0.5rem;
  font-weight: 500;
  color: var(--primary);
}

.product-description {
  padding: 0.5rem 0.5rem;
  border: solid 0.1rem gray;
  border-radius: 2rem;
}

.product-description:focus {
  outline: none;
}

.form-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.form-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary);
  padding: 1rem;
}

.icons {
  width: 5rem;
  height: 5rem;
}
</style>
