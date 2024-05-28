<template>
  <div class="w-full p-4 bg-slate-50 rounded-2xl overflow-auto text-gray-600 mx-auto">
    <form @submit.prevent="onSearch">
      <input type="search" placeholder="Buscar Productos" class="w-full mb-4 p-2 border-gray-300 rounded-2xl"
        v-model="filters.searchTerm" />
    </form>
    <h1 class="text-xl mb-4 font-bold">Filtros</h1>
    <div v-for="section in sections" :key="section" class="mb-4">
      <button class="w-full text-left py-2" @click="toggleSection(section)">
        {{ section }}
      </button>
      <div v-if="openSection === section" class="pl-4">
        <ul v-if="section === 'Categoría'">
          <li v-for="category in categories" :key="category.id" class="flex items-center space-x-2">
            <input type="checkbox" :id="category.id.toString()" name="Categoría" />
            <label :for="category.id.toString()">{{ category.name }}</label>
          </li>
        </ul>
        <ul v-if="section === 'Tipo de producto'">
          <li v-for="type in productTypes" :key="type.id" class="flex items-center space-x-2">
            <input type="checkbox" :id="type.id.toString()" name="Tipo de producto">
            <label :for="type.id.toString()">{{ type.name }}</label>
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

const categories = ref([
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Furniture' },
]);

const productTypes = ref([
  { id: 1, name: 'Smartphone' },
  { id: 2, name: 'Tablet' },
]);

const sections = ['Categoría', 'Tipo de producto'];
const openSection = ref<string | null>(null);
const filters = ref({ searchTerm: '', categories: [], productTypes: [] });

const toggleSection = (section: string) => {
  openSection.value = openSection.value === section ? null : section;
};


const onSearch = () => {
};

const handleClickFilters = () => {
};
</script>

<style scoped></style>