<script setup lang="ts">
import { ref } from 'vue';
//import { useStore } from 'vuex';

//const store = useStore();
//const name = ref(store.state.user.name);
//nombre d eprueba 

const name = ref('sergio');

</script>


<template>
    <header class="bg-[--primary] rounded-tl-lg rounded-tr-lg p-1 mt-24 w-[99%] h-14 items-center">
        <h2 class="text-left  text-white font-bold">Hola {{ name }}</h2>
    </header>
</template>


<style scoped></style>