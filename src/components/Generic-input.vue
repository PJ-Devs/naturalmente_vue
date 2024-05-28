<script setup lang="ts">
  import { defineProps } from 'vue';

  const props = defineProps({
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  });
</script>

<template>
  <div class="mb-4">
    <label v-if="props.label" class="block text-gray-700 text-sm font-bold mb-2">{{ props.label }}</label>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.value"
      :disabled="props.disabled"
      :required="props.required"
      @input="$emit('update:modelValue', $event.target.value)"
      class="border-b border-gray-300 focus:border-blue-500 hover:border-b-2 hover:border-red-500 outline-none w-full px-3 py-2 text-gray-700 leading-tight transition-all duration-300"
    />
  </div>
</template>



