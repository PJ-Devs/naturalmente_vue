<script setup>
import AdminHeader from '@/components/AdminHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <section>
    <AdminHeader />
    <RouterView />
  </section>
</template>
