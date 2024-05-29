<script setup lang="ts">
import GenericInput from '../Generic-input.vue'
import profileInput from '../../utilities/profile-Input.json'
import API from '../../API/config'
import {API_BASE_URL} from '@/config/constants.js'
import { useAuthUserStore } from '../../stores/authUser'
import fetchGlobal from '../../helpers/gloabalFetch'
import ErrorModal from './ErrorModal.vue'
import { ref } from 'vue'
import * as yup from 'yup';


let inputs = profileInput
const useAuthUser = useAuthUserStore()
const showErrorModal = ref(false)
const errorMessages = ref([])



const updateUserField = (fieldName, value) => {
  useAuthUser.setUser({ ...useAuthUser.getUser, [fieldName]: value })
}

const userSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido').min(7, 'El nombre no puede tener menos de 7 caracteres').max(255, 'El nombre no puede tener mas de 255 caracteres').matches(/^[a-zA-Z\s-]+$/, 'El nombre solo puede contener letras, espacios y guiones'),
  email: yup.string().required('El email es requerido').min(7, 'El email no puede tener menos de 7 caracteres').max(255, 'El email no puede tener mas de 255 caracteres').email('El email debe ser valido'),
  phone_number: yup.string().min(4, 'El numero de telefono no puede tener menos de 4 caracteres').max(30, 'El numero de telefono no puede tener mas de 30 caracteres').matches(/^[a-zA-Z0-9]+$/, 'El numero de telefono solo puede contener letras y numeros'),
  address: yup.string().min(8, 'La direccion no puede tener menos de 8 caracteres').max(100, 'La direccion no puede tener mas de 100 caracteres').matches(/^.*$/u, 'La direccion solo puede contener letras, numeros, espacios, guiones y almohadillas')
})

const submitForm = async () => {

  try {
    const userData = {
      name: useAuthUser.getUser?.name,
      email: useAuthUser.getUser?.email,
      phone_number: useAuthUser.getUser?.phone_number,
      address: useAuthUser.getUser?.address,
    };
    console.log("User data", userData)
    await userSchema.validate(userData, { abortEarly: false })
    const userId = useAuthUser.getUser?.id
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)

    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      errorMessages.value = error.errors
      showErrorModal.value = true
    } else {
      console.error('Error al actualizar los datos del usuario:', error)
    }
  }
}



</script>
<template>
  <div class="bg-[#EEE] flex justify-start pt-[7dvh]">
    <section class="h-screen flex my-14 justify-center flex-grow">
      <form @submit.prevent="submitForm" class="flex flex-col">
        <h1 class="font-bold text-[--primary] m-2 text-xl">Datos Personales</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
          <template v-for="(input, index) in inputs" :key="index">
            <GenericInput :type="input.type" :placeholder="input.placeholder" :value="useAuthUser?.getUser[input.name]"
              :label="input.label" @input="updateUserField(input.name, $event.target.value)" />
          </template>
        </div>
        <button type="submit" class="primaryBtn w-[35%] mx-auto">Guardar</button>
      </form>
    </section>
    <ErrorModal :show="showErrorModal" :errors="errorMessages" @update:show="showErrorModal = $event" />
  </div>
</template>

<style scoped></style>
