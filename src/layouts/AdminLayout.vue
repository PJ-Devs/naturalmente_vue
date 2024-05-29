<script setup>
import AdminHeader from '@/components/AdminHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <section className="bg-[#F5F5F5] min-h-screen max-h-fit pt-5">
    <AdminHeader />
    <RouterView />
  </section>
</template>
