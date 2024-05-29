<script setup lang="ts">
import { useAuthUserStore } from '@/stores/authUser'
import { onMounted, ref } from 'vue'
import type { Sell } from '@/types'
import { getSells } from '@/API/Sells'
import { useRouter } from 'vue-router'
import BuyCard from '../components/Profile/BuyCard.vue'

const useAuthUser = useAuthUserStore()
const router = useRouter()

const buys = ref<Sell[]>([])
const loading = ref<boolean>(true)

const filterUserBuys = () => {
  const userId = useAuthUser.authUser?.id
  if (userId) {
    buys.value = buys.value.filter((buy) => buy.user_id === userId)
  }
}

const fetchBuys = async () => {
  try {
    const data = await getSells()
    buys.value = data
    filterUserBuys()
    console.log(buys.value)
  } catch (error) {
    console.error('Error fetching sells:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchBuys)
</script>

<template>
  <section class="min-h-screen max-h-fit pt-[7dvh]">
    <section>
      <h2
        class="text-xl font-semibold mx-[20%] py-3 px-4 border-2 bg-opacity-80 rounded-md shadow-md bg-white"
      >
        TUS COMPRAS!
      </h2>
      <div class="flex flex-col gap-2 my-2 mx-[20%]">
        <div v-if="buys.length > 0">
          <BuyCard v-for="buy in buys" :key="buy.id" :buy="buy" :sell="buy" />
        </div>
        <section v-else class="py-[10%] bg-gray-50">
          <span class="flex justify-center text-2xl font-light text-center text-gray-500">
            Aún no has hecho ninguna compra, qué esperas! 😢
          </span>
        </section>
        <div class="m-4 ml-8">
          <button class="secondary-btn" @click="router.push('/productos')">Seguir comprando</button>
        </div>
      </div>
    </section>
  </section>
</template>
