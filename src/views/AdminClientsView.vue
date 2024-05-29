<script setup>
import { onMounted, ref } from 'vue'
import ClientCard from '@/components/ClientCard.vue'
import { API_BASE_URL } from '@/config/constants.js'

const clients = ref(null)
const searchClients = ref(null)
const search = ref('')

const fetchClients = async () => {
  await fetch(`${API_BASE_URL}/customers`)
    .then((response) => response.json())
    .then((data) => {
      clients.value = data.data
      searchClients.value = clients.value
      console.log(clients.value)
    })
}

const searchClient = () => {
  searchClients.value = clients.value.filter((client) =>
    client.name.toLowerCase().includes(search.value.toLowerCase())
  )
}

onMounted(() => {
  fetchClients()
})
</script>

<template>
  <section class="main-content">
    <div class="clients-container">
      <div class="title-container">
        <h1 class="title">Clientes</h1>
      </div>
      <div class="searcher">
        <input
          v-model="search"
          @input="searchClient"
          class="inputs"
          type="text"
          placeholder="Busca un cliente"
        />
      </div>
      <div class="clients">
        <ClientCard
          v-for="client in searchClients"
          :key="client.name"
          :name="client.name"
          :address="client.address"
          :phone_number="client.phone_number"
        />
      </div>
      <div v-if="!clients">
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

.clients-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 2rem;
  padding: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  background-color: white;
  height: 100%;
  min-height: 100vh;
}

.clients {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  height: 90%;
}
</style>
