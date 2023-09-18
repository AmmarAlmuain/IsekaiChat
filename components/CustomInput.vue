<template>
    <div class="w-full flex flex-col gap-2">
      <label :for="id" class="text-sm font-semibold">{{ label }}</label>
      <input
        :type="props.type"
        :name="props.name"
        :id="props.id"
        :placeholder="props.placeholder"
        :value="props.value || ''"
        @input="$emit('update:modelValue', $event?.target?.value)"
        class="w-full h-10 bg-neutral-800 border border-white/10 rounded-md outline-none px-4 placeholder:text-white/30"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  
    const props = defineProps({
      name: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String
      }
    })

  </script>