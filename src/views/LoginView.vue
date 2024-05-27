<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser, getUser } from '../API/authUsers'
import { useAuthUserStore } from '../stores/authUser'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import type { Customer } from '@/types'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
const router = useRouter()
const useAuthUser = useAuthUserStore()

const user = ref({
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
  user.value = {
    ...user.value,
    [target.name]: target.value
  }
  console.log(user.value)
}

const handleLogin = (e: Event) => {
  e.preventDefault()
  loading.value = true

  // Check if the password or email are invalid
  if (!PASSWORD_REGEX.test(user.value.password) || !EMAIL_REGEX.test(user.value.email)) {
    loading.value = false
    return
  }

  loginUser(user.value, loading)
    .then(() => {
      const user = getUser()
      user.then((data) => {
        useAuthUser.setUser(data as Customer)
      })
      router.push('/')
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
        <h1 class="font-extrabold text-[--primary] text-[2rem]">Inicia sesión</h1>
        <img class="w-[4rem] h-[4rem]" src="../assets/icons/leaf.svg" alt="" />
      </div>
      <form class="flex flex-col mt-8" action="">
        <div class="input-group">
          <img
            class="w-[1.6rem] h-[1.6rem] absolute mt-2 ml-3 stroke-slate-100"
            src="../assets/icons/email.svg"
            alt="Email icon"
          />
          <input
            class="formInput bg-gray-50 w-[25dvw]"
            name="email"
            type="email"
            placeholder="Correo electronico"
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
            name="password"
            type="password"
            placeholder="Contraseña"
            @change="handleCangeInput"
          />
        </div>
        <button class="primaryBtn mt-4" @click="handleLogin">Iniciar sesión</button>
      </form>
      <div class="flex gap-1 mt-3">
        <span class="opacity-80">No tienes una cuenta?</span>
        <RouterLink
          class="text-[--primary] opacity-80 hover:text-[--secondary] hover:underline"
          to="/register"
        >
          Registrate aquí
        </RouterLink>
      </div>
    </section>
  </section>
</template>

<style scoped></style>
