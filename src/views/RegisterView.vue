<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { registerUser } from '../API/authUsers'

const newUser = ref({
  name: '',
  lastName: '',
  email: '',
  password: ''
})

const handleRegister = () => {
  registerUser(newUser.value)
}
</script>

<template>
  <section class="h-screen flex items-center justify-center bg-[#EEE] bg-opacity-50">
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
          <input class="formInput bg-gray-50 w-[25dvw]" type="text" placeholder="Nombre" />
        </div>
        <div class="input-group">
          <img
            class="w-[1.6rem] h-[1.6rem] absolute mt-2 ml-3 stroke-slate-100"
            src="../assets/icons/user.svg"
            alt="Username icon"
          />
          <input class="formInput bg-gray-50 w-[25dvw]" type="text" placeholder="Apellido" />
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
          <input class="formInput bg-gray-50 w-[25dvw]" type="password" placeholder="Contraseña" />
        </div>
        <button class="primaryBtn mt-4">Registrarse</button>
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
