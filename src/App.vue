<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { getUser } from './API/authUsers'
import { onMounted } from 'vue'
import { useAuthUserStore } from './stores/authUser.ts'
import type { Customer } from './types'

const useAuthUser = useAuthUserStore()

onMounted(() => {
  const user = getUser()
  user.then((data) => {
    useAuthUser.setUser(data as Customer)
  })
})
</script>

<template>
  <Header />
  <RouterView />
</template>
