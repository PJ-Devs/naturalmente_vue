<template>
  <main class="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <section class="lg:col-span-1">
      <ProductSidebar></ProductSidebar>
    </section>
    <section class="lg:col-span-3">
      <h1 class="text-2xl font-bold mb-4">Products</h1>
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 my-auto border-[#163904]"></div>
      </div>
      <ul v-else-if="products.length > 0" class="space-y-4">
        <li v-for="product in products" :key="product.id">
          <ProductCard :product="product"></ProductCard>
        </li>
      </ul>
      <p v-else>No products found.</p>
      <p v-if="error">{{ error }}</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import ProductSidebar from './Product-sidebar.vue';
import ProductCard from './ProductCard.vue';
import { ref, onMounted } from 'vue';
import fetchGlobal from '../../helpers/gloabalFetch';
import type { Product } from '../../types';

const products = ref<Product[]>([]);
const error = ref<string | null>(null);
const isLoading = ref<boolean>(true);

const fetchProducts = async () => {
  try {
    const response = await fetchGlobal<{ data: Product[] }>('/products');
    products.value = response.data;
  } catch (err) {
    console.error('Error fetching products:', err);
    error.value = (err instanceof Error) ? err.message : 'Unknown error';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchProducts);
</script>

<style scoped></style>