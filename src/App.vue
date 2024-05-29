<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { onMounted } from 'vue'
import { checkTokenValidity } from './API/authUsers'

onMounted(() => {
  checkTokenValidity()
})
</script>

<template>
  <RouterView />
</template>
