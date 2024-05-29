<template>
  <div class="w-full p-4 bg-slate-50 rounded-2xl overflow-auto text-gray-600 mx-auto">
    <form>
      <input type="search" placeholder="Buscar Productos" class="w-full mb-4 p-2 border-gray-300 rounded-2xl"
        v-model="filtersStore.searchTerm" @input="onSearch" />
    </form>
    <h1 class="text-xl mb-4 font-bold">Filtros</h1>
    <div v-for="section in sections" :key="section" class="mb-4">
      <button class="w-full text-left py-2 px-2 hover:bg-[#acd09a] hover:opacity-90 rounded"
        @click="toggleSection(section)">
        {{ section }}
      </button>
      <div v-if="openSection === section" class="pl-4">
        <ul v-if="section === 'Categoría'">
          <li v-for="category in categories" :key="category.name" class="flex items-center space-x-2">
            <input type="checkbox" :id="category.name" :value="category.name"
              v-model="filtersStore.selectedCategories" />
            <label :for="category.name">{{ category.name }}</label>
          </li>
        </ul>
        <ul v-if="section === 'Tipo de producto'">
          <li v-for="type in types" :key="type.name" class="flex items-center space-x-2">
            <input type="checkbox" :id="type.name" :value="type.name" v-model="filtersStore.selectedProductTypes" />
            <label :for="type.name">{{ type.name }}</label>
          </li>
        </ul>
        <ul v-if="section === 'Precio'">
          <li v-for="price in prices" :key="price.min" class="flex items-center space-x-2">
            <input type="checkbox" :id="price.min" :value="priceRange(price.min, price.max)"
              v-model="filtersStore.selectedPriceRange" />
            <label :for="price.min">{{ `$${price.min.toLocaleString()}` }} - {{ `$${price.max.toLocaleString()}`
              }}</label>
          </li>
        </ul>
        <ul v-if="section === 'Cantidad'">
          <li class="flex items-center space-x-2">
            <input type="number" placeholder="Cantidad máxima" v-model="filtersStore.selectedQuantity"
              class="border-b border-gray-300 focus:border-blue-500 hover:border-b-2 hover:border-red-500 outline-none w-full px-3 py-2 text-gray-700 leading-tight transition-all duration-300" />
          </li>

        </ul>
      </div>
    </div>
    <button class="w-full mt-10 primaryBtn" @click="handleClickFilters">
      Cargar filtros
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { categories, types } from '../../helpers/filters';
import { useFiltersStore } from '../../stores/filtersStore';
import GenericInput from '../Generic-input.vue'

const filtersStore = useFiltersStore();

const sections = ['Categoría', 'Tipo de producto', 'Precio', "Cantidad"];
const openSection = ref<string | null>(null);

const toggleSection = (section: string) => {
  openSection.value = openSection.value === section ? null : section;
};


const onSearch = () => {
  filtersStore.setSearchTerm(filtersStore.searchTerm);
};

const priceRange = (min: number, max: number) => {
  return { min, max };
};
const handleClickFilters = () => {
  filtersStore.setSelectedCategories(filtersStore.selectedCategories);
  filtersStore.setSelectedProductTypes(filtersStore.selectedProductTypes);
  filtersStore.setSelectedPriceRange(filtersStore.selectedPriceRange);
  filtersStore.setSelectedQuantity(filtersStore.selectedQuantity);
};

const prices = [
  { min: 0, max: 15000 },
  { min: 15000, max: 30000 },
  { min: 30000, max: 50000 },
  { min: 50000, max: 100000 },
  { min: 100000, max: 200000 },
  { min: 200000, max: 300000 },
  { min: 300000, max: 500000 },
];
</script>

<style scoped></style>
