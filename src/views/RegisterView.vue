<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { registerUser } from '../API/authUsers'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useRouter } from 'vue-router'

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
const router = useRouter()

const newUser = ref({
  name: '',
  lastName: '',
  email: '',
  password: ''
})
const loading = ref(false)

/**
 * Handle the change of the input values
 * @param e Event
 */
const handleCangeInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  newUser.value = {
    ...newUser.value,
    [target.name]: target.value
  }
}

/**
 * Handle the register of a new user via submit event
 * @param e Event
 */
const handleRegister = (e: Event) => {
  e.preventDefault()
  loading.value = true
  console.log(1)

  // Check if the password or email are invalid
  if (PASSWORD_REGEX.test(newUser.value.password) || EMAIL_REGEX.test(newUser.value.email)) {
    loading.value = false
    return
  }

  // Register the user -> If the user is registered, redirect to login, otherwise show an error in console
  registerUser(newUser.value, loading)
    .then(() => {
      router.push('/login')
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <section class="h-screen flex items-center justify-center bg-[#EEE] bg-opacity-50">
    <LoadingSpinner v-if="loading" />
    <section class="rounded-2xl shadow-lg p-[2rem] bg-white">
      <div class="flex justify-between items-center">
        <h1 class="font-extrabold text-[--primary] text-[2rem]">Registrarse</h1>
        <img class="w-[4rem] h-[4rem]" src="../assets/icons/leaf.svg" alt="" />
      </div>
      <form class="flex flex-col mt-4" action="">
        <div class="input-group">
          <img
            class="w-[1.6rem] h-[1.6rem] absolute mt-2 ml-3 stroke-slate-100"
            src="../assets/icons/user.svg"
            alt="Username icon"
          />
          <input
            class="formInput bg-gray-50 w-[25dvw]"
            type="text"
            placeholder="Nombre"
            name="name"
            @change="handleCangeInput"
          />
        </div>
        <div class="input-group">
          <img
            class="w-[1.6rem] h-[1.6rem] absolute mt-2 ml-3 stroke-slate-100"
            src="../assets/icons/user.svg"
            alt="Username icon"
          />
          <input
            class="formInput bg-gray-50 w-[25dvw]"
            type="text"
            placeholder="Apellido"
            name="lastName"
            @change="handleCangeInput"
          />
        </div>
        <div class="input-group">
          <img
            class="w-[1.6rem] h-[1.6rem] absolute mt-2 ml-3 stroke-slate-100"
            src="../assets/icons/email.svg"
            alt="Email icon"
          />
          <input
            class="formInput bg-gray-50 w-[25dvw]"
            type="email"
            placeholder="Correo electronico"
            name="email"
            @change="handleCangeInput"
          />
        </div>
        <div class="input-group">
          <div class="flex justify-between">
            <img
              class="w-[1.6rem] h-[1.6rem] absolute ml-3 mt-2"
              src="../assets/icons/password.svg"
              alt="Password icon"
            />
          </div>
          <input
            class="formInput bg-gray-50 w-[25dvw]"
            type="password"
            placeholder="Contraseña"
            name="password"
            @change="handleCangeInput"
          />
        </div>
        <button class="primaryBtn mt-4" @click="handleRegister">Registrarse</button>
      </form>
      <div class="flex gap-1 mt-3">
        <span class="opacity-80">Ya tienes una cuenta?</span>
        <RouterLink
          class="text-[--primary] opacity-80 hover:text-[--secondary] hover:underline"
          to="/login"
        >
          Inicia sesión aquí
        </RouterLink>
      </div>
    </section>
  </section>
</template>

<style scoped></style>
