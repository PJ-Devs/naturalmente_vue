<script setup>
import { API_BASE_URL } from '@/config/constants.js'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['emitCreateProduct'])

const categories = ref([])
const types = ref([])

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

const cleanForm = () => {
  document.getElementById('name').value = ''
  document.getElementById('description').value = ''
  document.getElementById('price').value = ''
  document.getElementById('category').value = ''
  document.getElementById('product_type').value = ''
  document.getElementById('quantity').value = ''
}

const createProduct = async () => {
  const product = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: parseInt(document.getElementById('price').value),
    category: parseInt(document.getElementById('category').value),
    product_type: parseInt(document.getElementById('product_type').value),
    quantity: parseInt(document.getElementById('quantity').value),
    img: ''
  }
  await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
    .then(() => {
      console.log('Product created')
      emit('emitCreateProduct')
      cleanForm()
    })
    .catch((error) => {
      throw new Error(error)
    })
}

onMounted(() => {
  fetchCategories()
  fetchProductType()
})
</script>

<template>
  <section class="form-container">
    <div class="form-header">
      <h1 class="form-title">Crear</h1>
      <img class="icons" src="../assets/icons/leaf.svg" alt="" />
      <!--Imágen del emprendimiento (hoja del login)-->
    </div>
    <div class="form">
      <input class="inputs" type="text" placeholder="Nombre del producto" id="name" />
      <div class="product-description-container">
        <label class="form-text" for="product-description">Descripción del producto</label>
        <textarea
          class="product-description"
          name="product-description"
          id="description"
          rows="3"
        ></textarea>
      </div>
      <input class="inputs" type="number" placeholder="Precio" id="price" />
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
      <input class="inputs" type="number" placeholder="Cantidad" id="quantity" />
      <button class="btn" @click="createProduct">Crear</button>
    </div>
  </section>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 2rem 2rem;
  width: 70%;
  justify-self: center;
  gap: 2rem;
  background-color: white;
  box-shadow: 0 0 1rem 0.2rem rgba(0, 0, 0, 0.1);
  height: fit-content;
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

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.icons {
  width: 5rem;
  height: 5rem;
}

.btn {
  padding: 0.5rem;
  border: none;
  border-radius: 2rem;
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
