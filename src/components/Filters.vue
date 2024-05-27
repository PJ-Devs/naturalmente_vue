<script setup lang="ts">
import type { Product } from '@/types'
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  products: {
    type: Array<Product>,
    required: true
  },
  onFilterProducts: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['onFilterProducts'])

// const { data: categories, isLoading: isLoadingCategories } = useFetch('/categories')
// const { data: productTypes, isLoading: isLoadingTypes } = useFetch('/types')
// const { filterProducts, filters, setFilters } = useFilters()

// const openSection = ref(null)
// const sections = ['Categoría', 'Tipo de producto']

// const toggleSection = (section) => {
//   openSection.value = openSection.value === section ? null : section
// }

// const handleChangeSearchTerm = (e) => {
//   setFilters({ ...filters.value, searchTerm: e.target.value })
// }

// const handleAddFilters = (e, section) => {
//   const { name, checked, id } = e.target
//   let filterName = name

//   if (filterName === 'Categoría') {
//     filterName = 'categories'
//   } else if (filterName === 'Tipo de producto') {
//     filterName = 'productTypes'
//   }

//   if (checked) {
//     setFilters({
//       ...filters.value,
//       [filterName]: [...filters.value[filterName], parseInt(id)]
//     })
//   } else {
//     setFilters({
//       ...filters.value,
//       [filterName]: filters.value[filterName].filter((item) => item !== parseInt(id))
//     })
//   }
// }

// const onSearch = () => {
//   emit('onFilterProducts', filterProducts(props.products))
// }

// const handleClickFilters = () => {
//   emit('onFilterProducts', filterProducts(props.products))
// }

// const getTasks = (section) => {
//   if (section === 'Categoría') return categories.value || []
//   if (section === 'Tipo de producto') return productTypes.value || []
//   return []
// }
</script>

<template>
  <div class="w-full lg:col-span-1 p-4 bg-slate-50 rounded-2xl overflow-auto text-gray-600 mx-auto">
    <!-- <form @submit.prevent="onSearch">
      <input
        type="search"
        placeholder="Buscar Productos"
        class="w-full mb-4 p-2 border-gray-300 rounded-2xl"
        v-model="filters.searchTerm"
      />
    </form>
    <h1 class="text-xl mb-4 font-bold">Filtros</h1>
    <div v-for="section in sections" :key="section">
      <button class="w-full text-left py-2" @click="toggleSection(section)">
        {{ section }}
      </button>

      <ul v-if="openSection === section" class="pl-4 mb-4">
        <li v-for="task in getTasks(section)" :key="task.id" class="flex items-center space-x-2">
          <input
            type="checkbox"
            :id="task.id"
            :name="section"
            @change="handleAddFilters($event, section)"
          />
          <label :for="task.name">{{ task.name }}</label>
        </li>
      </ul>
      <hr class="my-4" />
    </div>

    <button class="w-full mt-10 btn" @click="handleClickFilters">Cargar filtros</button> -->
  </div>
</template>
