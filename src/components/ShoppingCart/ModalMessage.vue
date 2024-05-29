<script setup lang="ts">
import { ref, watch } from 'vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FcAcceptDatabase } from 'oh-vue-icons/icons'

addIcons(FcAcceptDatabase)

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['close'])
const open = ref<boolean>(props.open)

watch(
  () => props.open,
  (newVal) => {
    open.value = newVal
  }
)

const closeModal = () => {
  open.value = false
  emit('close')
}
</script>

<template>
  <section>
    <div
      class="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-20 flex justify-center items-center z-20"
      v-if="open"
      @click.self="closeModal"
    >
      <section
        class="bg-white rounded-lg w-fit max-w-[30%] h-fit flex gap-[1rem] justify-center items-center text-xl text-center p-6"
      >
        <OhVueIcon name="fc-accept-database" scale="4" />
        <div
          class="flex flex-col justify-center items-center gap-[0.8rem] border-l-[3px] border-black px-5"
        >
          <span>{{ props.message }}</span>
          <button
            class="w-[35%] px-4 py-2 bg-[--primary] text-lg hover:bg-[--secondary] rounded-full hover:shadow-md text-gray-50"
            @click="closeModal"
          >
            Aceptar
          </button>
        </div>
      </section>
    </div>
  </section>
</template>
