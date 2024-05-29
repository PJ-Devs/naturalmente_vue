<script setup>
import ProductsForm from '@/components/ProductsForm.vue'
import ProductCard from '@/components/AdminProductCard.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { API_BASE_URL } from '@/config/constants.js'

const router = useRouter()
const products = ref(null)
const pageProducts = ref(null)
const search = ref('')

const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`)
  const data = await response.json()
  products.value = data.data
  //take 6 random products
  products.value = products.value.sort(() => 0.5 - Math.random())
  pageProducts.value = products.value.slice(0, 6)
}

const searchProduct = () => {
  pageProducts.value = products.value.filter((product) =>
    product.name.toLowerCase().includes(search.value.toLowerCase())
  )
  pageProducts.value = pageProducts.value.slice(0, 6)
  console.log(pageProducts.value)
}

const deleteProduct = async (id) => {
  await fetch(`${API_BASE_URL}/products/` + id, {
    method: 'DELETE'
  }).then(() => {
    console.log('Product deleted')
    fetchProducts()
  })
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <section class="main-content">
    <div class="products-view">
      <div class="title-container">
        <h1 class="title">Productos</h1>
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
      <div class="products-container">
        <div class="products">
          <ProductCard
            v-for="product in pageProducts"
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
            @emitEditedProduct="
              () => {
                fetchProducts()
              }
            "
          />
        </div>
        <button
          class="btn-p"
          @click="
            () => {
              router.push('/admin/products/all')
            }
          "
        >
          Ver todos los productos
        </button>
        <div v-if="!products">
          <span>CARGANDO</span>
        </div>
      </div>
    </div>
    <ProductsForm
      @emitCreateProduct="
        () => {
          fetchProducts()
        }
      "
    />
  </section>
</template>

<style scoped>
.main-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

.btn {
  padding: 0.5rem;
  border: solid 0.1rem gray;
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
  background-color: var(--primary);
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  background-color: var(--accent);
}

.btn-p {
  padding: 0.5rem;
  border: solid 0.1rem gray;
  border-radius: 2rem;
  background-color: var(--primary);
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.btn-p:hover {
  background-color: var(--accent);
}

.products-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.products-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 2rem;
  padding: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  background-color: white;
  height: 100%;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  height: 90%;
}
</style>
