<script setup>
import ProductCardNoCrud from '@/components/ProductCardNoCrud.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { API_BASE_URL } from '@/config/constants.js'

const router = useRouter()
const products = ref(null)
const searchProducts = ref(null)
const search = ref('')

const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`)
  const data = await response.json()
  products.value = data.data
  searchProducts.value = products.value
}

const searchProduct = () => {
  searchProducts.value = products.value.filter((product) =>
    product.name.toLowerCase().includes(search.value.toLowerCase())
  )
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <section class="main-content">
    <div class="products-container">
      <div class="title-container">
        <h1 class="title">Todos los productos</h1>
      </div>
      <div class="searcher">
        <input
          v-model="search"
          @input="searchProduct"
          class="inputs"
          type="text"
          placeholder="Busca tu producto"
        />
      </div>
      <div class="products">
        <ProductCardNoCrud
          v-for="product in searchProducts"
          :key="product.id"
          :id="product.id"
          :name="product.name"
          :price="product.price"
          :quantity="product.quantity"
          @emitDeleteProduct="
            () => {
              deleteProduct(product.id)
            }
          "
        />
      </div>
      <div v-if="!products">
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

.inputs {
  padding: 0.5rem;
  border: solid 0.1rem gray;
  border-radius: 2rem;
  background: none;
  width: 100%;
}

.inputs:focus {
  outline: none;
}

.searcher {
  display: flex;
  align-items: center;
}

.products-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 2rem;
  padding: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  background-color: white;
  height: 100%;
}

.products {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  height: 90%;
}
</style>
