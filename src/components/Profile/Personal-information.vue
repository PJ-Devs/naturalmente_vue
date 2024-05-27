<script setup lang="ts">
import GenericInput from '../Generic-input.vue';
import profileInput from '../../utilities/profile-Input.json'
let inputs = profileInput;
let inputValue = '';

const submitForm = () => {
  console.log('Formulario enviado');
}
</script>
<template>
  <div class="bg-[#EEE] flex justify-start">
    <section class="h-screen flex my-14 justify-center flex-grow">
      <form @submit.prevent="submitForm" class="flex flex-col">
        <h1 class="font-bold text-[--primary] m-2 text-xl">Datos Personales</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
          <template v-for="(input, index) in inputs" :key="index">
            <GenericInput :type="input.type" :placeholder="input.placeholder" :value="inputValue"
              :label="input.label" />
          </template>
        </div>
        <button type="submit" class="primaryBtn w-[35%] mx-auto">Guardar</button>
      </form>
    </section>
  </div>
</template>

<style scoped></style>
