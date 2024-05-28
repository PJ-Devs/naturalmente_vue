<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getProducts } from '../API/products'
import ProductCard from '../components/ProductCard.vue'
import ProductSidebar from '../components/UserViewProducts/Product-sidebar.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import type { Product } from '@/types'
import { useFiltersStore } from '../stores/filtersStore';

const filtersStore = useFiltersStore();
const products = ref<Product[]>([])
const loading = ref<boolean>(true)

const onChangeProducts = (toSetProducts: Product[]) => {
  products.value = toSetProducts
}

onMounted(() => {
  getProducts(loading, products)
  "filteresssss1s",filtersStore.fetchProducts();
 
})

</script>

<template>
  <section className="min-h-screen max-h-fit pt-[7dvh] mx-[10dvw]">
    <LoadingSpinner v-if="loading" />
    <section v-if="loading === false" className="grid grid-cols-4 my-5">
      <ProductSidebar />
      <ul className="col-span-3 flex flex-col divide-y-2 gap-3 divide-solid ml-[1%]">
        <li v-for="(product, index) in filtersStore.filteredProducts" v-bind:key="index">
          <ProductCard :product="product" :isInCart="true" />
        </li>
      </ul>
    </section>
    <section v-else></section>
  </section>
</template>
