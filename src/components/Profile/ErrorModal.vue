<template>
    <v-dialog v-model="localShow" persistent max-width="600">
      <v-card class="rounded-lg shadow-lg">
        <v-card-title class="bg-gray-200 px-6 py-4 rounded-t-lg">Errores de validación</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(error, index) in errors" :key="index" class="border-b border-gray-200">
              <v-list-item-content>{{ error }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <button class="primaryBtn mx-auto bg-[#76a55f] m-4" @click="close">Cerrar</button>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, watch, defineEmits } from 'vue'
  import { VDialog, VCard, VCardTitle, VCardText, VList, VListItem, VBtn } from 'vuetify/components'
  
  const props = defineProps({
    show: Boolean,
    errors: Array
  })
  
  const emit = defineEmits(['update:show'])
  
  const localShow = ref(props.show)
  
  watch(() => props.show, (newValue) => {
    localShow.value = newValue
  })
  
  const close = () => {
    emit('update:show', false)
  }
  </script>
  