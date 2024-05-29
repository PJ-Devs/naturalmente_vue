<script setup>
import Header from '@/components/Header.vue'
import { RouterView } from 'vue-router';
</script>

<template>
    <section>
        <Header/>
        <RouterView />
    </section>  
</template>